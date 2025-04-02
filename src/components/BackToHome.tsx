import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackToHome() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="absolute left-[8px] top-[50px] items-center rounded-md px-4 py-2 text-gray-500 transition focus:outline-none focus:ring-0 active:outline-none sm:hidden"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
