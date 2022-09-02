import React, { useEffect, useState } from "react";
import "./home.scss";
import Modal from "../../Components/insertModal/Modal";
import UpdateModal from "../../Components/updateModal/Modal";
import Table from "../../Components/Table/Table";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("");

  const [firstname, setFirstname] = useState("");
  const [firstnameError, setfirstNameError] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [id, setId] = useState("");
  const updateData = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    mobile: mobile,
  };

  const errors = {
    firstnameError: firstnameError,
    lastnameError: lastnameError,
    emailError: emailError,
    mobileError: mobileError,
  };

  const onChange = (e, type) => {
    if (type === "firstname") {
      setFirstname(e.target.value);
    } else if (type === "lastname") {
      setLastname(e.target.value);
    } else if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "mobile") {
      setMobile(e.target.value);
    } else {
      return false;
    }
  };

  const onSubmit = (e) => {
    if (
      firstname.length === 0 &&
      lastname.length === 0 &&
      email.length === 0 &&
      mobile.length === 0
    ) {
      setfirstNameError("firstname is required");
      setLastNameError("Last is required");
      setEmailError("Email is required");
      setMobileError("Mobile is required");
    } else if (firstname.length === 0) {
      setfirstNameError("Email is required");
    } else if (email.length <= 2) {
      setfirstNameError("please Enter minimus 2 digits name");
    } else if (lastname.length === 0) {
      setLastNameError("lastname is required");
    } else if (lastname.length <= 2) {
      setLastNameError("please Enter minimus 2 digits name");
    } else if (email.length === 0) {
      setEmailError("Email is required");
    } else if (email.length <= 10) {
      setEmailError("Please Enter valid Email");
    } else if (mobile.length === 0) {
      setMobileError("Email is required");
    } else if (mobile.length != 10) {
      setMobileError("Please Enter valid Mobile");
    } else {
      setfirstNameError("");
      setLastNameError("");
      setEmailError("");
      setMobileError("");
      setLoading(true);
      e.preventDefault();
      let data = {
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        MobileNo: mobile,
      };
      fetch("http://192.168.1.168:5000/addData", {
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
          setShowModal(false);
          getData();
        });
    }
  };

  const handleUpdateData = async (e) => {
    if (
      firstname.length === 0 &&
      lastname.length === 0 &&
      email.length === 0 &&
      mobile.length === 0
    ) {
      setfirstNameError("firstname is required");
      setLastNameError("Last is required");
      setEmailError("Email is required");
      setMobileError("Mobile is required");
    } else if (firstname.length === 0) {
      setfirstNameError("Email is required");
    } else if (email.length <= 2) {
      setfirstNameError("please Enter minimus 2 digits name");
    } else if (lastname.length === 0) {
      setLastNameError("lastname is required");
    } else if (lastname.length <= 2) {
      setLastNameError("please Enter minimus 2 digits name");
    } else if (email.length === 0) {
      setEmailError("Email is required");
    } else if (email.length <= 10) {
      setEmailError("Please Enter valid Email");
    } else if (mobile.length === 0) {
      setMobileError("Email is required");
    } else if (mobile.length != 10) {
      setMobileError("Please Enter valid Mobile");
    } else {
      setfirstNameError("");
      setLastNameError("");
      setEmailError("");
      setMobileError("");
      setLoading(true);
      e.preventDefault();
      let data = {
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        MobileNo: mobile,
        id: id,
      };
      try {
        await fetch(`http://192.168.1.168:5000/updateData/${data.id}`, {
          method: "PUT",
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
            setShowUpdateModal(false);
            getData();
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getData = () => {
    fetch("http://192.168.1.168:5000/data", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const email = localStorage.getItem("email");
      console.log(email);
      if (email.length > 0) {
        setUser(email);
      } else {
        console.log('no data')
      }
    } catch (e) {
      navigate("/login");
    }

    getData();
  }, []);

  const handleUpdate = (data) => {
    setId(data._id);
    setFirstname(data.FirstName);
    setLastname(data.LastName);
    setEmail(data.Email);
    setMobile(data.MobileNo);
    setShowUpdateModal(true);
  };
  return (
    <div className="home">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onChange={onChange}
        errors={errors}
        onSubmit={onSubmit}
      />
      <UpdateModal
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        onChange={onChange}
        data={updateData}
        errors={errors}
        onSubmit={handleUpdateData}
      />
      <div className="nav">
        <h1 className="title">phonebook manager</h1>
        <div>
          <p className="email">User : {user}</p>
          <p
            className="logout"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </p>
        </div>
      </div>
      <button className="add-btn" onClick={() => setShowModal(true)}>
        ADD
      </button>

      <div className="container">
        <Table data={data} getData={getData} handleUpdate={handleUpdate} />
      </div>
    </div>
  );
}

export default Home;
