import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { Printer, Download } from 'lucide-react';

// Mock report data – in production would come from API
const getReportData = (reportId) => ({
  id: reportId,
  idNo: 'ID-2026-001',
  agencyLicNo: 'AG-LIC-001',
  dateExamined: '2026-03-05',
  reportExpiryDate: '2026-06-03',
  title: 'MEDICAL EXAMINATION REPORT FOR LAOS',
  name: 'MD EMAMUL SHEIKH',
  fathersName: 'HARUN SHEIKH',
  passportNo: 'A09884048',
  dateOfBirth: '04-Mar-1999',
  nationality: 'BANGLADESHI',
  maritalStatus: 'UNMARRIED',
  agentName: 'BTA',
  sex: 'MALE',
  candidatePhoto: null,
  labResults: {
    hemoglobin: 'N/A',
    esr: 'N/A',
    tc: 'N/A',
    lymphocytes: 'N/A',
    monocytes: 'N/A',
    eosinophils: 'N/A',
    randomBloodSugar: '114',
    sBilirubin: '0.6',
    sgot: '17',
    sgpt: '26',
    serumCreatinine: '0.89',
    bloodGroup: 'A+ (Positive)',
    hbsAg: 'Negative',
    tpha: 'Non-Reactive',
    vdrl: 'Non-Reactive',
    antiHcv: 'Non-Reactive',
    antiHiv: 'N/A',
    malarialParasite: 'N/A',
    urineSugar: 'NILL',
    urineAlbumin: 'NILL',
  },
  physical: {
    height: '165 CM',
    weight: '52 KG',
    pulse: '98 beat/min',
    bp: '120/80 mmHg',
    heart: 'Normal',
    lungs: 'Clear',
    liver: 'Normal',
    leprosy: 'Normal',
    aidedVision: '6/6',
    unaidedVision: '6/6',
    colorVision: 'Normal',
    ear: 'Normal',
    hernia: 'Absent',
    hydrocele: 'Absent',
    deformity: 'Absent',
    skin: 'Normal',
  },
  xray: 'Hilar Shadows & Vascular Markings are normal, Lung fields are clean. Heart: Normal in size and shape. Cost phrenic angles are clear. Diaphragm: Normal in Position and contour. X-RAY Report: No Abnormality Detected.',
  conclusion: 'FIT for the job.',
  doctorName: 'DR.RAQUIBUL HASAN MBBS,BCS (Health),MD (PATHOLOGY)',
  doctorTitle: 'Assistant Professor (Pathology), SSMC Consultant Pathologist MEDIGO HEALTHCARE',
});

