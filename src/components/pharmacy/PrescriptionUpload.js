import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  X,
  FileText,
  Image,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  Camera,
  File,
  Plus,
  Trash2,
  Eye,
  Download,
  RefreshCw,
  Info,
  Zap,
  Heart,
  Brain,
  Bone,
  Pill,
  TestTube
} from 'lucide-react';

const PrescriptionUpload = ({ onUpload, onClose, existingFiles = [] }) => {
  const [files, setFiles] = useState(existingFiles);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [uploadStep, setUploadStep] = useState(1);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Only images and PDFs are allowed.`);
        return false;
      }
      
      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Maximum size is 10MB.`);
        return false;
      }
      
      return true;
    });

    const processedFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      status: 'pending', // pending, uploading, uploaded, error
      progress: 0
    }));

    setFiles([...files, ...processedFiles]);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId));
    if (previewFile?.id === fileId) {
      setPreviewFile(null);
    }
  };

  const simulateUpload = (file) => {
    setUploading(true);
    setUploadStep(2);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'uploaded', progress: 100 }
            : f
        ));
        
        setUploading(false);
        setUploadStep(3);
        
        // Auto close after successful upload
        setTimeout(() => {
          if (files.every(f => f.status === 'uploaded')) {
            handleComplete();
          }
        }, 2000);
      } else {
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, progress }
            : f
        ));
      }
    }, 300);
  };

  const handleComplete = () => {
    const uploadedFiles = files.filter(f => f.status === 'uploaded').map(f => f.file);
    onUpload(uploadedFiles);
    onClose();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return Image;
    if (type === 'application/pdf') return FileText;
    return File;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'text-green-600';
      case 'uploading': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded': return CheckCircle;
      case 'uploading': return RefreshCw;
      case 'error': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Upload Prescription</h2>
              <p className="text-emerald-100">
                Upload your prescription for pharmacist verification
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-emerald-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            {[
              { id: 1, label: 'Upload Files', icon: Upload },
              { id: 2, label: 'Processing', icon: RefreshCw },
              { id: 3, label: 'Verification', icon: Shield }
            ].map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  uploadStep >= step.id
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {uploadStep > step.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  uploadStep >= step.id ? 'text-emerald-600' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
                {index < 2 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    uploadStep > step.id ? 'bg-emerald-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Upload Area */}
          {files.length === 0 && (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Drop prescription files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse from your computer
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileInput}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Choose Files
              </button>
              <div className="mt-4 text-sm text-gray-500">
                <p>Supported formats: JPG, PNG, PDF</p>
                <p>Maximum file size: 10MB per file</p>
              </div>
            </div>
          )}

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Uploaded Files ({files.length})
                </h3>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add More
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            {React.createElement(getFileIcon(file.type), { className: 'w-5 h-5 text-gray-600' })}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 truncate max-w-xs">
                              {file.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreviewFile(file)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Upload Progress */}
                      {file.status === 'uploading' && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Uploading...</span>
                            <span>{Math.round(file.progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Status */}
                      <div className="flex items-center gap-2">
                        {React.createElement(getStatusIcon(file.status), {
                          className: `w-4 h-4 ${getStatusColor(file.status)} ${file.status === 'uploading' ? 'animate-spin' : ''}`
                        })}
                        <span className={`text-sm font-medium ${getStatusColor(file.status)}`}>
                          {file.status === 'pending' && 'Pending'}
                          {file.status === 'uploading' && 'Uploading...'}
                          {file.status === 'uploaded' && 'Uploaded Successfully'}
                          {file.status === 'error' && 'Upload Failed'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Prescription Verification Process
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Upload clear prescription images or PDFs</li>
              <li>• Our pharmacists will verify authenticity and dosage</li>
              <li>• Investigation typically takes 2-4 hours</li>
              <li>• You'll receive SMS/email confirmation</li>
              <li>• Approved medicines will be available for delivery</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              {files.length > 0 && files.some(f => f.status === 'pending') && (
                <button
                  onClick={() => {
                    files.filter(f => f.status === 'pending').forEach(simulateUpload);
                  }}
                  disabled={uploading}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Processing...' : 'Start Upload'}
                </button>
              )}
              {files.length > 0 && files.every(f => f.status === 'uploaded') && (
                <button
                  onClick={handleComplete}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Complete Upload
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-60"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {previewFile.name}
                  </h3>
                  <button
                    onClick={() => setPreviewFile(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="overflow-auto max-h-[70vh]">
                  {previewFile.type.startsWith('image/') ? (
                    <img
                      src={previewFile.url}
                      alt={previewFile.name}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">PDF Preview</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {formatFileSize(previewFile.size)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PrescriptionUpload;
