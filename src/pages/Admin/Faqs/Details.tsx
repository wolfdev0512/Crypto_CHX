import React from "react";
import { IFaqs } from "../../../constants/types";

import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/trash.svg";
import { deleteFaq } from "../../../api";

interface IDetailsProps {
  data: IFaqs[];
  setFaqsData: React.Dispatch<React.SetStateAction<IFaqs[]>>;
  setEditData: React.Dispatch<React.SetStateAction<IFaqs | null>>;
}

const Details: React.FC<IDetailsProps> = ({
  data,
  setFaqsData,
  setEditData,
}) => {
  const handleDelete = async (id: string) => {
    try {
      const response = window.confirm("Are you sure, you want to delete this");
      if (!response) return;
      await deleteFaq(id);
      setFaqsData((d) => [...d.filter((f) => f.id !== id)]);
    } catch (error) {
      alert("something went wrong");
    }
  };

  if (!data.length) {
    return (
      <div className="loader">
        <h3>No Faqs added yet.</h3>
      </div>
    );
  }

  return (
    <div className="faqs_card_wrapper">
      {data.map((val, index) => {
        return (
          <div key={index.toString()} className="card">
            <div className="faqs-card_header">
              <div className="icon edit" onClick={() => setEditData(val)}>
                <EditIcon />
                <span>Edit</span>
              </div>
              <div className="icon" onClick={() => handleDelete(val.id)}>
                <DeleteIcon />
                <span>Delete</span>
              </div>
            </div>
            <h3>Q. {val.question}</h3>
            <p>Ans. {val.answer}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Details;
