import { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, User, Calendar, Phone, Globe, CreditCard, Plus, Trash2, 
  Save, FileText, RefreshCw, List, DollarSign, Calculator, Search, X,
  Mail, MapPin, Briefcase, Users2, Heart, Home, Building, UserCheck, ShoppingCart
} from 'lucide-react';

const PatientRegistrationForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    billNo: '',
    date: new Date().toISOString().split('T')[0],
    patientName: '',
    visaNo: '',
    visaDate: '',
    fathersName: '',
    passportNo: '',
    issueDate: '',
    issuedPlace: '',
    nationality: 'BANGLADESHI',
    maritalStatus: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    religion: '',
    position: '',
    phone: '',
    country: '',
    agentRef: 'Self',
    refBy: '',
    reportType: 'Online',
    photo: null,
    photoPreview: null
  });

  // Bill cart state
  const [cartItems, setCartItems] = useState([]);
  const [currentService, setCurrentService] = useState({
    serviceType: 'Test',
    serviceId: '',
    qty: 1,
    price: 0,
    less: 0,
    dept: '',
    category: '',
    itemName: '',
    sampleCollectionRoom: ''
  });

  // Invoice summary state
  const [invoiceSummary, setInvoiceSummary] = useState({
    previousDue: 0,
    totalAmount: 0,
    agCommission: 0,
    payable: 0,
    payMode: '',
    paid: 0,
    dues: 0
  });

  // Camera state
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Options for dropdowns
  const nationalities = ['BANGLADESHI', 'INDIAN', 'PAKISTANI', 'SRI LANKAN', 'NEPALESE', 'MALDIVIAN', 'OTHER'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  const genders = ['Male', 'Female', 'Other'];
  const religions = ['Islam', 'Hinduism', 'Buddhism', 'Christianity', 'Other'];
  const countries = ['Bangladesh', 'India', 'Pakistan', 'Sri Lanka', 'Nepal', 'Maldives', 'Other'];
  const serviceTypes = ['Test', 'Consultation', 'Procedure', 'Medicine', 'Other'];
  const payModes = ['Cash', 'Card', 'Mobile Banking', 'Bank Transfer', 'Online Payment'];
  const reportTypes = ['Online', 'Offline', 'Urgent', 'Regular'];

  // Mock service data
  const mockServices = [
    { id: 'TEST001', name: 'Serum Iron Profile', dept: 'LAB', category: 'BIOCHEMISTRY REPORT', price: 4000 },
    { id: 'TEST002', name: 'Complete Blood Count', dept: 'LAB', category: 'HEMATOLOGY REPORT', price: 1200 },
    { id: 'TEST003', name: 'ECG Report', dept: 'CARDIOLOGY', category: 'ECG REPORT', price: 800 },
    { id: 'TEST004', name: 'Urine Analysis', dept: 'LAB', category: 'CLINICAL PATHOLOGY REPORT', price: 600 },
    { id: 'TEST005', name: 'X-Ray Chest', dept: 'RADIOLOGY', category: 'RADIOLOGY REPORT', price: 1500 }
  ];

  // Auto-generate bill number
  useEffect(() => {
    const billNo = `BILL${Date.now()}`;
    setFormData(prev => ({ ...prev, billNo }));
  }, []);

  // Calculate age from date of birth
  useEffect(() => {
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
      setFormData(prev => ({ ...prev, age: age.toString() }));
    }
  }, [formData.dateOfBirth]);

  // Calculate invoice summary
  useEffect(() => {
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.qty - item.less), 0);
    const agCommission = totalAmount * 0.1; // 10% commission
    const payable = totalAmount + invoiceSummary.previousDue - agCommission;
    const dues = payable - invoiceSummary.paid;

    setInvoiceSummary(prev => ({
      ...prev,
      totalAmount,
      agCommission,
      payable,
      dues
    }));
  }, [cartItems, invoiceSummary.previousDue, invoiceSummary.paid]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle service search
  const handleServiceSearch = (searchTerm) => {
    const service = mockServices.find(s => 
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (service) {
      setCurrentService(prev => ({
        ...prev,
        serviceId: service.id,
        itemName: service.name,
        dept: service.dept,
        category: service.category,
        price: service.price
      }));
    }
  };

  // Add item to cart
  const addToCart = () => {
    if (currentService.serviceId && currentService.itemName) {
      const newItem = {
        ...currentService,
        id: Date.now(),
        total: currentService.price * currentService.qty - currentService.less
      };
      setCartItems(prev => [...prev, newItem]);
      
      // Reset current service
      setCurrentService({
        serviceType: 'Test',
        serviceId: '',
        qty: 1,
        price: 0,
        less: 0,
        dept: '',
        category: '',
        itemName: '',
        sampleCollectionRoom: ''
      });
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Handle camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCameraModal(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      canvasRef.current.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        setFormData(prev => ({ 
          ...prev, 
          photo: blob, 
          photoPreview: url 
        }));
        stopCamera();
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCameraModal(false);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ 
        ...prev, 
        photo: file, 
        photoPreview: url 
      }));
    }
  };

  // Handle save
  const handleSave = () => {
    console.log('Saving patient data:', formData);
    console.log('Cart items:', cartItems);
    console.log('Invoice summary:', invoiceSummary);
    alert('Patient registration saved successfully!');
  };

  // Handle clear
  const handleClear = () => {
    setFormData({
      billNo: `BILL${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      patientName: '',
      visaNo: '',
      visaDate: '',
      fathersName: '',
      passportNo: '',
      issueDate: '',
      issuedPlace: '',
      nationality: 'BANGLADESHI',
      maritalStatus: '',
      gender: '',
      dateOfBirth: '',
      age: '',
      religion: '',
      position: '',
      phone: '',
      country: '',
      agentRef: 'Self',
      refBy: '',
      reportType: 'Online',
      photo: null,
      photoPreview: null
    });
    setCartItems([]);
    setInvoiceSummary({
      previousDue: 0,
      totalAmount: 0,
      agCommission: 0,
      payable: 0,
      payMode: '',
      paid: 0,
      dues: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Patient Registration</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <List className="w-4 h-4" />
              Pending List
            </button>
            <button 
              onClick={handleClear}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Clear
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Invoice
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Reg Form
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Candidate Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Candidate Information
              </h2>

              {/* Photo Section */}
              <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="flex items-center gap-4">
                  {formData.photoPreview ? (
                    <img src={formData.photoPreview} alt="Patient" className="w-24 h-24 rounded-lg object-cover" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Patient Photo</p>
                    <div className="flex gap-2">
                      <button
                        onClick={startCamera}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 text-sm"
                      >
                        <Camera className="w-4 h-4" />
                        Take Photo
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 text-sm"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Photo
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill No</label>
                  <input
                    type="text"
                    name="billNo"
                    value={formData.billNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    placeholder="Input Patient name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visa No</label>
                  <input
                    type="text"
                    name="visaNo"
                    value={formData.visaNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visa Date</label>
                  <input
                    type="date"
                    name="visaDate"
                    value={formData.visaDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    name="fathersName"
                    value={formData.fathersName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passport No</label>
                  <input
                    type="text"
                    name="passportNo"
                    value={formData.passportNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issued Place</label>
                  <input
                    type="text"
                    name="issuedPlace"
                    value={formData.issuedPlace}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    {nationalities.map(nat => (
                      <option key={nat} value={nat}>{nat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Status</option>
                    {maritalStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Gender</option>
                    {genders.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Religion</option>
                    {religions.map(religion => (
                      <option key={religion} value={religion}>{religion}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent Ref</label>
                  <input
                    type="text"
                    name="agentRef"
                    value={formData.agentRef}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ref By</label>
                  <input
                    type="text"
                    name="refBy"
                    value={formData.refBy}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select
                    name="reportType"
                    value={formData.reportType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    {reportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bill Cart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Bill Cart +
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select
                    value={currentService.serviceType}
                    onChange={(e) => setCurrentService(prev => ({ ...prev, serviceType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service ID</label>
                  <input
                    type="text"
                    value={currentService.serviceId}
                    onChange={(e) => {
                      setCurrentService(prev => ({ ...prev, serviceId: e.target.value }));
                      handleServiceSearch(e.target.value);
                    }}
                    placeholder="Search service..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                  <input
                    type="number"
                    value={currentService.qty}
                    onChange={(e) => setCurrentService(prev => ({ ...prev, qty: parseInt(e.target.value) || 1 }))}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    value={currentService.price}
                    onChange={(e) => setCurrentService(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Less</label>
                  <input
                    type="number"
                    value={currentService.less}
                    onChange={(e) => setCurrentService(prev => ({ ...prev, less: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={addToCart}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add To Cart
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dept</label>
                  <input
                    type="text"
                    value={currentService.dept}
                    onChange={(e) => setCurrentService(prev => ({ ...prev, dept: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={currentService.category}
                    onChange={(e) => setCurrentService(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    value={currentService.itemName}
                    onChange={(e) => setCurrentService(prev => ({ ...prev, itemName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                  <input
                    type="number"
                    value={currentService.price * currentService.qty - currentService.less}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sample Collection Room</label>
                  <input
                    type="text"
                    value={currentService.sampleCollectionRoom}
                    onChange={(e) => setCurrentService(prev => ({ ...prev, sampleCollectionRoom: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Cart Items */}
              {cartItems.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-800 mb-3">Cart Items</h3>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{item.itemName}</p>
                          <p className="text-sm text-gray-600">{item.serviceId} • {item.dept}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">৳{item.total}</p>
                          <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                INVOICE SUMMARY
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Due</label>
                  <input
                    type="number"
                    value={invoiceSummary.previousDue}
                    onChange={(e) => setInvoiceSummary(prev => ({ ...prev, previousDue: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                  <input
                    type="number"
                    value={invoiceSummary.totalAmount}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">AG Commission</label>
                  <input
                    type="number"
                    value={invoiceSummary.agCommission}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payable</label>
                  <input
                    type="number"
                    value={invoiceSummary.payable}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pay Mode</label>
                  <select
                    value={invoiceSummary.payMode}
                    onChange={(e) => setInvoiceSummary(prev => ({ ...prev, payMode: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">--Select Payment List--</option>
                    {payModes.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paid</label>
                  <input
                    type="number"
                    value={invoiceSummary.paid}
                    onChange={(e) => setInvoiceSummary(prev => ({ ...prev, paid: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dues</label>
                  <input
                    type="number"
                    value={invoiceSummary.dues}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 font-medium"
                >
                  <Save className="w-5 h-5" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Camera Modal */}
        {showCameraModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <h3 className="text-lg font-semibold mb-4">Capture Photo</h3>
              <video
                ref={videoRef}
                autoPlay
                className="w-full rounded-lg mb-4"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="flex gap-2">
                <button
                  onClick={capturePhoto}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
