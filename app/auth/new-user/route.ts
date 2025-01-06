import { NextRequest, NextResponse } from "next/server";
import {
  hashPassword,
  generateSessionToken,
  createSession,
} from "@/lib/auth/entry";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  //see if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  //create user
  const user = await prisma.user.create({
    data: {
      email,
    },
  });
  //create credentials
  const { salt, hash } = hashPassword(password);
  await prisma.credentials.create({
    data: {
      userId: user.id,
      salt,
      password: hash,
    },
  });
  //create session
  const token = generateSessionToken();
  const session = await createSession(token, user.id);
  return NextResponse.json(
    { user: { id: user.id, email: user.email } },
    {
      status: 200,
      headers: {
        "Set-Cookie": `session=${token}; Path=/; HttpOnly; Secure=${
          process.env.NODE_ENV === "production"
        }; SameSite=Lax; Max-Age=${session.expiresAt.getTime() - Date.now()}`,
      },
    }
  );
}
