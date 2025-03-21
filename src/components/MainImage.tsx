import img from "../assets/images/main.webp"

export default function MainImage() {
    return <div className="w-[80%] bg-white overflow-hidden ">
        <div className="w-full h-[90vh] object-contain px-20">
            <img src={img} alt="" className='mr-40' />
        </div>
    </div>
}