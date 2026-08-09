import React, { useState } from 'react';
import {
  KitabPart,
  KitabPoint,
  DocumentMetadata,
} from '../types';
import {
  Volume2,
  VolumeX,
  Bookmark,
  Sparkles,
  Edit,
  Trash2,
  MessageSquare,
  BookOpen,
  CheckCircle,
  Plus,
} from 'lucide-react';

interface DocumentReaderProps {
  metadata: DocumentMetadata;
  parts: KitabPart[];
  searchQuery: string;
  fontSize: 'sm' | 'md' | 'lg';
  onToggleBookmark: (pointId: string) => void;
  onAddNote: (pointId: string, noteText: string) => void;
  onAskAiAboutPoint: (point: KitabPoint) => void;
  onEditPoint: (point: KitabPoint) => void;
  onDeletePoint: (pointId: string) => void;
}

export const DocumentReader: React.FC<DocumentReaderProps> = ({
  metadata,
  parts,
  searchQuery,
  fontSize,
  onToggleBookmark,
  onAddNote,
  onAskAiAboutPoint,
  onEditPoint,
  onDeletePoint,
}) => {
  const [playingPointId, setPlayingPointId] = useState<string | null>(null);
  const [noteInputId, setNoteInputId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Font size multiplier
  const textClass =
    fontSize === 'sm' ? 'text-xs sm:text-sm' : fontSize === 'lg' ? 'text-base sm:text-lg' : 'text-sm sm:text-base';
  const arabicTextSize =
    fontSize === 'sm' ? 'text-xl sm:text-2xl' : fontSize === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl';

  // Handle Speech Synthesis for Arabic Text
  const handleToggleAudio = (pointId: string, textToRead: string) => {
    if (playingPointId === pointId) {
      window.speechSynthesis.cancel();
      setPlayingPointId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => {
      setPlayingPointId(null);
    };

    utterance.onerror = () => {
      setPlayingPointId(null);
    };

    setPlayingPointId(pointId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSaveNote = (pointId: string) => {
    if (!noteText.trim()) return;
    onAddNote(pointId, noteText.trim());
    setNoteText('');
    setNoteInputId(null);
  };

  // Filter parts & points based on search query
  const filteredParts = parts
    .map((part) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return part;

      const matchingPoints = part.points.filter((point) => {
        return (
          point.title.toLowerCase().includes(q) ||
          point.arabicText.includes(q) ||
          point.translation.toLowerCase().includes(q) ||
          point.explanationText.toLowerCase().includes(q) ||
          point.explanationBullets?.some((b) => b.boldText.toLowerCase().includes(q) || b.normalText.toLowerCase().includes(q)) ||
          point.references.some((r) => r.text.toLowerCase().includes(q) || (r.title && r.title.toLowerCase().includes(q)))
        );
      });

      return {
        ...part,
        points: matchingPoints,
      };
    })
    .filter((part) => part.points.length > 0);

  return (
    <main className="max-w-4xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Main Document Header Banner with Natural Tones Olive & Serif Style */}
      <div className="rounded-[28px] overflow-hidden card-shadow bg-[#5A5A40] text-white p-6 sm:p-8 border border-[#5A5A40]/20">
        <div className="text-[10px] sm:text-xs text-[#e6e6da] tracking-[0.2em] uppercase font-bold mb-2">
          {metadata.category}
        </div>
        <h1 className="serif-title text-2xl sm:text-4xl font-medium text-[#fdfcf8] tracking-tight mb-3">
          {metadata.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#e6e6da] leading-relaxed max-w-3xl italic">
          {metadata.subtitle}
        </p>
      </div>

      {searchQuery && filteredParts.length === 0 && (
        <div className="bg-paper rounded-[24px] border border-[#5A5A40]/15 p-8 text-center card-shadow">
          <BookOpen className="w-10 h-10 text-[#5A5A40]/40 mx-auto mb-3" />
          <h3 className="serif-title text-base font-bold text-[#1e293b]">Pencarian tidak ditemukan</h3>
          <p className="text-xs text-[#5A5A40] mt-1">
            Tidak ada materi yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
          </p>
        </div>
      )}

      {/* Render Each Part */}
      {filteredParts.map((part) => (
        <section key={part.id} className="space-y-5">
          {/* Part Section Header */}
          <div className="bg-[#edebe1] border-l-[5px] border-[#5A5A40] border-r border-t border-b border-[#5A5A40]/20 px-5 py-3.5 rounded-r-2xl shadow-xs flex items-center justify-between">
            <h2 className="serif-title text-xs sm:text-sm font-bold text-[#2d3a29] tracking-wide">
              {part.partNumber}: {part.title}
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#fdfcf8] bg-[#5A5A40] px-3 py-1 rounded-full">
              {part.points.length} Poin
            </span>
          </div>

          {/* Points List */}
          {part.points.map((point) => (
            <article
              key={point.id}
              id={point.id}
              className="bg-paper border border-[#5A5A40]/15 rounded-[28px] p-5 sm:p-7 card-shadow hover:shadow-md transition space-y-5 relative"
            >
              {/* Point Title Bar */}
              <div className="flex items-start justify-between border-b border-[#5A5A40]/20 pb-3 gap-3">
                <h3 className="serif-title text-base sm:text-lg font-bold text-[#2d3a29] leading-snug flex-1">
                  {point.title}
                </h3>

                {/* Point Action Bar */}
                <div className="no-print flex items-center gap-1.5 shrink-0">
                  {/* Bookmark Toggle */}
                  <button
                    onClick={() => onToggleBookmark(point.id)}
                    className={`p-1.5 rounded-xl border transition ${
                      point.bookmarked
                        ? 'bg-[#8c734b] border-[#8c734b] text-[#fdfcf8]'
                        : 'bg-[#f5f5f0] border-[#5A5A40]/20 text-[#5A5A40] hover:text-[#2d3a29] hover:bg-[#edebe1]'
                    }`}
                    title={point.bookmarked ? 'Hapus dari Catatan' : 'Simpan / Tandai'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {/* Audio Recitation Toggle */}
                  <button
                    onClick={() => handleToggleAudio(point.id, point.arabicText)}
                    className={`p-1.5 rounded-xl border transition ${
                      playingPointId === point.id
                        ? 'bg-[#5A5A40] border-[#5A5A40] text-[#fdfcf8] animate-pulse'
                        : 'bg-[#f5f5f0] border-[#5A5A40]/20 text-[#5A5A40] hover:bg-[#edebe1]'
                    }`}
                    title="Audio Pelafalan Teks Arab"
                  >
                    {playingPointId === point.id ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Ask AI Trigger */}
                  <button
                    onClick={() => onAskAiAboutPoint(point)}
                    className="p-1.5 rounded-xl bg-[#f5eedc] border border-[#d8c290] text-[#73582a] hover:bg-[#ebdca8] transition flex items-center gap-1 text-xs font-semibold"
                    title="Tanyakan Penjelasan AI"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#8c6523]" />
                    <span className="hidden sm:inline">Tanya AI</span>
                  </button>

                  {/* Edit Point */}
                  <button
                    onClick={() => onEditPoint(point)}
                    className="p-1.5 rounded-xl bg-[#f5f5f0] border border-[#5A5A40]/20 text-[#5A5A40] hover:text-[#1e293b] hover:bg-[#edebe1] transition"
                    title="Edit Poin"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Point */}
                  <button
                    onClick={() => onDeletePoint(point.id)}
                    className="p-1.5 rounded-xl bg-[#f5f5f0] border border-[#5A5A40]/20 text-[#8c4b4b] hover:text-red-700 hover:bg-red-50 transition"
                    title="Hapus Poin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Arabic Box */}
              <div className="bg-[#f5f5f0] border border-[#5A5A40]/15 rounded-2xl p-4 sm:p-6 text-center dir-rtl shadow-xs">
                <p className={`font-arabic ${arabicTextSize} font-bold text-[#064e3b] leading-loose tracking-wide`}>
                  {point.arabicText}
                </p>
              </div>

              {/* Translation Box */}
              <div className="bg-[#f7f5ed] border-l-4 border-[#5A5A40] p-4 rounded-r-2xl text-xs sm:text-sm text-[#3d3d2c] space-y-1.5">
                <strong className="serif-title olive-accent text-[10px] sm:text-xs uppercase tracking-widest block font-bold">
                  Terjemahan
                </strong>
                <p className="serif-title italic leading-relaxed text-[#2d3a29]">&quot;{point.translation}&quot;</p>
              </div>

              {/* Sub-heading & Detailed Explanation */}
              <div className="space-y-2.5">
                <div className="serif-title text-xs sm:text-sm font-bold olive-accent uppercase tracking-wider">
                  Penjelasan Luas:
                </div>
                <p className={`${textClass} text-[#2d3748] leading-relaxed`}>
                  {point.explanationText}
                </p>

                {/* Bullets if present */}
                {point.explanationBullets && point.explanationBullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 pt-1 text-[#2d3748]">
                    {point.explanationBullets.map((bullet, idx) => (
                      <li key={idx} className={`${textClass} leading-relaxed`}>
                        <strong className="text-[#2d3a29] font-bold mr-1">
                          {bullet.boldText}
                        </strong>
                        <span>{bullet.normalText}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Reference Box */}
              {point.references && point.references.length > 0 && (
                <div className="bg-[#f5f5f0] border border-[#5A5A40]/15 rounded-2xl p-4 space-y-2 text-xs sm:text-sm">
                  <span className="serif-title text-[10px] sm:text-xs font-bold uppercase tracking-widest olive-accent block">
                    Referensi Dalil & Kitab:
                  </span>
                  <ul className="space-y-1.5 list-disc pl-4 text-[#334155]">
                    {point.references.map((ref, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {ref.title && <strong className="text-[#1e293b] font-bold">{ref.title}: </strong>}
                        <span>{ref.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* User Notes Section if added */}
              {((point.userNotes && point.userNotes.length > 0) || noteInputId === point.id) && (
                <div className="no-print border-t border-[#5A5A40]/20 pt-4 space-y-2.5 bg-[#f5f2e6] -mx-5 -mb-5 p-5 rounded-b-[28px]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#3d3d2c]">
                    <span className="flex items-center gap-1.5 serif-title">
                      <MessageSquare className="w-3.5 h-3.5 olive-accent" />
                      Catatan Pribadi Jama&apos;ah/Santri ({point.userNotes?.length || 0}):
                    </span>
                    {noteInputId !== point.id && (
                      <button
                        onClick={() => setNoteInputId(point.id)}
                        className="text-[11px] olive-accent hover:underline flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" /> Tambah Catatan
                      </button>
                    )}
                  </div>

                  {/* List of existing notes */}
                  {point.userNotes && point.userNotes.length > 0 && (
                    <div className="space-y-1.5">
                      {point.userNotes.map((note, nIdx) => (
                        <div
                          key={nIdx}
                          className="bg-paper border border-[#5A5A40]/20 rounded-xl p-2.5 text-xs text-[#2d3748] card-shadow"
                        >
                          {note}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add note input box */}
                  {noteInputId === point.id && (
                    <div className="space-y-2 pt-1">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Tuliskan catatan faidah / pemahaman Anda di sini..."
                        rows={2}
                        className="w-full text-xs p-2.5 bg-paper border border-[#5A5A40]/30 rounded-xl focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setNoteInputId(null)}
                          className="px-3 py-1 text-xs text-[#5A5A40] hover:text-[#1e293b]"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleSaveNote(point.id)}
                          className="px-3.5 py-1 text-xs bg-[#5A5A40] text-[#fdfcf8] font-bold rounded-xl hover:bg-[#4a553f] transition"
                        >
                          Simpan Catatan
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Inline Add Note button when no notes yet */}
              {(!point.userNotes || point.userNotes.length === 0) && noteInputId !== point.id && (
                <div className="no-print text-right pt-1">
                  <button
                    onClick={() => setNoteInputId(point.id)}
                    className="text-[11px] font-semibold olive-accent hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Tulis Catatan Faidah
                  </button>
                </div>
              )}
            </article>
          ))}

          {/* Part Closing Card */}
          {part.closingCard && (
            <div className="bg-[#edebe1] border border-[#5A5A40]/20 rounded-[24px] p-5 sm:p-6 space-y-2 card-shadow">
              <h3 className="serif-title text-sm font-bold text-[#2d3a29]">
                {part.closingCard.title}
              </h3>
              <p className={`${textClass} text-[#2d3748] leading-relaxed`}>
                {part.closingCard.text}
              </p>
            </div>
          )}
        </section>
      ))}
    </main>
  );
};
