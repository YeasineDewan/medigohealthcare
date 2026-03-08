import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, X, Save, Printer, FileText, User, Calendar, 
  Phone, MapPin, Weight, Ruler, AlertCircle, CheckCircle, 
  Clock, Download, Upload, Eye, Edit2, Trash2, Copy,
  Stethoscope, Activity, Pill, FlaskConical, Microscope,
  TrendingUp, Heart, Brain, Bone, Eye, Baby, Bold, Italic,
  Underline, Strikethrough, Link, List, Quote, Code, Table,
  Type, AlignLeft, AlignCenter, AlignRight, Highlighter,
  Image, Video, Paperclip, Send, ChevronDown, Zap,
  Shield, Info
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const PrescriptionForm = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Patient Information State
  const [patientInfo, setPatientInfo] = useState({
    appointmentId: '',
    patientName: '',
    age: '',
    sex: 'female',
    mobile: '',
    address: '',
    height: '',
    weight: '',
    visitDate: new Date().toISOString().split('T')[0],
    nextVisitDate: '',
    prescriptionStatus: 'pending',
    doctorId: 'DR001'
  });

  // Prescription Sections State
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [drugHistory, setDrugHistory] = useState('');
  const [onExamination, setOnExamination] = useState([]);
  const [diagnosis, setDiagnosis] = useState([{ id: Date.now(), content: '' }]);
  const [investigationFindings, setInvestigationFindings] = useState([{ id: Date.now(), content: '' }]);
  const [investigations, setInvestigations] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [advice, setAdvice] = useState('');

  // Rich Text Editor State
  const [diagnosisEditor, setDiagnosisEditor] = useState('');
  const [findingsEditor, setFindingsEditor] = useState('');
  const [activeEditor, setActiveEditor] = useState(null);

  // Drug Interaction State
  const [drugInteractions, setDrugInteractions] = useState([]);
  const [showInteractions, setShowInteractions] = useState(false);

  // Medical Templates
  const [showMedicalTemplates, setShowMedicalTemplates] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');

  // Drug Database (Mock)
  const [drugDatabase] = useState([
    { id: 1, name: 'Paracetamol 500mg', category: 'Analgesic', dosage: '500mg', frequency: 'TID' },
    { id: 2, name: 'Amoxicillin 500mg', category: 'Antibiotic', dosage: '500mg', frequency: 'TID' },
    { id: 3, name: 'Ibuprofen 400mg', category: 'NSAID', dosage: '400mg', frequency: 'TID' },
    { id: 4, name: 'Omeprazole 20mg', category: 'PPI', dosage: '20mg', frequency: 'OD' },
    { id: 5, name: 'Metformin 500mg', category: 'Antidiabetic', dosage: '500mg', frequency: 'BD' },
    { id: 6, name: 'Amlodipine 5mg', category: 'Antihypertensive', dosage: '5mg', frequency: 'OD' },
    { id: 7, name: 'Atorvastatin 10mg', category: 'Statin', dosage: '10mg', frequency: 'OD' },
    { id: 8, name: 'Salbutamol Inhaler', category: 'Bronchodilator', dosage: '100mcg', frequency: 'PRN' }
  ]);

  const [drugSearchTerm, setDrugSearchTerm] = useState('');
  const [showDrugSuggestions, setShowDrugSuggestions] = useState(false);

  // Templates
  const [templates] = useState([
    { id: 1, name: 'Fever Template', category: 'Common' },
    { id: 2, name: 'Hypertension Template', category: 'Chronic' },
    { id: 3, name: 'Diabetes Template', category: 'Chronic' },
    { id: 4, name: 'Infection Template', category: 'Acute' }
  ]);

  
  // Add dynamic field functions
  const addOnExamination = () => {
    setOnExamination([...onExamination, { id: Date.now(), title: '', value: '' }]);
  };

  const updateOnExamination = (id, field, value) => {
    setOnExamination(onExamination.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeOnExamination = (id) => {
    setOnExamination(onExamination.filter(item => item.id !== id));
  };

  const addDiagnosis = () => {
    setDiagnosis([...diagnosis, { id: Date.now(), type: '', description: '', severity: 'moderate' }]);
  };

  const updateDiagnosis = (id, field, value) => {
    setDiagnosis(diagnosis.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeDiagnosis = (id) => {
    setDiagnosis(diagnosis.filter(item => item.id !== id));
  };

  const addInvestigation = () => {
    setInvestigations([...investigations, { id: Date.now(), test: '', urgency: 'routine' }]);
  };

  const updateInvestigation = (id, field, value) => {
    setInvestigations(investigations.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeInvestigation = (id) => {
    setInvestigations(investigations.filter(item => item.id !== id));
  };

  const addPrescriptionDrug = () => {
    setPrescription([...prescription, { 
      id: Date.now(), 
      drug: '', 
      dosage: '', 
      frequency: '', 
      duration: '', 
      instructions: '',
      route: 'oral'
    }]);
  };

  const updatePrescription = (id, field, value) => {
    setPrescription(prescription.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removePrescription = (id) => {
    setPrescription(prescription.filter(item => item.id !== id));
  };

  const selectDrugFromDatabase = (drug) => {
    const newDrug = {
      id: Date.now(),
      drug: drug.name,
      dosage: drug.dosage,
      frequency: drug.frequency,
      duration: '',
      instructions: '',
      route: 'oral'
    };
    setPrescription([...prescription, newDrug]);
    setDrugSearchTerm('');
    setShowDrugSuggestions(false);
  };

  const filteredDrugs = drugDatabase.filter(drug =>
    drug.name.toLowerCase().includes(drugSearchTerm.toLowerCase()) ||
    drug.category.toLowerCase().includes(drugSearchTerm.toLowerCase())
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: 'Prescription Saved',
        description: 'Prescription has been saved successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save prescription',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAndPrint = async () => {
    await handleSave();
    setTimeout(handlePrint, 500);
  };

  const loadTemplate = (templateId) => {
    // Mock template loading
    toast({
      title: 'Template Loaded',
      description: `${templates.find(t => t.id === templateId)?.name} has been applied`
    });
    setShowMedicalTemplates(false);
  };

  // Rich Text Editor Functions
  const RichTextEditor = ({ id, content, onChange, placeholder, isActive }) => {
    const [showToolbar, setShowToolbar] = useState(false);
    const editorRef = useRef(null);

    const formatText = (command, value = null) => {
      document.execCommand(command, false, value);
      onChange(editorRef.current.innerHTML);
    };

    const addLink = () => {
      const url = prompt('Enter URL:');
      if (url) formatText('createLink', url);
    };

    const addList = (type) => {
      formatText(type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList');
    };

    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {showToolbar && (
          <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
            <select
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              onChange={(e) => formatText('formatBlock', e.target.value)}
            >
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
            </select>
            <button
              onClick={() => formatText('bold')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('italic')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('underline')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('strikeThrough')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <button
              onClick={addLink}
              className="p-1 hover:bg-gray-200 rounded"
              title="Link"
            >
              <Link className="w-4 h-4" />
            </button>
            <button
              onClick={() => addList('unordered')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => addList('ordered')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Numbered List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('formatBlock', 'blockquote')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('insertHorizontalRule')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Horizontal Rule"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('justifyLeft')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('justifyCenter')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('justifyRight')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[120px] p-3 focus:outline-none"
          onClick={() => setShowToolbar(true)}
          onBlur={() => {
            setShowToolbar(false);
            onChange(editorRef.current.innerHTML);
          }}
          onInput={(e) => onChange(e.target.innerHTML)}
          dangerouslySetInnerHTML={{ __html: content }}
          placeholder={placeholder}
        />
      </div>
    );
  };

  // Drug Interaction Checker
  const checkDrugInteractions = (currentDrugs) => {
    const interactions = [];
    // Mock interaction checking logic
    if (currentDrugs.some(d => d.drug?.includes('Amoxicillin')) && 
        currentDrugs.some(d => d.drug?.includes('Ibuprofen'))) {
      interactions.push({
        severity: 'moderate',
        description: 'Amoxicillin and Ibuprofen may increase risk of gastrointestinal side effects',
        recommendation: 'Monitor patient for GI symptoms'
      });
    }
    setDrugInteractions(interactions);
    if (interactions.length > 0) {
      setShowInteractions(true);
    }
  };

  const tabs = [
    { id: 'all', label: 'Show All', icon: FileText },
    { id: 'cc', label: 'C/C', icon: AlertCircle },
    { id: 'history', label: 'Drug History', icon: Clock },
    { id: 'oe', label: 'O/E', icon: Activity },
    { id: 'diagnosis', label: 'Diagnosis', icon: Stethoscope },
    { id: 'findings', label: 'Investigation Findings', icon: Microscope },
    { id: 'investigation', label: 'Investigation', icon: FlaskConical },
    { id: 'rx', label: 'Rx', icon: Pill },
    { id: 'advice', label: 'Advice', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prescription Management</h1>
              <p className="text-gray-500 mt-1">Create and manage patient prescriptions</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowMedicalTemplates(!showMedicalTemplates)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Upload className="w-4 h-4" />
                Templates
              </button>
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Eye className="w-4 h-4" />
                {isPreviewMode ? 'Edit Mode' : 'Preview'}
              </button>
            </div>
          </div>
        </div>

        {/* Templates Dropdown */}
        <AnimatePresence>
          {showMedicalTemplates && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6"
            >
              <h3 className="font-semibold mb-3">Quick Templates</h3>
              <div className="grid grid-cols-4 gap-3">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template.id)}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 text-left"
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-gray-500">{template.category}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Patient Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment/Prescription ID
                  </label>
                  <input
                    type="text"
                    value={patientInfo.appointmentId}
                    onChange={(e) => setPatientInfo({...patientInfo, appointmentId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto-generated"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={patientInfo.patientName}
                    onChange={(e) => setPatientInfo({...patientInfo, patientName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="text"
                    value={patientInfo.age}
                    onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="male"
                        checked={patientInfo.sex === 'male'}
                        onChange={(e) => setPatientInfo({...patientInfo, sex: e.target.value})}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="female"
                        checked={patientInfo.sex === 'female'}
                        onChange={(e) => setPatientInfo({...patientInfo, sex: e.target.value})}
                        className="mr-2"
                      />
                      Female
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={patientInfo.mobile}
                      onChange={(e) => setPatientInfo({...patientInfo, mobile: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mobile number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={patientInfo.visitDate}
                      onChange={(e) => setPatientInfo({...patientInfo, visitDate: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={patientInfo.address}
                      onChange={(e) => setPatientInfo({...patientInfo, address: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Patient address"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={patientInfo.height}
                      onChange={(e) => setPatientInfo({...patientInfo, height: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Height (cm)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={patientInfo.weight}
                      onChange={(e) => setPatientInfo({...patientInfo, weight: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Weight (kg)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-1 p-2 overflow-x-auto">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Chief Complaint */}
                {(activeTab === 'all' || activeTab === 'cc') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      Chief Complaint (C/C)
                    </h3>
                    <textarea
                      value={chiefComplaint}
                      onChange={(e) => setChiefComplaint(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Enter patient's chief complaints..."
                    />
                  </motion.div>
                )}

                {/* Drug History */}
                {(activeTab === 'all' || activeTab === 'history') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      Drug History
                    </h3>
                    <textarea
                      value={drugHistory}
                      onChange={(e) => setDrugHistory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Enter patient's drug history..."
                    />
                  </motion.div>
                )}

                {/* On Examination */}
                {(activeTab === 'all' || activeTab === 'oe') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg font-semibold flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      O/E
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="space-y-3">
                        {onExamination.map(item => (
                          <div key={item.id} className="flex gap-3">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                              <select
                                value={item.title}
                                onChange={(e) => updateOnExamination(item.id, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="">Select Title</option>
                                <option value="general">General Appearance</option>
                                <option value="vitals">Vital Signs</option>
                                <option value="cardiovascular">Cardiovascular</option>
                                <option value="respiratory">Respiratory</option>
                                <option value="abdominal">Abdominal</option>
                                <option value="neurological">Neurological</option>
                                <option value="musculoskeletal">Musculoskeletal</option>
                              </select>
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                              <input
                                type="text"
                                value={item.value}
                                onChange={(e) => updateOnExamination(item.id, 'value', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Value"
                              />
                            </div>
                            <button
                              onClick={() => removeOnExamination(item.id)}
                              className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <select
                              value={onExamination.find(item => item.id === 'new')?.title || ''}
                              onChange={(e) => {
                                const existing = onExamination.find(item => item.id === 'new');
                                if (existing) {
                                  updateOnExamination('new', 'title', e.target.value);
                                } else {
                                  setOnExamination([...onExamination, { id: 'new', title: e.target.value, value: '' }]);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select Title</option>
                              <option value="general">General Appearance</option>
                              <option value="vitals">Vital Signs</option>
                              <option value="cardiovascular">Cardiovascular</option>
                              <option value="respiratory">Respiratory</option>
                              <option value="abdominal">Abdominal</option>
                              <option value="neurological">Neurological</option>
                              <option value="musculoskeletal">Musculoskeletal</option>
                            </select>
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                            <input
                              type="text"
                              value={onExamination.find(item => item.id === 'new')?.value || ''}
                              onChange={(e) => {
                                const existing = onExamination.find(item => item.id === 'new');
                                if (existing) {
                                  updateOnExamination('new', 'value', e.target.value);
                                } else {
                                  setOnExamination([...onExamination, { id: 'new', title: '', value: e.target.value }]);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Value"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const newOE = onExamination.find(item => item.id === 'new');
                              if (newOE && newOE.title && newOE.value) {
                                const updated = onExamination.map(item => 
                                  item.id === 'new' ? { ...item, id: Date.now() } : item
                                );
                                setOnExamination(updated);
                              }
                            }}
                            className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Diagnosis */}
                {(activeTab === 'all' || activeTab === 'diagnosis') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg font-semibold flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" />
                      Diagnosis
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="mb-3">
                        <RichTextEditor
                          id="diagnosis"
                          content={diagnosisEditor}
                          onChange={setDiagnosisEditor}
                          placeholder="Enter diagnosis details..."
                          isActive={activeEditor === 'diagnosis'}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            if (diagnosisEditor.trim()) {
                              setDiagnosis([...diagnosis, { id: Date.now(), content: diagnosisEditor }]);
                              setDiagnosisEditor('');
                            }
                          }}
                          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Investigation Findings */}
                {(activeTab === 'all' || activeTab === 'findings') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg font-semibold flex items-center gap-2">
                      <Microscope className="w-4 h-4" />
                      Investigation Findings
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="mb-3">
                        <RichTextEditor
                          id="findings"
                          content={findingsEditor}
                          onChange={setFindingsEditor}
                          placeholder="Enter investigation findings..."
                          isActive={activeEditor === 'findings'}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            if (findingsEditor.trim()) {
                              setInvestigationFindings([...investigationFindings, { id: Date.now(), content: findingsEditor }]);
                              setFindingsEditor('');
                            }
                          }}
                          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Investigations */}
                {(activeTab === 'all' || activeTab === 'investigation') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg font-semibold flex items-center gap-2">
                      <FlaskConical className="w-4 h-4" />
                      Investigation
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="space-y-3">
                        {investigations.map(item => (
                          <div key={item.id} className="flex gap-3">
                            <input
                              type="text"
                              value={item.test}
                              onChange={(e) => updateInvestigation(item.id, 'test', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Investigation:"
                            />
                            <button
                              onClick={() => removeInvestigation(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={investigations.find(item => item.id === 'new')?.test || ''}
                            onChange={(e) => {
                              const existing = investigations.find(item => item.id === 'new');
                              if (existing) {
                                updateInvestigation('new', 'test', e.target.value);
                              } else {
                                setInvestigations([...investigations, { id: 'new', test: e.target.value }]);
                              }
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Investigation:"
                          />
                          <button
                            onClick={() => {
                              const newInvestigation = investigations.find(item => item.id === 'new');
                              if (newInvestigation && newInvestigation.test.trim()) {
                                const updated = investigations.map(item => 
                                  item.id === 'new' ? { ...item, id: Date.now() } : item
                                );
                                setInvestigations(updated);
                              }
                            }}
                            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Prescription (Rx) */}
                {(activeTab === 'all' || activeTab === 'rx') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg font-semibold flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Rx.
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medicine</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={drugSearchTerm}
                            onChange={(e) => {
                              setDrugSearchTerm(e.target.value);
                              setShowDrugSuggestions(true);
                            }}
                            onFocus={() => setShowDrugSuggestions(true)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Write Medicine"
                          />
                        </div>
                      
                      {showDrugSuggestions && drugSearchTerm && (
                        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                          {filteredDrugs.map(drug => (
                            <button
                              key={drug.id}
                              onClick={() => selectDrugFromDatabase(drug)}
                              className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium">{drug.name}</div>
                              <div className="text-sm text-gray-500">{drug.category} • {drug.dosage} • {drug.frequency}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    </div>

                    <div className="space-y-4">
                      {prescription.map(item => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <input
                              type="text"
                              value={item.drug}
                              onChange={(e) => updatePrescription(item.id, 'drug', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Drug name"
                            />
                            <input
                              type="text"
                              value={item.dosage}
                              onChange={(e) => updatePrescription(item.id, 'dosage', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Dosage"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-3 mb-3">
                            <input
                              type="text"
                              value={item.frequency}
                              onChange={(e) => updatePrescription(item.id, 'frequency', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Frequency"
                            />
                            <input
                              type="text"
                              value={item.duration}
                              onChange={(e) => updatePrescription(item.id, 'duration', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Duration"
                            />
                            <select
                              value={item.route}
                              onChange={(e) => updatePrescription(item.id, 'route', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="oral">Oral</option>
                              <option value="iv">IV</option>
                              <option value="im">IM</option>
                              <option value="topical">Topical</option>
                              <option value="inhalation">Inhalation</option>
                            </select>
                          </div>
                          <textarea
                            value={item.instructions}
                            onChange={(e) => updatePrescription(item.id, 'instructions', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={2}
                            placeholder="Special instructions..."
                          />
                          <button
                            onClick={() => removePrescription(item.id)}
                            className="mt-2 text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addPrescriptionDrug}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                        Add Drug
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Advice */}
                {(activeTab === 'all' || activeTab === 'advice') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      Advice
                    </h3>
                    <textarea
                      value={advice}
                      onChange={(e) => setAdvice(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Enter medical advice and instructions..."
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between">
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Apply Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleSaveAndPrint}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    <Printer className="w-4 h-4" />
                    Save & Print
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Preview
              </h2>
              
              {/* Doctor Info */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg">DR. PAVEL CHOWDHURY</h3>
                  <p className="text-sm text-gray-600">MBBS (Dhaka Medical College)</p>
                  <p className="text-sm text-gray-600">FCPS (Medicine) FRCP (UK)</p>
                  <p className="text-sm text-gray-600">Member of American College of Physicians</p>
                  <p className="text-sm text-gray-600">Medicine Specialist</p>
                </div>
                <div className="mt-4">
                  <div className="w-full h-12 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">PRESCRIPTION ID: {patientInfo.appointmentId || 'AUTO'}</span>
                  </div>
                </div>
              </div>

              {/* Patient Info Preview */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Name:</span>
                  <span className="text-sm font-medium">{patientInfo.patientName || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Age:</span>
                  <span className="text-sm font-medium">{patientInfo.age || '-'} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sex:</span>
                  <span className="text-sm font-medium capitalize">{patientInfo.sex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Mobile:</span>
                  <span className="text-sm font-medium">{patientInfo.mobile || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Weight:</span>
                  <span className="text-sm font-medium">{patientInfo.weight || '-'} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Date:</span>
                  <span className="text-sm font-medium">{patientInfo.visitDate}</span>
                </div>
              </div>

              {/* Prescription Content Preview */}
              <div className="space-y-4 text-sm">
                {chiefComplaint && (
                  <div>
                    <h4 className="font-semibold text-gray-700">C/C:</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">{chiefComplaint}</p>
                  </div>
                )}
                
                {drugHistory && (
                  <div>
                    <h4 className="font-semibold text-gray-700">Drug History:</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">{drugHistory}</p>
                  </div>
                )}
                
                {onExamination.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700">O/E:</h4>
                    <ul className="text-gray-600">
                      {onExamination.map((item, index) => (
                        <li key={item.id}>{item.title}: {item.value}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {diagnosis.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700">Diagnosis:</h4>
                    <ul className="text-gray-600">
                      {diagnosis.map((item, index) => (
                        <li key={item.id}>{item.description}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {investigations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700">Investigations:</h4>
                    <ul className="text-gray-600">
                      {investigations.map((item, index) => (
                        <li key={item.id}>{item.test} ({item.urgency})</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {prescription.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700">Rx:</h4>
                    <div className="space-y-2">
                      {prescription.map((item, index) => (
                        <div key={item.id} className="border-l-2 border-blue-400 pl-2">
                          <div className="font-medium">{item.drug}</div>
                          <div className="text-xs text-gray-600">
                            {item.dosage} - {item.frequency} - {item.duration}
                          </div>
                          {item.instructions && (
                            <div className="text-xs text-gray-500">{item.instructions}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {advice && (
                  <div>
                    <h4 className="font-semibold text-gray-700">Advice:</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">{advice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;
