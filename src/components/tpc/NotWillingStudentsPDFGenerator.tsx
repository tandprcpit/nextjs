import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface NotWillingStudent {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  username: string;
  reason: string;
}

interface PDFGeneratorProps {
  companyName: string;
  students: NotWillingStudent[];
}

export const generateNotWillingStudentsPDF = async ({
  companyName,
  students,
}: PDFGeneratorProps) => {
  const doc = new jsPDF();

  const loadImageAsBase64 = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Convert the image to Base64
  const imageData = await loadImageAsBase64("/pdf.png");

  // Add the image to the PDF
  doc.addImage(imageData, "PNG", 0, 2, 200, 30);

  doc.setDrawColor(36, 72, 85);
  doc.setLineWidth(0.7);
  doc.line(10, 34, 200, 34);

  // Add text for the company name
  doc.setFontSize(18);
  doc.text(`Company Name: ${companyName}`, 14, 45);

  // Add date
  doc.setFontSize(12);
  const downloadDate = new Date().toLocaleDateString();
  doc.text(`Date: ${downloadDate}`, 14, 55);

  let yOffset = 65;

  doc.setFontSize(14);
  doc.text("Students Not Willing to Participate", 14, yOffset);
  yOffset += 10;

  const tableColumns = [
    "Name",
    "Email",
    "Department",
    "PRN",
    "Reason",
  ];
  const tableRows = students.map((student) => [
    `${student.firstName} ${student.lastName}`,
    student.email,
    student.department,
    student.username,
    student.reason,
  ]);

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,
    startY: yOffset,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [36, 72, 85] },
    columnStyles: {
      4: { cellWidth: 'auto' },
    },
  });

  doc.save(`${companyName}_Not_Willing_Students.pdf`);
};

