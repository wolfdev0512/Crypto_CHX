import React from "react";

import { Button } from "../../../components";

import works_illustration from "../../../assets/images/howitworks.png";
import { ReactComponent as RightArrow } from "../../../assets/icons/right_arrow.svg";
import { ReactComponent as Download } from "../../../assets/icons/download.svg";
import { ReactComponent as Cart } from "../../../assets/icons/cart.svg";
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";
import { ReactComponent as Interface } from "../../../assets/icons/interface.svg";

const HowItWorks: React.FC = () => {
  return (
    <section id="how_it_work" className="works" style={{ marginBottom: 0 }}>
      <div className="mx pad">
        <div className="works_container" data-aos="fade-up">
          <div className="content">
            <h1 className="mb-30">
              How it Works<span className="color-primary">?</span>
            </h1>
            <p className="mb-20">
              Bitcoin Mining is a peer-to-peer computer process used to secure
              and verify bitcoin transactions-ayments from one user to another
              on a decentralized network.
            </p>
            <Button>
              <span>Let’s Start</span>
              <RightArrow />
            </Button>
          </div>
          <div className="abstract">
            <img src={works_illustration} alt="works chainedx illsutration" />
          </div>
        </div>
        <div className="works_stats_grid">
          <div data-aos="fade-up">
            <section className="mb-10">
              <Download />
              <b>Download a Wallet</b>
            </section>
            <p>
              Bitcoin Mining is a peer-to-peer computer process used to secure
              and verify bitcoin transactions-ayments from one user to another
              on a decentralized network.
            </p>
          </div>
          <div data-aos="fade-up">
            <section className="mb-10">
              <Lock />
              <b>Safe & Secure</b>
            </section>
            <p>
              Bitcoin Mining is a peer-to-peer computer process used to secure
              and verify bitcoin transactions-ayments from one user to another
              on a decentralized network.
            </p>
          </div>
          <div data-aos="fade-up">
            <section className="mb-10">
              <Cart />
              <b>Buy & Sell</b>
            </section>
            <p>
              Bitcoin Mining is a peer-to-peer computer process used to secure
              and verify bitcoin transactions-ayments from one user to another
              on a decentralized network.
            </p>
          </div>
          <div data-aos="fade-up">
            <section className="mb-10">
              <Interface />
              <b>A Better User Interface</b>
            </section>
            <p>
              Bitcoin Mining is a peer-to-peer computer process used to secure
              and verify bitcoin transactions-ayments from one user to another
              on a decentralized network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
