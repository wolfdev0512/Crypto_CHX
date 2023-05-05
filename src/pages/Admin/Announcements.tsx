import React from "react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components";
import { updateDashboardAPi } from "../../api";
import { IAdminDashboard } from "../../constants/types";
import { setSize } from "../../helpers/utils";
import { ReactComponent as DeleteIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as Gallery } from "../../assets/icons/gallery.svg";
import { announcementValidationSchemaa } from "../../helpers/validationSchema";

const initialState = {
  title: "",
  description: "",
  image_url: "",
};

const Announcement: React.FC<{
  announcements: IAdminDashboard["announcements"];
  refetch: () => Promise<void>;
}> = ({ announcements, refetch }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await updateDashboardAPi({ announcements: { ...values } });
      alert("announcement updated successfully");
      refetch();
      navigate("/admin/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx pad">
      <div className="dashboard">
        <div className="dashboard_form annoucements_form">
          <Formik
            initialValues={announcements || initialState}
            validationSchema={announcementValidationSchemaa}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue, errors, values }) => (
              <Form>
                <div>
                  {values.image_url ? (
                    <div className="file_image">
                      <img src={values.image_url} alt="announcement" />
                      <div
                        className="clear_image mt-10"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setFieldValue("image_url", "");
                          setFieldValue("image_url", "");
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  ) : (
                    <div className="file_input">
                      <label htmlFor="file">
                        <div>
                          <Gallery />
                          <p>supported formats PNG,JPEG,JPG,SVG and WEBP</p>
                          {errors.image_url && (
                            <div className="error_input">
                              {errors.image_url}
                            </div>
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
                            setFieldValue("image_url", event.target?.result);
                          };
                        }}
                      />
                    </div>
                  )}
                </div>
                {/* <TextField name="title" label="Title" />
            <TextField name="description" label="Description" /> */}
                <div
                  className="mt-10 mb-10"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Field type="checkbox" name="display" />
                  <span className="ml-10" style={{ fontSize: "1.6rem" }}>
                    Display on home page
                  </span>
                </div>
                <div className="mt-20">
                  <Button type="submit" disabled={isSubmitting}>
                    Update Announcement
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
