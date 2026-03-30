import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import PublicDoctorProfile from './pages/DoctorProfile';
import Pharmacy from './pages/Pharmacy';
import ProductDetail from './pages/ProductDetail';
import CategoryProducts from './pages/CategoryProducts';
import Emergency from './pages/Emergency';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import Consult from './pages/Consult';
import LabTests from './pages/LabTests';
import LabTestDetails from './pages/LabTestDetails';
import LabTestBooking from './pages/LabTestBooking';
import Records from './pages/Records';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import AuthGate from './pages/auth/AuthGate';
import RoleLogin from './pages/auth/RoleLogin';
import RoleSignup from './pages/auth/RoleSignup';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminPatients from './pages/admin/AdminPatients';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminLabTests from './pages/admin/AdminLabTests';
import AdminServices from './pages/admin/AdminServices';
import AdminEmergency from './pages/admin/AdminEmergency';
import AdminSettings from './pages/admin/AdminSettings';
import AdminInventory from './pages/admin/AdminInventory';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBanners from './pages/admin/AdminBanners';
import DoctorLayout from './components/doctor/DoctorLayout';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorSchedule from './pages/doctor/DoctorSchedule';
import DoctorLiveConsult from './pages/doctor/DoctorLiveConsult';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorEarnings from './pages/doctor/DoctorEarnings';
import DoctorProfile from './pages/doctor/DoctorProfile';
import PatientLayout from './components/patient/PatientLayout';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientBook from './pages/patient/PatientBook';
import PatientLiveConsult from './pages/patient/PatientLiveConsult';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientOrders from './pages/patient/PatientOrders';
import PatientRecords from './pages/patient/PatientRecords';
import PatientPrescriptions from './pages/patient/PatientPrescriptions';
import PatientProfile from './pages/patient/PatientProfile';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:id" element={<PublicDoctorProfile />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="pharmacy/product/:id" element={<ProductDetail />} />
          <Route path="pharmacy/category/:id" element={<CategoryProducts />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="careers" element={<Careers />} />
          <Route path="consult" element={<Consult />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/lab-tests/:testId" element={<LabTestDetails />} />
          <Route path="/lab-tests/:testId/book" element={<LabTestBooking />} />
          <Route path="records" element={<Records />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookies" element={<Cookies />} />
        </Route>

        {/* Auth */}
        <Route path="/auth" element={<AuthGate />} />
        <Route path="/auth/:role/login" element={<RoleLogin />} />
        <Route path="/auth/:role/signup" element={<RoleSignup />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="lab-tests" element={<AdminLabTests />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="emergency" element={<AdminEmergency />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="schedule" element={<DoctorSchedule />} />
          <Route path="live-consult" element={<DoctorLiveConsult />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="earnings" element={<DoctorEarnings />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>

        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route path="book" element={<PatientBook />} />
          <Route path="live-consult" element={<PatientLiveConsult />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="orders" element={<PatientOrders />} />
          <Route path="records" element={<PatientRecords />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route path="profile" element={<PatientProfile />} />
        </Route>

        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
