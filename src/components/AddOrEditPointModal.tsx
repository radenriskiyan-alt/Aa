import React, { useState, useEffect } from 'react';
import { KitabPoint, KitabPart } from '../types';
import { X, Save, Plus, Trash2 } from 'lucide-react';

interface AddOrEditPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  parts: KitabPart[];
  editingPoint: KitabPoint | null;
  onSavePoint: (partId: string, point: KitabPoint) => void;
}

export const AddOrEditPointModal: React.FC<AddOrEditPointModalProps> = ({
  isOpen,
  onClose,
  parts,
  editingPoint,
  onSavePoint,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>(parts[0]?.id || 'bagian-1');
  const [title, setTitle] = useState('');
  const [arabicText, setArabicText] = useState('');
  const [translation, setTranslation] = useState('');
  const [explanationText, setExplanationText] = useState('');
  const [bullets, setBullets] = useState<{ boldText: string; normalText: string }[]>([]);
  const [refTitle, setRefTitle] = useState('');
  const [refText, setRefText] = useState('');

  useEffect(() => {
    if (editingPoint) {
      setTitle(editingPoint.title);
      setArabicText(editingPoint.arabicText);
      setTranslation(editingPoint.translation);
      setExplanationText(editingPoint.explanationText);
      setBullets(editingPoint.explanationBullets || []);
    } else {
      setTitle('');
      setArabicText('');
      setTranslation('');
      setExplanationText('');
      setBullets([]);
      setRefTitle('');
      setRefText('');
    }
  }, [editingPoint, isOpen]);

  if (!isOpen) return null;

  const handleAddBullet = () => {
    setBullets([...bullets, { boldText: '', normalText: '' }]);
  };

  const handleRemoveBullet = (index: number) => {
    setBullets(bullets.filter((_, idx) => idx !== index));
  };

  const handleBulletChange = (index: number, field: 'boldText' | 'normalText', val: string) => {
    const updated = [...bullets];
    updated[index][field] = val;
    setBullets(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !arabicText.trim() || !translation.trim()) return;

    const newPoint: KitabPoint = {
      id: editingPoint ? editingPoint.id : `p-custom-${Date.now()}`,
      title: title.trim(),
      arabicText: arabicText.trim(),
      translation: translation.trim(),
      explanationText: explanationText.trim(),
      explanationBullets: bullets.filter((b) => b.boldText || b.normalText),
      references: editingPoint?.references || [
        ...(refText ? [{ type: 'general' as const, title: refTitle || 'Referensi', text: refText }] : []),
      ],
      bookmarked: editingPoint?.bookmarked || false,
      userNotes: editingPoint?.userNotes || [],
    };

    onSavePoint(selectedPartId, newPoint);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1e293b]/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-paper rounded-[28px] border border-[#5A5A40]/20 card-shadow w-full max-w-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#5A5A40] text-[#fdfcf8] p-5 flex items-center justify-between border-b border-[#5A5A40]/20">
          <h3 className="serif-title text-base sm:text-lg font-bold">
            {editingPoint ? 'Edit Poin Kajian' : 'Tambah Poin Kajian Baru'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#e6e6da] hover:text-[#fdfcf8] hover:bg-[#4a553f] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {!editingPoint && (
            <div>
              <label className="block font-bold olive-accent serif-title mb-1">Pilih Bagian Kitab:</label>
              <select
                value={selectedPartId}
                onChange={(e) => setSelectedPartId(e.target.value)}
                className="w-full bg-[#f5f5f0] border border-[#5A5A40]/25 rounded-xl p-2.5 font-medium text-[#1e293b]"
              >
                {parts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.partNumber}: {p.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-bold olive-accent serif-title mb-1">Judul Poin Kajian:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Poin 5: Sifat-Sifat Wajib Bagi Allah"
              required
              className="w-full bg-[#f5f5f0] border border-[#5A5A40]/25 rounded-xl p-2.5 font-medium text-[#1e293b]"
            />
          </div>

          <div>
            <label className="block font-bold olive-accent serif-title mb-1">Teks Matan Arab (Amiri):</label>
            <textarea
              value={arabicText}
              onChange={(e) => setArabicText(e.target.value)}
              placeholder="Ketik atau tempelkan teks Arab dengan harakat di sini..."
              rows={3}
              required
              className="w-full bg-[#f5f5f0] border border-[#5A5A40]/25 rounded-xl p-3 font-arabic text-right text-lg text-[#064e3b] dir-rtl"
            />
          </div>

          <div>
            <label className="block font-bold olive-accent serif-title mb-1">Terjemahan Indonesia:</label>
            <textarea
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              placeholder="Terjemahan harfiah / makna matan..."
              rows={2}
              required
              className="w-full bg-[#f5f5f0] border border-[#5A5A40]/25 rounded-xl p-2.5 serif-title italic text-[#2d3a29]"
            />
          </div>

          <div>
            <label className="block font-bold olive-accent serif-title mb-1">Penjelasan Luas (Syarah):</label>
            <textarea
              value={explanationText}
              onChange={(e) => setExplanationText(e.target.value)}
              placeholder="Uraian syarah dan hikmah tauhid..."
              rows={4}
              className="w-full bg-[#f5f5f0] border border-[#5A5A40]/25 rounded-xl p-2.5 text-[#2d3748]"
            />
          </div>

          {/* Bullets builder */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold olive-accent serif-title">Rincian / Bullets Penjelasan:</label>
              <button
                type="button"
                onClick={handleAddBullet}
                className="text-xs bg-[#f5f5f0] olive-accent border border-[#5A5A40]/30 px-3 py-1 rounded-xl font-bold hover:bg-[#edebe1] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Bullet
              </button>
            </div>

            {bullets.map((b, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-[#f5f5f0] p-2.5 border border-[#5A5A40]/20 rounded-xl">
                <input
                  type="text"
                  placeholder="Cetak tebal (e.g. Sifat Wujud:)"
                  value={b.boldText}
                  onChange={(e) => handleBulletChange(idx, 'boldText', e.target.value)}
                  className="w-1/3 bg-paper border border-[#5A5A40]/25 rounded-lg p-1.5 font-bold text-[#1e293b]"
                />
                <input
                  type="text"
                  placeholder="Uraian penjelasan..."
                  value={b.normalText}
                  onChange={(e) => handleBulletChange(idx, 'normalText', e.target.value)}
                  className="flex-1 bg-paper border border-[#5A5A40]/25 rounded-lg p-1.5 text-[#1e293b]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBullet(idx)}
                  className="p-1 text-[#5A5A40] hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {!editingPoint && (
            <div className="space-y-2 pt-2 border-t border-[#5A5A40]/20">
              <label className="block font-bold olive-accent serif-title">Referensi Dalil / Kitab (Opsional):</label>
              <input
                type="text"
                placeholder="Judul Rujukan (e.g. Al-Qur'an / Kitab Awam)"
                value={refTitle}
                onChange={(e) => setRefTitle(e.target.value)}
                className="w-full bg-[#f5f5f0] border border-[#5A5A40]/25 rounded-xl p-2.5 font-medium"
              />
              <input
                type="text"
                placeholder="Teks Rujukan atau Kutipan Dalil"
                value={refText}
                onChange={(e) => setRefText(e.target.value)}
                className="w-full bg-[#f5f5f0] border border-[#5A5A40]/25 rounded-xl p-2.5"
              />
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t border-[#5A5A40]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#5A5A40] hover:text-[#1e293b] font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#5A5A40] hover:bg-[#4a553f] text-[#fdfcf8] font-bold px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Poin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
