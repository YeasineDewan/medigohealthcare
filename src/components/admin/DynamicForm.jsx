import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DynamicForm({
  fields = [],
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
  className = '',
  validation = {},
  submitText = 'Submit',
  cancelText = 'Cancel',
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({ ...prev, [name]: newValue }));
    
    // Clear error when value changes
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    if (validation[name]) {
      const error = validation[name](values[name], values);
      setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(validation).forEach(key => {
      const error = validation[key](values[key], values);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(values);
    }
  };

  const renderField = (field) => {
    const value = values[field.name] || '';
    const error = touched[field.name] && errors[field.name];
    const fieldId = `field-${field.name}`;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'password':
      case 'number':
      case 'date':
        return (
          <div key={field.name} className={field.className || 'mb-4'}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              {field.icon && (
                <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              )}
              <input
                id={fieldId}
                type={field.type}
                name={field.name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                disabled={field.disabled || loading}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  field.icon ? 'pl-10' : ''
                } ${
                  error ? 'border-red-500' : 'border-gray-300'
                } ${field.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                {...field.props}
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
            {field.helper && (
              <p className="text-gray-500 text-xs mt-1">{field.helper}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className={field.className || 'mb-4'}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              {field.icon && (
                <field.icon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              )}
              <textarea
                id={fieldId}
                name={field.name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                disabled={field.disabled || loading}
                rows={field.rows || 3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  field.icon ? 'pl-10' : ''
                } ${
                  error ? 'border-red-500' : 'border-gray-300'
                } ${field.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                {...field.props}
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
            {field.helper && (
              <p className="text-gray-500 text-xs mt-1">{field.helper}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className={field.className || 'mb-4'}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              {field.icon && (
                <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              )}
              <select
                id={fieldId}
                name={field.name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={field.disabled || loading}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  field.icon ? 'pl-10' : ''
                } ${
                  error ? 'border-red-500' : 'border-gray-300'
                } ${field.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                {...field.props}
              >
                <option value="">{field.placeholder || 'Select an option'}</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label || option}
                  </option>
                ))}
              </select>
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
            {field.helper && (
              <p className="text-gray-500 text-xs mt-1">{field.helper}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className={field.className || 'mb-4'}>
            <label className="flex items-center">
              <input
                id={fieldId}
                type="checkbox"
                name={field.name}
                checked={value}
                onChange={handleChange}
                disabled={field.disabled || loading}
                className="mr-2"
                {...field.props}
              />
              <span className="text-sm text-gray-700">{field.label}</span>
            </label>
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
            {field.helper && (
              <p className="text-gray-500 text-xs mt-1">{field.helper}</p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.name} className={field.className || 'mb-4'}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={handleChange}
                    disabled={field.disabled || loading}
                    className="mr-2"
                    {...field.props}
                  />
                  <span className="text-sm text-gray-700">{option.label || option}</span>
                </label>
              ))}
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
            {field.helper && (
              <p className="text-gray-500 text-xs mt-1">{field.helper}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div key={field.name} className={field.className || 'mb-4'}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              id={fieldId}
              type="file"
              name={field.name}
              onChange={(e) => {
                const file = e.target.files[0];
                handleChange({ target: { name: field.name, value: file } });
              }}
              disabled={field.disabled || loading}
              accept={field.accept}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              } ${field.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              {...field.props}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
            {field.helper && (
              <p className="text-gray-500 text-xs mt-1">{field.helper}</p>
            )}
          </div>
        );

      case 'custom':
        return (
          <div key={field.name} className={field.className || 'mb-4'}>
            {field.render({
              value,
              onChange: handleChange,
              onBlur: handleBlur,
              error,
              touched: touched[field.name],
              disabled: field.disabled || loading,
              ...field.props
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
    >
      {fields.map(renderField)}
      
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {submitText}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
        )}
      </div>
    </motion.form>
  );
}

// Form field configurations for common use cases
export const formFields = {
  // User fields
  firstName: {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter first name',
    validation: (value) => !value ? 'First name is required' : '',
  },
  
  lastName: {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter last name',
    validation: (value) => !value ? 'Last name is required' : '',
  },
  
  email: {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'Enter email address',
    validation: (value) => {
      if (!value) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
      return '';
    },
  },
  
  phone: {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter phone number',
    validation: (value) => {
      if (value && !/^\+?[\d\s-()]+$/.test(value)) {
        return 'Invalid phone number format';
      }
      return '';
    },
  },
  
  // Address fields
  address: {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    placeholder: 'Enter address',
    rows: 3,
  },
  
  city: {
    name: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter city',
  },
  
  state: {
    name: 'state',
    label: 'State',
    type: 'select',
    options: [
      { value: 'AL', label: 'Alabama' },
      { value: 'CA', label: 'California' },
      { value: 'NY', label: 'New York' },
      { value: 'TX', label: 'Texas' },
      // Add more states as needed
    ],
  },
  
  zipCode: {
    name: 'zipCode',
    label: 'ZIP Code',
    type: 'text',
    placeholder: 'Enter ZIP code',
    validation: (value) => {
      if (value && !/^\d{5}(-\d{4})?$/.test(value)) {
        return 'Invalid ZIP code format';
      }
      return '';
    },
  },
  
  // Medical fields
  department: {
    name: 'department',
    label: 'Department',
    type: 'select',
    required: true,
    options: [
      { value: 'cardiology', label: 'Cardiology' },
      { value: 'emergency', label: 'Emergency' },
      { value: 'laboratory', label: 'Laboratory' },
      { value: 'pharmacy', label: 'Pharmacy' },
      { value: 'radiology', label: 'Radiology' },
      { value: 'pediatrics', label: 'Pediatrics' },
    ],
  },
  
  position: {
    name: 'position',
    label: 'Position',
    type: 'text',
    required: true,
    placeholder: 'Enter position',
  },
  
  joinDate: {
    name: 'joinDate',
    label: 'Join Date',
    type: 'date',
    required: true,
  },
  
  salary: {
    name: 'salary',
    label: 'Salary',
    type: 'number',
    placeholder: '0.00',
    step: '0.01',
    validation: (value) => {
      if (value && isNaN(value)) return 'Salary must be a number';
      if (value && value < 0) return 'Salary cannot be negative';
      return '';
    },
  },
  
  // Status fields
  status: {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
    ],
  },
  
  // Settings fields
  theme: {
    name: 'theme',
    label: 'Theme',
    type: 'select',
    options: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'auto', label: 'Auto' },
    ],
  },
  
  language: {
    name: 'language',
    label: 'Language',
    type: 'select',
    options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
    ],
  },
};
