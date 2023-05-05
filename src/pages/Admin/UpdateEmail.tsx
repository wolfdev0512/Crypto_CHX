import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { Button, TextField } from "../../components";
import { emailValidationSchemaa } from "../../helpers/validationSchema";
import { updateDashboardAPi } from "../../api";

const UpdateEmail: React.FC<{
  primary_mail: string;
  refetch: () => Promise<void>;
}> = ({ primary_mail, refetch }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (values) => {
    try {
      setLoading(true);
      await updateDashboardAPi(values);
      alert("email updated successfully");
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
            initialValues={{ primary_mail }}
            validationSchema={emailValidationSchemaa}
            onSubmit={handleEmailSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <TextField name="primary_mail" label="Email" />
                <div className="mt-20">
                  <Button type="submit" disabled={isSubmitting || loading}>
                    Update Email
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

export default UpdateEmail;
