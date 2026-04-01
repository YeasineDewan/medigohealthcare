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
import HealthCards from './pages/HealthCards';
import PremiumHealthCard from './pages/PremiumHealthCard';
import FamilyHealthCard from './pages/FamilyHealthCard';
import CorporateHealthCard from './pages/CorporateHealthCard';
import CharityHealthCard from './pages/CharityHealthCard';
import MedicareHealthCard from './pages/MedicareHealthCard';
import AuthGate from './pages/auth/AuthGate';
import RoleLogin from './pages/auth/RoleLogin';
import RoleSignup from './pages/auth/RoleSignup';
import ProfessionalAdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminPatients from './pages/admin/AdminPatients';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminLabTests from './pages/admin/AdminLabTests';
import AdminLabCategories from './pages/admin/AdminLabCategories';
import AdminServices from './pages/admin/AdminServices';
import AdminEmergency from './pages/admin/AdminEmergency';
import AdminNotices from './pages/admin/AdminNotices';
import AdminSettings from './pages/admin/AdminSettings';
import SystemSettings from './pages/admin/settings/SystemSettings';
// New comprehensive components
import Analytics from './pages/admin/analytics/Analytics';
import ReportsHubNew from './pages/admin/reports/ReportsHubNew';
import DoctorsManagementBroken from './pages/admin/doctors/DoctorsManagementBroken.jsx';
import PatientsManagementBroken from './pages/admin/patients/PatientsManagementBroken.jsx';
import EmployeeManagement from './pages/admin/hr/EmployeeManagement';
import AdminInventory from './pages/admin/AdminInventory';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBanners from './pages/admin/AdminBanners';
import BankBook from './pages/admin/BankBook';
import DynamicAdminDashboard from './pages/admin/DynamicAdminDashboard';
// import DynamicEmployeeManagement from './pages/admin/DynamicEmployeeManagement';
const DynamicEmployeeManagement = () => null; // Fixed missing hook
import EnhancedDashboard from './pages/admin/EnhancedDashboard';
import ProfessionalBannerManagement from './pages/admin/ProfessionalBannerManagement';
// Patient Management
import AdminPatientAppointments from './pages/admin/patients/PatientAppointments';
import PatientBooking from './pages/admin/patients/AppointmentBooking';
import PatientRegistration from './pages/admin/patients/PatientRegistration';
import PatientRegistrationForm from './pages/admin/patients/PatientRegistrationForm';
import PatientMedicalHistory from './pages/admin/patients/MedicalHistory';
import PatientBilling from './pages/admin/patients/PatientBilling';
import AdminPatientRecords from './pages/admin/patients/PatientRecords';

// Pharmacy Management
import MedicalDevices from './pages/admin/pharmacy/MedicalDevices';
import FirstAid from './pages/admin/pharmacy/FirstAid';
import Supplements from './pages/admin/pharmacy/Supplements';
import PharmacySuppliers from './pages/admin/pharmacy/Suppliers';
import PharmacySales from './pages/admin/pharmacy/Sales';
import PrescriptionOrders from './pages/admin/pharmacy/PrescriptionOrders';

// Inventory Management
import StockManagement from './pages/admin/inventory/StockManagement';
import PharmacyStockManagement from './pages/admin/pharmacy/StockManagement';

// Laboratory Management
import LabEquipment from './pages/admin/lab/LabEquipment';
import LabReports from './pages/admin/lab/LabReports';
import LabQualityControl from './pages/admin/lab/QualityControl';
import LabSampleCollection from './pages/admin/lab/SampleCollection';
import LabTestResults from './pages/admin/lab/TestResults';

// Medical Management
import MedicalCombined from './pages/admin/medical/Combined';
import MedicalDiagnostic from './pages/admin/medical/Diagnostic';
import MedicalHistory from './pages/admin/medical/History';
import MedicalPrescription from './pages/admin/medical/Prescription';
import MedicalTransaction from './pages/admin/medical/Transaction';

// Department Management
import Cardiology from './pages/admin/departments/Cardiology';
import Neurology from './pages/admin/departments/Neurology';
import Orthopedics from './pages/admin/departments/Orthopedics';

// Emergency Management
import EmergencyCases from './pages/admin/emergency/EmergencyCases';

// Services Management
import ServiceCategories from './pages/admin/services/ServiceCategories';
import ServicePackages from './pages/admin/services/ServicePackages';
import ServicePricing from './pages/admin/services/ServicePricing';

