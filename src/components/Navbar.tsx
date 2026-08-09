import React from 'react';
import {
  BookOpen,
  Printer,
  Sparkles,
  HelpCircle,
  Bookmark,
  Search,
  Plus,
  Type,
  CheckCircle,
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'reader' | 'print' | 'ai' | 'quiz' | 'notes';
  setActiveTab: (tab: 'reader' | 'print' | 'ai' | 'quiz' | 'notes') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  fontSize: 'sm' | 'md' | 'lg';
  setFontSize: (s: 'sm' | 'md' | 'lg') => void;
  onOpenAddModal: () => void;
  onTriggerPrint: () => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  fontSize,
  setFontSize,
  onOpenAddModal,
  onTriggerPrint,
  bookmarkCount,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-[#2d3a29] text-[#f5f5f0] border-b border-[#5A5A40]/40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3">
          {/* Logo & Document Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('reader')}>
              <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] flex items-center justify-center text-[#fdfcf8] shadow-sm font-bold text-lg border border-[#8a8a68]/30">
                تاج
              </div>
              <div>
                <h1 className="serif-title font-medium text-base sm:text-lg tracking-tight text-[#fdfcf8] leading-tight flex items-center gap-2">
                  <span>Syarah Tijan ad-Darari</span>
                  <span className="text-[10px] bg-[#5A5A40]/80 text-[#e6e6da] font-sans font-semibold px-2 py-0.5 rounded-full border border-[#8a8a68]/40 uppercase tracking-wider">
                    Tauhid
                  </span>
                </h1>
                <p className="text-xs text-[#d0d0c0] font-sans hidden sm:block">
                  Kajian Aqidah Tauhid — Syekh Ibrahim Al-Bajuri
                </p>
              </div>
            </div>

            {/* Mobile Font Size & Quick Print */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onTriggerPrint}
                className="p-2 rounded-xl bg-[#5A5A40] text-[#fdfcf8] hover:bg-[#4a553f] transition"
                title="Cetak PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a8a898]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari teks Arab, terjemahan, atau penjelasan..."
              className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-[#222d1f]/80 border border-[#5A5A40]/50 rounded-xl text-[#fdfcf8] placeholder-[#a8a898] focus:outline-none focus:ring-2 focus:ring-[#8a8a68] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-[#a8a898] hover:text-[#fdfcf8]"
              >
                ×
              </button>
            )}
          </div>

          {/* Navigation Controls & Action Buttons */}
          <div className="flex items-center justify-between md:justify-end gap-2 overflow-x-auto pb-1 md:pb-0">
            {/* View Mode Buttons */}
            <nav className="flex items-center gap-1 bg-[#222d1f]/90 p-1 rounded-2xl border border-[#5A5A40]/50">
              <button
                onClick={() => setActiveTab('reader')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  activeTab === 'reader'
                    ? 'bg-[#5A5A40] text-[#fdfcf8] shadow-sm font-bold'
                    : 'text-[#d0d0c0] hover:text-[#fdfcf8] hover:bg-[#3d4936]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kajian</span>
              </button>

              <button
                onClick={() => setActiveTab('print')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  activeTab === 'print'
                    ? 'bg-[#5A5A40] text-[#fdfcf8] shadow-sm font-bold'
                    : 'text-[#d0d0c0] hover:text-[#fdfcf8] hover:bg-[#3d4936]'
                }`}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PDF View</span>
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition relative ${
                  activeTab === 'ai'
                    ? 'bg-[#8c734b] text-[#fdfcf8] shadow-sm font-bold'
                    : 'text-[#e2ca9c] hover:text-[#fdfcf8] hover:bg-[#3d4936]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#f1d08e] animate-pulse" />
                <span>AI Tauhid</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  activeTab === 'quiz'
                    ? 'bg-[#5A5A40] text-[#fdfcf8] shadow-sm font-bold'
                    : 'text-[#d0d0c0] hover:text-[#fdfcf8] hover:bg-[#3d4936]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Kuis</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition relative ${
                  activeTab === 'notes'
                    ? 'bg-[#5A5A40] text-[#fdfcf8] shadow-sm font-bold'
                    : 'text-[#d0d0c0] hover:text-[#fdfcf8] hover:bg-[#3d4936]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Catatan</span>
                {bookmarkCount > 0 && (
                  <span className="bg-[#f1d08e] text-[#222d1f] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {bookmarkCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Font Size & Action Tools */}
            <div className="flex items-center gap-1.5">
              <div className="hidden lg:flex items-center bg-[#222d1f]/90 rounded-xl p-0.5 border border-[#5A5A40]/50 text-xs">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-1 rounded-lg font-bold ${
                    fontSize === 'sm' ? 'bg-[#5A5A40] text-[#fdfcf8]' : 'text-[#d0d0c0] hover:text-[#fdfcf8]'
                  }`}
                  title="Ukuran Teks Kecil"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('md')}
                  className={`px-2 py-1 rounded-lg font-bold ${
                    fontSize === 'md' ? 'bg-[#5A5A40] text-[#fdfcf8]' : 'text-[#d0d0c0] hover:text-[#fdfcf8]'
                  }`}
                  title="Ukuran Teks Sedang"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-1 rounded-lg font-bold ${
                    fontSize === 'lg' ? 'bg-[#5A5A40] text-[#fdfcf8]' : 'text-[#d0d0c0] hover:text-[#fdfcf8]'
                  }`}
                  title="Ukuran Teks Besar"
                >
                  A+
                </button>
              </div>

              <button
                onClick={onOpenAddModal}
                className="hidden sm:flex items-center gap-1 bg-[#5A5A40] hover:bg-[#4a553f] text-[#fdfcf8] font-semibold text-xs px-3 py-2 rounded-xl transition shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Poin</span>
              </button>

              <button
                onClick={onTriggerPrint}
                className="hidden md:flex items-center gap-1.5 bg-[#f1d08e] hover:bg-[#e2bd70] text-[#1e293b] font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-xs border border-[#dfb35e]"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
