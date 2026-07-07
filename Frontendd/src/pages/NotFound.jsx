import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound">

      <div className="notfound-box">

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/dashboard">
          <button>
            Back to Dashboard
          </button>
        </Link>

      </div>

    </div>
  );
};

export default NotFound;