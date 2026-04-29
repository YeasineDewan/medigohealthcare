import { useState } from 'react';
import { Download, FileText, File, Table, ChevronDown } from 'lucide-react';
import { generatePDF, generateCSV, generateWord } from '../../utils/invoiceGenerator';

export default function InvoiceDownload({ order, customer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format) => {
    try {
      setDownloading(true);
      
      switch (format) {
        case 'pdf':
          generatePDF(order, customer);
          break;
        case 'csv':
          generateCSV(order, customer);
          break;
        case 'word':
          await generateWord(order, customer);
          break;
        default:
          break;
      }
      
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to generate invoice:', error);
      alert('Failed to generate invoice. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={downloading}
        className="flex items-center gap-2 px-6 py-3 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-5 h-5" />
        <span>{downloading ? 'Generating...' : 'Download Invoice'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !downloading && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
            <div className="p-2 space-y-1">
              <button
                onClick={() => handleDownload('pdf')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f0fdf2] rounded-lg transition-colors text-left"
              >
                <FileText className="w-5 h-5 text-red-500" />
                <div>
                  <div className="font-medium text-[#111827]">PDF Document</div>
                  <div className="text-xs text-gray-500">Recommended format</div>
                </div>
              </button>

              <button
                onClick={() => handleDownload('csv')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f0fdf2] rounded-lg transition-colors text-left"
              >
                <Table className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium text-[#111827]">CSV Spreadsheet</div>
                  <div className="text-xs text-gray-500">For Excel/Sheets</div>
                </div>
              </button>

              <button
                onClick={() => handleDownload('word')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f0fdf2] rounded-lg transition-colors text-left"
              >
                <File className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium text-[#111827]">Word Document</div>
                  <div className="text-xs text-gray-500">Editable format</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
