import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
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

// Lazy load settings
const GeneralSettings = lazy(() => import('./pages/admin/settings/General'));
const UserManagement = lazy(() => import('./pages/admin/settings/UserManagement'));
const RolePermissions = lazy(() => import('./pages/admin/settings/RolePermissions'));
const SystemConfig = lazy(() => import('./pages/admin/settings/SystemConfig'));
const BackupRestore = lazy(() => import('./pages/admin/settings/BackupRestore'));

// Lazy load accounts
const CreateGroup = lazy(() => import('./pages/admin/accounts/CreateGroup'));
const CreateLedger = lazy(() => import('./pages/admin/accounts/CreateLedger'));
const ChartOfAccounts = lazy(() => import('./pages/admin/accounts/ChartOfAccounts'));
const TrialBalance = lazy(() => import('./pages/admin/accounts/TrialBalance'));
const BalanceSheet = lazy(() => import('./pages/admin/accounts/BalanceSheet'));
const IncomeStatement = lazy(() => import('./pages/admin/accounts/IncomeStatement'));

// Lazy load reports
const ReportsHub = lazy(() => import('./pages/admin/reports/ReportsHub.jsx'));
const PatientReports = lazy(() => import('./pages/admin/reports/PatientReports.jsx'));
const DoctorReports = lazy(() => import('./pages/admin/reports/DoctorReports.jsx'));
const AppointmentReports = lazy(() => import('./pages/admin/reports/AppointmentReports.jsx'));
const FinancialReports = lazy(() => import('./pages/admin/reports/FinancialReports.jsx'));
const InventoryReports = lazy(() => import('./pages/admin/reports/InventoryReports.jsx'));
const LabReports = lazy(() => import('./pages/admin/reports/LabReports.jsx'));
const EmergencyReports = lazy(() => import('./pages/admin/reports/EmergencyReports.jsx'));
const SalesReports = lazy(() => import('./pages/admin/reports/SalesReports.jsx'));
const ServiceReports = lazy(() => import('./pages/admin/reports/ServiceReports.jsx'));
const CustomReports = lazy(() => import('./pages/admin/reports/CustomReports.jsx'));

// Lazy load marketing
const Promotions = lazy(() => import('./pages/admin/marketing/Promotions'));

// Lazy load communications
const Notifications = lazy(() => import('./pages/admin/communications/Notifications'));

// Lazy load HR
const SalaryProcess = lazy(() => import('./pages/admin/hr/SalaryProcess'));
const EmployeeEntry = lazy(() => import('./pages/admin/hr/EmployeeEntry'));
const SalaryPayment = lazy(() => import('./pages/admin/hr/SalaryPayment'));
const HRLedger = lazy(() => import('./pages/admin/hr/HRLedger'));
const DailyAttendance = lazy(() => import('./pages/admin/hr/attendance/DailyAttendance'));
const MonthlyAttendance = lazy(() => import('./pages/admin/hr/attendance/MonthlyAttendance'));
const AttendanceReport = lazy(() => import('./pages/admin/hr/attendance/AttendanceReport'));

// Lazy load analysis
const AnalysisSetup = lazy(() => import('./pages/admin/analysis/AnalysisSetup'));
const AnalysisDepartment = lazy(() => import('./pages/admin/analysis/AnalysisDepartment'));
const TestServiceEntry = lazy(() => import('./pages/admin/analysis/TestServiceEntry'));
const AnalysisSpecimen = lazy(() => import('./pages/admin/analysis/AnalysisSpecimen'));
const SampleCollectionRoom = lazy(() => import('./pages/admin/analysis/SampleCollectionRoom'));

// Lazy load emergency
const EmergencyCases = lazy(() => import('./pages/admin/emergency/EmergencyCases'));

// Lazy load inventory
const StockManagement = lazy(() => import('./pages/admin/inventory/StockManagement'));

// Lazy load lab
const LabTestsAdmin = lazy(() => import('./pages/admin/lab/LabTests'));

