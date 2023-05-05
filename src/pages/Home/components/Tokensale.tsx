import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

import { ReactComponent as RightArrow } from "../../../assets/icons/right_arrow.svg";
import { Button } from "../../../components";
import { PieChart } from "react-minimal-pie-chart";
import { APP_URL } from "../../../constants/api";
import useGetAdminData from "../../../hooks/useGetAdminData";

const timerList = ["days", "hours", "minutes", "seconds"];

type IChartStats = {
  title: string;
  percentage: number;
  color: string;
};

const ChartStats: React.FC<IChartStats> = ({ title, percentage, color }) => {
  return (
    <div className="chart_stats-card">
      <section data-percentage={percentage}>
        <span
          style={{ backgroundColor: color, width: `${percentage}%` }}
        ></span>
      </section>
      <div>
        <p>{title}</p>
        <p>{percentage}%</p>
      </div>
    </div>
  );
};

const Tokensale: React.FC = () => {
  const [percentage, setPercentage] = useState(0);
  const { token_sale_countdown } = useGetAdminData();

  useEffect(() => {
    const timeout = setTimeout(() => setPercentage(50), 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <>
          {timerList.map((list, index) => (
            <div key={index}>
              <section>
                <h1>00</h1>
              </section>
              <p style={{ textTransform: "capitalize" }}>{list}</p>
            </div>
          ))}
        </>
      );
    } else {
      return (
        <>
          <div>
            <section>
              <h1>{days < 10 ? `0${days}` : days}</h1>
            </section>{" "}
            <p>DAYS</p>
          </div>
          <div>
            <section>
              <h1>{hours < 10 ? `0${hours}` : hours}</h1>
            </section>
            <p>HOURS</p>
          </div>
          <div>
            <section>
              <h1>{minutes < 10 ? `0${minutes}` : minutes}</h1>
            </section>
            <p>MINUTES</p>
          </div>
          <div>
            <section>
              <h1>{seconds < 10 ? `0${seconds}` : seconds}</h1>
            </section>
            <p>SECONDS</p>
          </div>
        </>
      );
    }
  };

  return (
    <div className="token_sale" id="token">
      <div className="mx pad">
        <div className="token_sale_container" data-aos="zoom-out">
          <h1 className="mb-10">
            Token Sal<span className="color-primary">e</span>
          </h1>
          <p className="mb-30">
            Join the industry leaders to discuss where the markets are heading.
            We accept token payments.
          </p>
          <div className="timer_container">
            <div className="flex_timer">
              <section>
                <div className="timer mb-30">
                  <Countdown date={token_sale_countdown} renderer={renderer} />
                </div>
                <div className="mb-10" data-position="flex-between">
                  <p>Sale Raised</p>
                  <p>Soft-caps</p>
                </div>
                <div className="progress_bar_wrapper">
                  <div
                    className="progress_bar"
                    style={{ width: `${percentage}%` }}
                    data-percentage={`${percentage}%`}
                  ></div>
                  <div className="progress_pointer" style={{ left: `${25}%` }}>
                    <div></div>
                    <p>46,000 BBC</p>
                  </div>
                  <div className="progress_pointer" style={{ left: `${75}%` }}>
                    <div></div>
                    <p>96,000 BBC</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <a href={APP_URL}>
            <Button>
              <span>Buy Token </span>
              <RightArrow />
            </Button>
          </a>
        </div>
        <div className="token_sale_proceeds" data-aos="zoom-in">
          <h1>
            Token Sale Proceed<span className="color-primary">s</span>
          </h1>
          <p className="mt-10 mb-30">
            Token sales are process of generating are selling cryptographically
            generated tokens.
          </p>
          <div className="charts_container">
            <div className="pie_chart">
              <PieChart
                style={{ width: "100%" }}
                data={[
                  { title: "Marketing & General", value: 10, color: "#75D067" },
                  { title: "Team & Advisors", value: 15, color: "#74F7FF" },
                  { title: "Pre-ICO", value: 20, color: "#CB77FF" },
                  {
                    title: "Platform Integration",
                    value: 20,
                    color: "#FF6060",
                  },
                  { title: "Mobile Ad Platform", value: 20, color: "#C38B25" },
                ]}
              />
            </div>
            <div className="chart_stats">
              <ChartStats
                title="Marketing & General"
                percentage={percentage}
                color="#75D067"
              />
              <ChartStats
                title="Team & Advisors"
                percentage={percentage}
                color="#74F7FF"
              />
              <ChartStats
                title="Pre-ICO"
                percentage={percentage}
                color="#CB77FF"
              />
              <ChartStats
                title="Platform Integration"
                percentage={percentage}
                color="#FF6060"
              />
              <ChartStats
                title="Mobile Ad Platform"
                percentage={percentage}
                color="#C38B25"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokensale;
