import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/authorization/selectors.js";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutThunk } from "../../redux/authorization/operations.js";
import { useEffect, useState } from "react";
import s from "./HeaderAuth.module.css";

import HeaderLogo from "../../public/icons/header-logo.svg";

const HeaderAuth = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleExit = () => {
    dispatch(logoutThunk());
    setMenuOpen(false);
    navigate("/");
  };

  const handleCreateArticle = () => {
    navigate("/create");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <a href="/" className={s.logoLink}>
          <img src={HeaderLogo} alt="logo" className={s.logo} />
        </a>
       <div className={s.btnCon}>
         <button className={s.btnCreateTablet} onClick={handleCreateArticle}>
          Create an article
        </button>
        <button
          className={s.burger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={s.line}></span>
          <span className={s.line}></span>
          <span className={s.line}></span>
        </button>

       </div>
        <nav className={`${s.page} ${menuOpen ? s.open : ""}`}>
          <div className={s.menuHeader}>
            <a href="/" className={s.logoLink} onClick={closeMenu}>
              <img src={HeaderLogo} alt="logo" className={s.logo} />
            </a>

            <button
              className={s.closeBtn}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <ul className={s.itemPage}>
            <li>
              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? s.activeLink : s.pageList
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/articles"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? s.activeLink : s.pageList
                }
              >
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? s.activeLink : s.pageList
                }
              >
                Creators
              </NavLink>
            </li>
            {user && user._id && (
              <li className={s.listPage}>
                <NavLink
                  to={`/users/${user._id}`}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? s.activeLink : s.pageList
                  }
                >
                  My Profile
                </NavLink>
              </li>
            )}

            
          </ul>

          <button className={s.btnCreate} onClick={handleCreateArticle}>
            Create an article
          </button>

          {user && (
            <div className={s.conUser}>
              <NavLink
                to={`/users/${user._id}`}
                className={s.itemUser}
                onClick={closeMenu}
              >
                <div className={s.userContent}>
                  <div className={s.listImg}>
                    <img
                      className={s.listUserImg}
                      src={
                        user.avatarUrl?.trim()
                          ? user.avatarUrl
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name
                            )}&background=random`
                      }
                      alt="User avatar"
                    />
                  </div>
                  <span className={s.listUser}>{user.name}</span>
                </div>
              </NavLink>

              <div className={s.divider}></div>

              <button onClick={handleExit} className={s.btnExit}>
                <img
                  src="/src/assets/icons/Exit.svg"
                  className={s.svgExit}
                  alt="Close"
                />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HeaderAuth;
