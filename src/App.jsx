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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<CalcPrice />} />
          <Route path="/listcustomer" element={<ListCustomer />} />
          <Route path="/listgudang" element={<ListGudang />} />
          <Route path="/listkebun" element={<ListKebun />} />
          <Route path="/listsupplier" element={<ListSupplier />} />
          <Route path="/tambahcustomer" element={<AddCustomer />} />
          <Route path="/tambahgudang" element={<AddGudang />} />
          <Route path="/tambahkebun" element={<AddKebun />} />
          <Route path="/tambahsupplier" element={<AddSupplier />} />
          <Route path="/accountcenter" element={<AccountCenter />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