// Lazy load pharmacy
const Medicines = lazy(() => import('./pages/admin/pharmacy/Medicines'));
const Supplements = lazy(() => import('./pages/admin/pharmacy/Supplements'));
const MedicalDevices = lazy(() => import('./pages/admin/pharmacy/MedicalDevices'));
const FirstAid = lazy(() => import('./pages/admin/pharmacy/FirstAid'));
const PrescriptionOrders = lazy(() => import('./pages/admin/pharmacy/PrescriptionOrders'));
const Suppliers = lazy(() => import('./pages/admin/pharmacy/Suppliers'));
const Sales = lazy(() => import('./pages/admin/pharmacy/Sales'));
const MedicalDevicesEnhanced = lazy(() => import('./pages/admin/pharmacy/MedicalDevicesEnhanced'));
const PrescriptionOrdersEnhanced = lazy(() => import('./pages/admin/pharmacy/PrescriptionOrdersEnhanced'));
const StockManagementEnhanced = lazy(() => import('./pages/admin/pharmacy/StockManagementEnhanced'));

// Lazy load services
const ServiceCategories = lazy(() => import('./pages/admin/services/ServiceCategories'));
const ServiceList = lazy(() => import('./pages/admin/services/ServiceList'));
const ServicePricing = lazy(() => import('./pages/admin/services/ServicePricing'));
const ServicePackages = lazy(() => import('./pages/admin/services/ServicePackages'));

// Lazy load medical
const Diagnostic = lazy(() => import('./pages/admin/medical/Diagnostic'));

// Lazy load Medical Check-Up
const MedicalCheckupRegistration = lazy(() => import('./pages/admin/medicalCheckup/Registration'));
const BillList = lazy(() => import('./pages/admin/medicalCheckup/BillList'));
const PendingReportList = lazy(() => import('./pages/admin/medicalCheckup/PendingReportList'));
const CompleteReportList = lazy(() => import('./pages/admin/medicalCheckup/CompleteReportList'));
const DueCollection = lazy(() => import('./pages/admin/medicalCheckup/DueCollection'));
const DueCollectionHistory = lazy(() => import('./pages/admin/medicalCheckup/DueCollectionHistory'));
const AllValueEntry = lazy(() => import('./pages/admin/medicalCheckup/AllValueEntry'));
const MedicalExaminationReport = lazy(() => import('./pages/admin/medicalCheckup/MedicalExaminationReport'));

// Lazy load Patient Management - ADMIN
const PatientRegistration = lazy(() => import('./pages/admin/patients/PatientRegistration'));
const PatientRegistrationForm = lazy(() => import('./pages/admin/patients/PatientRegistrationForm'));
const PatientRecords = lazy(() => import('./pages/admin/patients/PatientRecords'));
const MedicalHistory = lazy(() => import('./pages/admin/patients/MedicalHistory'));
const PatientAppointments = lazy(() => import('./pages/admin/patients/PatientAppointments'));
const PatientBilling = lazy(() => import('./pages/admin/patients/PatientBilling'));
const AppointmentBooking = lazy(() => import('./pages/admin/patients/AppointmentBooking'));

// Lazy load Doctor
const DoctorLayout = lazy(() => import('./components/doctor/DoctorLayout'));
const DoctorDashboard = lazy(() => import('./pages/doctor/DoctorDashboard'));
const DoctorSchedule = lazy(() => import('./pages/doctor/DoctorSchedule'));
const DoctorLiveConsult = lazy(() => import('./pages/doctor/DoctorLiveConsult'));
const DoctorPatients = lazy(() => import('./pages/doctor/DoctorPatients'));
const DoctorPrescriptions = lazy(() => import('./pages/doctor/DoctorPrescriptions'));
const DoctorReportsPage = lazy(() => import('./pages/doctor/DoctorReports'));
const DoctorEarnings = lazy(() => import('./pages/doctor/DoctorEarnings'));
const DoctorProfile = lazy(() => import('./pages/doctor/DoctorProfile'));
const EnhancedPrescriptionSystem = lazy(() => import('./pages/doctor/EnhancedPrescriptionSystem'));
const EnhancedAppointmentSystem = lazy(() => import('./pages/doctor/EnhancedAppointmentSystem'));
const EnhancedReportsSystem = lazy(() => import('./pages/doctor/EnhancedReportsSystem'));

