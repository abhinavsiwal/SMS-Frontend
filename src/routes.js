/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import Alternative from 'views/pages/dashboards/Alternative.js';
// import Buttons from 'views/pages/components/Buttons.js';
// import Calendar from 'views/pages/Calendar.js';
// import Cards from 'views/pages/components/Cards.js';
// import Charts from 'views/pages/Charts.js';
// import Components from 'views/pages/forms/Components.js';
// import Elements from 'views/pages/forms/Elements.js';
// import Google from 'views/pages/maps/Google.js';
// import Grid from 'views/pages/components/Grid.js';
// import Icons from 'views/pages/components/Icons.js';
// import Lock from 'views/pages/examples/Lock.js';
// import Notifications from 'views/pages/components/Notifications.js';
// import Profile from 'views/pages/examples/Profile.js';
// import ReactBSTables from 'views/pages/tables/ReactBSTables.js';
// import Register from 'views/pages/examples/Register.js';
// import RTLSupport from 'views/pages/examples/RTLSupport.js';
// import Sortable from 'views/pages/tables/Sortable.js';
// import Tables from 'views/pages/tables/Tables.js';
// import Timeline from 'views/pages/examples/Timeline.js';
// import Typography from 'views/pages/components/Typography.js';
// import Validation from 'views/pages/forms/Validation.js';
// import Vector from 'views/pages/maps/Vector.js';
// import Widgets from 'views/pages/Widgets.js';

