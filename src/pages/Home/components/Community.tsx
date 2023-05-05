import React, { useState } from "react";

import works_illustration from "../../../assets/images/community.svg";
import instagram from "../../../assets/icons/instagram.png";
import twitter from "../../../assets/icons/twitter.png";
import telegram from "../../../assets/icons/telegram.png";
import discord from "../../../assets/icons/discord.png";
import facebook from "../../../assets/icons/facebook.png";
import linkedin from "../../../assets/icons/linkedin.png";
import { ReactComponent as Copy } from "../../../assets/icons/copy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CONTRACT_ADDRESS = "0xc351155C80aCD043BD5F8FE7ffc8536af1fF9375";

const Community: React.FC = () => {
  const [copied, setCopied] = useState(false);

  return (
    <section className="works" style={{ marginBottom: 0 }}>
      <div className="mx pad">
        <div className="works_container" data-aos="slide-up">
          <div className="content">
            <h1 className="mb-30">
              Communit<span className="color-primary">y</span>
            </h1>
            <p className="mb-20">
              If you’d like to donate to the <strong>Devs</strong>, send{" "}
              <strong>ETH</strong>, <strong>SHIB</strong>,{" "}
              <strong>LEASH</strong>, or <strong>BONE</strong> here. Thank you
              for your support! WOOF!
            </p>
            <div className="clipboard">
              <a
                href={`https://bscscan.com/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p style={{ color: "#c28a24", textDecoration: "underline" }}>
                  {CONTRACT_ADDRESS}
                </p>
              </a>
              <CopyToClipboard
                text={CONTRACT_ADDRESS}
                onCopy={() => setCopied(true)}
              >
                <button>
                  <Copy />
                  <span>{!copied ? "Copy to clipboard" : "Copied"}</span>
                </button>
              </CopyToClipboard>
              <p>
                You can see all the end-to-end transactions about our token
                here.
              </p>
            </div>
            <p className="mb-20">
              Our community grows stronger every day. Please follow our social
              platforms to get the most up-to-date, accurate ChainedX
              information.
            </p>
            <p>
              Using the links below, you can join our various groups alongside
              the 1M+ other members of the ChainedXperts.
            </p>
          </div>
          <div className="abstract">
            <img src={works_illustration} alt="works chainedx illsutration" />
          </div>
        </div>
        <div className="community_links">
          <p className="color-primary">
            Click here to search for your preferred country!
          </p>
          <div>
            <a href="/" data-aos="fade-up">
              <img src={instagram} alt="instagram" />
            </a>
            <a href="/" data-aos="fade-up" data-aos-delay="150">
              <img src={linkedin} alt="linkedin" />
            </a>
            <a href="/" data-aos="fade-up" data-aos-delay="100">
              <img src={telegram} alt="telegram" />
            </a>
            <a href="/" data-aos="fade-up" data-aos-delay="50">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="/" data-aos="fade-up" data-aos-delay="150">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="/" data-aos="fade-up" data-aos-delay="150">
              <img src={discord} alt="discord" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
