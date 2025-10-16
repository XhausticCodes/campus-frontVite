import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 text-center bg-black">

      {/* style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        textAlign: "center",
      }}
    > */}
      <h1 style={{ fontSize: "2rem", fontWeight: 700 , color: "white" }}>
        404 - Page Not Found
      </h1>
      <p style={{ color: "#666" }}>
        The page you are looking for doesn\'t exist or has been moved.
      </p>
      <a href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
        Go back home
      </a>
    </div>
  );
};

export default NotFoundPage;
