import { Outlet, Link, useLocation } from "react-router-dom";
import { FaHome, FaUserPlus, FaCalendar, FaTasks, FaUserTie, FaCog, FaBell, FaSearch } from "react-icons/fa";

function VendorDashboard() {
  const location = useLocation();

  return (
    <div style={styles.dashboard}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <ul style={styles.menu}>
          <SidebarItem to="/vendor-dashboard" icon={<FaHome />} text="Home" currentPath={location.pathname} />
          <SidebarItem to="/vendor-dashboard/AssignTask" icon={<FaUserPlus />} text="Task Assign" currentPath={location.pathname} />
          <SidebarItem to="/vendor-dashboard/calendar" icon={<FaCalendar />} text="Calendar" currentPath={location.pathname} />
          <SidebarItem to="/vendor-dashboard/tasks" icon={<FaTasks />} text="Tasks" currentPath={location.pathname} />
          <SidebarItem to="/vendor-dashboard/counselor-management" icon={<FaUserTie />} text="Counselor Management" currentPath={location.pathname} />
          <SidebarItem to="/vendor-dashboard/settings" icon={<FaCog />} text="Settings" currentPath={location.pathname} />
        </ul>
      </aside>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Navbar */}
        <nav style={styles.navbar}>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input type="text" placeholder="Search..." style={styles.searchInput} />
          </div>
          <FaBell style={styles.bellIcon} />
        </nav>

        {/* Dynamic Page Content */}
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ to, icon, text, currentPath }) => {
  const isActive = to === "/vendor-dashboard" ? currentPath === to : currentPath.startsWith(to);
  return (
    <li style={{ ...styles.menuItem, ...(isActive ? styles.activeItem : {}) }}>
      <Link to={to} style={styles.link}>
        <span style={styles.icon}>{icon}</span>
        <span style={styles.iconText}>{text}</span>
      </Link>
    </li>
  );
};

const styles = {
  dashboard: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  sidebar: {
    width: "100px",
    backgroundColor: "#2c3e50",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  menuItem: {
    marginBottom: "15px",
    textAlign: "center",
    width: "100%",
  },
  activeItem: {
    backgroundColor: "#34495e",
    borderRadius: "10px",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textDecoration: "none",
    padding: "15px 0",
    fontSize: "14px",
    width: "100%",
    transition: "background 0.3s",
  },
  bellIcon: {
    fontSize: "24px",
    color: "blue",
    marginBottom: "5px",
  },
  iconText: {
    fontSize: "14px",
  },
  mainContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "white",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: "8px 12px",
    borderRadius: "8px",
  },
  searchIcon: {
    marginRight: "8px",
    color: "#7f8c8d",
  },
  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
  },
  icon: {
    fontSize: "22px",
    cursor: "pointer",
    color: "white",
  },
  content: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    height: "100%",
  },
};

export default VendorDashboard;



// import { Outlet, Link, useLocation } from "react-router-dom";
// import { FaHome, FaUserPlus, FaCalendar, FaTasks, FaUserTie, FaCog, FaBell, FaSearch } from "react-icons/fa";
// import "./VendorDashboard.css";

// function VendorDashboard() {
//   const location = useLocation();

//   return (
//     <div className="dashboard">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <ul className="menu">
//           <SidebarItem to="/vendor-dashboard" icon={<FaHome />} text="Home" currentPath={location.pathname} />
//           <SidebarItem to="/vendor-dashboard/add-contact" icon={<FaUserPlus />} text="Add Contact" currentPath={location.pathname} />
//           <SidebarItem to="/vendor-dashboard/calendar" icon={<FaCalendar />} text="Calendar" currentPath={location.pathname} />
//           <SidebarItem to="/vendor-dashboard/tasks" icon={<FaTasks />} text="Tasks" currentPath={location.pathname} />
//           <SidebarItem to="/vendor-dashboard/counselor-management" icon={<FaUserTie />} text="Counselor Management" currentPath={location.pathname} />
//           <SidebarItem to="/vendor-dashboard/settings" icon={<FaCog />} text="Settings" currentPath={location.pathname} />
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Navbar */}
//         <nav className="navbar">
//           <div className="search-container">
//             <FaSearch className="search-icon" />
//             <input type="text" placeholder="Search..." className="search-input" />
//           </div>
//           <FaBell className="bell-icon" />
//         </nav>

//         {/* Dynamic Page Content */}
//         <div className="content">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// const SidebarItem = ({ to, icon, text, currentPath }) => {
//     const isActive = to === "/vendor-dashboard" ? currentPath === to : currentPath.startsWith(to);
  
//     return (
//       <li className={`menu-item ${isActive ? "active" : ""}`}>
//         <Link to={to} className="menu-link">
//           <span className="menu-icon">{icon}</span>
//           <span className="menu-text">{text}</span> {/* Text below icon */}
//         </Link>
//       </li>
//     );
//   };
  

// export default VendorDashboard;

