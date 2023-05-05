import { Form, Formik } from "formik";
import React, { useState } from "react";

import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/trash.svg";
import { ReactComponent as Gallery } from "../../../assets/icons/gallery.svg";
import { Button, TextField } from "../../../components";
import { teamsValidationSchema } from "../../../helpers/validationSchema";
import { createTeam, updateTeam } from "../../../api";
import { ITeams } from "../../../constants/types";
import { setSize } from "../../../helpers/utils";

interface IAddTeam {
  setEditData: React.Dispatch<React.SetStateAction<ITeams | null>>;
  setTeamsData: React.Dispatch<React.SetStateAction<ITeams[]>>;
  editData: ITeams | null;
}

const initialState = {
  avatar: "",
  name: "",
  role: "",
};

const AddFaq: React.FC<IAddTeam> = ({
  setTeamsData,
  editData,
  setEditData,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, formValues) => {
    try {
      setLoading(true);
      if (editData) {
        const {
          data: { data },
        } = await updateTeam(values.id, values);
        setTeamsData((d) => {
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
        } = await createTeam(values);
        setTeamsData((d) => [...d, data]);
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
      <div className="teams_header">
        <Button
          variant="secondary"
          disabled={loading}
          onClick={() => setOpen((o) => !o)}
        >
          <AddIcon />
          <span>Add Team member</span>
        </Button>
      </div>
      {(editData || open) && (
        <Formik
          onSubmit={handleSubmit}
          validationSchema={teamsValidationSchema}
          initialValues={editData || initialState}
          enableReinitialize
        >
          {({ setFieldValue, values, errors }) => (
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
              {values.avatar ? (
                <div className="avatar">
                  <img src={values.avatar} alt="avatar" />
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setFieldValue("avatar", "")}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              ) : (
                <div className="file_input">
                  <label htmlFor="file">
                    <div>
                      <Gallery />
                      <p>supported format JPG,JPEG,PNG,SVG,WEBP</p>
                      {errors.avatar && (
                        <p style={{ color: "tomato" }}>{errors.avatar}</p>
                      )}
                    </div>
                  </label>
                  <input
                    id="file"
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg,.webp"
                    onChange={({ target }) => {
                      const file = target.files?.[0];
                      if (!file) {
                        alert("please select a file");
                        return;
                      }
                      if (file.size > setSize())
                        return alert("file size must be less than 5mb");

                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = (event) => {
                        setFieldValue("avatar", event.target?.result);
                      };
                    }}
                  />
                </div>
              )}
              <TextField label="Username" name="name" placeholder="John Doe" />
              <TextField
                label="Role"
                name="role"
                placeholder="Front end developer"
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
