import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import { NextResponse } from "next/server";
import type { DiagnosisReport } from "@/lib/diagnosis";
import { whatsappFreeUrl } from "@/lib/diagnosis";

export const runtime = "nodejs";

function currency(value: number) {
  return `S/${Math.round(value).toLocaleString("es-PE")}`;
}

function sanitize(value: unknown) {
  return String(value ?? "").slice(0, 240);
}

async function pdfBuffer(report: DiagnosisReport) {
  const doc = new PDFDocument({ margin: 48, size: "A4" });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk: Buffer) => chunks.push(chunk));

  const done = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  doc
    .fontSize(11)
    .fillColor("#075985")
    .font("Helvetica-Bold")
    .text("Quant Partners · Diagnóstico IA FREE");

  doc.moveDown(1.2);
  doc
    .fontSize(28)
    .fillColor("#101112")
    .font("Helvetica-Bold")
    .text(`Diagnóstico light: ${sanitize(report.businessName)}`, {
      lineGap: 2,
    });

  doc.moveDown(0.8);
  doc
    .fontSize(13)
    .fillColor("#5a5a63")
    .font("Helvetica")
    .text("Este reporte muestra el punto de fuga más crítico detectado. El reporte PRO desbloquea todas las fugas, soluciones y roadmap 30/60/90 días.", {
      lineGap: 4,
    });

  doc.moveDown(1.4);
  doc
    .roundedRect(48, doc.y, 499, 156, 18)
    .fill("#e0f2fe");

  const boxY = doc.y + 22;
  doc
    .fillColor("#075985")
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("FUGA PRINCIPAL", 72, boxY);

  doc
    .fillColor("#101112")
    .fontSize(21)
    .text(sanitize(report.freeLeak.title), 72, boxY + 24, {
      width: 420,
      lineGap: 2,
    });

  doc
    .fillColor("#075985")
    .fontSize(30)
    .text(currency(report.freeLeak.impact), 72, boxY + 76);

  doc
    .fillColor("#5a5a63")
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("impacto mensual estimado", 72, boxY + 112);

  doc.y = boxY + 154;
  doc.moveDown(1.2);

  doc
    .fillColor("#075985")
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Causa raíz");
  doc
    .moveDown(0.3)
    .fillColor("#101112")
    .font("Helvetica")
    .fontSize(12)
    .text(report.freeLeak.cause, { lineGap: 4 });

  doc.moveDown(0.9);
  doc
    .fillColor("#075985")
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Acción inmediata");
  doc
    .moveDown(0.3)
    .fillColor("#101112")
    .font("Helvetica")
    .fontSize(12)
    .text(report.freeLeak.action, { lineGap: 4 });

  doc.moveDown(1.2);
  doc
    .roundedRect(48, doc.y, 499, 112, 18)
    .fill("#075985");

  const ctaY = doc.y + 20;
  doc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(18)
    .text("Siguiente paso recomendado", 72, ctaY);
  doc
    .font("Helvetica")
    .fontSize(11)
    .text("El diagnóstico muestra dónde pierdes dinero. La implementación evita que lo sigas perdiendo.", 72, ctaY + 30, {
      width: 410,
      lineGap: 4,
    });
  doc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("Quiero recuperar esta fuga", 72, ctaY + 74, {
      link: whatsappFreeUrl,
      underline: true,
    });

  doc.moveDown(7);
  doc
    .fillColor("#5a5a63")
    .font("Helvetica")
    .fontSize(9)
    .text("Reporte generado automáticamente. Estimaciones orientativas basadas en respuestas declaradas.", 48, 760, {
      align: "center",
    });

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
        "Content-Disposition": `attachment; filename="diagnostico-free-${report.id}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "PDF error" },
      { status: 500 },
    );
  }
}
