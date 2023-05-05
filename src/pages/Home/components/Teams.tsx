import React from "react";

import Carousel from "../../../components/Carousel";
import useGetTeams from "../../../hooks/useGetTeams";

const Teams: React.FC = () => {
  const { data, isLoading, error } = useGetTeams();

  if (!data.length || isLoading || error) return null;

  return (
    <section id="team" className="teams" style={{ marginBottom: 0 }}>
      <div className="mx pad">
        <div className="teams_container" data-aos="slide-up">
          <div className="content">
            <h1 className="mb-30">
              Our Tea<span className="color-primary">m</span>
            </h1>
            <Carousel>
              {data.map((val, index) => {
                return (
                  <div key={index.toString()} className="team_card">
                    <div className="team_card-image">
                      <img src={val.avatar} alt="member" />
                    </div>
                    <div>
                      <h3>{val.name}</h3>
                      <p style={{ color: "#c28a24" }}>{val.role}</p>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teams;
