import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import "./modal.scss";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  display: flex;
  justify-content: cEnter;
  align-items: cEnter;
`;

const ModalWrapper = styled.div`
  width: 650px;
  height: 480px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  @media screen and (max-width: 1024px) {
    width: 350px;
    height: 200px;
    border-radius: 5px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  h1 {
    color: rgb(13, 1, 73);
    margin-bottom: 20px;
    @media screen and (max-width: 1024px) {
      font-size: 19px;
    }
  }
  span {
    font-size: 12px;
    color: #fff;
    margin: -38px 0 10px 15%;
    align-self: flex-start;
    background-color: rgba(6, 0, 32, 0.863);
    padding: 5px 14px;
    border-radius: 10px;
    box-shadow: 12px 5px 45px -4px rgba(255, 0, 0, 0.38);
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  padding: 0;
  z-index: 10;
  transition: all 1s;

  @media screen and (max-width: 1024px) {
    width: 18px;
    height: 18px;
    top: 10px;
    right: 10px;
  }

  &:hover {
    color: rgb(13, 1, 73);
  }
`;

const Modal = ({ showModal, setShowModal, onChange, errors, onSubmit }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 400,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const [foucs, setfoucs] = React.useState();

  return (
    <>
      {showModal ? (
        <Background ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <h1>Add Details</h1>
                <input
                  className={foucs === 1 ? "border-focus" : ""}
                  type="text"
                  placeholder="Enter firstname"
                  onChange={(e) => {
                    onChange(e, "firstname");
                  }}
                  onFocus={(e) => setfoucs(1)}
                  onBlur={(e) => setfoucs("")}
                />
                {errors.firstnameError && <span>{errors.firstnameError}</span>}
                <input
                  className={foucs === 2 ? "border-focus" : ""}
                  type="text"
                  placeholder="Enter lastname"
                  onChange={(e) => {
                    onChange(e, "lastname");
                  }}
                  onFocus={(e) => setfoucs(2)}
                  onBlur={(e) => setfoucs("")}
                />
                {errors.lastnameError && <span>{errors.lastnameError}</span>}
                <input
                  className={foucs === 3 ? "border-focus" : ""}
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    onChange(e, "email");
                  }}
                  onFocus={(e) => setfoucs(3)}
                  onBlur={(e) => setfoucs("")}
                />
                {errors.emailError && <span>{errors.emailError}</span>}
                <input
                  className={foucs === 4 ? "border-focus" : ""}
                  type="text"
                  placeholder="Enter mobile number"
                  maxlength={10}
                  onChange={(e) => {
                    onChange(e, "mobile");
                  }}
                  onFocus={(e) => setfoucs(4)}
                  onBlur={(e) => setfoucs("")}
                />
                {errors.mobileError && <span>{errors.mobileError}</span>}
                <button
                  className="submit-btn"
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  Add contact
                </button>
              </ModalContent>

              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;
