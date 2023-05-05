import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components";

import { IAdminDashboard } from "../../../constants/types";

const Details: React.FC<{
  data: IAdminDashboard;
  refetch: () => Promise<void>;
}> = ({ data }) => {
  return (
    <div className="dashboard">
      <div className="mx pad">
        <div className="dashboard_form">
          <div className="dashboard_form-field">
            <label>Email</label>
            <p>{data.primary_mail}</p>
            <div className="flex-end">
              <Link to="/admin/update-email">
                <Button>Update</Button>
              </Link>
            </div>
          </div>
          <div className="dashboard_form-field">
            <label>Token sale countdown</label>
            <p>{`${new Date(data.token_sale_countdown)}`}</p>
            <div className="flex-end">
              <Link to="/admin/update-timer">
                <Button>Update</Button>
              </Link>
            </div>
          </div>
          <div className="dashboard_form-field">
            {data.whitepaper_url ? (
              <a
                href={data.whitepaper_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here to view Whitepaper
              </a>
            ) : (
              <p>Whitepaper is not updated yet.</p>
            )}
            <div className="flex-end">
              <Link to="/admin/update-whitepaper">
                <Button>Update</Button>
              </Link>
            </div>
          </div>
          <div className="dashboard_form-field">
            <label>Announcements</label>
            <img
              className="announcements_image"
              src={data.announcements.image_url}
              alt="announcements"
            />
            <p>
              Display on home page -{" "}
              {data.announcements.display ? "True" : "False"}
            </p>
            <div className="flex-end">
              <Link to="/admin/update-announcements">
                <Button>Update</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
