import React from "react";

import { useSelector } from "react-redux";
import { Link, NavLink, useRouteMatch } from "react-router-dom";
import "./Header.css";

function Header(props) {
  const isLogin = useSelector((state) => state.login.isLogin);
  const userEmail = useSelector((state) => state.login.user.email);
  const userName = useSelector((state) => state.login.user.name);

  const showInfo = (isLogin, userEmail, userName) => {
    if (isLogin)
      return (
        <Link className="nav-link border rounded" to={`/profile/${userEmail}`}>
          <span style={{ fontFamily: "aria", textTransform: "none" }}>
            {userName}
          </span>
        </Link>
      );
    return (
      <Link className="nav-link border rounded" to="/login">
        <span>LOGIN</span>
      </Link>
    );
  };

  const menus = [
    { to: "/", exact: true, name: "Trang Chủ", category: "home" },
    { to: "/travel", exact: true, name: "Du Lịch", category: "travel" },
    { to: "/share", exact: true, name: "Chia Sẽ", category: "share" },
  ];

  const showMenus = (menus) => {
    let showMenus = null;
    if (menus.length > 0) {
      showMenus = menus.map((menu, index) => {
        return (
          <MenuCustomLink
            key={index}
            to={menu.to}
            label={menu.name}
            activeMenu={menu.exact}
            category={menu.category}
          />
        );
      });
    }

    return showMenus;
  };

  const MenuCustomLink = ({ label, to, activeMenu, category }) => {
    let match = useRouteMatch({
      path: to,
      exact: activeMenu,
    });
    return (
      <li className={`${match ? "active-menu" : ""} nav-item`}>
        <NavLink className="nav-link" to={to} params={category}>
          {label}
        </NavLink>
      </li>
    );
  };

  return (
    <header className="fixed-top">
      <div id="header-top" className="container">
        <div className="row">
          <div className="col-md-12" id="header-nav">
            <nav className="navbar navbar-expand-lg">
              <NavLink id="logo" className="navbar-brand" to="/">
                <img
                  src="https://scontent.fdad1-1.fna.fbcdn.net/v/t1.15752-9/165668436_1115458642310084_7406189829570024840_n.png?_nc_cat=103&ccb=1-3&_nc_sid=ae9488&_nc_ohc=4rmRkA7GcU0AX9DxeLA&_nc_ht=scontent.fdad1-1.fna&oh=7b159d0675d65106e835248dac679689&oe=6084CE69"
                  alt="Home"
                />
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon">
                  <i className="fas fa-align-justify" />
                </span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  {showMenus(menus)}
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="http://bao.unitopcv.com/profile/vuong-quoc-bao.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Về Tôi
                    </a>
                  </li>
                </ul>
                <ul className="navbar-nav" id="login">
                  <li className="nav-item">
                    {showInfo(isLogin, userEmail, userName)}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
