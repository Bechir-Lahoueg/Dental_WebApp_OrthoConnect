import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Utilisation de Routes au lieu de Switch
import Dashboard from "./pages/dentiste/dashborddentiste/DashbordDentiste";
import Dashboardpro from "./pages/prothesiste/dashbordprothesiste/DashbordProthesiste";
import Patients from "./pages/dentiste/patients/Patients";
import Prothesiste from "./pages/dentiste/requesttoprothesiste/Prothesiste";
import Dentiste from "./pages/prothesiste/requesttodentiste/Dentiste";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginProthesiste from './pages/prothesiste/loginprothesiste/LoginProthesiste'; // Chemin de votre composant LoginProthesiste
import LoginDentiste from "./pages/dentiste/logindentiste/LoginDentiste";
import InvoiceDentiste from "./pages/dentiste/invoice/InvoiceDentiste";
import InvoiceProthesiste from "./pages/prothesiste/invoice/Invoiceprothesiste";
import Progression from "./pages/prothesiste/progression/progressionProthesiste";
import ProgressionDentiste from "./pages/dentiste/progression/progressionDentiste";
import ResetPasswordDentiste from "./pages/Cote_Admin/Dentiste/ResetPasswordDentiste";
import ResetPasswordProthesiste from "./pages/Cote_Admin/Prothesiste/ResetPasswordProthesiste";
import Home from "./pages/Cote_Admin/interface/HomePage";
import ParametreDent from "./pages/dentiste/parametre/parametredentiste";
import ParametrePro from "./pages/prothesiste/parametre/parametreprothesiste";
import Pageprix from "./pages/Cote_Admin/PricePage/PricePage";
import About from "./pages/Cote_Admin/about/Portfolio";




function App() {
  return (
    <Router>
      <Routes>
        {/* Définition des routes pour le dashboard et les patients */}
        <Route exact path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/prothesiste" element={<Prothesiste />} />
        <Route path="/dentiste" element={<Dentiste />} />
        <Route path="/invoicedentiste" element={<InvoiceDentiste />} />
        <Route path="/invoiceprothesiste" element={<InvoiceProthesiste />} />
        <Route path="/progression" element={<Progression />} />
        <Route path="/progressiondentiste" element={<ProgressionDentiste />} />
        <Route path="/resetpassworddentiste" element={<ResetPasswordDentiste />} />
        <Route path="/resetpasswordprothesiste" element={<ResetPasswordProthesiste />} />
        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/dashbordpro" element={<Dashboardpro />} />
        <Route path="/loginprothesiste" element={<LoginProthesiste />} />
        <Route path="/logindentiste" element={<LoginDentiste />} />
        <Route path="/parametredentiste" element={<ParametreDent />} />
        <Route path="/parametreprothesiste" element={<ParametrePro />} />
        <Route path="/pricingpage" element={<Pageprix />} />
        <Route path="/about" element={<About />} />



      </Routes>
    </Router>
  );
}

export default App;
