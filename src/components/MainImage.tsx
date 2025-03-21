import img from "../assets/images/main.webp"
interface MainImageProps {
    className?: string;
}
export default function MainImage({ className = "" }: MainImageProps) {
    return <div className={`bg-white overflow-hidden ${className}`}>
        <div className="w-full h-[90vh] sm:h-auto object-contain px-16">
            <img src={img} alt="" className='lg:mr-40' />
        </div>
    </div>
}