import { Link } from "react-router-dom";

const NotFound = () => {

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >

      <h1
        style={{
          fontSize: "90px",
          color: "#2563eb",
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p
        style={{
          color: "#64748b",
          margin: "20px 0",
        }}
      >
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/dashboard"
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "12px 22px",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Go to Dashboard
      </Link>

    </div>

  );

};

export default NotFound;