// import Login from 'views/pages/Login/Login.js';
import Dashboard from "views/pages/dashboards/Dashboard.js";
import DepartmentList from "views/pages/department/DepartmentList";
import DepartmentHead from "views/pages/department/DepartmentHead";
import AddStaff from "views/pages/staffManagement/AddStaff";
import AddStudent from "views/pages/studentManagement/AddStudent";
import SchoolProfile from "views/pages/schoolProfile/SchoolProfile";
import StudentProfile from "views/pages/studentProfile/StudentProfile";
import Support from "views/pages/support/Support";
import Session from "views/pages/session/AddSession";
import AddSection from "./views/pages/section/AddSection";
import ClassTeacher from "views/pages/class/ClassTeacher";
import AddClass from "views/pages/class/AddClass";
import AddSubject from "views/pages/subject/AddSubject";
import AllStudents from "views/pages/studentManagement/AllStudents";
import UpdateStudent from "views/pages/studentManagement/UpdateStudent";
import AllStaffs from "views/pages/staffManagement/AllStaffs";
import Calendar from "views/pages/Calendar.js";
import Attendance from "views/pages/Attendance/Attendance";
import TimeTable from "views/pages/Time Table/TimeTable";
import RolePermissions from "views/pages/Roles&Permissions/RolePermissions";
import AddCanteen from "views/pages/Canteen/AddCanteen";
import ViewCanteen from "views/pages/Canteen/ViewCanteen";
import ViewAllCanteen from "views/pages/Canteen/ViewAllCanteen";
import ViewRoute from "views/pages/Transportation/ViewRoute";
import AddRoute from "views/pages/Transportation/AddRoute";
import Viewproduct from "views/pages/Ecommerce/Viewproduct";
import Addproduct from "views/pages/Ecommerce/Addproduct";

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Staff Management",
    icon: "ni ni-single-02 text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/add-staff",
        name: "Add Staff",
        miniName: "A",
        component: AddStaff,
        layout: "/admin",
      },
      {
        path: "/all-staffs",
        name: "All Staffs",
        miniName: "A",
        component: AllStaffs,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Class Management",
    icon: "fa fa-users",
    state: "classCollapse",
    views: [
      {
        path: "/add-class",
        name: "Add Class",
        miniName: "AC",
        component: AddClass,
        layout: "/admin",
      },
      {
        path: "/add-section",
        name: "Add Section",
        miniName: "AS",
        component: AddSection,
        layout: "/admin",
      },
      {
        path: "/add-subject",
        name: "Add Subject",
        miniName: "AS",
        component: AddSubject,
        layout: "/admin",
      },
      {
        path: "/class-teacher",
        name: "Class Teacher",
        miniName: "CT",
        component: ClassTeacher,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Department",
    icon: "fa fa-users",
    state: "departmentsCollapse",
    views: [
      {
        path: "/department-list",
        name: "Department List",
        miniName: "DL",
        component: DepartmentList,
        layout: "/admin",
      },
      {
        path: "/department-head",
        name: "Department Head",
        miniName: "DH",
        component: DepartmentHead,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/school-profile",
    name: "School Profile",
    icon: "ni ni-shop text-primary",
    component: SchoolProfile,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Student Management",
    icon: "ni ni-single-02 text-orange",
    state: "studentsCollapse",
    views: [
      {
        path: "/add-student",
        name: "Add Student",
        miniName: "A",
        component: AddStudent,
        layout: "/admin",
      },
      {
        path: "/all-students",
        name: "All Students",
        miniName: "A",
        component: AllStudents,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/student-profile",
    name: "Student Profile",
    icon: "ni ni-shop text-primary",
    component: StudentProfile,
    layout: "/admin",
  },
  {
    path: "/session",
    name: "Session",
    icon: "ni ni-shop text-primary",
    component: Session,
    layout: "/admin",
  },
  {
    path: "/support",
    name: "Support",
    icon: "ni ni-shop text-primary",
    component: Support,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "ni ni-calendar-grid-58 text-red",
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/attendance",
    name: "Attendance",
    icon: "ni ni-badge",
    component: Attendance,
    layout: "/admin",
  },
  {
    path: "/timeTable",
    name: "Time Table",
    icon: "ni ni-calendar-grid-58 text-black",
    component: TimeTable,
    layout: "/admin",
  },

  {
    collapse: true,
    name: "Canteen",
    icon: "ni ni-basket text-yellow",
    state: "canteenCollapse",
    views: [
      {
        path: "/add-canteen",
        name: "Add Canteen",
        miniName: "A",
        component: AddCanteen,
        layout: "/admin",
      },
      {
        path: "/view-canteen",
        name: "View Canteen",
        miniName: "V",
        component: ViewCanteen,
        layout: "/admin",
      },
      {
        path: "/view-all-canteen",
        name: "View All Canteen",
        miniName: "V",
        component: ViewAllCanteen,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/rolesPermissions",
    name: "Roles&Permissions",
    icon: "ni ni-settings-gear-65 text-blue",
    component: RolePermissions,
    layout: "/admin",
  },

  {
    collapse: true,
    name: "Transporte",
    icon: "ni ni-bus-front-12 text-red",
    state: "transportationCollapse",
    views: [
      {
        path: "/add-route",
        name: "Add Route",
        miniName: "A",
        component: AddRoute,
        layout: "/admin",
      },
      {
        path: "/view-route",
        name: "View Route",
        miniName: "V",
        component: ViewRoute,
        layout: "/admin",
      },
    ],
  },

  {
    collapse: true,
    name: "Ecomme",
    icon: "ni ni-bag-17 text-pink",
    state: "ecommerceCollapse",
    views: [
      {
        path: "/add-cart",
        name: "Add Product",
        miniName: "A",
        component: Addproduct,
        layout: "/admin",
      },
      {
        path: "/viewCart",
        name: "View Product",
        miniName: "V",
        component: Viewproduct,
        layout: "/admin",
      },
    ],
  },
];

export const editorRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Staff Management",
    icon: "ni ni-single-02 text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/add-staff",
        name: "Add Staff",
        miniName: "A",
        component: AddStaff,
        layout: "/admin",
      },
      {
        path: "/all-staffs",
        name: "All Staffs",
        miniName: "A",
        component: AllStaffs,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Class Management",
    icon: "fa fa-users",
    state: "classCollapse",
    views: [
      {
        path: "/add-class",
        name: "Add Class",
        miniName: "AC",
        component: AddClass,
        layout: "/admin",
      },
      {
        path: "/add-section",
        name: "Add Section",
        miniName: "AS",
        component: AddSection,
        layout: "/admin",
      },
      {
        path: "/add-subject",
        name: "Add Subject",
        miniName: "AS",
        component: AddSubject,
        layout: "/admin",
      },
      {
        path: "/class-teacher",
        name: "Class Teacher",
        miniName: "CT",
        component: ClassTeacher,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Department",
    icon: "fa fa-users",
    state: "departmentsCollapse",
    views: [
      {
        path: "/department-list",
        name: "Department List",
        miniName: "DL",
        component: DepartmentList,
        layout: "/admin",
      },
      {
        path: "/department-head",
        name: "Department Head",
        miniName: "DH",
        component: DepartmentHead,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/school-profile",
    name: "School Profile",
    icon: "ni ni-shop text-primary",
    component: SchoolProfile,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Student Management",
    icon: "ni ni-single-02 text-orange",
    state: "studentsCollapse",
    views: [
      {
        path: "/add-student",
        name: "Add Student",
        miniName: "A",
        component: AddStudent,
        layout: "/admin",
      },
      {
        path: "/all-students",
        name: "All Students",
        miniName: "A",
        component: AllStudents,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/student-profile",
    name: "Student Profile",
    icon: "ni ni-shop text-primary",
    component: StudentProfile,
    layout: "/admin",
  },
  {
    path: "/session",
    name: "Session",
    icon: "ni ni-shop text-primary",
    component: Session,
    layout: "/admin",
  },
  {
    path: "/support",
    name: "Support",
    icon: "ni ni-shop text-primary",
    component: Support,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "ni ni-calendar-grid-58 text-red",
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/attendance",
    name: "Attendance",
    icon: "ni ni-badge",
    component: Attendance,
    layout: "/admin",
  },
  {
    path: "/timeTable",
    name: "Time Table",
    icon: "ni ni-calendar-grid-58 text-black",
    component: TimeTable,
    layout: "/admin",
  },

  {
    collapse: true,
    name: "Canteen",
    icon: "ni ni-basket text-yellow",
    state: "canteenCollapse",
    views: [
      {
        path: "/add-canteen",
        name: "Add Canteen",
        miniName: "A",
        component: AddCanteen,
        layout: "/admin",
      },
      {
        path: "/view-canteen",
        name: "View Canteen",
        miniName: "V",
        component: ViewCanteen,
        layout: "/admin",
      },
      {
        path: "/view-all-canteen",
        name: "View All Canteen",
        miniName: "V",
        component: ViewAllCanteen,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/rolesPermissions",
    name: "Roles&Permissions",
    icon: "ni ni-settings-gear-65 text-blue",
    component: RolePermissions,
    layout: "/admin",
  },

  {
    collapse: true,
    name: "Transporte",
    icon: "ni ni-bus-front-12 text-red",
    state: "transportationCollapse",
    views: [
      {
        path: "/add-route",
        name: "Add Route",
        miniName: "A",
        component: AddRoute,
        layout: "/admin",
      },
      {
        path: "/view-route",
        name: "View Route",
        miniName: "V",
        component: ViewRoute,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Ecomme",
    icon: "ni ni-bag-17 text-pink",
    state: "ecommerceCollapse",
    views: [
      {
        path: "/add-cart",
        name: "Add Product",
        miniName: "A",
        component: Addproduct,
        layout: "/admin",
      },
      {
        path: "/viewCart",
        name: "View Product",
        miniName: "V",
        component: Viewproduct,
        layout: "/admin",
      },
    ],
  },
];

export const viewerRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Staff Management",
    icon: "ni ni-single-02 text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/all-staffs",
        name: "All Staffs",
        miniName: "A",
        component: AllStaffs,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Class Management",
    icon: "fa fa-users",
    state: "classCollapse",
    views: [
      {
        path: "/add-class",
        name: "View Class",
        miniName: "AC",
        component: AddClass,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Department",
    icon: "fa fa-users",
    state: "departmentsCollapse",
    views: [
      {
        path: "/department-list",
        name: "Department List",
        miniName: "DL",
        component: DepartmentList,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/school-profile",
    name: "School Profile",
    icon: "ni ni-shop text-primary",
    component: SchoolProfile,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Student Management",
    icon: "ni ni-single-02 text-orange",
    state: "studentsCollapse",
    views: [
      {
        path: "/all-students",
        name: "All Students",
        miniName: "A",
        component: AllStudents,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/student-profile",
    name: "Student Profile",
    icon: "ni ni-shop text-primary",
    component: StudentProfile,
    layout: "/admin",
  },
  {
    path: "/session",
    name: "Session",
    icon: "ni ni-shop text-primary",
    component: Session,
    layout: "/admin",
  },
  {
    path: "/support",
    name: "Support",
    icon: "ni ni-shop text-primary",
    component: Support,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "ni ni-calendar-grid-58 text-red",
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/attendance",
    name: "Attendance",
    icon: "ni ni-badge",
    component: Attendance,
    layout: "/admin",
  },
  {
    path: "/timeTable",
    name: "Time Table",
    icon: "ni ni-calendar-grid-58 text-black",
    component: TimeTable,
    layout: "/admin",
  },

  {
    collapse: true,
    name: "Canteen",
    icon: "ni ni-basket text-yellow",
    state: "canteenCollapse",
    views: [
      {
        path: "/view-canteen",
        name: "View Canteen",
        miniName: "V",
        component: ViewCanteen,
        layout: "/admin",
      },
      {
        path: "/view-all-canteen",
        name: "View All Canteen",
        miniName: "V",
        component: ViewAllCanteen,
        layout: "/admin",
      },
    ],
  },

  {
    collapse: true,
    name: "Transporte",
    icon: "ni ni-bus-front-12 text-red",
    state: "transportationCollapse",
    views: [
      {
        path: "/view-route",
        name: "View Route",
        miniName: "V",
        component: ViewRoute,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Ecomme",
    icon: "ni ni-bag-17 text-pink",
    state: "ecommerceCollapse",
    views: [
      {
        path: "/add-cart",
        name: "Add Product",
        miniName: "A",
        component: Addproduct,
        layout: "/admin",
      },
      {
        path: "/viewCart",
        name: "View Product",
        miniName: "V",
        component: Viewproduct,
        layout: "/admin",
      },
    ],
  },
];

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Staff Management",
    icon: "ni ni-single-02 text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/add-staff",
        name: "Add Staff",
        miniName: "A",
        component: AddStaff,
        layout: "/admin",
      },
      {
        path: "/all-staffs",
        name: "All Staffs",
        miniName: "A",
        component: AllStaffs,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Class Management",
    icon: "fa fa-users",
    state: "classCollapse",
    views: [
      {
        path: "/add-class",
        name: "Add Class",
        miniName: "AC",
        component: AddClass,
        layout: "/admin",
      },
      {
        path: "/add-section",
        name: "Add Section",
        miniName: "AS",
        component: AddSection,
        layout: "/admin",
      },
      {
        path: "/add-subject",
        name: "Add Subject",
        miniName: "AS",
        component: AddSubject,
        layout: "/admin",
      },
      {
        path: "/class-teacher",
        name: "Class Teacher",
        miniName: "CT",
        component: ClassTeacher,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Department",
    icon: "fa fa-users",
    state: "departmentsCollapse",
    views: [
      {
        path: "/department-list",
        name: "Department List",
        miniName: "DL",
        component: DepartmentList,
        layout: "/admin",
      },
      {
        path: "/department-head",
        name: "Department Head",
        miniName: "DH",
        component: DepartmentHead,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/school-profile",
    name: "School Profile",
    icon: "ni ni-shop text-primary",
    component: SchoolProfile,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Student Management",
    icon: "ni ni-single-02 text-orange",
    state: "studentsCollapse",
    views: [
      {
        path: "/add-student",
        name: "Add Student",
        miniName: "A",
        component: AddStudent,
        layout: "/admin",
      },
      {
        path: "/all-students",
        name: "All Students",
        miniName: "A",
        component: AllStudents,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/student-profile",
    name: "Student Profile",
    icon: "ni ni-shop text-primary",
    component: StudentProfile,
    layout: "/admin",
  },
  {
    path: "/session",
    name: "Session",
    icon: "ni ni-shop text-primary",
    component: Session,
    layout: "/admin",
  },
  {
    path: "/support",
    name: "Support",
    icon: "ni ni-shop text-primary",
    component: Support,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "ni ni-calendar-grid-58 text-red",
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/attendance",
    name: "Attendance",
    icon: "ni ni-badge",
    component: Attendance,
    layout: "/admin",
  },
  {
    path: "/timeTable",
    name: "Time Table",
    icon: "ni ni-calendar-grid-58 text-black",
    component: TimeTable,
    layout: "/admin",
  },

  {
    collapse: true,
    name: "Canteen",
    icon: "ni ni-basket text-yellow",
    state: "canteenCollapse",
    views: [
      {
        path: "/add-canteen",
        name: "Add Canteen",
        miniName: "A",
        component: AddCanteen,
        layout: "/admin",
      },
      {
        path: "/view-canteen",
        name: "View Canteen",
        miniName: "V",
        component: ViewCanteen,
        layout: "/admin",
      },
      {
        path: "/view-all-canteen",
        name: "View All Canteen",
        miniName: "V",
        component: ViewAllCanteen,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/rolesPermissions",
    name: "Roles&Permissions",
    icon: "ni ni-settings-gear-65 text-blue",
    component: RolePermissions,
    layout: "/admin",
  },

  {
    collapse: true,
    name: "Transporte",
    icon: "ni ni-bus-front-12 text-red",
    state: "transportationCollapse",
    views: [
      {
        path: "/add-route",
        name: "Add Route",
        miniName: "A",
        component: AddRoute,
        layout: "/admin",
      },
      {
        path: "/view-route",
        name: "View Route",
        miniName: "V",
        component: ViewRoute,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Ecomme",
    icon: "ni ni-bag-17 text-pink",
    state: "ecommerceCollapse",
    views: [
      {
        path: "/add-cart",
        name: "Add Product",
        miniName: "A",
        component: Addproduct,
        layout: "/admin",
      },
      {
        path: "/viewCart",
        name: "View Product",
        miniName: "V",
        component: Viewproduct,
        layout: "/admin",
      },
    ],
  },
];

export default routes;
