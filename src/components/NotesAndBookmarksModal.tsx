import React from 'react';
import { KitabPart, KitabPoint } from '../types';
import { Bookmark, MessageSquare, Download, Trash2, ArrowRight } from 'lucide-react';

interface NotesAndBookmarksModalProps {
  parts: KitabPart[];
  onSelectPoint: (pointId: string) => void;
  onRemoveBookmark: (pointId: string) => void;
}

export const NotesAndBookmarksModal: React.FC<NotesAndBookmarksModalProps> = ({
  parts,
  onSelectPoint,
  onRemoveBookmark,
}) => {
  // Extract all points that are either bookmarked or have user notes
  const bookmarkedPoints: KitabPoint[] = [];
  const pointsWithNotes: KitabPoint[] = [];

  parts.forEach((part) => {
    part.points.forEach((point) => {
      if (point.bookmarked) bookmarkedPoints.push(point);
      if (point.userNotes && point.userNotes.length > 0) pointsWithNotes.push(point);
    });
  });

  const handleExportNotes = () => {
    let content = `CATATAN FAIDAH KAJIAN TIJAN AD-DARARI\n=========================================\n\n`;

    parts.forEach((part) => {
      content += `${part.partNumber}: ${part.title}\n-----------------------------------------\n`;
      part.points.forEach((point) => {
        if (point.bookmarked || (point.userNotes && point.userNotes.length > 0)) {
          content += `\n[ ${point.title} ]\n`;
          content += `Teks Arab: ${point.arabicText}\n`;
          content += `Terjemahan: "${point.translation}"\n`;
          if (point.userNotes && point.userNotes.length > 0) {
            content += `Catatan Pribadi:\n`;
            point.userNotes.forEach((n, idx) => {
              content += `  ${idx + 1}. ${n}\n`;
            });
          }
          content += `\n`;
        }
      });
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Catatan_Kajian_Tijan_ad_Darari.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#5A5A40] text-[#fdfcf8] p-6 rounded-[28px] card-shadow border border-[#5A5A40]/20 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#fdfcf8]/15 border border-[#fdfcf8]/30 flex items-center justify-center text-[#f1d08e]">
            <Bookmark className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="serif-title text-base sm:text-lg font-bold text-[#fdfcf8]">Catatan & Tandai Pembelajaran</h2>
            <p className="text-xs text-[#e6e6da] italic">
              Daftar poin kajian yang ditandai dan catatan pribadi Jama&apos;ah/Santri
            </p>
          </div>
        </div>

        <button
          onClick={handleExportNotes}
          className="bg-[#f1d08e] hover:bg-[#e2bd70] text-[#1e293b] font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 border border-[#dfb35e]"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Catatan (.txt)</span>
        </button>
      </div>

      {bookmarkedPoints.length === 0 && pointsWithNotes.length === 0 ? (
        <div className="bg-paper border border-[#5A5A40]/15 rounded-[28px] p-8 text-center space-y-2 card-shadow">
          <Bookmark className="w-10 h-10 text-[#5A5A40]/30 mx-auto" />
          <h3 className="serif-title text-sm font-bold text-[#2d3a29]">Belum Ada Poin Ditandai</h3>
          <p className="text-xs text-[#5A5A40] max-w-md mx-auto">
            Tekan ikon penanda (bookmark) atau tombol &quot;Tulis Catatan Faidah&quot; pada kartu kajian untuk menyimpan ringkasan pembelajaran Anda di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Bookmarked Points */}
          {bookmarkedPoints.length > 0 && (
            <div className="space-y-3">
              <h3 className="serif-title text-xs font-bold olive-accent uppercase tracking-wider flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                Poin Kajian Ditandai ({bookmarkedPoints.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {bookmarkedPoints.map((point) => (
                  <div
                    key={point.id}
                    className="bg-paper border border-[#5A5A40]/15 rounded-2xl p-4.5 card-shadow space-y-2.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="serif-title text-xs font-bold text-[#2d3a29] leading-snug">
                          {point.title}
                        </h4>
                        <button
                          onClick={() => onRemoveBookmark(point.id)}
                          className="text-[#5A5A40] hover:text-red-600 p-1 transition"
                          title="Hapus Penanda"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="font-arabic text-sm font-bold text-right text-[#064e3b] dir-rtl my-1.5">
                        {point.arabicText}
                      </p>
                      <p className="serif-title text-xs italic text-[#5A5A40] line-clamp-2">
                        &quot;{point.translation}&quot;
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectPoint(point.id)}
                      className="olive-accent hover:underline font-bold text-xs inline-flex items-center gap-1 pt-2 border-t border-[#5A5A40]/15"
                    >
                      <span>Buka di Mode Kajian</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Points with Notes */}
          {pointsWithNotes.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#5A5A40]/15">
              <h3 className="serif-title text-xs font-bold olive-accent uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                Catatan Pribadi ({pointsWithNotes.length})
              </h3>

              <div className="space-y-3">
                {pointsWithNotes.map((point) => (
                  <div
                    key={point.id}
                    className="bg-paper border border-[#5A5A40]/15 rounded-2xl p-4.5 card-shadow space-y-2.5"
                  >
                    <div className="flex items-center justify-between border-b border-[#5A5A40]/15 pb-2">
                      <h4 className="serif-title text-xs font-bold text-[#2d3a29]">{point.title}</h4>
                      <button
                        onClick={() => onSelectPoint(point.id)}
                        className="text-xs olive-accent hover:underline font-semibold"
                      >
                        Buka Poin
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {point.userNotes?.map((note, nIdx) => (
                        <div
                          key={nIdx}
                          className="bg-[#f5f2e6] border border-[#5A5A40]/20 rounded-xl p-3 text-xs text-[#2d3748] leading-relaxed"
                        >
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
