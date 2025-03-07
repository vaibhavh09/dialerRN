// AdminDashboard.jsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaCalendar, FaList, FaChartBar, FaCog, FaBell, FaSearch, FaExchangeAlt } from "react-icons/fa";

function AdminDashboard() {
  const location = useLocation();

  return (
    <div style={styles.dashboard}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <ul style={styles.menu}>
          <SidebarItem to="/admin-dashboard" icon={<FaHome />} text="Home" currentPath={location.pathname} />
          <SidebarItem to="/admin-dashboard/users" icon={<FaUsers />} text="Users" currentPath={location.pathname} />
          <SidebarItem to="/admin-dashboard/appointments" icon={<FaCalendar />} text="Appointments" currentPath={location.pathname} />
          <SidebarItem to="/admin-dashboard/tasks" icon={<FaList />} text="Tasks" currentPath={location.pathname} />
          <SidebarItem to="/admin-dashboard/reports" icon={<FaChartBar />} text="Reports" currentPath={location.pathname} />
          <SidebarItem to="/admin-dashboard/transactions" icon={<FaExchangeAlt />} text="Transactions" currentPath={location.pathname} />
          <SidebarItem to="/admin-dashboard/settings" icon={<FaCog />} text="Settings" currentPath={location.pathname} />
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
          <FaBell style={styles.bellicon} />
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
  const isActive = currentPath.startsWith(to);
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
  bellicon: {
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

export default AdminDashboard;




// import { Outlet, Link, useLocation } from "react-router-dom";
// import { 
//   FaHome, FaUsers, FaCalendar, FaList, FaChartBar, FaCog, FaBell, FaSearch, FaExchangeAlt 
// } from "react-icons/fa";

// function AdminDashboard() {
//   const location = useLocation();

//   return (
//     <div style={styles.dashboard}>
//       {/* Sidebar */}
//       <aside style={styles.sidebar}>
//         <ul style={styles.menu}>
//           <SidebarItem to="/admin-dashboard" icon={<FaHome />} text="Home" currentPath={location.pathname} />
//           <SidebarItem to="/admin-dashboard/users" icon={<FaUsers />} text="Users" currentPath={location.pathname} />
//           <SidebarItem to="/admin-dashboard/appointments" icon={<FaCalendar />} text="Appointments" currentPath={location.pathname} />
//           <SidebarItem to="/admin-dashboard/tasks" icon={<FaList />} text="Tasks" currentPath={location.pathname} />
//           <SidebarItem to="/admin-dashboard/reports" icon={<FaChartBar />} text="Reports" currentPath={location.pathname} />
//           <SidebarItem to="/admin-dashboard/transactions" icon={<FaExchangeAlt />} text="Transactions" currentPath={location.pathname} />
//           <SidebarItem to="/admin-dashboard/settings" icon={<FaCog />} text="Settings" currentPath={location.pathname} />
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         {/* Navbar */}
//         <nav style={styles.navbar}>
//           <div style={styles.searchContainer}>
//             <FaSearch style={styles.searchIcon} />
//             <input type="text" placeholder="Search..." style={styles.searchInput} />
//           </div>
//           <FaBell style={styles.bellicon} />
//         </nav>

//         {/* Dynamic Page Content */}
//         <div style={styles.content}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// /** Sidebar Item Component **/
// const SidebarItem = ({ to, icon, text, currentPath }) => {
//   const isActive = currentPath === to;
//   return (
//     <li style={{ ...styles.menuItem, ...(isActive ? styles.activeItem : {}) }}>
//       <Link to={to} style={styles.link}>
//         <span style={styles.icon}>{icon}</span>
//         <span style={styles.iconText}>{text}</span>
//       </Link>
//     </li>
//   );
// };

// const styles = {
//   dashboard: {
//     display: "flex",
//     height: "100vh",
//     backgroundColor: "#f4f4f4",
//   },
//   sidebar: {
//     width: "100px",
//     backgroundColor: "#2c3e50",
//     color: "white",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent:"center",
//     padding: "20px 0",
//     boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.2)",
//   },
//   menu: {
//     listStyle: "none",
//     padding: 0,
//     margin: 0,
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   menuItem: {
//     marginBottom: "15px",
//     textAlign: "center",
//     width: "100%",
//   },
//   activeItem: {
//     backgroundColor: "#34495e",
//     borderRadius: "10px",
//   },
//   link: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "white",
//     textDecoration: "none",
//     padding: "15px 0",
//     fontSize: "14px",
//     width: "100%",
//     transition: "background 0.3s",
//   },
//   bellicon: {
//     fontSize: "24px",
//     color: "blue",
//     marginBottom: "5px",
//   },
//   iconText: {
//     fontSize: "14px",
//   },
//   mainContent: {
//     flexGrow: 1,
//     display: "flex",
//     flexDirection: "column",
//   },
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 20px",
//     backgroundColor: "white",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//   },
//   searchContainer: {
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: "#ecf0f1",
//     padding: "8px 12px",
//     borderRadius: "8px",
//   },
//   searchIcon: {
//     marginRight: "8px",
//     color: "#7f8c8d",
//   },
//   searchInput: {
//     border: "none",
//     outline: "none",
//     background: "transparent",
//   },
//   icon: {
//     fontSize: "22px",
//     cursor: "pointer",
//     color: "white",
//   },
//   content: {
//     padding: "20px",
//     backgroundColor: "#f9f9f9",
//     height: "100%",
//   },
// };

// export default AdminDashboard;



// import { Outlet, Link } from "react-router-dom";
// import { FaHome, FaUsers, FaCalendar, FaList, FaChartBar, FaCog, FaBell, FaSearch } from "react-icons/fa";

// function AdminDashboard() {
//   return (
//     <div style={styles.dashboard}>
//       {/* Sidebar */}
//       <aside style={styles.sidebar}>
//         <ul style={styles.menu}>
//           <li>
//             <Link to="/admin-dashboard" style={styles.link}><FaHome /> Home</Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/users" style={styles.link}><FaUsers /> Users</Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/appointments" style={styles.link}><FaCalendar /> Appointments</Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/tasks" style={styles.link}><FaList /> Tasks</Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/reports" style={styles.link}><FaChartBar /> Reports</Link>
//           </li>
//           <li>
//             <Link to="/admin-dashboard/settings" style={styles.link}><FaCog /> Settings</Link>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         {/* Navbar */}
//         <nav style={styles.navbar}>
//           <div style={styles.searchContainer}>
//             <FaSearch style={styles.searchIcon} />
//             <input type="text" placeholder="Search..." style={styles.searchInput} />
//           </div>
//           <FaBell style={styles.icon} />
//         </nav>

//         {/* Dynamic Page Content */}
//         <div style={styles.content}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   dashboard: {
//     display: "flex",
//     height: "100vh",
//     backgroundColor: "#f4f4f4",
//   },
//   sidebar: {
//     width: "250px",
//     backgroundColor: "#2c3e50",
//     color: "white",
//     display: "flex",
//     flexDirection: "column",
//     padding: "20px 0",
//   },
//   menu: {
//     listStyle: "none",
//     padding: 0,
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//   },
//   link: {
//     display: "flex",
//     alignItems: "center",
//     color: "white",
//     textDecoration: "none",
//     padding: "12px",
//     fontSize: "16px",
//     transition: "background 0.3s",
//   },
//   linkHover: {
//     backgroundColor: "#34495e",
//   },
//   mainContent: {
//     flexGrow: 1,
//     display: "flex",
//     flexDirection: "column",
//   },
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 20px",
//     backgroundColor: "white",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//   },
//   searchContainer: {
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: "#ecf0f1",
//     padding: "8px 12px",
//     borderRadius: "8px",
//   },
//   searchIcon: {
//     marginRight: "8px",
//     color: "#7f8c8d",
//   },
//   searchInput: {
//     border: "none",
//     outline: "none",
//     background: "transparent",
//   },
//   icon: {
//     fontSize: "20px",
//     cursor: "pointer",
//   },
//   content: {
//     padding: "20px",
//     backgroundColor: "#f9f9f9",
//     height: "100%",
//   },
// };

// export default AdminDashboard;
