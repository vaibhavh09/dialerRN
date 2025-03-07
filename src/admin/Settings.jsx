import React from "react";
import "./Settings.css";
import { FaUserCog, FaUserPlus, FaUsers, FaPhone, FaEnvelope, FaLock, FaUserEdit } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="settings-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-pic">
            <FaUserCog size={50} />
          </div>
          <h3>Admin Name</h3>
          <p>admin@example.com</p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li><FaUserCog /> Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="settings-content">
        <h1><FaUserCog className="settings-icon" /> Application Settings</h1>
        <div className="settings-grid">
          <div className="settings-card">
            <FaUserPlus className="card-icon" />
            <h3>Add Co-Admins</h3>
            <button className="btn add">Add</button>
          </div>
          <div className="settings-card">
            <FaUsers className="card-icon" />
            <h3>Manage Co-Admins</h3>
            <button className="btn manage">Manage</button>
          </div>
          <div className="settings-card">
            <FaPhone className="card-icon" />
            <h3>Change Phone Number</h3>
            <button className="btn update">Update</button>
          </div>
          <div className="settings-card">
            <FaEnvelope className="card-icon" />
            <h3>Change Email</h3>
            <button className="btn update">Update</button>
          </div>
          <div className="settings-card">
            <FaLock className="card-icon" />
            <h3>Change Password</h3>
            <button className="btn reset">Reset</button>
          </div>
          <div className="settings-card">
            <FaUserEdit className="card-icon" />
            <h3>Edit Profile</h3>
            <button className="btn edit">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;



// import React from "react";
// import { FaUserCog, FaUserPlus, FaUsersCog, FaPhone, FaEnvelope, FaLock, FaEdit } from "react-icons/fa";
// import "./Settings.css"; // Assuming you have a CSS file for styling

// const Settings = () => {
//   return (
//     <div className="settings-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="profile-section">
//           <div className="profile-pic"> <FaUserCog size={50} /> </div>
//           <h3>Admin Name</h3>
//           <p>admin@example.com</p>
//           <button className="edit-profile">Edit Profile</button>
//         </div>
//         <nav className="sidebar-menu">
//           <button className="menu-item">Settings</button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="settings-content">
//         <h2 className="settings-title">Application Settings</h2>
//         <div className="settings-grid">
//           <div className="settings-card">
//             <FaUserPlus size={30} />
//             <h3>Add Co-Admins</h3>
//             <button className="settings-button">Add</button>
//           </div>
//           <div className="settings-card">
//             <FaUsersCog size={30} />
//             <h3>Manage Co-Admins</h3>
//             <button className="settings-button">Manage</button>
//           </div>
//           <div className="settings-card">
//             <FaPhone size={30} />
//             <h3>Change Phone Number</h3>
//             <button className="settings-button">Update</button>
//           </div>
//           <div className="settings-card">
//             <FaEnvelope size={30} />
//             <h3>Change Email</h3>
//             <button className="settings-button">Update</button>
//           </div>
//           <div className="settings-card">
//             <FaLock size={30} />
//             <h3>Change Password</h3>
//             <button className="settings-button">Reset</button>
//           </div>
//           <div className="settings-card">
//             <FaEdit size={30} />
//             <h3>Edit Profile</h3>
//             <button className="settings-button">Edit</button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Settings;
