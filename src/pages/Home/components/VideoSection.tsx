import React from "react";
import Carousel from "../../../components/Carousel";
import { IVideos } from "../../../constants/types";
import useGetVideos from "../../../hooks/useGetVideos";

const VideoCard: React.FC<IVideos> = ({ video_url }) => {
  return (
    <div className="video_card">
      <video src={video_url} controls></video>
    </div>
  );
};

const VideoSection = () => {
  const { data, isLoading, error } = useGetVideos();

  if (!data.length || isLoading || error) return null;

  return (
    <section id="video" className="video_section">
      <div className="mx pad">
        <div className="video_section_container">
          <div className="mb-30">
            <h1 className="mb-30">
              Video<span className="color-primary">s</span>
            </h1>
          </div>
          <Carousel>
            {data.map((val, index) => {
              return <VideoCard key={index.toString()} {...val} />;
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
