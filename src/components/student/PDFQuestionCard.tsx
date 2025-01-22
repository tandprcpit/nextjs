import { jsPDF } from "jspdf";

interface Question {
  company: string;
  questions: string[];
  studentName: string;
  review: string;
  createdAt: string;
}

export class PDFQuestionCard {
  private pdf: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private cardWidth: number;
  private yOffset: number;

  constructor() {
    this.pdf = new jsPDF();
    this.pageWidth = this.pdf.internal.pageSize.width;
    this.pageHeight = this.pdf.internal.pageSize.height;
    this.margin = 10;
    this.cardWidth = this.pageWidth - 4 * this.margin;
    this.yOffset = this.margin;

    // Add title to the first page
    this.addTitle();
  }

  private addTitle() {
    this.pdf.setFontSize(20);
    this.pdf.setTextColor(36, 72, 85); // #244855
    this.pdf.text("Company Questions", this.pageWidth / 2, 20, { align: "center" });
    this.yOffset = 40; // Start cards after the title
  }

  private addNewPageIfNeeded(height: number) {
    if (this.yOffset + height > this.pageHeight - this.margin) {
      this.pdf.addPage();
      this.yOffset = this.margin;
    }
  }

  private drawCard(question: Question) {
    const cardHeight = this.calculateCardHeight(question);
    this.addNewPageIfNeeded(cardHeight);

    // Card border
    this.pdf.setDrawColor(36, 72, 85); // #244855
    this.pdf.setLineWidth(0.5);
    this.pdf.rect(this.margin, this.yOffset, this.cardWidth, cardHeight);

    // Card header
    this.pdf.setFillColor(144, 174, 173); // #90AEAD
    this.pdf.rect(this.margin, this.yOffset, this.cardWidth, 10, 'F');
    this.pdf.setTextColor(36, 72, 85); // #244855
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.text(question.company, this.margin + 2, this.yOffset + 7);

    let contentOffset = this.yOffset + 15;

    // Questions
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(0);
    question.questions.forEach((q, index) => {
      const questionText = `${index + 1}. ${q}`;
      const lines = this.pdf.splitTextToSize(questionText, this.cardWidth - 4);
      this.pdf.text(lines, this.margin + 2, contentOffset);
      contentOffset += lines.length * 5 + 2;
    });

    // Review
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(135, 79, 65); // #874F41
    this.pdf.text("Review:", this.margin + 2, contentOffset);
    contentOffset += 5;
    this.pdf.setTextColor(0);
    const reviewLines = this.pdf.splitTextToSize(question.review || "No review provided.", this.cardWidth - 4);
    this.pdf.text(reviewLines, this.margin + 2, contentOffset);
    contentOffset += reviewLines.length * 5;

    // Footer (reduced gap)
    this.pdf.setFillColor(249, 250, 251); // bg-gray-50
    this.pdf.rect(this.margin+4, this.yOffset + cardHeight - 25, this.cardWidth-10, 12, 'F');
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(0); // text-gray-500
    this.pdf.text(`Added by: ${question.studentName}`, this.margin + 2, this.yOffset + cardHeight - 21);
    this.pdf.text(`Date: ${new Date(question.createdAt).toLocaleDateString()}`, this.margin + 2, this.yOffset + cardHeight - 16);
    this.yOffset += cardHeight + 10; // Add some space between cards
  }

  private calculateCardHeight(question: Question): number {
    let height = 35; // Base height for header and footer (reduced)
    
    // Calculate height for questions
    question.questions.forEach(q => {
      const lines = this.pdf.splitTextToSize(q, this.cardWidth - 4);
      height += lines.length * 5 + 2;
    });

    // Calculate height for review
    const reviewLines = this.pdf.splitTextToSize(question.review || "No review provided.", this.cardWidth - 4);
    height += reviewLines.length * 5 + 7; // Reduced gap

    return height;
  }

  public generatePDF(questions: Question[]): jsPDF {
    questions.forEach(question => {
      this.drawCard(question);
    });
    return this.pdf;
  }
}

