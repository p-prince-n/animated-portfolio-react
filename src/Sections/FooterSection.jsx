import React from "react";
import { socialImgs } from "../constants";

const FooterSection = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center md:items-start items-center ">
          <a href="/">Visit My Blogs</a>
        </div>
        <div className="socials">
          {socialImgs.map((img, idx) => (
            <a className="icon" target="_blank" href={img.url} key={idx} >
              <img src={img.imgPath} alt={img.name} />
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center  ">
            <p className="text-center md:text-end">
                © {new Date().getFullYear()} Prince | P. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