export default function MedicalExaminationReport() {
  const { reportId } = useParams();
  const [searchParams] = useSearchParams();
  const printRef = useRef(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [report] = useState(() => getReportData(reportId));

  const reportShareUrl = `${window.location.origin}/admin/medical-checkup/report/${reportId}`;

  useEffect(() => {
    QRCode.toDataURL(reportShareUrl, { width: 140, margin: 1 })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(''));
  }, [reportId, reportShareUrl]);

  const isReceipt = searchParams.get('print') === 'invoice';

  useEffect(() => {
    if (searchParams.get('print') === '1' || isReceipt) {
      setTimeout(() => window.print(), 500);
    }
  }, [searchParams, isReceipt]);

  const handlePrint = () => window.print();
  const handleDownload = () => {
    window.print();
  };

  if (isReceipt) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-md mx-auto border-2 border-gray-300 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-bold text-[#1a5c2e]">Medigo Health Care</h1>
              <p className="text-xs text-gray-600">Invoice / Receipt</p>
            </div>
            {qrDataUrl && (
              <div className="text-center">
                <img src={qrDataUrl} alt="Scan for report" className="w-24 h-24 border border-gray-300 mx-auto" />
                <p className="text-[10px] text-gray-500 mt-1">Scan to view report</p>
              </div>
            )}
          </div>
          <hr className="my-3" />
          <p><strong>Bill No:</strong> {reportId}</p>
          <p><strong>Patient:</strong> {report.name}</p>
          <p><strong>Date:</strong> {report.dateExamined}</p>
          <p><strong>Report ID:</strong> {reportId}</p>
          <hr className="my-3" />
          <p className="text-xs text-gray-500 text-center">Scan the QR code to view or share the medical report online.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Non-print header – only visible on screen */}
      <div className="print:hidden flex items-center justify-between p-4 bg-gray-100 border-b sticky top-0 z-10">
        <h1 className="text-lg font-semibold text-gray-800">Medical Examination Report</h1>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50]"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      <div ref={printRef} className="p-8 max-w-4xl mx-auto text-gray-900">
        {/* Report header with logo and QR */}
        <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded bg-[#1a5c2e] flex items-center justify-center text-white font-bold text-xl">+</div>
              <div>
                <h1 className="text-2xl font-bold text-[#1a5c2e]">Medigo Health Care</h1>
                <p className="text-xs text-gray-600">Address, Email, Contact</p>
              </div>
            </div>
          </div>
          <div className="text-right flex items-start gap-4">
            <div className="text-sm">
              <p><span className="font-semibold">ID NO:</span> {report.idNo}</p>
              <p><span className="font-semibold">AGENCY LIC NO:</span> {report.agencyLicNo}</p>
            </div>
            {qrDataUrl && (
              <img src={qrDataUrl} alt="QR Code – Scan to view report" className="w-[140px] h-[140px] border border-gray-300" />
            )}
          </div>
        </div>

        <p className="text-sm mb-2">Date Examined: {report.dateExamined} &nbsp;&nbsp; Report Expiry Date: {report.reportExpiryDate}</p>
        <h2 className="text-center text-xl font-bold uppercase tracking-wide mb-6">{report.title}</h2>

        {/* Candidate info with photo placeholder */}
        <div className="flex gap-6 mb-6">
          <div className="w-24 h-28 border-2 border-gray-300 flex items-center justify-center bg-gray-100 text-gray-500 text-xs">
            Photo
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            <p><span className="font-semibold">Name:</span> {report.name}</p>
            <p><span className="font-semibold">Fathers Name:</span> {report.fathersName}</p>
            <p><span className="font-semibold">Passport No:</span> {report.passportNo}</p>
            <p><span className="font-semibold">Date of Birth:</span> {report.dateOfBirth}</p>
            <p><span className="font-semibold">Nationality:</span> {report.nationality}</p>
            <p><span className="font-semibold">Marital Status:</span> {report.maritalStatus}</p>
            <p><span className="font-semibold">Agent Name:</span> {report.agentName}</p>
            <p><span className="font-semibold">Sex:</span> {report.sex}</p>
          </div>
        </div>

        {/* Laboratory */}
        <div className="mb-6">
          <h3 className="font-bold text-sm bg-gray-200 px-3 py-1.5 mb-2">Laboratory Investigations</h3>
          <div className="grid grid-cols-3 gap-2 text-sm border border-gray-300 p-3">
            <p>Hemoglobin: {report.labResults.hemoglobin}</p>
            <p>ESR: {report.labResults.esr}</p>
            <p>TC/DC: {report.labResults.tc}</p>
            <p>Lymphocytes: {report.labResults.lymphocytes}</p>
            <p>Monocytes: {report.labResults.monocytes}</p>
            <p>Eosinophils: {report.labResults.eosinophils}</p>
            <p>Random Blood Sugar: {report.labResults.randomBloodSugar}</p>
            <p>S.Bilirubin: {report.labResults.sBilirubin}</p>
            <p>SGPT: {report.labResults.sgpt}</p>
            <p>SGOT: {report.labResults.sgot}</p>
            <p>Serum Creatinine: {report.labResults.serumCreatinine}</p>
            <p>Blood Group & RH: {report.labResults.bloodGroup}</p>
            <p>HBsAg: {report.labResults.hbsAg}</p>
            <p>TPHA: {report.labResults.tpha}</p>
            <p>VDRL: {report.labResults.vdrl}</p>
            <p>Anti-Hcv: {report.labResults.antiHcv}</p>
            <p>Urine Sugar: {report.labResults.urineSugar}</p>
            <p>Urine Albumin: {report.labResults.urineAlbumin}</p>
          </div>
        </div>

        {/* Physical */}
        <div className="mb-6">
          <h3 className="font-bold text-sm bg-gray-200 px-3 py-1.5 mb-2">Physical Examinations</h3>
          <div className="grid grid-cols-3 gap-2 text-sm border border-gray-300 p-3">
            <p>Height: {report.physical.height}</p>
            <p>Weight: {report.physical.weight}</p>
            <p>Pulse: {report.physical.pulse}</p>
            <p>BP: {report.physical.bp}</p>
            <p>Heart: {report.physical.heart}</p>
            <p>Lungs: {report.physical.lungs}</p>
            <p>Liver: {report.physical.liver}</p>
            <p>Vision Aided (LT/RT): {report.physical.aidedVision}</p>
            <p>Vision Unaided (LT/RT): {report.physical.unaidedVision}</p>
            <p>Color Vision: {report.physical.colorVision}</p>
            <p>Ear (Lt/Rt): {report.physical.ear}</p>
            <p>Hernia: {report.physical.hernia}</p>
            <p>Hydrocele: {report.physical.hydrocele}</p>
            <p>Deformity: {report.physical.deformity}</p>
            <p>Skin: {report.physical.skin}</p>
          </div>
        </div>

        {/* X-Ray */}
        <div className="mb-6">
          <h3 className="font-bold text-sm bg-gray-200 px-3 py-1.5 mb-2">X-RAY CHEST P/A VIEW</h3>
          <p className="text-sm border border-gray-300 p-3">{report.xray}</p>
        </div>

        {/* Conclusion */}
        <div className="mb-6">
          <p className="text-sm">
            Dear Sir, Mentioned above is the medical report for Mr/Ms {report.name} who is <strong>{report.conclusion}</strong>
          </p>
        </div>

        {/* Doctor signature */}
        <div className="text-right">
          <p className="font-semibold text-sm">{report.doctorName}</p>
          <p className="text-xs text-gray-600">{report.doctorTitle}</p>
          <p className="text-xs mt-2">Doctor&apos;s Signature</p>
        </div>

        {/* Receipt QR note – show on screen and print */}
        <div className="mt-8 pt-4 border-t text-center text-xs text-gray-500">
          Scan the QR code on this report to view or share the digital copy.
        </div>
      </div>
    </div>
  );
}
