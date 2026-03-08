import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Calendar, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const SECTION_STYLE = 'bg-[#b8d4e3] text-gray-900 font-semibold px-4 py-2 text-sm';

export default function AllValueEntry() {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const [fitStatus, setFitStatus] = useState('');
  const [comments, setComments] = useState('');

  const [form, setForm] = useState({
    soNo: '110207256',
    idNo: '',
    date: new Date().toISOString().split('T')[0],
    candidateId: candidateId || '260300005314',
    examDate: new Date().toISOString().split('T')[0],
    expireDate: '',
    agencyNo: '',
    agencyName: 'VIC GLOBAL',
    country: 'U.A.E (DUBAI)',
    name: 'FARHAD HOSSEN',
    fathersName: 'MD ASLAM MIAH',
    dateOfBirth: '1992-07-20',
    travelingTo: '',
    visaDate: '',
    visaNo: '',
    maritalStatus: 'MARRIED',
    nationality: 'BANGLADESHI',
    passportNo: 'A21795983',
    candidateImage: null,
    fingerImage: null,
    // Lab
    laboratoryStatus: '',
    hemoglobin: 'N/A',
    esr: 'N/A',
    tc: 'N/A',
    neutrophils: 'N/A',
    lymphocytes: 'N/A',
    monocytes: 'N/A',
    eosinophils: 'N/A',
    basophils: 'N/A',
    sBilirubin: 'N/A',
    randomBloodSugar: 'N/A',
    serumCreatinine: 'N/A',
    sgot: 'N/A',
    sgpt: 'N/A',
    bloodGroup: 'N/A',
    malarialParasite: 'N/A',
    sugar: 'N/A',
    albumin: 'N/A',
    urineRME: 'N/A',
    vaccineDate: 'N/A',
    amp: 'N/A',
    bzo: 'N/A',
    thc: 'N/A',
    opi: 'N/A',
    alc: 'N/A',
    // Physical
    physicalExamStatus: '',
    height: '',
    weight: '',
    bodyTemp: '98.7',
    pulse: '72',
    bp: '120/80',
    respRate: '',
    liver: 'Normal',
    leftEar: 'Normal',
    rightEar: 'Normal',
    spleen: 'Normal',
    heart: 'Normal',
    lungs: 'Clear',
    hydrocele: 'Absent',
    deformity: 'Absent',
    hernia: 'Absent',
    skin: 'Normal',
    // Visual
    unLeftDistant: '6/6',
    unRightDistant: '6/6',
    unNearLEye: '20/20',
    unNearREye: '20/20',
    colorVisionLt: 'Normal',
    aidedRightDistant: '6/6',
    aidedLeftDistant: '6/6',
    aNearLEye: '20/20',
    aNearREye: '20/20',
    colorVisionRt: 'Normal',
    // X-Ray
    xRayStatus: '',
    xRayResult: 'NAD',
    ecgReport: 'N/A',
    xRayComment: 'No Abnormality Detected',
    xRayImage: null,
  });

  useEffect(() => {
    if (form.examDate) {
      const d = new Date(form.examDate);
      d.setMonth(d.getMonth() + 3);
      setForm((prev) => ({ ...prev, expireDate: d.toISOString().split('T')[0] }));
    }
  }, [form.examDate]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleCreate = () => {
    alert('Record saved. In production this would submit to the API.');
    navigate('/admin/medical-checkup/bill-list');
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h1 className="text-xl font-bold text-gray-900">ALL VALUE ENTRY</h1>
        <div className="flex items-center gap-4">
          <select
            value={fitStatus}
            onChange={(e) => setFitStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="">Fit Status</option>
            <option value="fit">Fit</option>
            <option value="unfit">Unfit</option>
          </select>
          <input
            type="text"
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-48"
          />
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }} className="p-6 space-y-6">
        {/* Candidate Information */}
        <div>
          <div className={SECTION_STYLE}>Candidate Information</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-50 border border-t-0 border-gray-200">
            {[
              ['So No', 'soNo'],
              ['ID No', 'idNo'],
              ['Date', 'date', 'date'],
              ['Candidate ID', 'candidateId'],
              ['Exam Date', 'examDate', 'date'],
              ['Expire Date', 'expireDate', 'date'],
              ['Agency No', 'agencyNo'],
              ['Agency Name', 'agencyName'],
              ['Country', 'country'],
              ['Name', 'name'],
              ['Fathers Name', 'fathersName'],
              ['Date of Birth', 'dateOfBirth', 'date'],
              ['Traveling To', 'travelingTo'],
              ['Visa Date', 'visaDate', 'date'],
              ['Visa No', 'visaNo'],
              ['Marital Status', 'maritalStatus'],
              ['Nationality', 'nationality'],
              ['Passport No', 'passportNo'],
            ].map(([label, key, type]) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>
                <input
                  type={type || 'text'}
                  value={form[key] || ''}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">Candidate Image</label>
              <input type="file" accept="image/*" className="w-full text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">Finger Image</label>
              <input type="file" accept="image/*" className="w-full text-sm" />
            </div>
          </div>
        </div>

        {/* Laboratory Investigations */}
        <div>
          <div className={SECTION_STYLE}>Laboratory Investigations</div>
          <div className="p-4 bg-gray-50 border border-t-0 border-gray-200">
            <select
              value={form.laboratoryStatus}
              onChange={(e) => update('laboratoryStatus', e.target.value)}
              className="mb-3 px-3 py-2 border rounded-lg"
            >
              <option value="">Laboratory Status</option>
              <option value="complete">Complete</option>
              <option value="pending">Pending</option>
            </select>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ['Hemoglobin', 'hemoglobin'],
                ['ESR', 'esr'],
                ['TC', 'tc'],
                ['Neutrophils', 'neutrophils'],
                ['Lymphocytes', 'lymphocytes'],
                ['Monocytes', 'monocytes'],
                ['Eosinophils', 'eosinophils'],
                ['Basophils', 'basophils'],
                ['S Bilirubin', 'sBilirubin'],
                ['Random Blood Sugar', 'randomBloodSugar'],
                ['Serum Creatinine', 'serumCreatinine'],
                ['SGPT', 'sgpt'],
                ['SGOT', 'sgot'],
                ['Blood Group', 'bloodGroup'],
                ['Malarial Parasite', 'malarialParasite'],
                ['Sugar', 'sugar'],
                ['Albumin', 'albumin'],
                ['Urine R/M/E', 'urineRME'],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>
                  <input
                    type="text"
                    value={form[key] ?? 'N/A'}
                    onChange={(e) => update(key, e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dope Test */}
        <div>
          <div className={SECTION_STYLE}>Dope Test</div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-gray-50 border border-t-0 border-gray-200">
            {['Amphetamine (AMP)', 'Benzodiazepines (BZO)', 'Marijuana (THC)', 'Morphine (OPI)', 'Alcohol (ALC)'].map((label) => (
              <div key={label}>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>
                <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                  <option>N/A</option>
                  <option>Negative</option>
                  <option>Positive</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Examinations */}
        <div>
          <div className={SECTION_STYLE}>Physical Examinations</div>
          <div className="p-4 bg-gray-50 border border-t-0 border-gray-200">
            <select value={form.physicalExamStatus} onChange={(e) => update('physicalExamStatus', e.target.value)} className="mb-3 px-3 py-2 border rounded-lg">
              <option value="">Physical Exam Status</option>
              <option value="normal">Normal</option>
              <option value="abnormal">Abnormal</option>
            </select>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ['Height (CM)', 'height'],
                ['Weight (KG)', 'weight'],
                ['Body Temperature', 'bodyTemp'],
                ['Pulse (beat/min)', 'pulse'],
                ['Blood Pressure (mmHg)', 'bp'],
                ['Rsp. Rate', 'respRate'],
                ['Liver', 'liver'],
                ['Heart', 'heart'],
                ['Lungs', 'lungs'],
                ['Left Ear', 'leftEar'],
                ['Right Ear', 'rightEar'],
                ['Spleen', 'spleen'],
                ['Hydrocele', 'hydrocele'],
                ['Deformity', 'deformity'],
                ['Hernia', 'hernia'],
                ['Skin', 'skin'],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>
                  <input
                    type="text"
                    value={form[key] || ''}
                    onChange={(e) => update(key, e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Acuity */}
        <div>
          <div className={SECTION_STYLE}>Visual Acuity</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 border border-t-0 border-gray-200">
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Un Aided Eye Checkup</p>
              <div className="grid grid-cols-2 gap-2">
                {['Un. Left Eye (Distant)', 'unLeftDistant', 'Un. Right Eye (Distant)', 'unRightDistant', 'Un. Near L. Eye', 'unNearLEye', 'Un. Near R. Eye', 'unNearREye', 'Color Vision (Lt.)', 'colorVisionLt'].reduce((acc, _, i, arr) => (i % 2 === 0 ? [...acc, [arr[i], arr[i + 1]]] : acc), []).map(([label, key]) => (
                  <div key={key}>
                    <label className="block text-xs text-gray-600 mb-0.5">{label}</label>
                    <input type="text" value={form[key] || ''} onChange={(e) => update(key, e.target.value)} className="w-full px-2 py-1 border rounded text-sm" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Aided Eye Checkup</p>
              <div className="grid grid-cols-2 gap-2">
                {['Aided Right Eye (Distant)', 'aidedRightDistant', 'Aided Left Eye (Distant)', 'aidedLeftDistant', 'A. Near L. Eye', 'aNearLEye', 'A. Near R. Eye', 'aNearREye', 'Color Vision (Rt.)', 'colorVisionRt'].reduce((acc, _, i, arr) => (i % 2 === 0 ? [...acc, [arr[i], arr[i + 1]]] : acc), []).map(([label, key]) => (
                  <div key={key}>
                    <label className="block text-xs text-gray-600 mb-0.5">{label}</label>
                    <input type="text" value={form[key] || ''} onChange={(e) => update(key, e.target.value)} className="w-full px-2 py-1 border rounded text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* X Ray Report */}
        <div>
          <div className={SECTION_STYLE}>X Ray Report</div>
          <div className="p-4 bg-gray-50 border border-t-0 border-gray-200 space-y-3">
            <select value={form.xRayStatus} onChange={(e) => update('xRayStatus', e.target.value)} className="px-3 py-2 border rounded-lg">
              <option value="">X Ray Status</option>
              <option value="normal">Normal</option>
              <option value="abnormal">Abnormal</option>
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">X Ray Result</label>
                <input type="text" value={form.xRayResult} onChange={(e) => update('xRayResult', e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">ECG Report</label>
                <input type="text" value={form.ecgReport} onChange={(e) => update('ecgReport', e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-0.5">Comment</label>
                <input type="text" value={form.xRayComment} onChange={(e) => update('xRayComment', e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">X Ray Image</label>
                <input type="file" accept="image/*" className="w-full text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] font-medium">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
