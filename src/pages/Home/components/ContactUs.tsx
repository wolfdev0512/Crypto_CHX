import React, { ChangeEvent, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";

import { Button } from "../../../components";
import { ReactComponent as Location } from "../../../assets/icons/location.svg";
import { ReactComponent as Phone } from "../../../assets/icons/phone.svg";
import { ReactComponent as Mail } from "../../../assets/icons/mail.svg";
import { ReactComponent as Facebook } from "../../../assets/icons/facebook.svg";
import { ReactComponent as Linkedin } from "../../../assets/icons/linkedin.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Google } from "../../../assets/icons/google.svg";
import { ReactComponent as Pinterest } from "../../../assets/icons/pinterest.svg";
import useGetAdminData from "../../../hooks/useGetAdminData";

const initialState = {
  username: "",
  email: "",
  subject: "",
  message: "",
};

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState(initialState);
  const { primary_mail } = useGetAdminData();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !primary_mail)
      return alert("something went wrong");

    const formValues = { ...formData, admin_mail: primary_mail };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formValues, PUBLIC_KEY).then(
      (result) => {
        setFormData(initialState);
        alert("we've received your message.we'll get back to you soon.");
        setLoading(false);
      },
      (error) => {
        console.log(error.text);
        setLoading(false);
      }
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id="contact" className="contactus">
      <div className="max pad">
        <div className="contactus_container">
          <div className="contact_info" data-aos="flip-up">
            <h1 className="mb-50">
              Contact with <span className="color-primary">us</span>
            </h1>
            <div className="contact_info_block">
              <p className="mb-50">
                Our office is located in abeutiful building and garden and fast
                growing city.
              </p>
              <div className="social_info_wrapper">
                <div className="social_info">
                  <p>
                    <Location />
                    <b>Address</b>
                  </p>
                  <p>
                    22 International Division
                    <br />
                    ViaG.B. Pirelli
                  </p>
                </div>
                <div className="social_info">
                  <p>
                    <Phone />
                    <b>Phone</b>
                  </p>
                  <p>+23 0123 4567</p>
                </div>
                <div className="social_info">
                  <p>
                    <Mail />
                    <b>EMAIL-ID</b>
                  </p>
                  <p>Yourmail@mail.com</p>
                </div>
                <div className="social_info">
                  <p>
                    <b>FOLLOW US</b>
                  </p>
                  <div>
                    <a href="/">
                      <Facebook />
                    </a>
                    <a href="/">
                      <Linkedin />
                    </a>
                    <a href="/">
                      <Pinterest />
                    </a>
                    <a href="/">
                      <Google />
                    </a>
                    <a href="/">
                      <Twitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact_form" data-aos="flip-down">
            <h1 className="mb-50">
              Leave a Messag<span className="color-primary">e</span>
            </h1>
            <div className="contact_form_block">
              <form onSubmit={handleSubmit}>
                <div className="form_input">
                  <label htmlFor="username">Enter Name*</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form_input">
                  <label htmlFor="email">Enter Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form_input">
                  <label htmlFor="subject">Enter Subject*</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form_input">
                  <label htmlFor="message">Message*</label>
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button disabled={loading}>Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
