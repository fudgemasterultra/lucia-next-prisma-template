import { testHashPassword } from "@/lib/test/custom.test";

export default async function Test({
  params,
}: {
  params: Promise<{
    test: string;
  }>;
}) {
  const { test } = await params;
  const passwordHashTest = testHashPassword();
  return (
    <div>
      <h1>Password hashing:{passwordHashTest ? "test passed" : "failed"}</h1>
    </div>
  );
}
