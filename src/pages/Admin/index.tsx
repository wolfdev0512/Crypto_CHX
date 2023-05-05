import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import "./Admin.scss";
import Faqs from "./Faqs";
import Videos from "./Videos";
import Dashboard from "./Dashboard";
import { Header } from "../../components";
import UpdateEmail from "./UpdateEmail";
import UpdateTimer from "./UpdateTimer";
import UpdateWhitePaper from "./UpdateWhitePaper";
import { adminLinks } from "../../data/links";
import useGetDashboardData from "../../hooks/useGetDashboard";
import Announcement from "./Announcements";
import Teams from "./Teams";
import UpdateDocs from "./UpdateDocs";

const Admin: React.FC = () => {
  const { isLoading, error, data, refetch } = useGetDashboardData();

  if (isLoading)
    return (
      <div className="mx pad">
        <div className="loader">
          <h3>Loading...</h3>
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

  if (!data)
    return (
      <div className="mx pad">
        <div className="loader">
          <p>something went wrong</p>
        </div>
      </div>
    );

  return (
    <div className="admin">
      <Header />
      <div className="mx pad">
        <div className="admin_navlinks">
          {adminLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard data={data} refetch={refetch} />} />
        <Route
          path="/update-email"
          element={
            <UpdateEmail primary_mail={data.primary_mail} refetch={refetch} />
          }
        />
        <Route
          path="/update-timer"
          element={
            <UpdateTimer
              token_sale_countdown={data.token_sale_countdown}
              refetch={refetch}
            />
          }
        />
        <Route
          path="/update-whitepaper"
          element={
            <UpdateWhitePaper
              whitepaper_url={data.whitepaper_url}
              refetch={refetch}
            />
          }
        />
        <Route
          path="/update-docs-url"
          element={<UpdateDocs docs_url={data.docs_url} refetch={refetch} />}
        />
        <Route
          path="/update-announcements"
          element={
            <Announcement
              announcements={data.announcements}
              refetch={refetch}
            />
          }
        />
        <Route path="/videos" element={<Videos />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route
          path="/teams"
          element={
            <Teams
              display_team_section={data.display_team_section}
              refetch={refetch}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Admin;
