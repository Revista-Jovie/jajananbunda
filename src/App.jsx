import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
import Feedback from "./pages/Feedback";
import FaQ from "./pages/FaQ";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Order = React.lazy(() => import("./pages/Order"));
const Client = React.lazy(() => import("./pages/Client"));
const Crew = React.lazy(() => import("./pages/Crew"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Quotes = React.lazy(() => import("./components/Quotes"));
const ClientDetail = React.lazy(() => import("./pages/ClientDetail"));
const CrewDetail = React.lazy(() => import("./pages/CrewDetail"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const OrderDetail = React.lazy(() => import("./pages/OrderDetail"));
const Rekomendasi = React.lazy(() => import("./pages/Rekomendasi"));
const Menu = React.lazy(() => import("./pages/Menu"));

// import Dashboard from "./pages/Dashboard";
// import OrderList from "./pages/OrderList";
// import Products from "./pages/Products";
// import Customers from "./pages/Customers";
// import ProductStock from "./pages/ProductStock";
// import Undangan from "./pages/orderlist/undangan";
// import ErrorPage from "./components/ErrorPage";
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/client" element={<Client />} />
            <Route path="/client/:id" element={<ClientDetail />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/crew/:id" element={<CrewDetail />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/faq" element={<FaQ />} />
            <Route path="/rekomendasi" element={<Rekomendasi />} />
            <Route path="/menu" element={<Menu />} />

            <Route path="/error/400" element={<ErrorPage kode={400} />} />
            <Route path="/error/401" element={<ErrorPage kode={401} />} />
            <Route path="/error/403" element={<ErrorPage kode={403} />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
