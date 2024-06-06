import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="mx-36 my-7">
        <section className="flex justify-between items-center  flex-col md:flex-row">
          <div className="text-[#252B42]  font-extrabold text-lg md:mb-0 mb-4 md:self-auto self-start">
            rhea.
          </div>
          <div className="flex space-x-4 pr-10 py-5 md:pr-10 ">
            <a href="#" className="text-[#23A6F0] ">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="#" className="text-[#23A6F0] ">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="#" className="text-[#23A6F0]">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>
        </section>
        <hr className="w-full py-5" />
        <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-x-0">
          <div className="flex flex-col  ">
            <h3 className="text-[#252B42] font-bold text-base py-7 ">
              Company Info
            </h3>
            <ul className="text-[#737373] font-bold text-sm space-y-4 ">
              <li href="">About Us</li>
              <li href="">Carrier</li>
              <li href="">We are hiring</li>
              <li href="">Blog</li>
            </ul>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-[#252B42] font-bold text-base py-7 ">Legal</h3>
            <ul className="text-[#737373] font-bold text-sm space-y-4 ">
              <li href="">About Us</li>
              <li href="">Carrier</li>
              <li href="">We are hiring</li>
              <li href="">Blog</li>
            </ul>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-[#252B42] font-bold text-base py-7 ">Legal</h3>
            <ul className="text-[#737373] font-bold text-sm space-y-7 ">
              <li href="">Bussiness Marketings</li>
              <li href="">User Analytic</li>
              <li href="">Live Chat</li>
              <li href="">Unlimited Support</li>
            </ul>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-[#252B42] font-bold text-base py-7 ">
              Resources
            </h3>
            <ul className="text-[#737373] font-bold text-sm space-y-4 ">
              <li href="">IOS & Android</li>
              <li href="">Watch a Demo</li>
              <li href="">Customers</li>
              <li href="">API</li>
            </ul>
          </div>
          <form className="flex flex-col ">
            <h3 className="text-[#252B42] font-bold text-base py-7 ">
              Get In Touch
            </h3>
            <section className="flex">
              <input
                type="text"
                placeholder="Your Email"
                className="bg-[#E6E6E6] rounded-l-md py-3.5 px-3"
              />
              <button className="bg-[#23A6F0] py-3.5 rounded-r-md px-3  ">
                Subscribe
              </button>
            </section>
          </form>
        </div>
      </div>

      <div className="text-[#737373] font-bold pl-36 bg-[#FAFAFA] text-sm py-6 flex flex-col w-full pt-8 ">
        <p>Made With Love By Figmaland All Right Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
