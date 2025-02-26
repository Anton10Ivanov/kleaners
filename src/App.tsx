import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Book from "./pages/Book";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessRegister from "./pages/BusinessRegister";
import BusinessDashboard from "./pages/business/BusinessDashboard";
import BusinessLayout from "./components/business/BusinessLayout";
import NewBooking from "./pages/business/NewBooking";
import ViewBookings from "./pages/business/ViewBookings";
import EditBooking from "./pages/business/EditBooking";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/book",
        element: <Book />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/business/register",
        element: <BusinessRegister />,
      },
    ],
  },
  {
    path: "/business",
    element: <BusinessLayout />,
    children: [
      {
        path: "dashboard",
        element: <BusinessDashboard />,
      },
      {
        path: "bookings/new",
        element: <NewBooking />,
      },
      {
        path: "bookings/view",
        element: <ViewBookings />,
      },
      {
        path: "bookings/edit/:bookingId",
        element: <EditBooking />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
