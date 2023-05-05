import React from "react";

const Stats: React.FC = () => {
  return (
    <section className="stats">
      <div className="mx pad">
        <div className="stats_container">
          <div className="stats_card" data-aos="flip-up" data-aos-delay="0">
            <div className="stats_card_background"></div>
            <h3>$4M</h3>
            <p>Soft Cap</p>
          </div>
          <div className="stats_card" data-aos="flip-up" data-aos-delay="50">
            <div className="stats_card_background"></div>
            <h3>$4M</h3>
            <p>Hard Cap</p>
          </div>
          <div className="stats_card" data-aos="flip-up" data-aos-delay="100">
            <div className="stats_card_background"></div>
            <h3>46,000</h3>
            <p>Investors</p>
          </div>
          <div className="stats_card" data-aos="flip-up" data-aos-delay="150">
            <div className="stats_card_background"></div>
            <h3>4.1/5</h3>
            <p>ICO Track</p>
          </div>
          <div className="stats_card" data-aos="flip-up" data-aos-delay="200">
            <div className="stats_card_background"></div>
            <h3>4.1/5</h3>
            <p>ICO Ranker</p>
          </div>
          <div className="stats_card" data-aos="flip-up" data-aos-delay="250">
            <div className="stats_card_background"></div>
            <h3>4.1/5</h3>
            <p>ICO Holder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
