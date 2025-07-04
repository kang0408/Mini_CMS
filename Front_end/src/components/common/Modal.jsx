import { useRef } from "react";

import Button from "./Button";

export default function Modal({
  title,
  content,
  exitBtn,
  modal,
  toggleModal,
  onConfirm,
}) {
  const overlayRef = useRef();

  const handleCloseModal = (e) => {
    if (e.target == overlayRef.current) toggleModal();
  };

  const handleConfirm = () => {
    onConfirm();
    toggleModal();
  };
  return (
    <>
      {modal ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-gray-200/30 backdrop-blur-xl animate-[fade_0.5s_ease]"
          ref={overlayRef}
          onClick={handleCloseModal}
        >
          <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white drop-shadow-xl rounded-lg min-w-96">
            {title ? (
              <div className="flex items-center justify-between gap-8 border-b-1 border-gray p-4">
                <p className="font-medium text-2xl">{title}</p>
                {exitBtn ? (
                  <Button onClick={toggleModal} icon="mingcute:close-fill" />
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {content ? (
              <div className="p-4">
                <p>{content}</p>
              </div>
            ) : (
              ""
            )}
            <div className="p-4 flex gap-2 justify-end">
              <Button
                color="default"
                onClick={toggleModal}
                icon="mingcute:close-fill"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleConfirm}
                icon="line-md:circle-to-confirm-circle-transition"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
