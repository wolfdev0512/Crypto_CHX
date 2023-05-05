import React, { FormEvent, useState } from "react";

import "./Footer.scss";

import logo from "../../assets/logo/logo_text.png";
import { footerQuickLinks } from "../../data/links";
import Button from "../Button";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };

  const renderQuickLinks = (
    <div className="footer_quick_links">
      <h3 className="mb-30" data-aos="fade-up">
        Quick links
      </h3>
      <div>
        {footerQuickLinks.map(({ label, to }, index) => (
          <a key={index.toString()} href={`${to}`}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );

  const renderNewsletter = (
    <div className="footer_newsletter">
      <h3 className="mb-30" data-aos="fade-up">
        NEWSLETTERS
      </h3>
      <p>
        By subscribing to our mailing list you will always be update with the
        latest news from us.
      </p>
      <form className="footer_newsletter-form mt-20" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );

  return (
    <>
      <div className="footer">
        <div className="mx pad">
          <footer>
            <div className="logo">
              <img src={logo} alt="ChainedX logo" data-aos="fade-up" />
              <p>
                ChainedX stands firmly in support of financial freedow and thhe
                liberty that bitcoin provides globally for anyone to voluntarily
                participate in a permissionless and decentralized network.
              </p>
            </div>
            {renderQuickLinks}
            {renderNewsletter}
          </footer>
        </div>
      </div>
      <div className="copyrights">
        <div className="mx pad">
          <p>Copyright 2018 All Rights Reserved.</p>
          <div>
            <a href="/privacy_policy" target="_blank" rel="noopener noreferrer">
              Privacy policy
            </a>
            <a href="/privacy_policy" target="_blank" rel="noopener noreferrer">
              Terms &#38; Conditions
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Footer);
