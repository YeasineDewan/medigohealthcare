import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import PublicDoctorProfile from './pages/DoctorProfile';
import Pharmacy from './pages/Pharmacy';
import PharmacyProductDetail from './pages/PharmacyProductDetail';
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
import BookACall from './pages/BookACall';
import BookAppointment from './pages/BookAppointment';
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
import GeneralSettings from './pages/admin/settings/General';
import UserManagement from './pages/admin/settings/UserManagement';
import RolePermissions from './pages/admin/settings/RolePermissions';
import SystemConfig from './pages/admin/settings/SystemConfig';
import BackupRestore from './pages/admin/settings/BackupRestore';

// Accounts
import CreateGroup from './pages/admin/accounts/CreateGroup';
import CreateLedger from './pages/admin/accounts/CreateLedger';
import ChartOfAccounts from './pages/admin/accounts/ChartOfAccounts';
import TrialBalance from './pages/admin/accounts/TrialBalance';
import BalanceSheet from './pages/admin/accounts/BalanceSheet';
import IncomeStatement from './pages/admin/accounts/IncomeStatement';

// Reports
import PatientReports from './pages/admin/reports/PatientReports';

// Marketing
import Promotions from './pages/admin/marketing/Promotions';

// Communications
import Notifications from './pages/admin/communications/Notifications';

// HR
import SalaryProcess from './pages/admin/hr/SalaryProcess';
import EmployeeEntry from './pages/admin/hr/EmployeeEntry';

// Emergency
import EmergencyCases from './pages/admin/emergency/EmergencyCases';

// Inventory
import StockManagement from './pages/admin/inventory/StockManagement';

// Lab
import LabTestsAdmin from './pages/admin/lab/LabTests';

// Pharmacy
import Medicines from './pages/admin/pharmacy/Medicines';

// Medical
import Diagnostic from './pages/admin/medical/Diagnostic';

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
import JoinAsDoctor from './pages/JoinAsDoctor';
import PartnerHospital from './pages/PartnerHospital';

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
          <Route path="pharmacy/product/:id" element={<PharmacyProductDetail />} />
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
          <Route path="book-a-call" element={<BookACall />} />
          <Route path="book-appointment/:doctorId" element={<BookAppointment />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/lab-tests/:testId" element={<LabTestDetails />} />
          <Route path="/lab-tests/:testId/book" element={<LabTestBooking />} />
          <Route path="records" element={<Records />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="join-as-doctor" element={<JoinAsDoctor />} />
          <Route path="partner-hospital" element={<PartnerHospital />} />
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
          <Route path="marketing/banners" element={<AdminBanners />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="settings/general" element={<GeneralSettings />} />
          <Route path="settings/users" element={<UserManagement />} />
          <Route path="settings/permissions" element={<RolePermissions />} />
          <Route path="settings/system" element={<SystemConfig />} />
          <Route path="settings/backup" element={<BackupRestore />} />
          <Route path="settings/:subpage" element={<AdminSettings />} />
          
          {/* Accounts Routes */}
          <Route path="accounts/create-group" element={<CreateGroup />} />
          <Route path="accounts/create-ledger" element={<CreateLedger />} />
          <Route path="accounts/chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="accounts/trial-balance" element={<TrialBalance />} />
          <Route path="accounts/balance-sheet" element={<BalanceSheet />} />
          <Route path="accounts/income-statement" element={<IncomeStatement />} />
          <Route path="accounts/*" element={<AdminSettings />} />
          
          {/* HR Routes */}
          <Route path="hr/employee-entry" element={<EmployeeEntry />} />
          <Route path="hr/salary-process" element={<SalaryProcess />} />
          <Route path="hr/*" element={<AdminSettings />} />
          
          {/* Reports Routes */}
          <Route path="reports/patients" element={<PatientReports />} />
          <Route path="reports/*" element={<AdminSettings />} />
          
          {/* Medical Routes */}
          <Route path="medical/diagnostic" element={<Diagnostic />} />
          <Route path="medical/*" element={<AdminSettings />} />
          
          {/* Departments Routes */}
          <Route path="departments/*" element={<AdminSettings />} />
          
          {/* Pharmacy Routes */}
          <Route path="pharmacy/medicines" element={<Medicines />} />
          <Route path="pharmacy/*" element={<AdminSettings />} />
          
          {/* Lab Routes */}
          <Route path="lab/tests" element={<LabTestsAdmin />} />
          <Route path="lab/*" element={<AdminSettings />} />
          
          {/* Patients sub-routes */}
          <Route path="patients/*" element={<AdminSettings />} />
          
          {/* Doctors sub-routes */}
          <Route path="doctors/*" element={<AdminSettings />} />
          
          {/* Inventory Routes */}
          <Route path="inventory/stock" element={<StockManagement />} />
          <Route path="inventory/*" element={<AdminSettings />} />
          
          {/* Emergency sub-routes */}
          <Route path="emergency/cases" element={<EmergencyCases />} />
          <Route path="emergency/*" element={<AdminSettings />} />
          
          {/* Services sub-routes */}
          <Route path="services/*" element={<AdminSettings />} />
          
          {/* Marketing Routes */}
          <Route path="marketing/promotions" element={<Promotions />} />
          <Route path="marketing/*" element={<AdminSettings />} />
          
          {/* Communications Routes */}
          <Route path="communications/notifications" element={<Notifications />} />
          <Route path="communications/*" element={<AdminSettings />} />
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
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
