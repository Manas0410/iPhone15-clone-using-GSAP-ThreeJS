import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startsPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, startsPlay, videoId, isLastVideo, isPlaying } = video;

  useEffect(() => {
    const currentprogress = 0;
    let span = 0;
  }, [videoId, startsPlay]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={i} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="flex-center w-full h-full rounded-3xl overflow-hidden bg-black">
                <video id="video" playsInline={true} preload="auto" muted>
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute z-10 left-[5%] top-12">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoCarousel;
