import React, { useEffect, useState } from "react";

import "./Header.scss";

import logo from "../../assets/logo/logo_text.png";
import { ReactComponent as Menu } from "../../assets/icons/bars.svg";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetAdminData from "../../hooks/useGetAdminData";

const navLink = [
  { name: "Home", link: "#home" },
  { name: "about", link: "#about" },
  { name: "how it work", link: "#how_it_work" },
  { name: "token", link: "#token" },
  { name: "roadmap", link: "#roadmap" },
  { name: "team", link: "#team" },
  { name: "faq", link: "#faq" },
  { name: "contact", link: "#contact" },
];

const Header: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { docs_url } = useGetAdminData();

  useEffect(() => {
    setSidebar(false);
  }, [location.hash]);

  const renderNavlinks = (
    <ul className="navlinks">
      {navLink.map((routes, index) => (
        <li key={index.toString()}>
          <a href={routes.link}>{routes.name}</a>
        </li>
      ))}
      {docs_url !== "" && (
        <li>
          <a href={docs_url} target="_blank" rel="noopener noreferrer">
            Docs
          </a>
        </li>
      )}
    </ul>
  );

  const renderLaunchApp = (
    <div className="launch_link">
      <Button onClick={() => { navigate('/app') }}>
        Launch App
      </Button>
    </div>
  );

  return (
    <AnimatePresence>
      <div className="mx pad">
        <header className="header">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="ChainedX logo" />
            </Link>
          </div>
          {renderNavlinks}
          {renderLaunchApp}
          <div
            className={sidebar ? "header_menu active" : "header_menu"}
            onClick={() => setSidebar((s) => !s)}
          >
            <Menu />
          </div>
        </header>
        {sidebar && (
          <motion.nav
            className="sidebar"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {renderNavlinks}
            {renderLaunchApp}
          </motion.nav>
        )}
      </div>
    </AnimatePresence>
  );
};

export default React.memo(Header);
