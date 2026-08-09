import React, { useState, useEffect } from 'react';
import { initialMetadata, initialKitabParts, initialQuizQuestions } from './data/initialKitabData';
import { KitabPart, KitabPoint, DocumentMetadata, QuizQuestion } from './types';
import { Navbar } from './components/Navbar';
import { DocumentReader } from './components/DocumentReader';
import { PdfPrintView } from './components/PdfPrintView';
import { AiStudyAssistant } from './components/AiStudyAssistant';
import { QuizMode } from './components/QuizMode';
import { NotesAndBookmarksModal } from './components/NotesAndBookmarksModal';
import { AddOrEditPointModal } from './components/AddOrEditPointModal';

export default function App() {
  const [metadata, setMetadata] = useState<DocumentMetadata>(() => {
    const saved = localStorage.getItem('tijan_metadata');
    return saved ? JSON.parse(saved) : initialMetadata;
  });

  const [parts, setParts] = useState<KitabPart[]>(() => {
    const saved = localStorage.getItem('tijan_parts');
    return saved ? JSON.parse(saved) : initialKitabParts;
  });

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(initialQuizQuestions);
  const [activeTab, setActiveTab] = useState<'reader' | 'print' | 'ai' | 'quiz' | 'notes'>('reader');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  // Modals & Assistant Context State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPoint, setEditingPoint] = useState<KitabPoint | null>(null);
  const [selectedPointForAi, setSelectedPointForAi] = useState<KitabPoint | null>(null);

  // Persist parts to local storage
  useEffect(() => {
    localStorage.setItem('tijan_parts', JSON.stringify(parts));
  }, [parts]);

  // Count total bookmarked points
  const bookmarkCount = parts.reduce((acc, part) => {
    return acc + part.points.filter((p) => p.bookmarked).length;
  }, 0);

  // Toggle bookmark handler
  const handleToggleBookmark = (pointId: string) => {
    setParts((prevParts) =>
      prevParts.map((part) => ({
        ...part,
        points: part.points.map((p) =>
          p.id === pointId ? { ...p, bookmarked: !p.bookmarked } : p
        ),
      }))
    );
  };

  // Add personal note handler
  const handleAddNote = (pointId: string, noteText: string) => {
    setParts((prevParts) =>
      prevParts.map((part) => ({
        ...part,
        points: part.points.map((p) =>
          p.id === pointId ? { ...p, userNotes: [...(p.userNotes || []), noteText] } : p
        ),
      }))
    );
  };

  // Trigger AI assistant for a specific point
  const handleAskAiAboutPoint = (point: KitabPoint) => {
    setSelectedPointForAi(point);
    setActiveTab('ai');
  };

  // Open edit modal
  const handleEditPoint = (point: KitabPoint) => {
    setEditingPoint(point);
    setIsAddModalOpen(true);
  };

  // Delete point
  const handleDeletePoint = (pointId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus poin materi ini?')) {
      setParts((prevParts) =>
        prevParts.map((part) => ({
          ...part,
          points: part.points.filter((p) => p.id !== pointId),
        }))
      );
    }
  };

  // Save new or edited point
  const handleSavePoint = (partId: string, savedPoint: KitabPoint) => {
    setParts((prevParts) => {
      // If editing existing point
      if (editingPoint) {
        return prevParts.map((part) => ({
          ...part,
          points: part.points.map((p) => (p.id === savedPoint.id ? savedPoint : p)),
        }));
      }

      // If adding new point
      return prevParts.map((part) => {
        if (part.id === partId) {
          return {
            ...part,
            points: [...part.points, savedPoint],
          };
        }
        return part;
      });
    });
    setEditingPoint(null);
  };

  // Jump to point from notes or quiz
  const handleSelectPointFromOtherView = (pointId: string) => {
    setActiveTab('reader');
    setTimeout(() => {
      const el = document.getElementById(pointId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Trigger print
  const handleTriggerPrint = () => {
    setActiveTab('print');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1e293b] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenAddModal={() => {
          setEditingPoint(null);
          setIsAddModalOpen(true);
        }}
        onTriggerPrint={handleTriggerPrint}
        bookmarkCount={bookmarkCount}
      />

      {/* Main View Switcher */}
      <div className="flex-1">
        {activeTab === 'reader' && (
          <DocumentReader
            metadata={metadata}
            parts={parts}
            searchQuery={searchQuery}
            fontSize={fontSize}
            onToggleBookmark={handleToggleBookmark}
            onAddNote={handleAddNote}
            onAskAiAboutPoint={handleAskAiAboutPoint}
            onEditPoint={handleEditPoint}
            onDeletePoint={handleDeletePoint}
          />
        )}

        {activeTab === 'print' && (
          <PdfPrintView
            metadata={metadata}
            parts={parts}
            onBackToReader={() => setActiveTab('reader')}
            onTriggerPrint={() => window.print()}
          />
        )}

        {activeTab === 'ai' && (
          <AiStudyAssistant
            initialPoint={selectedPointForAi}
            onClearInitialPoint={() => setSelectedPointForAi(null)}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizMode
            questions={quizQuestions}
            onSelectPoint={handleSelectPointFromOtherView}
          />
        )}

        {activeTab === 'notes' && (
          <NotesAndBookmarksModal
            parts={parts}
            onSelectPoint={handleSelectPointFromOtherView}
            onRemoveBookmark={handleToggleBookmark}
          />
        )}
      </div>

      {/* Add or Edit Point Modal */}
      <AddOrEditPointModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingPoint(null);
        }}
        parts={parts}
        editingPoint={editingPoint}
        onSavePoint={handleSavePoint}
      />

      {/* Footer */}
      <footer className="no-print bg-[#2d3a29] text-[#e6e6da] text-xs py-6 border-t border-[#5A5A40]/40 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="serif-title font-bold text-[#fdfcf8]">
            Syarah Risalah Tijan ad-Darari fi Ilmit Tauhid
          </p>
          <p className="text-[#a8a898]">
            Karya Syekh Ibrahim Al-Bajuri / Syekh Nawawi Banten • Ahlussunnah wal Jama&apos;ah
          </p>
        </div>
      </footer>
    </div>
  );
}
