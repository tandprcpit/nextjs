import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Student {
  firstName: string;
  middleName:string
  lastName: string;
  email: string;
  department: string;
  username: string;
  overallCGPA: number;
  tenthMarks: number;
  twelfthDiploma: string;
  twelfthDiplomaPercentage: number;
}

interface Round {
  roundName: string;
  selectedStudents: Student[];
}

interface PDFGeneratorProps {
  name: string;
  location: string;
  salary: number;
  bond: string;
  currentRound: Round;
}

export const generatePDF = async ({
  name,
  location,
  salary,
  bond,
  currentRound,
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
    doc.addImage(imageData, "PNG", 0, 2, 200, 30); // Adjust x, y, width, and height as needed

  
  doc.setDrawColor(36, 72, 85);
  doc.setLineWidth(0.7); 
  doc.line(10, 34, 200, 34); 

  // Add text for the company name
  doc.setFontSize(18);
  doc.text(`Company Name: ${name}`, 14,45);

  // Add location and package in the same row
  doc.setFontSize(12);
  doc.text(`Location: ${location}`, 14, 55); // Left-aligned
  doc.text(`Package: ${salary} LPA`, 120, 55); // Right-aligned (adjust as needed)

  // Add bond and date in the same row
  doc.text(`Bond: ${bond}`, 14, 62); // Left-aligned
  const downloadDate = new Date().toLocaleDateString();
  doc.text(`Date: ${downloadDate}`, 120, 62); // Right-aligned (adjust as needed)

  let yOffset = 70;

  doc.setFontSize(14);
  doc.text(`Selected for ${currentRound.roundName}`, 14, yOffset);
  yOffset += 10;

  const tableColumns = [
    "Name",
    // "Email",
    "Department",
    "PRN",
    "CGPA",
    "10th",
    "12th/Diploma",
    "%",
  ];
  const tableRows = currentRound.selectedStudents.map((student) => [
    `${student.firstName} ${student.middleName} ${student.lastName}`,
    // student.email,
    student.department,
    student.username,
    student.overallCGPA.toString(),
    student.tenthMarks.toString(),
    student.twelfthDiploma,
    student.twelfthDiplomaPercentage.toString(),
  ]);

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,
    startY: yOffset,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [36, 72, 85] },
  });

  doc.save(`${name}_${currentRound.roundName}_Selection.pdf`);
};
