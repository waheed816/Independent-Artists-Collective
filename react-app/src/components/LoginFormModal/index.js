import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      console.log(errors)
    } else {
        closeModal()
    }
  };

  const demoUser = () => {
    setEmail("demo@aa.io");
    setPassword("password");
    dispatch(login("demo@aa.io", "password"))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(["The provided credentials were invalid."]);
        }
      });
  }

  return (
    <div className="login-form-modal">
      <h1 className="login-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          <div>
            Email
          </div>
          <div className="login-input-div">
            <input
              className="login-form-inputs"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <div>
            Password
          </div>
          <div className="login-input-div">
            <input
              className="login-form-inputs"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="login-form-button">
          <button type="submit">LOGIN</button>
        </div>
        <div className="login-form-button">
          <button className="demo-user-button" onClick={demoUser}>DEMO LOGIN</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
