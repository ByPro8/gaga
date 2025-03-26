export default function MainImage() {
  return (
    <div className="h-screen pb-7 pt-10">
      <div className="relative h-full w-full">
        <img
          src="/home.webp"
          alt="Main"
          className="absolute left-0 top-0 max-h-[90vh] w-full object-contain"
        />
      </div>
    </div>
  );
}
