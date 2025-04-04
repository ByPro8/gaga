export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full min-w-0 flex-col text-gray-500 sm:flex-col lg:flex-[1_1_0%] lg:flex-row">
      {children}
    </div>
  );
}
