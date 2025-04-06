import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackToHome() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="items-center rounded-md border-0 py-2 pr-4 text-gray-500 transition focus:outline-none focus:ring-0 active:outline-none lg:hidden"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
