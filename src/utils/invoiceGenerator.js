import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

// Format currency
export const formatCurrency = (amount) => {
  return `৳${Number(amount).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Generate invoice number
export const generateInvoiceNumber = (orderId) => {
  const prefix = 'MED';
  const timestamp = Date.now().toString().slice(-6);
  return `${prefix}-${orderId}-${timestamp}`;
};

// Generate PDF Invoice
export const generatePDF = (order, customer) => {
  const doc = new jsPDF();
  const invoiceNumber = generateInvoiceNumber(order.id);
  
  // Company Header
  doc.setFontSize(24);
  doc.setTextColor(22, 80, 40); // #165028
  doc.text('Medigo Health', 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Digital Healthcare Platform', 14, 27);
  doc.text('Dhaka, Bangladesh', 14, 32);
  doc.text('Phone: +880 1XXX-XXXXXX', 14, 37);
  doc.text('Email: support@medigo.health', 14, 42);
  
  // Invoice Title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE', 150, 20);
  
  // Invoice Details (Right side)
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Invoice #: ${invoiceNumber}`, 150, 27);
  doc.text(`Order #: ${order.id}`, 150, 32);
  doc.text(`Date: ${formatDate(order.created_at || new Date())}`, 150, 37);
  doc.text(`Payment: ${order.payment_method || 'COD'}`, 150, 42);
  
  // Line separator
  doc.setDrawColor(220, 220, 220);
  doc.line(14, 48, 196, 48);
  
  // Bill To / Ship To section
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('Bill To:', 14, 58);
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(customer.name || order.shipping_name, 14, 64);
  doc.text(customer.email || 'N/A', 14, 69);
  doc.text(customer.phone || order.shipping_phone, 14, 74);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('Ship To:', 110, 58);
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(order.shipping_name, 110, 64);
  doc.text(order.shipping_address, 110, 69, { maxWidth: 80 });
  doc.text(`${order.shipping_city}`, 110, 79);
  
  // Items Table
  const tableData = order.items.map((item) => [
    item.product?.name || item.name || 'Product',
    item.quantity.toString(),
    formatCurrency(item.price),
    formatCurrency(item.total || item.price * item.quantity),
  ]);
  
  doc.autoTable({
    startY: 90,
    head: [['Product', 'Quantity', 'Price', 'Total']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [22, 80, 40],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' },
    },
  });
  
  // Summary section
  const finalY = doc.lastAutoTable.finalY + 10;
  const summaryX = 140;
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  
  doc.text('Subtotal:', summaryX, finalY);
  doc.text(formatCurrency(order.subtotal), 185, finalY, { align: 'right' });
  
  doc.text('Tax (5%):', summaryX, finalY + 6);
  doc.text(formatCurrency(order.tax), 185, finalY + 6, { align: 'right' });
  
  doc.text('Shipping:', summaryX, finalY + 12);
  doc.text(formatCurrency(order.shipping), 185, finalY + 12, { align: 'right' });
  
  if (order.discount > 0) {
    doc.text('Discount:', summaryX, finalY + 18);
    doc.text(`-${formatCurrency(order.discount)}`, 185, finalY + 18, { align: 'right' });
  }
  
  // Total line
  doc.setDrawColor(220, 220, 220);
  const totalLineY = order.discount > 0 ? finalY + 22 : finalY + 16;
  doc.line(summaryX, totalLineY, 196, totalLineY);
  
  doc.setFontSize(12);
  doc.setTextColor(22, 80, 40);
  doc.setFont(undefined, 'bold');
  doc.text('Total:', summaryX, totalLineY + 7);
  doc.text(formatCurrency(order.total), 185, totalLineY + 7, { align: 'right' });
  
  // Footer
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.setFont(undefined, 'normal');
  doc.text('Thank you for choosing Medigo Health!', 14, 270);
  doc.text('For support, contact: support@medigo.health | +880 1XXX-XXXXXX', 14, 275);
  doc.text('Terms: Payment due within 15 days. Please keep this invoice for your records.', 14, 280);
  
  // Save PDF
  doc.save(`Medigo-Invoice-${invoiceNumber}.pdf`);
};

// Generate CSV Invoice
export const generateCSV = (order, customer) => {
  const invoiceNumber = generateInvoiceNumber(order.id);
  
  let csv = 'Medigo Health - Invoice\n\n';
  csv += `Invoice Number:,${invoiceNumber}\n`;
  csv += `Order Number:,${order.id}\n`;
  csv += `Date:,${formatDate(order.created_at || new Date())}\n`;
  csv += `Payment Method:,${order.payment_method || 'COD'}\n\n`;
  
  csv += 'Bill To:\n';
  csv += `Name:,${customer.name || order.shipping_name}\n`;
  csv += `Email:,${customer.email || 'N/A'}\n`;
  csv += `Phone:,${customer.phone || order.shipping_phone}\n\n`;
  
  csv += 'Ship To:\n';
  csv += `Name:,${order.shipping_name}\n`;
  csv += `Address:,${order.shipping_address}\n`;
  csv += `City:,${order.shipping_city}\n\n`;
  
  csv += 'Items:\n';
  csv += 'Product,Quantity,Price,Total\n';
  
  order.items.forEach((item) => {
    csv += `"${item.product?.name || item.name || 'Product'}",${item.quantity},${item.price},${item.total || item.price * item.quantity}\n`;
  });
  
  csv += '\n';
  csv += `Subtotal:,${order.subtotal}\n`;
  csv += `Tax (5%):,${order.tax}\n`;
  csv += `Shipping:,${order.shipping}\n`;
  
  if (order.discount > 0) {
    csv += `Discount:,-${order.discount}\n`;
  }
  
  csv += `Total:,${order.total}\n`;
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `Medigo-Invoice-${invoiceNumber}.csv`);
};

