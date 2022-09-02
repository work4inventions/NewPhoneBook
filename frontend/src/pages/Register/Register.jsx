import { useEffect, useState } from "react";
import "./register.scss";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../Components/modal/Model";
import { AiFillInfoCircle } from "react-icons/ai";

const Regitser = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [foucs, setfoucs] = useState();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleLogin = (e) => {
    if (
      email.length === 0 &&
      password.length === 0 &&
      confirmPassword.length === 0
    ) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      setConfirmPasswordError("ConfirmPassword is required");
      
    } else if (email.length === 0) {
      setPasswordError('');
      setConfirmPasswordError('')
      setEmailError("Email is required");
    } else if (email.length <= 10) {
      setPasswordError('');
      setConfirmPasswordError('')
      setEmailError("Please Enter valid Email");
    } else if (password.length === 0) {
      setEmailError("");
      setConfirmPasswordError('')
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setEmailError("");
      setConfirmPasswordError('')
      setPasswordError("please Enter minimus 6 digits password");
    } else if (confirmPassword.length === 0) {
      setEmailError("");
      setPasswordError('')
      setConfirmPasswordError("please re-enter your password");
    } else if (confirmPassword !== password) {
      setEmailError("");
      setPasswordError('')
      setConfirmPasswordError("Password and Confirm password are not match");
    
    } else {
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setLoading(true);
      e.preventDefault();
      let data = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      fetch("http://192.168.1.168:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIffsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJffpYXQiOjE2Mzk3MzQ3NTV2.bHygAffPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.token) {
            setLoading(false);
            openModal();
          } else {
            console.log(result.token);
            localStorage.setItem("token", result.token);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            navigate("/");
          }
        });
    }
  };

  const [animation2, setAnimation2] = useState(false);

  useEffect(() => {
    setAnimation2(true);
  });

  const [slideUp, setSlideUp] = useState(false);
  return (
    <div className={slideUp ? "login slide-login" : "login"}>
      <form onSubmit={handleLogin}>
        <div
          className={
            animation2
              ? "container login-animation login-animation-2"
              : "container"
          }
        >
          <h1 className={"animationTitle"}>Sign Up</h1>
          <div className="form">
            <input
              className={
                foucs === 1 ? "border-focus" : emailError ? "border-error" : ""
              }
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => setfoucs(1)}
              onBlur={(e) => setfoucs("")}
            />
            {emailError && <span>{emailError}</span>}
            <div className="pass-container">
              <input
                className={
                  foucs === 2
                    ? "border-focus"
                    : passwordError
                    ? "border-error"
                    : ""
                }
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => setfoucs(2)}
                onBlur={(e) => setfoucs("")}
              />
            </div>

            {passwordError && <span>{passwordError}</span>}
            <div className="pass-container">
              <input
                className={
                  foucs === 3
                    ? "border-focus"
                    : confirmpasswordError
                    ? "border-error"
                    : ""
                }
                type="password"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={(e) => setfoucs(3)}
                onBlur={(e) => setfoucs("")}
              />
            </div>
            {confirmpasswordError && <span>{confirmpasswordError}</span>}

            <button type="submit">{loading ? <Dots /> : "Submit"}</button>
            <p
              onClick={() => {
                navigate("/login");
              }}
              className="account-title"
            >
              Already have account ?
            </p>
            <div className="info-container">
              <div className="eye-btn">
                {" "}
                <AiFillInfoCircle
                  style={{
                    color: "rgb(13, 1, 73)",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
              <div className="info-bubble">
                <p>PASSWORD MUST INCLUDE</p>
                <li>minimum 6 characters.</li>
                <li>upper case and lower case letters.</li>
                <li>password must be contain special character.</li>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Wrong Password"
        description="Please Enter Valid AdminCredential For Sign in !"
      />
    </div>
  );
};

export default Regitser;
