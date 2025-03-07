import { Link } from "react-router-dom";
import "./Home.css"; // Ensure you have a CSS file for styling

function Home() {
  return (
    <div className="page-container">
      <div className="container">
        <h1 className="heading">Welcome! Please Select Your Login</h1>
        <p className="subheading">Select your login type to proceed.</p>
        <div className="button-container">
          <Link to="/admin-login" className="link">
            <button className="button">Admin Login</button>
          </Link>
          <Link to="/vendor-login" className="link">
            <button className="button">Vendor Login</button>
          </Link>
          <Link to="/counsellor-login" className="link">
            <button className="button">Counsellor Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
