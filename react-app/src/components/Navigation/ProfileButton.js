import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useModal } from "../../context/Modal";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()
  const { closeModal } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <i className="fa-solid fa-user user-profile-button" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>{user.username}</div>
            <div>{user.email}</div>
            {user.artist &&
            <div>
              <div >
                <NavLink exact to = {`/artist/${user.id}/manageProfileAndArt`} className="edit-artwork-link" onClick={closeMenu}>YOUR ARTWORK</NavLink>
              </div>
              <div >
                <NavLink exact to = {`/artist/${user.id}`} className="edit-artwork-link" onClick={closeMenu}>YOUR PROFILE</NavLink>
              </div>

            </div>


            }
            <div>
              <button onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="LOG IN"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <div style={{ margin: '7px' }} />
            <OpenModalButton
              buttonText="SIGN UP"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
