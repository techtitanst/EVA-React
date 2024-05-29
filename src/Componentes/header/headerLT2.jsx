import Logo from "../../assets/img/logo EVA.webp";
import { toggleBlackMode } from "../../assets/js/toggleBlackMode";
const HeaderLT2 = () => {
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg m-2 mb-3" id="nav-Claro">
        <div className="container-fluid">
          <div className="row w-100">
            <div className="col-4 col-md-6 col-lg-6 d-flex text-center align-items-center">
              <button
                className="d-lg-none d-block bg-transparent"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i id="icono" className="fa-solid fa-bars"></i>
              </button>
              <a className="" href="./index.php">
                <img id="logo" src={Logo} alt="" />
              </a>
            </div>
            <div className="col-8 col-md-6 col-lg-6 d-flex align-items-center justify-content-end">
              <i
                id="icono"
                className="fa-regular fa-moon me-2 luna"
                onClick={toggleBlackMode}
              ></i>
              {/* [//? Modo oscuro] */}
              <i id="icono" className="fa-regular fa-bell me-2"></i>
              <div className="vr fw-bold ms-2 me-2"></div>
              <i id="iconoDegradado" className="fa-solid fa-circle me-2"></i>
              <span className="ps-2 align-items-center">
                <p id="nombreUsuario" className="fw-bold m-0"></p>
                {/* [//?Nombre de usuario] */}
                Nombre de usuario
              </span>
            </div>
            <div
              className="col-1 col-md-1 col-lg-1 d-lg-none collapse  navbar-collapse"
              id="navbarNav"
              style={{ border: "none" }}
            >
              <div id="div_ul" className="d-lg-none mt-3">
                <ul className="p-2">
                  <li className="nav-item">
                    <a
                      className="nav-link tooltip-container"
                      href="./index.php"
                    >
                      <i id="iconoDegradado" className="fa-solid fa-house"></i>
                    </a>
                  </li>
                  <br />
                  <li className="nav-item dropdown">
                    <a
                      className="dropdown-toggle nav-link link-dark"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i id="iconoDegradado" className="fa-solid fa-gear"></i>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <button
                          className=" btn btn-primary dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#modalManageUser"
                        >
                          Gestionar cuentas
                        </button>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="ajax.php?action=logout"
                        >
                          Cerrar sesión
                        </a>
                      </li>{" "}
                      [//! Cerrar sesion]
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderLT2;
