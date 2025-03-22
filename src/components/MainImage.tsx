import img from "../assets/images/main.webp";
interface MainImageProps {
  className?: string;
}

export default function MainImage({ className = "" }: MainImageProps) {
  return (
    <div className={`overflow-hidden bg-white ${className}`}>
      <div className="h-[90vh] w-full object-contain px-16 sm:h-auto lg:pl-0 xl:px-0">
        <img src={img} alt="" className="lg:mr-40" />
      </div>
    </div>
  );
}
