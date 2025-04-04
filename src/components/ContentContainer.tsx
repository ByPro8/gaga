export default function ContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="scrollbar-hide sm:scrollbar-default xl_1500:grid-cols-4 mt-10 grid min-h-0 w-full min-w-0 grid-cols-2 gap-8 self-start !overflow-y-auto overflow-y-auto px-5 pb-10 sm:grid-cols-3 lg:gap-10 lg:overflow-y-auto lg:px-10">
      {children}
    </div>
  );
}
