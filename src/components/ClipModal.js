import React from "react";

function ClipModal({ blob, closeClipModal }) {
  const handleSaveClip = (e) => {
    e.preventDefault();

    // Make API request call
    console.log("API request will be made here");
    closeClipModal();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "calc(50vh - 150px)",
        left: "calc(50vw - 150px)",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div
        style={{
          zIndex: 1000,
          backgroundColor: "#ffffff",
          width: "300px",
          height: "300px",
          padding: "30px",
        }}
      >
        <button onClick={closeClipModal}>Close</button>
        <form action="" onSubmit={handleSaveClip}>
          <h3>Blob:</h3>
          <p style={{ overflow: "scroll" }}>{blob}</p>
          <button>Save Clip</button>
        </form>
      </div>
    </div>
  );
}

export default ClipModal;
