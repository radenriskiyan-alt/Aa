import React from 'react';
import { KitabPart, DocumentMetadata } from '../types';
import { Printer, Download, ArrowLeft } from 'lucide-react';

interface PdfPrintViewProps {
  metadata: DocumentMetadata;
  parts: KitabPart[];
  onBackToReader: () => void;
  onTriggerPrint: () => void;
}

export const PdfPrintView: React.FC<PdfPrintViewProps> = ({
  metadata,
  parts,
  onBackToReader,
  onTriggerPrint,
}) => {
  return (
    <div className="bg-slate-100 min-h-screen py-6 px-2 sm:px-4">
      {/* Top Controls Bar (Hidden during printing) */}
      <div className="no-print max-w-4xl mx-auto mb-6 bg-white p-4 rounded-xl shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToReader}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Mode Kajian</span>
        </button>

        <div className="text-xs text-slate-500 hidden sm:block">
          Tampilan siap cetak A4 / PDF via peramban
        </div>

        <button
          onClick={onTriggerPrint}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF Sekarang</span>
        </button>
      </div>

      {/* PDF A4 Document Page Container */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl p-[14mm] sm:p-[16mm] text-slate-900 border border-slate-300 rounded-none print:shadow-none print:p-0 print:border-none print:m-0 print:w-full print:max-w-none">
        {/* Document Header matching WeasyPrint CSS .doc-header */}
        <div
          className="print-header p-5 rounded-lg mb-5 text-white"
          style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #047857 60%, #0f766e 100%)',
          }}
        >
          <div className="text-[10pt] font-semibold text-[#a7f3d0] uppercase tracking-wider mb-1">
            {metadata.category}
          </div>
          <h1 className="text-[18pt] font-black text-white m-0 mb-1.5 leading-tight">
            {metadata.title}
          </h1>
          <div className="text-[10pt] text-[#ecfdf5] opacity-95 m-0 leading-normal">
            {metadata.subtitle}
          </div>
        </div>

        {/* Render Parts */}
        {parts.map((part) => (
          <div key={part.id} className="mb-6">
            {/* Part Header matching WeasyPrint .part-header */}
            <div
              className="print-part-header p-2.5 px-4 my-4 rounded-r-md border-l-[5px] border-[#059669]"
              style={{
                backgroundColor: '#f0fdf4',
                borderColor: '#059669',
                borderWidth: '1px 1px 1px 5px',
                borderStyle: 'solid',
              }}
            >
              <h2 className="text-[11pt] font-bold text-[#065f46] m-0">
                {part.partNumber}: {part.title}
              </h2>
            </div>

            {/* Points */}
            {part.points.map((point) => (
              <div
                key={point.id}
                className="print-point-card bg-white border border-slate-300 rounded-lg p-4 mb-4 print-page-break"
              >
                <div className="text-[10.5pt] font-bold text-[#064e3b] mt-0 mb-2.5 pb-1 border-b-2 border-[#10b981]">
                  {point.title}
                </div>

                {/* Arabic Box */}
                <div className="print-arabic-box bg-[#f8fafc] border border-slate-300 rounded-md p-3 mb-2.5 text-right dir-rtl">
                  <p className="font-arabic text-[16pt] leading-[2.1] text-slate-900 font-bold m-0">
                    {point.arabicText}
                  </p>
                </div>

                {/* Translation Box */}
                <div className="print-translation-box bg-[#fffbeb] border-l-4 border-[#f59e0b] p-2.5 mb-2.5 rounded-r-md text-[9pt] text-[#78350f]">
                  <strong className="text-[#92400e] block mb-0.5 text-[8pt] uppercase tracking-wider">
                    Terjemahan:
                  </strong>
                  &quot;{point.translation}&quot;
                </div>

                {/* Sub-heading & Explanation */}
                <div className="text-[9.5pt] font-bold text-[#0f766e] mt-2 mb-1">
                  Penjelasan Luas:
                </div>
                <p className="text-[9.5pt] text-slate-800 m-0 mb-1.5 leading-relaxed">
                  {point.explanationText}
                </p>

                {point.explanationBullets && point.explanationBullets.length > 0 && (
                  <ul className="m-0 mb-2 pl-4 text-[9.5pt]">
                    {point.explanationBullets.map((bullet, idx) => (
                      <li key={idx} className="mb-1 text-slate-800">
                        <strong className="text-[#065f46] font-bold">{bullet.boldText} </strong>
                        <span>{bullet.normalText}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* References */}
                {point.references && point.references.length > 0 && (
                  <div className="print-ref-box bg-[#f1f5f9] rounded-md p-2.5 mt-2.5 text-[8.5pt] border border-slate-200">
                    <span className="font-bold text-[#334155] text-[8pt] uppercase tracking-wider mb-1 block">
                      Referensi Dalil & Kitab:
                    </span>
                    <ul className="m-0 pl-4 space-y-1">
                      {point.references.map((ref, idx) => (
                        <li key={idx} className="text-slate-800">
                          {ref.title && <strong className="text-slate-900 font-bold">{ref.title}: </strong>}
                          <span>{ref.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {/* Part Closing Card */}
            {part.closingCard && (
              <div
                className="print-closing-card p-3 rounded-lg my-3 print-page-break"
                style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
                  border: '1px solid #bbf7d0',
                }}
              >
                <h3 className="m-0 mb-1 text-[10pt] text-[#065f46] font-bold">
                  {part.closingCard.title}
                </h3>
                <p className="m-0 text-[9pt] text-slate-900 leading-relaxed">
                  {part.closingCard.text}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Footer info for print */}
        <div className="mt-8 pt-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center text-[8pt]">
          <span>{metadata.footerLeft}</span>
          <span className="font-bold text-slate-700">Dokumen Cetak Digital</span>
        </div>
      </div>
    </div>
  );
};
