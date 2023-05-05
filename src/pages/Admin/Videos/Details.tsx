import React from "react";
import { IVideos } from "../../../constants/types";

// import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/trash.svg";
import { deleteVideo } from "../../../api";
import Carousel from "../../../components/Carousel";

interface IDetailsProps {
  data: IVideos[];
  setVideosData: React.Dispatch<React.SetStateAction<IVideos[]>>;
  setEditData: React.Dispatch<React.SetStateAction<IVideos | null>>;
}

const Details: React.FC<IDetailsProps> = ({ data, setVideosData }) => {
  const handleDelete = async (id: string) => {
    const response = window.confirm("Are you sure, you want to delete this");
    if (!response) return;
    try {
      await deleteVideo(id);
      setVideosData((d) => [...d.filter((f) => f.id !== id)]);
    } catch (error) {
      alert("something went wrong");
    }
  };

  if (!data.length) {
    return (
      <div className="loader">
        <h2>No videos added yet.</h2>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <Carousel>
        {data.map((val, index) => {
          return (
            <div key={index.toString()} className="card">
              <div className="card_header">
                <div className="icon" onClick={() => handleDelete(val.id)}>
                  <DeleteIcon />
                </div>
              </div>
              <div className="video_wrapper">
                <video src={val.video_url} controls></video>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Details;
