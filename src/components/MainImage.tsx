export default function MainImage() {
  return (
    <div
      className={`hidden w-[80%] sm:block sm:flex sm:w-[100%] lg:w-[70%] lg:pt-11 lg2:w-[75%] xl:w-[80%] xl:pr-[50px] xl:pr-[66px]`}
    >
      <div className="h-[90vh] w-full object-contain px-16 sm:h-auto lg:pl-0 xl:px-0">
        <img src="/home.webp" alt="" className="lg:mr-40" />
      </div>
    </div>
  );
}
