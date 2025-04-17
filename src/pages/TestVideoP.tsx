import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import videosData from "../site/videos.json";
import Menu from "../components/Menu";
import PageContainer from "../components/PageContainer";
import ContentContainer from "../components/ContentContainer";

const TestVideoP = () => {
  const { vimeoId } = useParams<{ vimeoId: string }>();
  const [embedUrl, setEmbedUrl] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16/9"); // default
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    const video = videosData.find((v) => v.id === vimeoId);
    if (video) {
      setEmbedUrl(video.embedUrl);
      setAspectRatio(video.aspectRatio || "16/9");
      setTextContent(
        `This is a dynamic video page for:\n\n${video.title}\n\nLorem ipsum dolor sit amet...`,
      );
    }
  }, [vimeoId]);

  // 👇 This is where you define styles per known aspect ratio
  const getVideoStyle = (ratio: string) => {
    switch (ratio) {
      case "1/1":
        return {
          aspectRatio: "1 / 1",
          margin: "0 auto",
          maxHeight: "500px",
        };

      case "256/135":
        return {
          width: "100%",
          aspectRatio: "310/167",
          margin: "0 auto",
        };

      case "1024/429":
        return {
          width: "100%",
          aspectRatio: "1024 / 429",
          margin: "0 auto",
        };

      case "96/41":
        return {
          width: "100%",
          aspectRatio: "96 / 41",
          margin: "0 auto",
        };
      case "64/27":
        return {
          width: "100%",
          aspectRatio: "64 / 27",
          margin: "0 auto",
        };

      case "8/5":
        return {
          width: "100%",
          aspectRatio: "8 / 5",
          margin: "0 auto",
        };

      default:
        return {
          width: "100%",
          aspectRatio: "16 / 9",
          margin: "0 auto",
        };
    }
  };

  const videoStyle = getVideoStyle(aspectRatio);

  return (
    <PageContainer>
      {/* Sidebar */}
      <Menu />

      {/* Main Content */}
      <ContentContainer title="Home" button={false}>
        <div
          className="relative w-full"
          style={{
            ...videoStyle,
            position: "relative",
          }}
        >
          <iframe
            src={embedUrl}
            title="Vimeo Video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute left-0 top-0 h-full w-full rounded-md border-none"
          />
        </div>

        {/* Text below */}
        <div className="mt-6 whitespace-pre-line text-lg text-gray-700">
          {vimeoId}
          <br />
          {textContent}
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default TestVideoP;
