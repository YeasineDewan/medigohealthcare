import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

// Custom hook for managing API data with loading, error states and caching
export function useAdminData(serviceFunction, dependencies = [], options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const {
    immediate = true,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    onSuccess,
    onError,
    transform,
  } = options;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await serviceFunction();
      const transformedData = transform ? transform(result) : result;
      
      setData(transformedData);
      setLastFetched(Date.now());
      
      if (onSuccess) {
        onSuccess(transformedData);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [serviceFunction, onSuccess, onError, transform]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate, ...dependencies]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const isDataStale = lastFetched ? Date.now() - lastFetched > cacheTime : true;

  return {
    data,
    loading,
    error,
    refetch,
    isDataStale,
    lastFetched,
  };
}

// Hook for CRUD operations
export function useCrudOperations(service, options = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { onSuccess, onError } = options;

  const executeOperation = useCallback(async (operation, ...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await service[operation](...args);
      
      if (onSuccess) {
        onSuccess(operation, result);
      }
      
      toast.success(`${operation} completed successfully`);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Operation failed';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      } else {
        toast.error(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, onSuccess, onError]);

  const create = useCallback((data) => executeOperation('create', data), [executeOperation]);
  const update = useCallback((id, data) => executeOperation('update', id, data), [executeOperation]);
  const remove = useCallback((id) => executeOperation('delete', id), [executeOperation]);

  return {
    create,
    update,
    remove,
    loading,
    error,
    executeOperation,
  };
}

// Hook for real-time data updates
export function useRealTimeUpdates(endpoint, initialData = null) {
  const [data, setData] = useState(initialData);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // WebSocket connection for real-time updates
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL || 'ws://localhost:8000'}${endpoint}`);

    ws.onopen = () => {
      setConnected(true);
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(prevData => ({
        ...prevData,
        ...message,
      }));
    };

    ws.onclose = () => {
      setConnected(false);
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [endpoint]);

  return { data, connected };
}

// Hook for pagination
export function usePagination(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / limit);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const goToPage = useCallback((pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  }, [totalPages]);

  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  return {
    page,
    limit,
    total,
    totalPages,
    setPage,
    setLimit,
    setTotal,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
}

// Hook for search and filtering
export function useSearchAndFilter(initialFilters = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const removeFilter = useCallback((key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
    setSortBy('');
    setSortOrder('asc');
  }, [initialFilters]);

  const getQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) {
      params.append('search', searchTerm);
    }
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        params.append(key, value);
      }
    });
    
    if (sortBy) {
      params.append('sort', sortBy);
      params.append('order', sortOrder);
    }
    
    return params.toString();
  }, [searchTerm, filters, sortBy, sortOrder]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    updateFilter,
    removeFilter,
    clearFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    getQueryParams,
  };
}

// Hook for form management
export function useForm(initialValues = {}, validationSchema = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when value changes
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const setError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  const markFieldTouched = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === 'checkbox' ? checked : value);
  }, [setValue]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    markFieldTouched(name);
    
    // Validate on blur
    if (validationSchema[name]) {
      const error = validationSchema[name](values[name]);
      setError(name, error);
    }
  }, [validationSchema, values, setError, markFieldTouched]);

  const validate = useCallback(() => {
    const newErrors = {};
    
    Object.keys(validationSchema).forEach(key => {
      const error = validationSchema[key](values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validationSchema, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    setValue,
    setError,
    setTouched,
    handleChange,
    handleBlur,
    validate,
    reset,
  };
}

// Hook for file uploads
export function useFileUpload(options = {}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const { maxSize = 10 * 1024 * 1024, allowedTypes = [], onSuccess, onError } = options;

  const uploadFile = useCallback(async (file) => {
    // Validate file size
    if (file.size > maxSize) {
      const errorMessage = `File size exceeds maximum limit of ${maxSize / 1024 / 1024}MB`;
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    }

    // Validate file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      const errorMessage = `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    }

    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress (in real implementation, this would come from the upload progress event)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      // In real implementation, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgress(100);
      clearInterval(progressInterval);

      const result = {
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
      };

      if (onSuccess) {
        onSuccess(result);
      }

      toast.success('File uploaded successfully');
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Upload failed';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      } else {
        toast.error(errorMessage);
      }
      
      return null;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [maxSize, allowedTypes, onSuccess, onError]);

  return {
    uploadFile,
    uploading,
    progress,
    error,
  };
}
