import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Search, Tag, Clock, Plus, Brain, Upload } from 'lucide-react';
import { Note } from '../types';
import NoteEditor from '../components/NoteEditor';
import { aiNotesService } from '../services/aiNotes';
import { pdfAnalysisService } from '../services/pdfAnalysis';

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Quantum Mechanics Overview',
      content: 'Key concepts of wave functions and probability distributions in quantum mechanics. The Schrödinger equation describes how the quantum state of a physical system changes over time.',
      tags: ['Physics', 'Chapter 5'],
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      updatedAt: new Date(Date.now() - 7200000),
      summary: 'Key concepts of wave functions and probability distributions in quantum mechanics'
    },
    {
      id: '2',
      title: 'Calculus Integration Methods',
      content: 'Advanced techniques for solving complex integrals including substitution, integration by parts, and partial fractions. These methods are essential for solving differential equations.',
      tags: ['Math', 'Important'],
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      updatedAt: new Date(Date.now() - 86400000),
      summary: 'Advanced techniques for solving complex integrals'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [categories, setCategories] = useState<Record<string, string[]>>({});
  
  // Get all unique tags from notes
  const allTags = ['All', ...Array.from(new Set(notes.flatMap(note => note.tags)))];
  
  // Use AI to categorize notes
  useEffect(() => {
    if (notes.length > 0) {
      aiNotesService.categorizeNotes(notes)
        .then(setCategories);
    }
  }, [notes]);
  
  // Filter notes based on search and tag selection
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchTerm === '' || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTag = selectedTag === 'All' || note.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });
  
  const handleSaveNote = (note: Note) => {
    if (editingNote) {
      // Update existing note
      setNotes(notes.map(n => n.id === note.id ? note : n));
      setEditingNote(null);
    } else {
      // Add new note
      setNotes([note, ...notes]);
      setIsCreating(false);
    }
  };
  
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };
  
  const handleCancelEdit = () => {
    setEditingNote(null);
    setIsCreating(false);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF file');
      return;
    }

    try {
      // In a real implementation, we would read the PDF content here
      const mockPdfContent = 'Sample PDF content for analysis';
      
      const analysis = await pdfAnalysisService.analyzePdfContent(mockPdfContent);
      const newNote = pdfAnalysisService.createNoteFromPdf(file.name, analysis);
      
      setNotes([newNote, ...notes]);
      
      // Show AI recommendations
      const recommendations = pdfAnalysisService.generateRecommendations(analysis);
      alert(`Analysis complete!\n\n${recommendations}`);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Error processing PDF. Please try again.');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      return `${Math.round(diffHours)}h ago`;
    } else {
      const diffDays = diffHours / 24;
      return `${Math.round(diffDays)}d ago`;
    }
  };
  
  // If editing or creating, show the editor
  if (isCreating || editingNote) {
    return (
      <NoteEditor 
        initialNote={editingNote || undefined}
        onSave={handleSaveNote}
        onCancel={handleCancelEdit}
        existingNotes={notes}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notes</h1>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
            className="hidden"
            ref={fileInputRef}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            aria-label="Upload PDF"
          >
            <Upload size={20} />
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            aria-label="Create new note"
          >
            <Plus size={20} />
          </button>
          <BookOpen className="text-blue-600" size={24} />
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${selectedTag === tag 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'}`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      {/* AI Insights */}
      {Object.keys(categories).length > 0 && (
        <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="text-purple-600" size={18} />
            <h3 className="font-medium text-gray-900 dark:text-white">AI-Organized Study Topics</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {Object.entries(categories).map(([category, noteIds]) => (
              <button 
                key={category}
                onClick={() => setSelectedTag(category)}
                className="p-2 bg-white dark:bg-gray-800 rounded border border-purple-100 dark:border-purple-900/20 text-left"
              >
                <div className="font-medium text-sm">{category}</div>
                <div className="text-xs text-gray-500">{noteIds.length} notes</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <div 
            key={note.id} 
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm cursor-pointer"
            onClick={() => handleEditNote(note)}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">{note.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                {formatDate(note.updatedAt)}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {note.summary || note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '')}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Tag size={14} className="text-gray-400" />
              {note.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        
        {filteredNotes.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {searchTerm || selectedTag !== 'All' 
              ? 'No notes match your search criteria' 
              : 'No notes yet. Click the + button to create your first note!'}
          </div>
        )}
      </div>
    </div>
  );
}