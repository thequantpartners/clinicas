import type { DiagnosisReport } from "./diagnosis";

export async function downloadReportPdf(report: DiagnosisReport, type: "free" | "pro") {
  const response = await fetch(`/api/reports/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error("No se pudo generar el PDF.");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `diagnostico-${type}-${report.id}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
