import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Button, TextField } from "../../components";
import { updateDashboardAPi } from "../../api";

const UpdateDocs: React.FC<{
  docs_url: string;
  refetch: () => Promise<void>;
}> = ({ docs_url, refetch }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDocsSubmit = async (values) => {
    try {
      setLoading(true);
      await updateDashboardAPi(values);
      alert("docs url updated successfully");
      refetch();
      navigate("/admin/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="mx pad">
        <div className="dashboard_form">
          <Formik
            initialValues={{ docs_url }}
            validationSchema={Yup.object({
              docs_url: Yup.string().url("invalid url"),
            })}
            onSubmit={handleDocsSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <TextField
                  name="docs_url"
                  label="Docs url"
                  placeholder="https://docs_url.com"
                />
                <div className="mt-20">
                  <Button type="submit" disabled={isSubmitting || loading}>
                    Update Docs
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

export default UpdateDocs;
