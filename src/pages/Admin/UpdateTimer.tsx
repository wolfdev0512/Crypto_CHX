import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { Button, TextField } from "../../components";
import { countdownValidationSchemaa } from "../../helpers/validationSchema";
import { updateDashboardAPi } from "../../api";
import { IAdminDashboard } from "../../constants/types";

const UpdateTimer: React.FC<{
  token_sale_countdown: IAdminDashboard["token_sale_countdown"];
  refetch: () => Promise<void>;
}> = ({ token_sale_countdown, refetch }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCountdownSubmit = async (values) => {
    try {
      setLoading(true);
      await updateDashboardAPi(values);
      alert("countdown updated successfully");
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
            initialValues={{
              token_sale_countdown: token_sale_countdown
                .toString()
                .split(".")[0],
            }}
            validationSchema={countdownValidationSchemaa}
            onSubmit={handleCountdownSubmit}
            enableReinitialize
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <div>
                  <h4
                    className="mb-20"
                    style={{ fontSize: "16px" }}
                  >{`${new Date(token_sale_countdown)}`}</h4>
                </div>
                <TextField
                  type={"datetime-local"}
                  name="token_sale_countdown"
                  label={`Token Sale Countdown`}
                />
                <div className="mt-20">
                  <Button
                    type="submit"
                    disabled={isSubmitting || loading || !isValid}
                  >
                    Update Countdown
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

export default UpdateTimer;
