import React from "react";

import about from "../../../assets/images/about.png";

const About: React.FC = () => {
  return (
    <section id="about" className="about" data-aos="fade-up">
      <div className="mx pad">
        <div className="about_container">
          <div className="abstract">
            <img src={about} alt="about chainedx illsutration" />
          </div>
          <div className="content">
            <h1 className="mb-30">
              About Chained<span className="color-primary">X</span>
            </h1>
            <p className="mb-20">
              ChainedX is one of thhe most transformative techhnologies since
              the invention of the Internet. ChainedX stands firmly in support
              of financial freedom and the liberty that Bitcoin provides
              globally for anyone to voluntarily participate in a permissionless
              and decentralized work.
            </p>
            <p>
              Which empowers people to not be marginalized by governments and
              financial institutions. Bitcoin is freedom. If you are going to
              use a passage of Loreum Ipsum, you need to be sure there isn’t
              anything embarrassing hidden in the middle of the text.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
