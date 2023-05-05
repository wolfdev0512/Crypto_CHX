import React, { useEffect, useState } from "react";

import "./Faqs.scss";
import Details from "./Details";
import useGetFaqs from "../../../hooks/useGetFaqs";
import AddFaq from "./AddFaq";
import { IFaqs } from "../../../constants/types";

const Faqs: React.FC = () => {
  const { isLoading, error, data } = useGetFaqs();
  const [faqsData, setFaqsData] = useState<IFaqs[]>([]);
  const [editData, setEditData] = useState<IFaqs | null>(null);

  useEffect(() => {
    setFaqsData(data);
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
        <h1 className="mb-30">Frequently asked question</h1>
        <AddFaq
          setFaqsData={setFaqsData}
          editData={editData}
          setEditData={setEditData}
        />
        <Details
          data={faqsData}
          setFaqsData={setFaqsData}
          setEditData={setEditData}
        />
      </div>
    </div>
  );
};

export default Faqs;
