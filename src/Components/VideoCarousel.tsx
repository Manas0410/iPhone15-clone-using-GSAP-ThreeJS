// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[] | null[]>([]);
  const sliderButtonRef = useRef<HTMLSpanElement[] | null[]>([]);
  const sliderButtonSlideRef = useRef<HTMLSpanElement[] | null[]>([]);

  const [videoId, setvideoId] = useState<number>(0);
  const [isPlaying, setisPlaying] = useState(true);
  const [videoProgress, setvideoProgress] = useState();

  // to move video video slides
  useGSAP(() => {
    if (videoId > 3) return;
    gsap.to("#sliderBanner", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });
  }, [videoId]);

  // to change width of video buttons
  useGSAP(() => {
    gsap.to(sliderButtonRef.current[videoId], {
      width:
        window.innerWidth < 760
          ? "10vw" // mobile
          : window.innerWidth < 1200
          ? "10vw" // tablet
          : "4vw", // laptop
      onComplete: () => {
        gsap.to(sliderButtonRef.current[videoId], {
          // @ts-ignore
          delay: videoRef.current[videoId]?.duration - 0.6,
          width: "12px",
          backgroundColor: "#afafaf",
        });
      },
    });
  }, [videoId, isPlaying]);

  // to calculate the progress in video
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (!isPlaying || !videoRef.current[videoId]) return;

      const duration =
        hightlightsSlides[videoId]?.videoDuration ||
        videoRef.current[videoId].duration;
      const currentTime = videoRef.current[videoId].currentTime;

      setvideoProgress((currentTime / duration) * 100);
    };

    if (!isPlaying || !videoRef.current[videoId]) return;

    videoRef.current[videoId].addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (videoRef.current[videoId]) {
        videoRef.current[videoId].removeEventListener(
          "timeupdate",
          handleTimeUpdate
        );
      }
    };
  }, [videoId, isPlaying]);

  // to show the progress in video
  useGSAP(() => {
    gsap.to(sliderButtonSlideRef.current[videoId], {
      width: `${videoProgress}%`,
      backgroundColor: "white",
      onComplete: () => {
        gsap.to(sliderButtonSlideRef.current[videoId], {
          backgroundColor: "#afafaf",
          widows: "0%",
        });
      },
    });
  }, [videoProgress]);

  // useGSAP(() => {
  //   gsap.to("#video", {
  //     scrollTrigger: {
  //       trigger: "#video",
  //       toggleActions: "restart none none none",
  //     },
  //     // onStart:()=>{}
  //     onStart: () => {
  //       if (videoId === 4) return;
  //       if (isPlaying) {
  //         videoRef.current[videoId]?.play();
  //       } else {
  //         videoRef.current[videoId]?.pause();
  //       }
  //     },
  //     onComplete: () => {
  //       setisPlaying(false);
  //     },
  //   });
  // }, [videoId, isPlaying]);

  // play the video
  useEffect(() => {
    if (videoId === 4) return;
    if (isPlaying) {
      videoRef.current[videoId]?.play();
    } else {
      videoRef.current[videoId]?.pause();
    }
  }, [videoId, isPlaying]);

  // for controlling the states of video
  const carouselController = (act: string) => {
    switch (act) {
      case "replay":
        setvideoId(0);
        setisPlaying(true);
        break;

      case "pause":
        setisPlaying(false);
        break;

      case "play":
        setisPlaying(true);
        break;
    }
  };

  return (
    <section id="carousel-container">
      <section className="flex items-center">
        {hightlightsSlides.map((item, i) => (
          <div
            key={item.id}
            className="relative sm:pr-20 pr-10"
            id="sliderBanner"
          >
            <div className=" video-carousel_container bg-black">
              <video
                id="video"
                muted
                className="w-full h-full"
                ref={(ele) => (videoRef.current[i] = ele)}
                onEnded={() => setvideoId((prev) => prev + 1)}
              >
                <source src={item.video} />
              </video>
            </div>
            <div className="absolute top-12 left-[5%] z-10">
              {item.textLists.map((text, i) => (
                <p key={i} className="md:text-2xl text-xl font-medium">
                  {text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>
      <div className="flex justify-center mt-10 relative">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <span
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(ele) => (sliderButtonRef.current[i] = ele)}
            >
              <span
                className="absolute h-full w-0 rounded-full"
                ref={(ele) => (sliderButtonSlideRef.current[i] = ele)}
              ></span>
            </span>
          ))}
        </div>
        <button
          className="control-btn"
          onClick={() =>
            carouselController(
              videoId === 4 ? "replay" : isPlaying ? "pause" : "play"
            )
          }
        >
          <img
            src={videoId === 4 ? replayImg : isPlaying ? pauseImg : playImg}
            alt=""
          />{" "}
        </button>
      </div>
    </section>
  );
};

export default VideoCarousel;

/*
scrolltrigger 
ticker 
toggleactions
onupdate 
oncomplete
anim functions

canvas 
*/
