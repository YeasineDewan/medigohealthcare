import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Video, User, Mail, Phone, X, Download, Share2 } from 'lucide-react';
import { Button } from '../core/Button';

export default function AppointmentConfirmationModal({ 
  isOpen, 
  onClose, 
  appointmentData, 
  doctorData 
}) {
  if (!isOpen) return null;

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      appointmentId: appointmentData.id,
      doctorName: doctorData.name,
      specialty: doctorData.specialty,
      date: appointmentData.date,
      time: appointmentData.time,
      amount: doctorData.videoCallPrice + 2,
      patientName: appointmentData.patientName,
      email: appointmentData.email
    };
    
    // Create receipt content
    const receiptContent = `
MEDIGO HEALTHCARE - APPOINTMENT RECEIPT
==========================================

Appointment ID: ${receiptData.appointmentId}
Date: ${new Date().toLocaleDateString()}

PATIENT INFORMATION
-------------------
Name: ${receiptData.patientName}
Email: ${receiptData.email}

APPOINTMENT DETAILS
-------------------
Doctor: ${receiptData.doctorName}
Specialty: ${receiptData.specialty}
Date: ${receiptData.date}
Time: ${receiptData.time}
Duration: 30 minutes
Type: Video Consultation

PAYMENT SUMMARY
---------------
Consultation Fee: $${doctorData.videoCallPrice}
Platform Fee: $2
Total Paid: $${receiptData.amount}

Payment Status: PAID
Payment Method: ${appointmentData.paymentMethod}

IMPORTANT NOTES
--------------
• Please join the video call 5 minutes before scheduled time
• Have your medical documents ready
• You will receive a reminder 1 hour before the appointment
• Meeting link will be sent to your email

CONTACT INFORMATION
------------------
For support: support@medigo.com
Emergency: +880 1999 999 999

Thank you for choosing Medigo Healthcare!
    `.trim();

    // Download as text file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Medigo_Appointment_${receiptData.appointmentId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleShareAppointment = () => {
    const shareText = `I have an appointment with ${doctorData.name} (${doctorData.specialty}) on ${appointmentData.date} at ${appointmentData.time} via Medigo Healthcare.`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Appointment Confirmation',
        text: shareText,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Appointment details copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Success Header */}
          <div className="bg-gradient-to-br from-[#5DBB63] to-[#4a9a4f] px-8 py-6 rounded-t-3xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Appointment Confirmed!</h2>
                <p className="text-white/80">Your video consultation has been successfully booked</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Appointment ID */}
            <div className="bg-[#f0fdf2] border border-[#5DBB63]/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#165028]">Appointment ID</span>
                <span className="font-mono font-bold text-[#165028]">{appointmentData.id}</span>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4a9a4f] flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#111827]">{doctorData.name}</h3>
                <p className="text-sm text-[#5DBB63]">{doctorData.specialty}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Video className="w-4 h-4" />
                  <span>Video Call</span>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#5DBB63]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-[#111827]">{appointmentData.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#5DBB63]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold text-[#111827]">{appointmentData.time}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                    <User className="w-5 h-5 text-[#5DBB63]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient</p>
                    <p className="font-semibold text-[#111827]">{appointmentData.patientName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#5DBB63]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-[#111827] text-sm">{appointmentData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-[#111827] mb-3">Payment Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-medium">${doctorData.videoCallPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium">$2</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total Paid</span>
                  <span className="text-[#165028]">${doctorData.videoCallPrice + 2}</span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Payment Successful</span>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-3">Important Information</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                  <span>Please join the video call 5 minutes before the scheduled time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                  <span>Meeting link will be sent to your email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                  <span>You will receive a reminder 1 hour before the appointment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                  <span>Have your medical documents ready for consultation</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleDownloadReceipt}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>
              
              <Button
                onClick={handleShareAppointment}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Appointment
              </Button>
              
              <Button
                onClick={onClose}
                className="flex items-center justify-center gap-2 bg-[#5DBB63] hover:bg-[#4a9a4f]"
              >
                <CheckCircle className="w-4 h-4" />
                Done
              </Button>
            </div>

            {/* Contact Support */}
            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-gray-500 mb-2">Need help? Contact our support team</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <a href="mailto:support@medigo.com" className="text-[#5DBB63] hover:underline flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  support@medigo.com
                </a>
                <a href="tel:+8801999999999" className="text-[#5DBB63] hover:underline flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  +880 1999 999 999
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
