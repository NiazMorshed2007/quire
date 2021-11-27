import { Button } from "antd";
import { Power2, TimelineLite } from "gsap";
import React, { Dispatch, FC, ReactElement, useEffect, useState } from "react";

interface ICustomModal {
  layer: "white" | "default";
  content: ReactElement;
  visible: boolean;
  setVisible: Dispatch<boolean>;
  onOk: () => void;
  onCancel?: () => void;
  modalT: string;
}

const CustomModal: FC<ICustomModal> = (props) => {
  const { layer, content, visible, setVisible, onOk, onCancel, modalT } = props;
  const [checked, setChecked] = useState<boolean>(false);
  const handleModal = (e: Event): void => {
    if ((e.target as Element).classList.contains("modal-wrapper")) {
      tl.reverse();
    }
  };
  var tl = new TimelineLite({
    onReverseComplete: () => setVisible(false),
  }).pause();
  useEffect(() => {
    if (visible) {
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
        0.35,
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
    }
    if (visible) {
      tl.play();
      window.addEventListener("click", handleModal);
    }
    //eslint-disable-next-line
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
            <div
              className={`modal-content shadow ${
                modalT.toLowerCase() + "-modal"
              }`}
            >
              {content}
              {modalT.toLowerCase() === "delete" && (
                <>
                  <label className="d-flex gap-1 align-items-center pt-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    I am aware that I <strong>cannot undo</strong> this.
                  </label>
                  <hr />
                  <p className="des">
                    If you choose to upgrade your subscription plan, the deleted
                    organization can be restored within 7 days.
                  </p>
                </>
              )}
              <div className="btn-wrapper d-flex gap-2 align-items-center justify-content-end pt-3">
                {modalT.toLowerCase() === "delete" && (
                  <Button
                    className={`${checked && "ant-danger-btn"}`}
                    onClick={() => {
                      tl.reverse();
                      onOk();
                    }}
                    disabled={!checked}
                  >
                    Delete
                  </Button>
                )}
                {modalT.toLowerCase() === "sublist" && (
                  <Button onClick={onOk}>Create</Button>
                )}

                <Button
                  onClick={() => {
                    tl.reverse();
                  }}
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
