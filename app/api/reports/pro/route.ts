import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import { NextResponse } from "next/server";
import type { DiagnosisReport } from "@/lib/diagnosis";
import { whatsappProUrl } from "@/lib/diagnosis";

export const runtime = "nodejs";

function currency(value: number) {
  return `S/${Math.round(value).toLocaleString("es-PE")}`;
}

async function pdfBuffer(report: DiagnosisReport) {
  const doc = new PDFDocument({ margin: 48, size: "A4" });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk: Buffer) => chunks.push(chunk));
  const done = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  doc.fillColor("#075985").font("Helvetica-Bold").fontSize(11).text("Quant Partners · Diagnóstico IA PRO");
  doc.moveDown(1);
  doc.fillColor("#101112").fontSize(27).text(`Reporte completo: ${report.businessName}`);
  doc.moveDown(0.6);
  doc.fillColor("#5a5a63").font("Helvetica").fontSize(12).text("Todas las fugas detectadas, prioridad por impacto y soluciones recomendadas.", { lineGap: 4 });
  doc.moveDown(1);

  report.leaks.forEach((leak, index) => {
    if (doc.y > 680) doc.addPage();
    doc.fillColor("#075985").font("Helvetica-Bold").fontSize(13).text(`${index + 1}. ${leak.title}`);
    doc.fillColor("#101112").fontSize(18).text(currency(leak.impact));
    doc.fillColor("#5a5a63").font("Helvetica").fontSize(10).text("impacto mensual estimado");
    doc.moveDown(0.4);
    doc.fillColor("#101112").fontSize(11).text(`Causa: ${leak.cause}`, { lineGap: 3 });
    doc.text(`Solución: ${leak.solution}`, { lineGap: 3 });
    doc.moveDown(0.8);
  });

  doc.addPage();
  doc.fillColor("#075985").font("Helvetica-Bold").fontSize(22).text("Upsell: implementación recomendada");
  doc.moveDown(0.8);
  doc.fillColor("#101112").font("Helvetica").fontSize(12).text("Este diagnóstico ya identificó las fugas con mayor impacto. El siguiente paso es convertir el plan en sistema operativo: seguimiento, automatización, CRM ligero y tablero de control.", { lineGap: 5 });
  doc.moveDown(1);
  doc.fillColor("#075985").font("Helvetica-Bold").fontSize(13).text("Implementar mi plan completo", { link: whatsappProUrl, underline: true });

  doc.end();
  return done;
}

export async function POST(request: Request) {
  try {
    const report = (await request.json()) as DiagnosisReport;
    const buffer = await pdfBuffer(report);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="diagnostico-pro-${report.id}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "PDF error" },
      { status: 500 },
    );
  }
}
