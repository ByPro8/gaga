import Menu from "../components/Menu"
import MainImage from "../components/MainImage"

export default function Home() {
    return <div className="h-screen w-full flex">
        <Menu className=" md:w-[20%] w-[100%] text-center md:text-right md:pl-10" />
        <MainImage className="w-[80%] overflow-hidden hidden md:block" />
    </div>
}