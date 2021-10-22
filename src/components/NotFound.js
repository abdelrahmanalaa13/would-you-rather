import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="question center d-block">
      <h2>Sorry this page not exist</h2>
      <p>
        <Link to="/">Go to Home</Link>
      </p>
    </div>
  );
}
