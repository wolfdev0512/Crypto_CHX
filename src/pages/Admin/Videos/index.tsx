import React, { useEffect, useState } from "react";

import "./Videos.scss";
import Details from "./Details";
import { useGetVideos } from "../../../hooks";
import AddVideo from "./AddVideo";
import { IVideos } from "../../../constants/types";

const Videos: React.FC = () => {
  const { isLoading, error, data } = useGetVideos();
  const [videosData, setVideosData] = useState<IVideos[]>([]);
  const [editData, setEditData] = useState<IVideos | null>(null);

  useEffect(() => {
    setVideosData(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="mx pad">
        <div className="loader">
          <p>Loading...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="mx pad">
        <div className="loader">
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="faqs_details pt-30 pb-30">
      <div className="mx pad">
        <h1 className="mb-30">Video Section</h1>
        <AddVideo
          setVideosData={setVideosData}
          editData={editData}
          setEditData={setEditData}
        />
        <Details
          data={videosData}
          setVideosData={setVideosData}
          setEditData={setEditData}
        />
      </div>
    </div>
  );
};

export default Videos;
