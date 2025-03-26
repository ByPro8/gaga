import { useParams, Link } from "react-router-dom";

export default function VimeoPlayer() {
  const { vimeoId } = useParams();
  console.log("Video ID:", vimeoId);

  if (!vimeoId) return <div>Video not found</div>;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <iframe
        title="Vimeo Player"
        src={`https://player.vimeo.com/video/${vimeoId}`}
        width="800"
        height="450"
        allowFullScreen
        className="rounded-lg shadow-lg"
      ></iframe>
      <Link to="/videography" className="mt-4 text-blue-500 underline">
        Back to Gallery
      </Link>
    </div>
  );
}
