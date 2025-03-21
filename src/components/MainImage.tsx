import img from "../assets/images/main.webp"
interface MainImageProps {
    className?: string;
}
export default function MainImage({ className = "" }: MainImageProps) {
    return <div className={` bg-white overflow-hidden ${className}`}>
        <div className="w-full h-[90vh] object-contain px-20">
            <img src={img} alt="" className='mr-40' />
        </div>
    </div>
}