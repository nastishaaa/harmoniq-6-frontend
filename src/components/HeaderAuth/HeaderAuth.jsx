import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authorization/selectors.js";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./HeaderAuth.module.css";

const HeaderAuth = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/login");
  };
  const handleCreateArticle = () => {
    navigate("/create");
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <a href="/">
          <img
            className={s.logo}
            src="/src/assets/icons/header-logo.svg"
            alt="logo"
          />
        </a>

        <div className={s.page}>
          <ul className={s.itemPage}>
            <li className={s.listPage}>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? s.activeLink : "")}
              >
                Home
              </NavLink>
            </li>
            <li className={s.listPage}>
              <NavLink
                to="/articles"
                className={({ isActive }) => (isActive ? s.activeLink : "")}
              >
                Articles
              </NavLink>
            </li>
            <li className={s.listPage}>
              <NavLink
                to="/users"
                end
                className={({ isActive }) => (isActive ? s.activeLink : "")}
              >
                Creators
              </NavLink>
            </li>
            {user && user._id && (
              <li className={s.listPage}>
                <NavLink
                  to={`/users/${user._id}`}
                  className={({ isActive }) => (isActive ? s.activeLink : "")}
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
              <NavLink to={`/users/${user._id}`} className={s.itemUser}>
                <ul className={s.itemUser}>
                  <li className={s.listImg}>
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
                  </li>
                  <li className={s.listUser}>{user.name}</li>
                </ul>
              </NavLink>

              <div className={s.divider}></div>

              <button onClick={handleExit} className={s.btnExit}>
                <img
                  src="/src/assets/icons/Exit.svg"
                  className={s.svgExit}
                  //   width="17"
                  //   height="16"
                  alt="Close"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAuth;
