import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Customer from "./pages/Customer.jsx";
import Animal from "./pages/Animal.jsx";
import NavigationBar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Doctor from "./pages/Doctor.jsx";
import Vaccination from "./pages/Vaccination.jsx";
import Appointment from "./pages/Appointment.jsx";
import Report from "./pages/Report.jsx";

function App() {
    return (

            <div className="App">
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/customers" element={<Customer />} />
                    <Route path="/animals" element={<Animal />} />
                    <Route path="/doctors" element={<Doctor />} />
                    <Route path="/vaccinations" element={<Vaccination />} />
                    <Route path="/appointments" element={<Appointment />} />
                    <Route path="/reports" element={<Report />} />

                </Routes>
            </div>

    );
}

export default App;
