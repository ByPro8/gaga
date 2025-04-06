import BackToHome from "./BackToHome";

export default function ContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-ful mt-14 flex flex-col">
      <h1 className="mb-4 ml-10 text-[29px] text-gray-500">
        <BackToHome />
        Albums
      </h1>
      <div className="scrollbar-hide sm:scrollbar-default xl_1500:grid-cols-4 grid min-h-0 w-full min-w-0 grid-cols-2 gap-8 self-start !overflow-y-auto overflow-y-auto px-10 pb-10 sm:grid-cols-3 lg:gap-10 lg:overflow-y-auto lg:px-10">
        {children}
      </div>
    </div>
  );
}
