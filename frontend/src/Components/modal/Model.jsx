import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 650px;
  height: 400px;
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
  div {
    height: 90px;
    width: 90px;
    margin: -40px 0 10px 0;

    @media screen and (max-width: 1024px) {
      height: 30px;
      width: 30px;
      margin: 0;
    }
  }
  h1 {
    color: rgba(182, 0, 0, 0.89);
    @media screen and (max-width: 1024px) {
      font-size: 19px;
    }
  }
  p {
    margin-bottom: 1rem;
    color: #000;
    @media screen and (max-width: 1024px) {
      font-size: 10px;
    }
  }
  button {
    margin-top: 40px;
    margin-bottom: -50px;
    padding: 10px 50px;
    background: rgb(13, 1, 73);
    border-radius: 5px;
    color: #fff;
    border: none;
    font-size: 18px;
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

export const Modal = ({ showModal, setShowModal, title, description }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 400,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  //   const closeModal = e => {
  //     if (modalRef.current === e.target) {
  //       setShowModal(false);
  //     }
  //   };
  // onClick={closeModal}  'ADD that in Background if want to closeModal after clickon background'

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

  return (
    <>
      {showModal ? (
        <Background ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <div>
                  <AiFillInfoCircle
                    style={{
                      color: "rgba(182, 0, 0, 0.89)",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
                <h1>{title}</h1>
                <p>{description}</p>
                {/* <button>ok</button> */}
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
