// Export utilities for various data formats
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';

// Export to CSV
export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      // Handle values that contain commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

// Export to Excel (Enhanced with proper Excel format)
export const exportToExcel = (data, filename) => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Create a worksheet with proper Excel formatting
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      // Handle values that contain commas, quotes, or newlines
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""').replace(/\n/g, '\\n')}"`;
      }
      return value;
    }).join(','))
  ].join('\n');

  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

// Export to PDF
export const exportToPDF = (data, filename, title = 'Report') => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  
  // Add timestamp
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 25);
  
  // Prepare table data
  const headers = Object.keys(data[0]);
  const tableData = data.map(row => headers.map(header => {
    const value = row[header];
    // Convert objects to strings
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value || '');
  }));
  
  // Add table
  doc.autoTable({
    head: [headers],
    body: tableData,
    startY: 35,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
};

// Export to Word document
export const exportToWord = async (data, filename, title = 'Report') => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const tableRows = data.map(row => 
    new TableRow({
      children: headers.map(header => 
        new TableCell({
          children: [new Paragraph(row[header] || '')],
        })
      ),
    })
  );

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({ text: title, heading: 'Heading1' }),
        new Paragraph({ text: `Generated: ${new Date().toLocaleString()}` }),
        new Table({
          rows: [
            new TableRow({
              children: headers.map(header => 
                new TableCell({
                  children: [new Paragraph(header)],
                })
              ),
            }),
            ...tableRows
          ],
        }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  saveAs(blob, `${filename}.docx`);
};

// Export to JSON
export const exportToJSON = (data, filename) => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  saveAs(blob, `${filename}.json`);
};

// Generic export function that handles multiple formats
export const exportData = (data, filename, format = 'csv', title = 'Report') => {
  switch (format.toLowerCase()) {
    case 'csv':
      exportToCSV(data, filename);
      break;
    case 'excel':
      exportToExcel(data, filename);
      break;
    case 'pdf':
      exportToPDF(data, filename, title);
      break;
    case 'word':
    case 'docx':
      exportToWord(data, filename, title);
      break;
    case 'json':
      exportToJSON(data, filename);
      break;
    default:
      console.warn(`Unsupported export format: ${format}`);
      exportToCSV(data, filename); // Default to CSV
  }
};

// Print data
export const printData = (data, title = 'Report') => {
  if (!data || data.length === 0) {
    console.warn('No data to print');
    return;
  }

  const headers = Object.keys(data[0]);
  const tableHTML = `
    <div style="padding: 20px;">
      <h1>${title}</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            ${headers.map(header => `<th style="padding: 8px; background-color: #f0f0f0;">${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              ${headers.map(header => `<td style="padding: 8px;">${row[header] || ''}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(tableHTML);
  printWindow.document.close();
  printWindow.print();
};

// Utility functions for data formatting
export const formatDataForExport = (data, formatters = {}) => {
  return data.map(item => {
    const formattedItem = { ...item };
    
    // Apply formatters if provided
    Object.keys(formatters).forEach(key => {
      if (formattedItem[key] && formatters[key]) {
        formattedItem[key] = formatters[key](formattedItem[key]);
      }
    });
    
    return formattedItem;
  });
};

// Default formatters for common data types
export const defaultFormatters = {
  date: (value) => {
    return value ? new Date(value).toLocaleDateString() : '';
  },
  currency: (value) => {
    return value ? `$${parseFloat(value).toFixed(2)}` : '';
  },
  number: (value) => {
    return value ? parseFloat(value).toLocaleString() : '';
  },
  percentage: (value) => {
    return value ? `${parseFloat(value).toFixed(1)}%` : '';
  },
  boolean: (value) => {
    return value ? 'Yes' : 'No';
  },
  null: (value) => {
    return value || 'N/A';
  },
};
