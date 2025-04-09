import BackToHome from "./BackToHome";

export default function ContentContainer({
  children,
  className = "", // default to an empty string if no className is provided
  title = "", // default to "Albums" if no title is provided
}: {
  children: React.ReactNode;
  className?: string; // className is optional
  title?: string; // title is optional with a default value of "Albums"
}) {
  return (
    <div className="flex h-full w-full flex-col pt-[60px]">
      <h1 className="mb-4 ml-10 text-[29px] text-gray-500">
        <BackToHome />
        {title}
      </h1>
      <div
        className={`grid min-h-0 w-full min-w-0 gap-8 self-start !overflow-y-auto overflow-y-auto px-10 pb-10 scrollbar-hide sm:scrollbar-default lg:gap-10 lg:overflow-y-auto lg:px-10 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
