import { Form, Formik } from "formik";
import React, { useState } from "react";

import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { Button, TextField } from "../../../components";
import { faqValidationSchema } from "../../../helpers/validationSchema";
import { createFaq, updateFaq } from "../../../api";
import { IFaqs } from "../../../constants/types";

interface IAddFaq {
  setEditData: React.Dispatch<React.SetStateAction<IFaqs | null>>;
  setFaqsData: React.Dispatch<React.SetStateAction<IFaqs[]>>;
  editData: IFaqs | null;
}

const initialState = {
  question: "",
  answer: "",
};

const AddFaq: React.FC<IAddFaq> = ({ setFaqsData, editData, setEditData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, formValues) => {
    try {
      setLoading(true);
      if (editData) {
        const {
          data: { data },
        } = await updateFaq(values.id, values);
        setFaqsData((d) => {
          const newData = [...d];
          const index = d.findIndex((f) => f.id === values.id);
          newData[index] = data;
          return [...newData];
        });
        setEditData(null);
        setOpen(false);
      } else {
        const {
          data: { data },
        } = await createFaq(values);
        setFaqsData((d) => [...d, data]);
        setOpen(false);
      }
      formValues.resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="faqs_header">
        <Button
          variant="secondary"
          disabled={loading}
          onClick={() => setOpen((o) => !o)}
        >
          <AddIcon />
          <span>Add Faq</span>
        </Button>
      </div>
      {(editData || open) && (
        <Formik
          onSubmit={handleSubmit}
          validationSchema={faqValidationSchema}
          initialValues={editData || initialState}
          enableReinitialize
        >
          {() => (
            <Form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                onClick={() => {
                  setEditData(null);
                  setOpen(false);
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
              <TextField
                label="Question"
                name="question"
                placeholder="type your question"
              />
              <TextField
                label="Answer"
                name="answer"
                placeholder="type your answer"
              />
              <Button type="submit" disabled={loading}>
                {editData ? "Edit" : "Add"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddFaq;
