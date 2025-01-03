export default async function Test({
  params,
}: {
  params: Promise<{ test: string }>;
}) {
  const { test } = await params;
  return (
    <div>
      <h1>{test}</h1>
    </div>
  );
}
