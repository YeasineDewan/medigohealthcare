import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Camera,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Zap,
  Package,
  RefreshCw,
  Eye,
  Download,
  Shield,
  Info
} from 'lucide-react';
import prescriptionService from '../../services/prescriptionService';
import { toast } from 'react-hot-toast';

const PrescriptionUpload = ({ customerId, customerInfo, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [formData, setFormData] = useState({
    doctorName: '',
    doctorLicense: '',
    notes: '',
    urgency: 'normal',
    deliveryMethod: 'pickup',
    preferredPharmacy: 'Main Pharmacy'
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleImageUpload = async (file) => {
    // Validate image
    const validation = prescriptionService.validatePrescriptionImage(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage({
        file,
        preview: e.target.result,
        name: file.name
      });
      setStep(2);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const processOCR = async () => {
    setOcrProcessing(true);
    try {
      const result = await prescriptionService.extractPrescriptionText(uploadedImage.file);
      setOcrResult(result);
      
      // Auto-fill form with OCR data
      if (result.doctorName) {
        setFormData(prev => ({
          ...prev,
          doctorName: result.doctorName,
          doctorLicense: result.doctorLicense || prev.doctorLicense
        }));
      }
      
      toast.success('Prescription text extracted successfully!');
    } catch (error) {
      toast.error('Failed to extract text from prescription');
    } finally {
      setOcrProcessing(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.doctorName.trim()) {
      newErrors.doctorName = 'Doctor name is required';
    }
    
    if (!formData.doctorLicense.trim()) {
      newErrors.doctorLicense = 'Doctor license is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const prescriptionData = {
        ...formData,
        image: uploadedImage.file
      };

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const result = await prescriptionService.uploadPrescription(customerId, prescriptionData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success) {
        toast.success('Prescription uploaded successfully!');
        setStep(4);
        
        // Call success callback
        if (onSuccess) {
          onSuccess(result.prescription);
        }
      } else {
        toast.error(result.error || 'Failed to upload prescription');
      }
    } catch (error) {
      toast.error('Failed to upload prescription');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setUploadedImage(null);
    setOcrResult(null);
    setFormData({
      doctorName: '',
      doctorLicense: '',
      notes: '',
      urgency: 'normal',
      deliveryMethod: 'pickup',
      preferredPharmacy: 'Main Pharmacy'
    });
    setErrors({});
    setUploadProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Upload Prescription</h2>
              <p className="text-white/90 mt-1">Submit your prescription for quick processing</p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              <span className="text-sm font-medium">Secure & HIPAA Compliant</span>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {['Upload', 'Details', 'Review', 'Confirm'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step > index + 1 ? 'bg-white text-green-600' :
                  step === index + 1 ? 'bg-white/20 text-white border-2 border-white' :
                  'bg-white/10 text-white/50'
                }`}>
                  {step > index + 1 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  step === index + 1 ? 'text-white' : 'text-white/60'
                }`}>{stepName}</span>
                {index < 3 && (
                  <div className={`w-12 h-0.5 mx-3 ${
                    step > index + 1 ? 'bg-white' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Upload */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Prescription Image</h3>
                  <p className="text-gray-600">Take a clear photo or upload your prescription</p>
                </div>

                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer bg-gray-50 hover:bg-green-50"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop your prescription image here
                  </p>
                  <p className="text-sm text-gray-600 mb-4">or click to browse</p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Choose File
                  </button>
                  <p className="text-xs text-gray-500 mt-4">
                    Supported formats: JPG, PNG, WebP (Max 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Tips for best results:</h4>
                      <ul className="text-sm text-blue-700 mt-2 list-disc list-inside space-y-1">
                        <li>Ensure good lighting and no shadows</li>
                        <li>Place prescription on flat surface</li>
                        <li>Capture all text clearly</li>
                        <li>Include doctor's signature and license</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Details */}
          <AnimatePresence mode="wait">
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription Preview</h3>
                    <div className="relative">
                      <img
                        src={uploadedImage.preview}
                        alt="Prescription"
                        className="w-full h-auto rounded-lg border border-gray-200"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          onClick={() => window.open(uploadedImage.preview, '_blank')}
                          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                          title="View Full Size"
                        >
                          <Eye className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          onClick={resetForm}
                          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                          title="Remove Image"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    
                    {/* OCR Processing */}
                    <div className="mt-4">
                      <button
                        onClick={processOCR}
                        disabled={ocrProcessing}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {ocrProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            Extract Text with AI
                          </>
                        )}
                      </button>
                      
                      {ocrResult && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="text-sm font-medium text-green-900 mb-2">Extracted Information</h4>
                          <div className="text-sm text-green-700 space-y-1">
                            <p><strong>Doctor:</strong> {ocrResult.doctorName}</p>
                            <p><strong>License:</strong> {ocrResult.doctorLicense}</p>
                            <p><strong>Medications:</strong> {ocrResult.medications.map(m => m.name).join(', ')}</p>
                            <p><strong>Confidence:</strong> {Math.round(ocrResult.confidence * 100)}%</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Doctor Name *
                        </label>
                        <div className="relative">
                          <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={formData.doctorName}
                            onChange={(e) => setFormData(prev => ({ ...prev, doctorName: e.target.value }))}
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                              errors.doctorName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Dr. Sarah Johnson"
                          />
                        </div>
                        {errors.doctorName && (
                          <p className="text-red-500 text-xs mt-1">{errors.doctorName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Doctor License *
                        </label>
                        <input
                          type="text"
                          value={formData.doctorLicense}
                          onChange={(e) => setFormData(prev => ({ ...prev, doctorLicense: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            errors.doctorLicense ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="MD12345"
                        />
                        {errors.doctorLicense && (
                          <p className="text-red-500 text-xs mt-1">{errors.doctorLicense}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Urgency
                        </label>
                        <select
                          value={formData.urgency}
                          onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="normal">Normal</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Method
                        </label>
                        <select
                          value={formData.deliveryMethod}
                          onChange={(e) => setFormData(prev => ({ ...prev, deliveryMethod: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="pickup">Store Pickup</option>
                          <option value="delivery">Home Delivery</option>
                          <option value="courier">Courier Service</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Pharmacy
                        </label>
                        <select
                          value={formData.preferredPharmacy}
                          onChange={(e) => setFormData(prev => ({ ...prev, preferredPharmacy: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="Main Pharmacy">Main Pharmacy</option>
                          <option value="Downtown Branch">Downtown Branch</option>
                          <option value="North Location">North Location</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Notes
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Any special instructions or allergies..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Continue to Review
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Review */}
          <AnimatePresence mode="wait">
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900">Review Your Prescription</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Prescription Image</h4>
                    <img
                      src={uploadedImage.preview}
                      alt="Prescription"
                      className="w-full h-auto rounded-lg border border-gray-200"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Prescription Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Doctor Name:</span>
                        <span className="font-medium">{formData.doctorName}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">License:</span>
                        <span className="font-medium">{formData.doctorLicense}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Urgency:</span>
                        <span className={`font-medium capitalize ${
                          formData.urgency === 'urgent' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {formData.urgency}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Delivery:</span>
                        <span className="font-medium capitalize">{formData.deliveryMethod}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Pharmacy:</span>
                        <span className="font-medium">{formData.preferredPharmacy}</span>
                      </div>
                      {formData.notes && (
                        <div className="py-2">
                          <span className="text-gray-600">Notes:</span>
                          <p className="font-medium mt-1">{formData.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-900">Important Notice</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        By submitting this prescription, you confirm that you have the legal right to use it 
                        and that all information provided is accurate. Our pharmacists will verify the prescription 
                        before processing your order.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isUploading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Uploading... {uploadProgress}%
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Submit Prescription
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: Success */}
          <AnimatePresence mode="wait">
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Prescription Uploaded Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Your prescription has been submitted and is being reviewed by our pharmacists.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h4>
                  <div className="text-sm text-blue-700 space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Verification: 15-30 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span>Processing: 1-2 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>You'll receive updates via email</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Upload Another
                  </button>
                  <button
                    onClick={() => window.location.href = '/patient/prescriptions'}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View My Prescriptions
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionUpload;
