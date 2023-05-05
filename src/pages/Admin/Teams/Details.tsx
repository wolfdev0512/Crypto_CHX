import React from "react";
import { ITeams } from "../../../constants/types";

import { deleteTeam } from "../../../api";

interface IDetailsProps {
  data: ITeams[];
  setTeamsData: React.Dispatch<React.SetStateAction<ITeams[]>>;
  setEditData: React.Dispatch<React.SetStateAction<ITeams | null>>;
}

const Details: React.FC<IDetailsProps> = ({
  data,
  setTeamsData,
  setEditData,
}) => {
  const handleDelete = async (id: string) => {
    try {
      const response = window.confirm("Are you sure, you want to delete this");
      if (!response) return;
      await deleteTeam(id);
      setTeamsData((d) => [...d.filter((f) => f.id !== id)]);
    } catch (error) {
      alert("something went wrong");
    }
  };

  if (!data.length) {
    return (
      <div className="loader">
        <h3>No Teams added yet.</h3>
      </div>
    );
  }

  return (
    <div className="teams_card_wrapper">
      {data.map((val, index) => {
        return (
          <div key={index.toString()} className="card">
            <div className="teams-card_header">
              <div className="icon edit" onClick={() => setEditData(val)}>
                <span>Edit</span>
              </div>
              <div className="icon" onClick={() => handleDelete(val.id)}>
                <span>Delete</span>
              </div>
            </div>
            <div className="image">
              <img src={val.avatar} alt="avatar" />
            </div>
            <h3>{val.name}</h3>
            <p>{val.role}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Details;
