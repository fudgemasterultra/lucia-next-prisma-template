import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = request.cookies.get("session");
  if (!session) {
    return NextResponse.json({ error: "No session found" }, { status: 400 });
  }
  console.log(session.value);
  const sessionToken = await prisma.session.findFirst({
    where: {
      id: session.value,
    },
  });
  if (!sessionToken) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
  await prisma.session.delete({
    where: {
      id: session.value,
    },
  });
  //remove session cookie
  return NextResponse.json(
    { message: "Logged out" },
    {
      headers: {
        "Set-Cookie": "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
      },
    }
  );
}
