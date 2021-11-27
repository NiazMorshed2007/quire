import { Button } from "antd";
import { Power2, TimelineLite } from "gsap";
import React, { Dispatch, FC, ReactElement, useEffect } from "react";

interface ICustomModal {
  layer: "white" | "default";
  content: ReactElement;
  visible: boolean;
  setVisible: Dispatch<boolean>;
  okDisabled: boolean;
  onOk: () => void;
  onCancel?: () => void;
  modalT: string;
}

const CustomModal: FC<ICustomModal> = (props) => {
  const {
    layer,
    content,
    visible,
    setVisible,
    okDisabled,
    onOk,
    onCancel,
    modalT,
  } = props;
  const handleModal = (e: Event): void => {
    if ((e.target as Element).classList.contains("modal-wrapper")) {
      tl.reverse();
    }
  };
  var tl = new TimelineLite({
    onReverseComplete: () => setVisible(false),
  }).pause();
  useEffect(() => {
    tl.fromTo(
      ".modal-wrapper",
      0.2,
      {
        opacity: 0,
        ease: Power2.easeOut,
      },
      {
        opacity: 1,
      }
    ).fromTo(
      ".modal-content-wrapper",
      0.38,
      {
        y: -120 + "%",
        opacity: 0,
        ease: Power2.easeOut,
      },
      {
        y: 7 + "%",
        opacity: 1,
      }
    );
    if (visible) {
      tl.play();
      window.addEventListener("click", handleModal);
    } else {
      tl.reverse();
    }
  }, [visible]);
  return (
    <>
      {visible && (
        <div
          style={{
            background: layer === "white" ? "rgba(255, 255, 255, .5)" : "none",
          }}
          className="modal-wrapper position-fixed vw-100 vh-100 top-0"
        >
          <div className="modal-content-wrapper">
            <div className={`modal-content shadow ${modalT}`}>
              {content}
              <div className="btn-wrapper d-flex gap-2 align-items-center justify-content-end pt-3">
                <Button
                  className={`${okDisabled && "ant-danger-btn"}`}
                  onClick={onOk}
                  disabled={!okDisabled}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => tl.reverse()}
                  className="ant-default-btn"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