// Accounts Management
import BalanceSheet from './pages/admin/accounts/BalanceSheet';
import BudgetMonitoring from './pages/admin/accounts/BudgetMonitoring';
import CashBook from './pages/admin/accounts/CashBook';
import ChartOfAccounts from './pages/admin/accounts/ChartOfAccounts';
import CreateGroup from './pages/admin/accounts/CreateGroup';
import CreateLedger from './pages/admin/accounts/CreateLedger';
import DayBook from './pages/admin/accounts/DayBook';
import IncomeStatement from './pages/admin/accounts/IncomeStatement';
import JournalEntry from './pages/admin/accounts/JournalEntry';
import TrialBalance from './pages/admin/accounts/TrialBalance';

// HR Management
import EmployeeEntry from './pages/admin/hr/EmployeeEntry';
import HRLedger from './pages/admin/hr/HRLedger';
import SalaryPayment from './pages/admin/hr/SalaryPayment';
import SalaryProcess from './pages/admin/hr/SalaryProcess';

// Analysis Management
import AnalysisDepartment from './pages/admin/analysis/AnalysisDepartment';
import AnalysisSetup from './pages/admin/analysis/AnalysisSetup';
import AnalysisSpecimen from './pages/admin/analysis/AnalysisSpecimen';
import SampleCollectionRoom from './pages/admin/analysis/SampleCollectionRoom';
import TestServiceEntry from './pages/admin/analysis/TestServiceEntry';

// Communications Management
import EmailManagement from './pages/admin/communications/EmailManagement';
import Notifications from './pages/admin/communications/Notifications';

// Marketing Management
import CampaignManagement from './pages/admin/marketing/CampaignManagement';
import Promotions from './pages/admin/marketing/Promotions';
import VideoCarouselManager from './pages/admin/marketing/VideoCarouselManager';

