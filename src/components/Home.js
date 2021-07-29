import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      This is the Home Route
      <Link to="/document">
        <button>View PDF</button>
      </Link>
    </div>
  );
}

export default Home;
