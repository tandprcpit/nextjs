import { jsPDF } from "jspdf";

interface PlacedStudent {
  firstName: string;
  middleName:string
  lastName: string;
  department: string;
  username: string;
  image: string;
  city: string;
  fullTimePackage?: number;
  positionFullTime?: string;
}

interface PDFGeneratorProps {
  companyName: string;
  companyLocation: string;
  placedStudents: PlacedStudent[];
}

export const generatePlacedStudentsPDF = async ({
  companyName,
  companyLocation,
  placedStudents,
}: PDFGeneratorProps) => {
  const doc = new jsPDF();

  
  // Helper function to load images
  const loadImageAsBase64 = async (url: string) => {
    // Ensure HTTPS for all URLs
    const secureUrl = url.replace(/^http:\/\//, "https://");
    
    try {
      const response = await fetch(secureUrl);
      if (!response.ok) {
        throw new Error(`Failed to load image: ${response.statusText}`);
      }
  
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error loading image as Base64:", error);
      throw error;
    }
  };
  

  // Convert the banner image to Base64
  const bannerImage = await loadImageAsBase64("/pdf.png");

  // Function to add header and border on each page
  const addPageHeaderAndBorder = () => {
    // Add Banner Image
    doc.addImage(bannerImage, "PNG", 0, 5, 210, 30);

    // Add line under banner
    doc.setDrawColor(36, 72, 85);
    doc.setLineWidth(1);
    doc.line(0, 37, 210, 37);

    // Add page border
    doc.setDrawColor(36, 72, 85);
    doc.setLineWidth(5);
    doc.line(0, 0, 210, 0); // Top
    doc.line(0, 297, 210, 297); // Bottom
    doc.line(0, 0, 0, 297); // Left
    doc.line(210, 0, 210, 297); // Right

    // Add celebratory header
    doc.setTextColor(36, 72, 85); // #244855
    doc.setFontSize(28);
    doc.text("Congratulations!", 105, 50, { align: "center" });

    doc.setFontSize(20);
    doc.text(`${companyName} - Placed Students`, 105, 60, { align: "center" });

    doc.setFontSize(14);
    doc.text(`Location: ${companyLocation}`, 105, 70, { align: "center" });
  };

  let yOffset = 80; // Starting Y position for student cards
  let xOffset = 10; // Starting X position for student cards
  let cardsInRow = 0; // Number of cards in the current row
  let cardsInPage = 0; // Total cards on the current page

  const CARDS_PER_PAGE = 6; // Limit to 6 students per page
  const ROW_HEIGHT = 90; // Spacing between rows
  const CARD_WIDTH = 60; // Card width
  const CARD_HEIGHT = 80; // Card height
  const CARD_SPACING = 65; // Spacing between cards in a row

  for (let i = 0; i < placedStudents.length; i++) {
    const student = placedStudents[i];

    // If starting a new page or on the first page
    if (cardsInPage === 0) {
      if (i > 0) doc.addPage(); // Add a new page if not the first page
      addPageHeaderAndBorder(); // Add header and border
      yOffset = 80; // Reset Y position for student cards
      xOffset = 10; // Reset X position
      cardsInRow = 0; // Reset row counter
    }

    // Load student image
    const studentImage = await loadImageAsBase64(student.image);
    console.log("Fetching image:", student.image);

    // Draw student card
    doc.setDrawColor(144, 174, 173); // #90AEAD
    doc.setLineWidth(0.5);
    doc.roundedRect(xOffset, yOffset, CARD_WIDTH, CARD_HEIGHT, 3, 3, "S");

    // Add student image
    doc.addImage(studentImage, "JPEG", xOffset + 5, yOffset + 5, 50, 50);

    // Add student details
    doc.setTextColor(36, 72, 85); // #244855
    doc.setFontSize(10);
    doc.text(`${student.firstName} ${student.middleName} ${student.lastName}`, xOffset + 30, yOffset + 60, {
      align: "center",
      maxWidth: 55,
    });

    doc.setFontSize(8);
    doc.text(student.city, xOffset + 30, yOffset + 65, {
      align: "center",
      maxWidth: 55,
    });

    doc.setTextColor(230, 72, 51); // #E64833
    doc.text(student.positionFullTime || "N/A", xOffset + 30, yOffset + 70, {
      align: "center",
      maxWidth: 55,
    });
    doc.text(`${student.fullTimePackage || "N/A"} LPA`, xOffset + 30, yOffset + 75, {
      align: "center",
      maxWidth: 55,
    });

    // Move to the next card position
    xOffset += CARD_SPACING;
    cardsInRow++;
    cardsInPage++;

    // Move to the next row if 3 cards are in the current row
    if (cardsInRow === 3) {
      xOffset = 10; // Reset X position
      yOffset += ROW_HEIGHT; // Move Y position to the next row
      cardsInRow = 0;
    }

    // If 6 cards are added, reset for the next page
    if (cardsInPage === CARDS_PER_PAGE) {
      cardsInPage = 0;
    }
  }

  // Save the PDF file
  doc.save(`${companyName}_Placed_Students.pdf`);
};
