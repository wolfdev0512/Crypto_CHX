import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

import { Button } from "../../../components";

import { ReactComponent as FileIcon } from "../../../assets/icons/file.svg";
import { ReactComponent as RingIcon } from "../../../assets/icons/ring.svg";
import miner from "../../../assets/images/miner.png";
import { APP_URL } from "../../../constants/api";
import useGetAdminData from "../../../hooks/useGetAdminData";
import { Link } from "react-router-dom";

const timerList = ["days", "hours", "minutes", "seconds"];

const Hero: React.FC = () => {
  const [percentage, setPercentage] = useState(0);
  const { token_sale_countdown, whitepaper_url } = useGetAdminData();

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
    <div className="mx pad">
      <div className="hero">
        <h1 className="mb-30" style={{ fontWeight: 500 }}>
          A <strong>DECENTRALIZED</strong> MEME TOKEN THAT EVOLVED INTO A
          VIBRANT ECOSYSTEM.
        </h1>
        <div className="timer_container" data-aos="zoom-in">
          <p>
            The mining starts immediately after confirmed payment. First payouts
            within <span className="color-primary">24 hours</span>.
          </p>
          <div className="flex_timer">
            <img src={miner} alt="hero abstraction" />
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
        <div className="hero_controls" data-aos="fade-zoom-in">
          {!whitepaper_url ? (
            <Link to="/whitepaper">
              <Button>
                <FileIcon />
                <span>Whitepaper</span>
              </Button>
            </Link>
          ) : (
            <a href={whitepaper_url} target="_blank" rel="noopener noreferrer">
              <Button>
                <FileIcon />
                <span>Whitepaper</span>
              </Button>
            </a>
          )}
          <a href={APP_URL}>
            <Button variant="secondary">
              <RingIcon />
              <span>Buy Token</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
