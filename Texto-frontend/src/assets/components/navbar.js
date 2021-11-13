import React from "react";
import Texto from "../image/Texto.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container align-item-center px-4">
        <a className="navbar-brand" href="#">
          <img src={Texto} style={{ height: "60px", width: "100px" }} />
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="navbar-collapse justify-content-end collapse"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav w-50 justify-content-end">
            <Link className="nav-link active mx-2" aria-current="page" to="/">
              Home
            </Link>
            <a className="nav-link mx-2" href="#Aboutus">
              About Us
            </a>
            <Link className="nav-link mx-2" to="/saved">
              Savedtext
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