// Reports Management
import ReportsHub from './pages/admin/reports/ReportsHub';
import PatientReports from './pages/admin/reports/PatientReports';
import DoctorReports from './pages/admin/reports/DoctorReports';
import AppointmentReports from './pages/admin/reports/AppointmentReports';
import FinancialReports from './pages/admin/reports/FinancialReports';
import InventoryReports from './pages/admin/reports/InventoryReports';
import SalesReports from './pages/admin/reports/SalesReports';
import ServiceReports from './pages/admin/reports/ServiceReports';
import EmergencyReports from './pages/admin/reports/EmergencyReports';
import CustomReports from './pages/admin/reports/CustomReports';
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
          <Route path="health-cards" element={<HealthCards />} />
          <Route path="health-cards/premium" element={<PremiumHealthCard />} />
          <Route path="health-cards/family" element={<FamilyHealthCard />} />
          <Route path="health-cards/corporate" element={<CorporateHealthCard />} />
          <Route path="health-cards/charity" element={<CharityHealthCard />} />
          <Route path="health-cards/medicare" element={<MedicareHealthCard />} />
        </Route>

        {/* Auth */}
        <Route path="/auth" element={<AuthGate />} />
        <Route path="/auth/:role/login" element={<RoleLogin />} />
        <Route path="/auth/:role/signup" element={<RoleSignup />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<ProfessionalAdminLayout />}>
          <Route index element={<AdminDashboard />} />
          
          {/* Dashboard Sub-menus */}
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports/hub" element={<ReportsHubNew />} />
          <Route path="dynamic-dashboard" element={<DynamicAdminDashboard />} />
          <Route path="enhanced-dashboard" element={<EnhancedDashboard />} />
          
          {/* User Management */}
          <Route path="doctors" element={<DoctorsManagementBroken />} />
          <Route path="patients" element={<PatientsManagementBroken />} />
          <Route path="employee-management" element={<EmployeeManagement />} />
          <Route path="users/roles" element={<SystemSettings />} />
          
          {/* Appointments */}
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="appointments/schedule" element={<AdminAppointments />} />
          <Route path="appointments/waiting" element={<AdminAppointments />} />
          <Route path="appointments/history" element={<AdminAppointments />} />
          
          {/* Patient Management */}
          <Route path="patients/registration" element={<PatientRegistration />} />
          <Route path="patients/registration-form" element={<PatientRegistrationForm />} />
          <Route path="patients/medical-history" element={<PatientMedicalHistory />} />
          <Route path="patients/billing" element={<PatientBilling />} />
          <Route path="patients/records" element={<AdminPatientRecords />} />
          
          {/* Pharmacy Management */}
          <Route path="products" element={<AdminProducts />} />
          <Route path="pharmacy/medical-devices" element={<MedicalDevices />} />
          <Route path="pharmacy/first-aid" element={<FirstAid />} />
          <Route path="pharmacy/supplements" element={<Supplements />} />
          <Route path="pharmacy/suppliers" element={<PharmacySuppliers />} />
          <Route path="pharmacy/sales" element={<PharmacySales />} />
          <Route path="pharmacy/prescription-orders" element={<PrescriptionOrders />} />
          
          {/* Inventory Management */}
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="inventory/stock-management" element={<StockManagement />} />
          <Route path="inventory/pharmacy-stock" element={<PharmacyStockManagement />} />
          
          {/* Categories */}
          <Route path="categories" element={<AdminCategories />} />
          
          {/* Laboratory Management */}
          <Route path="lab-tests" element={<AdminLabTests />} />
          <Route path="lab-categories" element={<AdminLabCategories />} />
          <Route path="lab/equipment" element={<LabEquipment />} />
          <Route path="lab/reports" element={<LabReports />} />
          <Route path="lab/quality-control" element={<LabQualityControl />} />
          <Route path="lab/sample-collection" element={<LabSampleCollection />} />
          <Route path="lab/test-results" element={<LabTestResults />} />
          
          {/* Medical Services */}
          <Route path="medical/records" element={<MedicalCombined />} />
          <Route path="medical/prescriptions" element={<MedicalPrescription />} />
          <Route path="medical/diagnostics" element={<MedicalDiagnostic />} />
          <Route path="medical/treatments" element={<MedicalCombined />} />
          <Route path="medical/billing" element={<MedicalTransaction />} />
          
          {/* Department Management */}
          <Route path="departments/cardiology" element={<Cardiology />} />
          <Route path="departments/neurology" element={<Neurology />} />
          <Route path="departments/orthopedics" element={<Orthopedics />} />
          
          {/* Emergency Management */}
          <Route path="emergency" element={<AdminEmergency />} />
          <Route path="emergency/cases" element={<EmergencyCases />} />
          <Route path="emergency/contacts" element={<AdminEmergency />} />
          <Route path="emergency/protocols" element={<AdminEmergency />} />
          
          {/* Services Management */}
          <Route path="services" element={<AdminServices />} />
          <Route path="services/categories" element={<ServiceCategories />} />
          <Route path="services/packages" element={<ServicePackages />} />
          <Route path="services/pricing" element={<ServicePricing />} />
          
          {/* Financial */}
          <Route path="accounts/chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="accounts/transactions" element={<JournalEntry />} />
          <Route path="accounts/invoices" element={<CreateLedger />} />
          <Route path="accounts/payments" element={<CashBook />} />
          <Route path="accounts/revenue" element={<IncomeStatement />} />
          <Route path="accounts/expenses" element={<CreateGroup />} />
          
          {/* HR Management */}
          <Route path="hr/employees" element={<EmployeeEntry />} />
          <Route path="hr/attendance" element={<SalaryProcess />} />
          <Route path="hr/payroll" element={<SalaryPayment />} />
          <Route path="hr/performance" element={<HRLedger />} />
          <Route path="hr/training" element={<EmployeeEntry />} />
          
          {/* Analysis Management */}
          <Route path="analysis/setup" element={<AnalysisSetup />} />
          <Route path="analysis/specimen" element={<AnalysisSpecimen />} />
          <Route path="analysis/sample-collection-room" element={<SampleCollectionRoom />} />
          <Route path="analysis/test-service-entry" element={<TestServiceEntry />} />
          <Route path="analysis/department" element={<AnalysisDepartment />} />
          
          {/* Communications Management */}
          <Route path="communications/email" element={<EmailManagement />} />
          <Route path="communications/notifications" element={<Notifications />} />
          <Route path="communications/sms" element={<EmailManagement />} />
          <Route path="communications/alerts" element={<Notifications />} />
          
          {/* Marketing Management */}
          <Route path="marketing/campaigns" element={<CampaignManagement />} />
          <Route path="marketing/promotions" element={<Promotions />} />
          <Route path="marketing/social-media" element={<VideoCarouselManager />} />
          <Route path="marketing/content" element={<ProfessionalBannerManagement />} />
          
          {/* Reports Management */}
          <Route path="reports/hub" element={<ReportsHub />} />
          <Route path="reports/patients" element={<PatientReports />} />
          <Route path="reports/financial" element={<FinancialReports />} />
          <Route path="reports/operational" element={<DoctorReports />} />
          <Route path="reports/custom" element={<CustomReports />} />
          
          {/* Content Management */}
          <Route path="banners" element={<AdminBanners />} />
          <Route path="professional-banners" element={<ProfessionalBannerManagement />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="content/pages" element={<AdminSettings />} />
          <Route path="content/media" element={<AdminSettings />} />
          
          {/* Orders */}
          <Route path="orders" element={<AdminOrders />} />
          <Route path="bank-book" element={<BankBook />} />
          
          {/* System Settings */}
          <Route path="settings" element={<AdminSettings />} />
          <Route path="system/security" element={<AdminSettings />} />
          <Route path="system/backups" element={<AdminSettings />} />
          <Route path="system/logs" element={<AdminSettings />} />
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
