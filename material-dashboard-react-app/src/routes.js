// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Register from "@material-ui/icons/GroupAdd";
import Login from "@material-ui/icons/LockOpen";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Categories from "views/Categories/Categories.jsx";
import Items from "views/Items/Items.jsx";
import Providers from "views/Providers/Providers.jsx";
import Employees from "views/Employees/Employees.jsx";
import Purchases from "views/Purchases/Purchases.jsx";
import Purchase from "views/Purchases/Purchase.jsx";
import PurchaseDetails from "views/Purchases/PurchaseDetails.jsx";

import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.jsx";
// core components/views for Auth layout
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";

const dashboardRoutes = [
  {
    path: "/categories",
    name: "Categorías",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LibraryBooks,
    component: Categories,
    layout: "/admin"
  },
  {
    path: "/items",
    name: "Artículos",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LibraryBooks,
    component: Items,
    layout: "/admin"
  },
  {
    path: "/providers",
    name: "Proveedores",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LibraryBooks,
    component: Providers,
    layout: "/admin"
  },
  {
    path: "/employees",
    name: "Empleados",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LibraryBooks,
    component: Employees,
    layout: "/admin"
  },
  {
    path: "/purchases",
    name: "Compras",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LibraryBooks,
    component: Purchases,
    layout: "/admin"
  },
  {
    path: "/add_purchase",
    name: "Agregar Compra",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LibraryBooks,
    component: Purchase,
    layout: "/admin"
  },
  {
    path: "/purchase_detail",
    name: "Detalle de Compra",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LibraryBooks,
    component: PurchaseDetails,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/register-page",
    name: "Registro de Usuarios",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Register,
    component: RegisterPage,
    layout: "/auth"
  },
  {
    path: "/user",
    name: "Perfil de Usuario",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/login-page",
    name: "Inicio de Sesión",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Login,
    component: LoginPage,
    layout: "/auth"
  }
];

export default dashboardRoutes;