// Lazy load Patient
const PatientLayout = lazy(() => import('./components/patient/PatientLayout'));
const PatientDashboard = lazy(() => import('./pages/patient/PatientDashboard'));
const PatientBook = lazy(() => import('./pages/patient/PatientBook'));
const PatientLiveConsult = lazy(() => import('./pages/patient/PatientLiveConsult'));
const PatientOrders = lazy(() => import('./pages/patient/PatientOrders'));
const PatientPrescriptions = lazy(() => import('./pages/patient/PatientPrescriptions'));
const PatientProfile = lazy(() => import('./pages/patient/PatientProfile'));

// Public pages
import JoinAsDoctor from './pages/JoinAsDoctor';
import PartnerHospital from './pages/PartnerHospital';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
  </div>
);

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
          <Route path="hr/salary-payment" element={<SalaryPayment />} />
          <Route path="hr/ledger" element={<HRLedger />} />
          <Route path="hr/attendance/daily" element={<DailyAttendance />} />
          <Route path="hr/attendance/monthly" element={<MonthlyAttendance />} />
          <Route path="hr/attendance/report" element={<AttendanceReport />} />
          <Route path="hr/*" element={<AdminSettings />} />
          
          {/* Reports Routes */}
          <Route path="reports" element={<Suspense fallback={<LoadingSpinner />}><ReportsHub /></Suspense>} />
          <Route path="reports/patients" element={<Suspense fallback={<LoadingSpinner />}><PatientReports /></Suspense>} />
          <Route path="reports/doctors" element={<Suspense fallback={<LoadingSpinner />}><DoctorReports /></Suspense>} />
          <Route path="reports/appointments" element={<Suspense fallback={<LoadingSpinner />}><AppointmentReports /></Suspense>} />
          <Route path="reports/financial" element={<Suspense fallback={<LoadingSpinner />}><FinancialReports /></Suspense>} />
          <Route path="reports/inventory" element={<Suspense fallback={<LoadingSpinner />}><InventoryReports /></Suspense>} />
          <Route path="reports/lab" element={<Suspense fallback={<LoadingSpinner />}><LabReports /></Suspense>} />
          <Route path="reports/emergency" element={<Suspense fallback={<LoadingSpinner />}><EmergencyReports /></Suspense>} />
          <Route path="reports/sales" element={<Suspense fallback={<LoadingSpinner />}><SalesReports /></Suspense>} />
          <Route path="reports/services" element={<Suspense fallback={<LoadingSpinner />}><ServiceReports /></Suspense>} />
          <Route path="reports/custom" element={<Suspense fallback={<LoadingSpinner />}><CustomReports /></Suspense>} />
          <Route path="reports/*" element={<AdminSettings />} />
          
          {/* Medical Check-Up Routes */}
          <Route path="medical-checkup/registration" element={<Suspense fallback={<LoadingSpinner />}><MedicalCheckupRegistration /></Suspense>} />
          <Route path="medical-checkup/bill-list" element={<Suspense fallback={<LoadingSpinner />}><BillList /></Suspense>} />
          <Route path="medical-checkup/pending-reports" element={<Suspense fallback={<LoadingSpinner />}><PendingReportList /></Suspense>} />
          <Route path="medical-checkup/complete-reports" element={<Suspense fallback={<LoadingSpinner />}><CompleteReportList /></Suspense>} />
          <Route path="medical-checkup/due-collection" element={<Suspense fallback={<LoadingSpinner />}><DueCollection /></Suspense>} />
          <Route path="medical-checkup/due-collection-history" element={<Suspense fallback={<LoadingSpinner />}><DueCollectionHistory /></Suspense>} />
          <Route path="medical-checkup/value-entry/:candidateId?" element={<Suspense fallback={<LoadingSpinner />}><AllValueEntry /></Suspense>} />
          <Route path="medical-checkup/report/:reportId" element={<Suspense fallback={<LoadingSpinner />}><MedicalExaminationReport /></Suspense>} />
          <Route path="medical-checkup/*" element={<AdminSettings />} />
          
          {/* Medical Routes */}
          <Route path="medical/diagnostic" element={<Diagnostic />} />
          <Route path="medical/*" element={<AdminSettings />} />
          
          {/* Departments Routes */}
          <Route path="departments/*" element={<AdminSettings />} />
          
          {/* Pharmacy Routes */}
          <Route path="pharmacy/medicines" element={<Medicines />} />
          <Route path="pharmacy/supplements" element={<Supplements />} />
          <Route path="pharmacy/medical-devices" element={<MedicalDevicesEnhanced />} />
          <Route path="pharmacy/first-aid" element={<FirstAid />} />
          <Route path="pharmacy/prescription-orders" element={<PrescriptionOrdersEnhanced />} />
          <Route path="pharmacy/stock" element={<StockManagementEnhanced />} />
          <Route path="pharmacy/suppliers" element={<Suppliers />} />
          <Route path="pharmacy/sales" element={<Sales />} />
          <Route path="pharmacy/*" element={<AdminSettings />} />
          
          {/* Lab Routes */}
          <Route path="lab/tests" element={<LabTestsAdmin />} />
          <Route path="lab/*" element={<AdminSettings />} />
          
          {/* Patients sub-routes */}
          <Route path="patients/registration" element={<Suspense fallback={<LoadingSpinner />}><PatientRegistration /></Suspense>} />
          <Route path="patients/registration-form" element={<Suspense fallback={<LoadingSpinner />}><PatientRegistrationForm /></Suspense>} />
          <Route path="patients/appointments" element={<Suspense fallback={<LoadingSpinner />}><PatientAppointments /></Suspense>} />
          <Route path="patients/book-appointment" element={<Suspense fallback={<LoadingSpinner />}><AppointmentBooking /></Suspense>} />
          <Route path="patients/records" element={<Suspense fallback={<LoadingSpinner />}><PatientRecords /></Suspense>} />
          <Route path="patients/history" element={<Suspense fallback={<LoadingSpinner />}><MedicalHistory /></Suspense>} />
          <Route path="patients/billing" element={<Suspense fallback={<LoadingSpinner />}><PatientBilling /></Suspense>} />
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
          <Route path="services/categories" element={<Suspense fallback={<LoadingSpinner />}><ServiceCategories /></Suspense>} />
          <Route path="services/list" element={<Suspense fallback={<LoadingSpinner />}><ServiceList /></Suspense>} />
          <Route path="services/pricing" element={<Suspense fallback={<LoadingSpinner />}><ServicePricing /></Suspense>} />
          <Route path="services/packages" element={<Suspense fallback={<LoadingSpinner />}><ServicePackages /></Suspense>} />
          <Route path="services/*" element={<AdminSettings />} />
          
          {/* Marketing Routes */}
          <Route path="marketing/promotions" element={<Promotions />} />
          <Route path="marketing/*" element={<AdminSettings />} />
          
          {/* Communications Routes */}
          <Route path="communications/notifications" element={<Notifications />} />
          <Route path="communications/*" element={<AdminSettings />} />
          
          {/* Analysis Setup Routes */}
          <Route path="analysis" element={<AnalysisSetup />} />
          <Route path="analysis/departments" element={<AnalysisDepartment />} />
          <Route path="analysis/tests" element={<TestServiceEntry />} />
          <Route path="analysis/specimens" element={<AnalysisSpecimen />} />
          <Route path="analysis/collection" element={<SampleCollectionRoom />} />
          <Route path="analysis/*" element={<AdminSettings />} />
        </Route>

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="schedule" element={<DoctorSchedule />} />
          <Route path="live-consult" element={<DoctorLiveConsult />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
          <Route path="schedule/enhanced" element={<Suspense fallback={<LoadingSpinner />}><EnhancedAppointmentSystem /></Suspense>} />
          <Route path="reports" element={<DoctorReportsPage />} />
          <Route path="reports/enhanced" element={<Suspense fallback={<LoadingSpinner />}><EnhancedReportsSystem /></Suspense>} />
          <Route path="earnings" element={<DoctorEarnings />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>

        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route path="book" element={<PatientBook />} />
          <Route path="live-consult" element={<PatientLiveConsult />} />
          <Route path="orders" element={<PatientOrders />} />
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
