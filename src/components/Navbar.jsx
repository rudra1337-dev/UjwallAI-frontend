import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export function Navbar() {
  return (
    <>
      <nav className="navbar navbar-dark fixed-top navbar-expand-lg solar-navbar">
        <div className="container">
          {/* 🔆 Brand Name */}
          <Link className="navbar-brand glow-brand" to="/">
            ☀️ Solar Tracker
          </Link>

          {/* 🔹 Offcanvas Toggler (Visible only on small screens) */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* 🔹 Offcanvas Menu - for small screens */}
          <div
            className="offcanvas offcanvas-end text-bg-dark d-lg-none"
            tabIndex="-1"
            id="offcanvasMenu"
            aria-labelledby="offcanvasMenuLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasMenuLabel">
                ⚙️ Menu
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 text-center">
                <li className="nav-item">
                  <Link className="nav-link active" to="/" data-bs-dismiss="offcanvas">
                    🏠 Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/history" data-bs-dismiss="offcanvas">
                    📊 History
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 🔹 Desktop Menu (Visible on large screens) */}
          <div className="collapse navbar-collapse justify-content-end d-none d-lg-block">
            <ul className="navbar-nav flex-row gap-4">
              <li className="nav-item">
                <Link className="nav-link active nav-glow" to="/">
                  🏠 Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-glow" to="/history">
                  📊 History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
