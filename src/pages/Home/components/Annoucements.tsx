import React, { useEffect, useState } from "react";

import Modal from "../../../components/Modals/Modal";
import useGetAdminData from "../../../hooks/useGetAdminData";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";

const AnnoucementModal: React.FC<{ open: boolean }> = ({ open }) => {
  const { announcements } = useGetAdminData();
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
    sessionStorage.setItem("announcement", JSON.stringify(true));
  };

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setOpenModal(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return (
    <Modal
      handleClose={handleClose}
      isOpen={openModal}
      className="announcement_modal"
    >
      <div
        className="announcement_modal-content"
        // style={{ backgroundImage: `url(${announcements.image_url})` }}
      >
        <div className="close" onClick={handleClose}>
          <CloseIcon />
        </div>
        <div className="image">
          <img src={announcements.image_url} alt="announcement" />
        </div>
        {/* <h1>{announcements.title}</h1>
        <p>{announcements.description}</p> */}
      </div>
    </Modal>
  );
};

const Annoucements: React.FC = () => {
  const { isLoading, announcements } = useGetAdminData();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const value = sessionStorage.getItem("announcement");
    if (value) {
      const view = JSON.parse(value);
      if (view === true) return setOpen(false);
    }
    return setOpen(true);
  }, []);

  if (isLoading || !open || !announcements.display) return null;

  return <AnnoucementModal open={open} />;
};

export default Annoucements;
