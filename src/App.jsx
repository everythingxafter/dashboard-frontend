import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import CalcPrice from "./pages/CalcPrice";
import ListCustomer from "./pages/ListCustomer";
import ListGudang from "./pages/ListGudang";
import ListKebun from "./pages/ListKebun";
import ListSupplier from "./pages/ListSupplier";
import AddCustomer from "./pages/AddCustomer";
import AddGudang from "./pages/AddGudang";
import AddKebun from "./pages/AddKebun";
import AddSupplier from "./pages/AddSupplier";
import AccountCenter from "./pages/AccountCenter";
import LoginForm from "./pages/LoginForm";
import AddUsers from "./pages/AddUsers";
import PrintData from "./pages/PrintData";
import ProtectedRoute from "./handler/ProtectedRoute";
import LogoutPage from "./pages/LogoutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/calculator"
          element={
            <ProtectedRoute>
              <Layout>
                <CalcPrice />
              </Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/listcustomer"
          element={
            <ProtectedRoute>
              <Layout><ListCustomer /></Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/listgudang"
          element={
            <ProtectedRoute>
              <Layout><ListGudang /></Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/listkebun"
          element={
            <ProtectedRoute>
              <Layout><ListKebun /></Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/listsupplier"
          element={
            <ProtectedRoute>
              <Layout><ListSupplier /></Layout>

            </ProtectedRoute>
          } />
        <Route
          path="/tambahcustomer"
          element={
            <ProtectedRoute>
              <Layout><AddCustomer /></Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/tambahgudang"
          element={
            <ProtectedRoute>
              <Layout><AddGudang /></Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/tambahkebun"
          element={
            <ProtectedRoute>
              <Layout><AddKebun /></Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/tambahsupplier"
          element={
            <ProtectedRoute>
              <Layout><AddSupplier /></Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/accountcenter"
          element={
            <ProtectedRoute>
              <Layout><AccountCenter /></Layout>

            </ProtectedRoute>
          } />
        <Route
          path="/adduser"
          element={
            <ProtectedRoute>
              <Layout><AddUsers /></Layout>
            </ProtectedRoute>
          } />
        <Route
          path="/printdata"
          element={
            <ProtectedRoute>
              <Layout><PrintData /></Layout>
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
