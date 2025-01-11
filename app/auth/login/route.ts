import { NextRequest, NextResponse } from "next/server";
import {
  hashPassword,
  generateSessionToken,
  createSession,
  validatePassword,
} from "@/lib/auth/entry";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: "Username or password incorect" },
      { status: 400 }
    );
  }
  const credentials = await prisma.credentials.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (!credentials || !credentials.salt || !credentials.password) {
    return NextResponse.json(
      { error: "Internal error please contact support." },
      { status: 400 }
    );
  }
  const { salt, password: hash } = credentials;
  const valid = validatePassword(password, salt, hash);
  if (!valid) {
    return NextResponse.json(
      { error: "Username or password incorect" },
      { status: 400 }
    );
  }
  const token = generateSessionToken();
  const session = await createSession(token, user.id);
  return NextResponse.json(
    { user: { id: user.id, email: user.email } },
    {
      status: 200,
      headers: {
        "Set-Cookie": `session=${session.id}; Path=/; HttpOnly; Secure=${
          process.env.NODE_ENV === "production"
        }; SameSite=Lax; Max-Age=${session.expiresAt.getTime() - Date.now()}`,
      },
    }
  );
}
