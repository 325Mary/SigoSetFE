import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-validar-vigilancia',
  templateUrl: './validar-vigilancia.component.html',
  styleUrls: ['./validar-vigilancia.component.css']
})
export class ValidarVigilanciaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async exportToPDF() {
    const data = document.querySelector('.container') as HTMLElement;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const margin = 10; // Define a constant for the margin
    const contentWidth = pdfWidth - margin * 2; // Adjust width for margin

    let y = margin; // Start with the top margin

    // Function to create a canvas and add it to the PDF
    const addCanvasToPDF = async (element: HTMLElement, yOffset: number) => {
      const canvas = await html2canvas(element, { scale: 1 });
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * contentWidth) / imgProps.width;

      if (yOffset + imgHeight > pdfHeight - margin) { // Adjust for bottom margin
        pdf.addPage();
        yOffset = margin; // Reset to top margin on new page
      }

      pdf.addImage(imgData, 'PNG', margin, yOffset, contentWidth, imgHeight); // Add image with left margin
      return yOffset + imgHeight;
    };

    // Capture each section
    const sections = data.querySelectorAll('.section');
    for (let i = 0; i < sections.length; i++) {
      y = await addCanvasToPDF(sections[i] as HTMLElement, y);
    }

    pdf.save('informe.pdf');
  }
}