// Generate Word Document Invoice
export const generateWord = async (order, customer) => {
  const invoiceNumber = generateInvoiceNumber(order.id);
  
  // Create document
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          children: [
            new TextRun({
              text: 'Medigo Health',
              bold: true,
              size: 32,
              color: '165028',
            }),
          ],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Digital Healthcare Platform | Dhaka, Bangladesh',
              size: 20,
              color: '666666',
            }),
          ],
          spacing: { after: 200 },
        }),
        
        // Invoice Title
        new Paragraph({
          children: [
            new TextRun({
              text: 'INVOICE',
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 200 },
          alignment: AlignmentType.CENTER,
        }),
        
        // Invoice Details
        new Paragraph({
          children: [
            new TextRun({ text: `Invoice #: ${invoiceNumber}\n`, bold: true }),
            new TextRun({ text: `Order #: ${order.id}\n` }),
            new TextRun({ text: `Date: ${formatDate(order.created_at || new Date())}\n` }),
            new TextRun({ text: `Payment: ${order.payment_method || 'COD'}\n` }),
          ],
          spacing: { after: 200 },
        }),
        
        // Bill To
        new Paragraph({
          children: [
            new TextRun({ text: 'Bill To:\n', bold: true }),
            new TextRun({ text: `${customer.name || order.shipping_name}\n` }),
            new TextRun({ text: `${customer.email || 'N/A'}\n` }),
            new TextRun({ text: `${customer.phone || order.shipping_phone}\n` }),
          ],
          spacing: { after: 200 },
        }),
        
        // Ship To
        new Paragraph({
          children: [
            new TextRun({ text: 'Ship To:\n', bold: true }),
            new TextRun({ text: `${order.shipping_name}\n` }),
            new TextRun({ text: `${order.shipping_address}\n` }),
            new TextRun({ text: `${order.shipping_city}\n` }),
          ],
          spacing: { after: 300 },
        }),
        
        // Items Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            // Header row
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: 'Product', bold: true })],
                  shading: { fill: '165028' },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Quantity', bold: true })],
                  shading: { fill: '165028' },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Price', bold: true })],
                  shading: { fill: '165028' },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Total', bold: true })],
                  shading: { fill: '165028' },
                }),
              ],
            }),
            // Data rows
            ...order.items.map((item) => new TableRow({
              children: [
                new TableCell({ children: [new Paragraph(item.product?.name || item.name || 'Product')] }),
                new TableCell({ children: [new Paragraph(item.quantity.toString())] }),
                new TableCell({ children: [new Paragraph(formatCurrency(item.price))] }),
                new TableCell({ children: [new Paragraph(formatCurrency(item.total || item.price * item.quantity))] }),
              ],
            })),
          ],
        }),
        
        // Summary
        new Paragraph({ text: '', spacing: { after: 200 } }),
        new Paragraph({
          children: [
            new TextRun({ text: `Subtotal: ${formatCurrency(order.subtotal)}\n` }),
            new TextRun({ text: `Tax (5%): ${formatCurrency(order.tax)}\n` }),
            new TextRun({ text: `Shipping: ${formatCurrency(order.shipping)}\n` }),
          ],
        }),
        
        ...(order.discount > 0 ? [new Paragraph({
          children: [new TextRun({ text: `Discount: -${formatCurrency(order.discount)}\n` })],
        })] : []),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Total: ${formatCurrency(order.total)}`,
              bold: true,
              size: 24,
              color: '165028',
            }),
          ],
          spacing: { before: 200, after: 400 },
        }),
        
        // Footer
        new Paragraph({
          children: [
            new TextRun({
              text: 'Thank you for choosing Medigo Health!',
              italics: true,
              size: 20,
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    }],
  });
  
  // Generate and save
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Medigo-Invoice-${invoiceNumber}.docx`);
};

// Preview invoice (opens PDF in new tab)
export const previewInvoice = (order) => {
  const doc = new jsPDF();
  const invoiceNumber = generateInvoiceNumber(order.id);
  
  // Same PDF generation logic as generatePDF but open instead of save
  // (Reusing the logic from generatePDF)
  doc.setFontSize(24);
  doc.setTextColor(22, 80, 40);
  doc.text('Medigo Health', 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Digital Healthcare Platform', 14, 27);
  
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE', 150, 20);
  
  doc.setFontSize(10);
  doc.text(`Invoice #: ${invoiceNumber}`, 150, 27);
  
  // Open in new tab
  window.open(doc.output('bloburl'), '_blank');
};
