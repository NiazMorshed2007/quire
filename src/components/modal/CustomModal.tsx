import React, { FC, ReactElement, useContext, useEffect } from "react";
import { ModalContext } from "../../context/ModalContext";
import { TimelineLite } from "gsap";

interface ICustomModal {
  layer: "white" | "default";
  content: ReactElement;
}

const CustomModal: FC<ICustomModal> = (props) => {
  const { renderModal, setRenderModal } = useContext(ModalContext);
  const { layer, content } = props;
  const handleModal = (e: Event): void => {
    if ((e.target as Element).classList.contains("modal-wrapper")) {
      tl.reverse();
    }
  };
  var tl = new TimelineLite({
    onReverseComplete: () => setRenderModal(false),
  }).pause();
  useEffect(() => {
    tl.fromTo(
      ".modal-content-wrapper",
      0.65,
      {
        y: -120 + "%",
        opacity: 0,
      },
      {
        y: 7 + "%",
        opacity: 1,
      }
    );
    if (renderModal) {
      tl.play();
      window.addEventListener("click", handleModal);
    } else {
      tl.reverse();
    }
  }, [renderModal]);
  return (
    <div
      style={{
        background: layer === "white" ? "rgba(255, 255, 255, .5)" : "none",
      }}
      className="modal-wrapper position-fixed vw-100 vh-100 top-0"
    >
      <div className="modal-content-wrapper">{content}</div>
    </div>
  );
};

export default CustomModal;
