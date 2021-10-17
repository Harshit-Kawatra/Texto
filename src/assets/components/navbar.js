import React from 'react'
import Texto from "../image/Texto.png";
const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container align-item-center px-4">
          <a class="navbar-brand" href="#">
            <img src={Texto} style={{ height: "60px", width: "100px" }} />
          </a>
          <button
            class="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="navbar-collapse justify-content-end collapse"
            id="navbarNavAltMarkup"
          >
            <div class="navbar-nav w-50 justify-content-end">
              <a class="nav-link active mx-2" aria-current="page" href="#">
                Home
              </a>
              <a class="nav-link mx-2" href="#Aboutus">
                About Us
              </a>
              <a class="nav-link mx-2" href="/saved">
                Reach Us
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar
