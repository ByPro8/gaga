import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackToHomeProps {
  // Optional destination path (defaults to Home; subpages can pass their parent section)
  to?: string;
  label?: string;
}

export default function BackToHome({
  to = "/",
  label = "Back to home",
}: BackToHomeProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      aria-label={label}
      className="mr-2 inline-flex items-center justify-center rounded-md border-0 p-1.5 text-gray-400 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gaga"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
