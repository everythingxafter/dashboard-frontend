import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/calculator" element={<Layout><CalcPrice /></Layout>} />
        <Route path="/listcustomer" element={<Layout><ListCustomer /></Layout>} />
        <Route path="/listgudang" element={<Layout><ListGudang /></Layout>} />
        <Route path="/listkebun" element={<Layout><ListKebun /></Layout>} />
        <Route path="/listsupplier" element={<Layout><ListSupplier /></Layout>} />
        <Route path="/tambahcustomer" element={<Layout><AddCustomer /></Layout>} />
        <Route path="/tambahgudang" element={<Layout><AddGudang /></Layout>} />
        <Route path="/tambahkebun" element={<Layout><AddKebun /></Layout>} />
        <Route path="/tambahsupplier" element={<Layout><AddSupplier /></Layout>} />
        <Route path="/accountcenter" element={<Layout><AccountCenter /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
