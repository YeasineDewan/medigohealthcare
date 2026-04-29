import { useState, useRef } from 'react';
import { Upload, X, FileImage, FileText, AlertCircle } from 'lucide-react';

export default function FileUpload({
  accept = 'image/*,.pdf,.doc,.docx',
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
  value,
  onChange,
  className = '',
  placeholder = 'Drop files here or click to browse',
  showPreview = true,
  disabled = false
}) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const files = Array.isArray(value) ? value : value ? [value] : [];

  const validateFile = (file) => {
    if (file.size > maxSize) {
      setError(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
      return false;
    }

    const acceptedTypes = accept.split(',').map(type => type.trim());
    const isAccepted = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -2));
      }
      return file.type === type;
    });

    if (!isAccepted) {
      setError(`File type not accepted. Accepted types: ${accept}`);
      return false;
    }

    return true;
  };

  const handleFiles = (newFiles) => {
    setError('');
    const validFiles = newFiles.filter(validateFile);
    
    if (validFiles.length === 0) return;

    const updatedFiles = multiple 
      ? [...files, ...validFiles]
      : validFiles;

    onChange(multiple ? updatedFiles : updatedFiles[0]);
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
    e.target.value = ''; // Reset input
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onChange(multiple ? updatedFiles : updatedFiles[0] || null);
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return FileImage;
    }
    return FileText;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer
          ${dragActive 
            ? 'border-[#5DBB63] bg-[#f0fdf2]' 
            : 'border-gray-300 hover:border-[#5DBB63] hover:bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
        
        <div className="space-y-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
            dragActive ? 'bg-[#5DBB63] text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            <Upload className="w-6 h-6" />
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700">{placeholder}</p>
            <p className="text-xs text-gray-500 mt-1">
              Max file size: {(maxSize / 1024 / 1024).toFixed(1)}MB
            </p>
            {accept && (
              <p className="text-xs text-gray-500">
                Accepted: {accept}
              </p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {files.length > 0 && showPreview && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => {
            const Icon = getFileIcon(file);
            const isImage = file.type.startsWith('image/');
            const preview = isImage && file instanceof File 
              ? URL.createObjectURL(file) 
              : (typeof file === 'string' ? file : null);

            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                {isImage && preview ? (
                  <img
                    src={preview}
                    alt={file.name || 'Preview'}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gray-500" />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name || 'Uploaded file'}
                  </p>
                  {file.size && (
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  )}
                </div>
                
                {!disabled && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
