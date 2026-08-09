export interface RefItem {
  type: 'quran' | 'hadith' | 'kitab' | 'general';
  title?: string;
  text: string;
}

export interface KitabPoint {
  id: string;
  title: string;
  arabicText: string;
  translation: string;
  explanationText: string;
  explanationBullets?: { boldText: string; normalText: string }[];
  references: RefItem[];
  bookmarked?: boolean;
  userNotes?: string[];
}

export interface KitabPart {
  id: string;
  partNumber: string;
  title: string;
  description?: string;
  points: KitabPoint[];
  closingCard?: {
    title: string;
    text: string;
  };
}

export interface DocumentMetadata {
  category: string;
  title: string;
  subtitle: string;
  footerLeft: string;
  author: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  relatedPointId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
