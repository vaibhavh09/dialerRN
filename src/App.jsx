import { Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import VendorLogin from "./VendorLogin";
import CounsellorLogin from "./CounsellorLogin";
import AdminDashboard from "./AdminDashboard";
import VendorDashboard from "./VendorDashboard";
import CounsellorDashboard from "./CounsellorDashboard";

// Admin Pages
import Users from "./admin/Users";
import Appointments from "./admin/Appointments";
import Tasks from "./admin/Tasks";
import Reports from "./admin/Reports";
import Settings from "./admin/Settings";
import Transactions from "./admin/Transactions";
import AdminDashboardHome from "./admin/AdminDashboardHome";
import VendorDetails from "./admin/VendorDetails";

// Vendor Pages
import VendorHome from "./vendor/VendorHome";
import AssignTask from "./vendor/AssignTask";
import Calendar from "./vendor/Calendar";
import VendorTasks from "./vendor/Tasks";  // Renamed to avoid conflict with admin tasks
import CounselorManagement from "./vendor/CounselorManagement";
import VendorSettings from "./vendor/Settings"; // Renamed to avoid conflict with admin settings

// // Counsellor Pages
// import CounsellorHome from "./counsellor/CounsellorHome";
// import CounsellorAppointments from "./counsellor/Appointments";
// import CounsellorClients from "./counsellor/Clients";
// import CounsellorTasks from "./counsellor/Tasks"; // Renamed for uniqueness
// import CounsellorReports from "./counsellor/Reports";
// import CounsellorSettings from "./counsellor/Settings"; // Renamed to avoid conflict

import Home from "./Home";
import "./App.css"; // Import CSS file

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/counsellor-login" element={<CounsellorLogin />} />

      {/* Admin Dashboard - Nested Routes */}
      <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
        <Route index element={<AdminDashboardHome />} />
        <Route path="users" element={<Users />} />
        <Route path="vendor/:vendorId" element={<VendorDetails />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="reports" element={<Reports />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Vendor Dashboard - Nested Routes */}
      <Route path="/vendor-dashboard/*" element={<VendorDashboard />}>
        <Route index element={<VendorHome />} />
        <Route path="AssignTask" element={<AssignTask />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="tasks" element={<VendorTasks />} />
        <Route path="counselor-management" element={<CounselorManagement />} />
        <Route path="settings" element={<VendorSettings />} />
      </Route>

      {/* Counsellor Dashboard - Only Main Dashboard Page */}
<Route path="/Counsellor-Dashboard" element={<CounsellorDashboard />} />

      {/* Counsellor Dashboard - Nested Routes */}
      {/* <Route path="/counsellor-dashboard/*" element={<CounsellorDashboard />}>
        <Route index element={<CounsellorDashboard />} /> */}
        {/* <Route path="appointments" element={<CounsellorAppointments />} />
        <Route path="clients" element={<CounsellorClients />} />
        <Route path="tasks" element={<CounsellorTasks />} />
        <Route path="reports" element={<CounsellorReports />} />
        <Route path="settings" element={<CounsellorSettings />} /> */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;




// import { Routes, Route } from "react-router-dom";
// import AdminLogin from "./AdminLogin";
// import VendorLogin from "./VendorLogin";
// import CounsellorLogin from "./CounsellorLogin";
// import AdminDashboard from "./AdminDashboard";
// import VendorDashboard from "./VendorDashboard";
// import CounsellorDashboard from "./CounsellorDashboard";
// import Users from "./admin/Users";
// import Appointments from "./admin/Appointments";
// import Tasks from "./admin/Tasks";
// import Reports from "./admin/Reports";
// import Settings from "./admin/Settings";
// import Transactions from "./admin/Transactions";
// import AdminDashboardHome from "./admin/AdminDashboardHome";
// import VendorDetails from "./admin/VendorDetails";
// import Home from "./Home";

// import "./App.css"; // Import CSS file

// function App() {
//   return (
//     <Routes>
//       {/* Home Page */}
//       <Route path="/" element={<Home />} />

//       {/* Authentication Routes */}
//       <Route path="/admin-login" element={<AdminLogin />} />
//       <Route path="/vendor-login" element={<VendorLogin />} />
//       <Route path="/counsellor-login" element={<CounsellorLogin />} />

//       {/* Admin Dashboard - Nested Routes */}
//       <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
//         <Route index element={<AdminDashboardHome />} />
//         <Route path="users" element={<Users />} />
//   <Route path="vendor/:vendorId" element={<VendorDetails />} /> {/* Ensure this route exists */}
 
//         <Route path="appointments" element={<Appointments />} />
//         <Route path="tasks" element={<Tasks />} />
//         <Route path="reports" element={<Reports />} />
//         <Route path="transactions" element={<Transactions />} />
//         <Route path="settings" element={<Settings />} />
//       </Route>

//       {/* Vendor & Counsellor Dashboards */}
//       <Route path="/vendor-dashboard/*" element={<VendorDashboard />} />
//       <Route path="/counsellor-dashboard/*" element={<CounsellorDashboard />} />
//     </Routes>
//   );
// }

// export default App;

