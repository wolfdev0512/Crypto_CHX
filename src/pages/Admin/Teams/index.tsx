import React, { useEffect, useState } from "react";

import "./Teams.scss";
import Details from "./Details";
import AddTeam from "./AddTeam";
import { IAdminDashboard, ITeams } from "../../../constants/types";
import useGetTeams from "../../../hooks/useGetTeams";
import { updateDashboardAPi } from "../../../api";
import { Field, Form, Formik } from "formik";
import { Button } from "../../../components";
import { teamValidationSchemaa } from "../../../helpers/validationSchema";

const Teams: React.FC<{
  display_team_section: IAdminDashboard["display_team_section"];
  refetch: () => Promise<void>;
}> = ({ display_team_section, refetch }) => {
  const { isLoading, error, data } = useGetTeams();
  const [teamsData, setTeamsData] = useState<ITeams[]>([]);
  const [editData, setEditData] = useState<ITeams | null>(null);

  useEffect(() => {
    setTeamsData(data);
  }, [data]);

  const handleTeamSection = async (values, actions) => {
    await updateDashboardAPi(values);
    alert("Team section updated successfully");
    actions.setSubmitting(false);
    refetch();
  };

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
    <div className="teams_details pt-30 pb-30">
      <div className="mx pad">
        <h1 className="mb-30">Teams Section</h1>
        <Formik
          enableReinitialize
          initialValues={
            { display_team_section } || {
              display_team_section: false,
            }
          }
          validationSchema={teamValidationSchemaa}
          onSubmit={handleTeamSection}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div
                className="mb-20"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Field type="checkbox" name="display_team_section" />
                <span className="ml-10" style={{ fontSize: "1.6rem" }}>
                  Display Team section -{" "}
                  {values.display_team_section ? "True" : "False"}
                </span>
              </div>
              <Button disabled={isSubmitting}>Update Team section</Button>
            </Form>
          )}
        </Formik>
        <AddTeam
          setTeamsData={setTeamsData}
          editData={editData}
          setEditData={setEditData}
        />
        <Details
          data={teamsData}
          setTeamsData={setTeamsData}
          setEditData={setEditData}
        />
      </div>
    </div>
  );
};

export default Teams;
