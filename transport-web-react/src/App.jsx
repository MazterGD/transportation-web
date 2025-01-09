import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";

import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Create from "./Pages/Posts/Create";
import Show from "./Pages/Posts/Show";
import Update from "./Pages/Posts/Update";
import "./App.css";
import Invoices from "./Pages/Posts/Invoices";
import Customers from "./Pages/Posts/Customers";
import ShowInvoice from "./Pages/Posts/ShowInvoices";
import CreateInvoices from "./Pages/Posts/CreateInvoices";

export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />

          <Route path="/create" element={user ? <Create /> : <Login />} />
          <Route path="/createInvoice" element={user ? <CreateInvoices /> : <Login />} />

          <Route path="/invoices" element={user ? <Invoices /> : <Login />} />
          <Route path="/customers" element={user ? <Customers /> : <Login />} />

          <Route path="/customers/:id" element={<Show />} />
          <Route path="/invoices/:id" element={<ShowInvoice />} />

          <Route path="/customers/update/:id" element={user ? <Update /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}