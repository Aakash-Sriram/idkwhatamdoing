import  { useState, useEffect } from 'react';
import { X, Tag as  Save, Lightbulb } from 'lucide-react';
import { Note } from '../types';
import { aiNotesService } from '../services/aiNotes';

interface NoteEditorProps {
  initialNote?: Note;
  onSave: (note: Note) => void;
  onCancel: () => void;
  existingNotes: Note[];
}

export default function NoteEditor({ initialNote, onSave, onCancel, existingNotes }: NoteEditorProps) {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [tags, setTags] = useState<string[]>(initialNote?.tags || []);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [summary, setSummary] = useState(initialNote?.summary || '');
  const [relatedNotes, setRelatedNotes] = useState<Array<{note: Note, score: number}>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Generate AI suggestions when content changes (with debounce)
  useEffect(() => {
    if (!content || content.length < 20) return;
    
    const timer = setTimeout(() => {
      setIsAnalyzing(true);
      
      // Get tag suggestions
      aiNotesService.suggestTags(content)
        .then(tags => {
          setSuggestedTags(tags.filter(tag => !tags.includes(tag)));
        })
        .finally(() => setIsAnalyzing(false));
      
      // Generate summary
      aiNotesService.generateSummary(content)
        .then(summary => setSummary(summary));
      
      // Find related notes if we have an initial note
      if (initialNote && existingNotes.length > 0) {
        const currentNote: Note = {
          ...initialNote,
          title,
          content,
          tags
        };
        
        aiNotesService.findRelatedNotes(currentNote, existingNotes)
          .then(related => setRelatedNotes(related));
      }
    }, 1000); // 1 second debounce
    
    return () => clearTimeout(timer);
  }, [content, existingNotes, initialNote, tags, title]);

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag('');
      // Remove from suggestions if it was there
      setSuggestedTags(suggestedTags.filter(t => t !== tag));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    
    const newNote: Note = {
      id: initialNote?.id || Date.now().toString(),
      title,
      content,
      tags,
      createdAt: initialNote?.createdAt || new Date(),
      updatedAt: new Date(),
      summary
    };
    
    onSave(newNote);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {initialNote ? 'Edit Note' : 'Create New Note'}
        </h2>
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
          placeholder="Note title"
        />
      </div>
      
      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 min-h-[200px]"
          placeholder="Write your note here..."
        />
      </div>
      
      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
            >
              {tag}
              <button 
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800"
            placeholder="Add a tag"
            onKeyDown={(e) => e.key === 'Enter' && handleAddTag(newTag)}
          />
          <button
            onClick={() => handleAddTag(newTag)}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
      
      {/* AI Suggestions */}
      {isAnalyzing && (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic">
          AI is analyzing your note...
        </div>
      )}
      
      {/* Suggested Tags */}
      {suggestedTags.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-blue-600" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Suggested Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleAddTag(tag)}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-900/40"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Related Notes */}
      {relatedNotes.length > 0 && (
        <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-purple-600" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Related Notes</h3>
          </div>
          <div className="space-y-2">
            {relatedNotes.map(({note}) => (
              <div key={note.id} className="text-sm p-2 bg-white dark:bg-gray-800 rounded border border-purple-100 dark:border-purple-900/20">
                <div className="font-medium">{note.title}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">{note.summary}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          disabled={!title.trim() || !content.trim()}
        >
          <Save size={16} />
          Save Note
        </button>
      </div>
    </div>
  );
}