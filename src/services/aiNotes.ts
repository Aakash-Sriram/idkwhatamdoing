import { Note } from '../types';

// Mock AI service for notes organization
// In a real implementation, this would connect to an AI service API
export const aiNotesService = {
  /**
   * Analyzes note content and suggests relevant tags
   * @param content Note content to analyze
   * @returns Array of suggested tags
   */
  suggestTags: (content: string): Promise<string[]> => {
    // This is a mock implementation
    // In a real app, this would call an AI API
    return new Promise((resolve) => {
      setTimeout(() => {
        const keywords = [
          { term: 'equation', tags: ['Math', 'Formula'] },
          { term: 'integral', tags: ['Math', 'Calculus'] },
          { term: 'derivative', tags: ['Math', 'Calculus'] },
          { term: 'function', tags: ['Math'] },
          { term: 'atom', tags: ['Physics', 'Chemistry'] },
          { term: 'quantum', tags: ['Physics', 'Advanced'] },
          { term: 'molecule', tags: ['Chemistry'] },
          { term: 'cell', tags: ['Biology'] },
          { term: 'dna', tags: ['Biology', 'Genetics'] },
          { term: 'protein', tags: ['Biology', 'Biochemistry'] },
          { term: 'acid', tags: ['Chemistry'] },
          { term: 'base', tags: ['Chemistry'] },
          { term: 'theorem', tags: ['Math'] },
          { term: 'theory', tags: ['Advanced'] },
          { term: 'experiment', tags: ['Lab'] },
        ];
        
        const lowerContent = content.toLowerCase();
        const suggestedTags = new Set<string>();
        
        keywords.forEach(({ term, tags }) => {
          if (lowerContent.includes(term)) {
            tags.forEach(tag => suggestedTags.add(tag));
          }
        });
        
        resolve(Array.from(suggestedTags));
      }, 500); // Simulate API delay
    });
  },
  
  /**
   * Generates a summary of the note content
   * @param content Note content to summarize
   * @returns Generated summary
   */
  generateSummary: (content: string): Promise<string> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple summary generation - take first sentence or first 100 chars
        const firstSentence = content.split('.')[0];
        const summary = firstSentence.length > 100 
          ? firstSentence.substring(0, 97) + '...'
          : firstSentence;
        resolve(summary);
      }, 700);
    });
  },
  
  /**
   * Finds related notes based on content similarity
   * @param currentNote The current note
   * @param allNotes All available notes
   * @returns Array of related notes with similarity scores
   */
  findRelatedNotes: (currentNote: Note, allNotes: Note[]): Promise<Array<{note: Note, score: number}>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter out the current note
        const otherNotes = allNotes.filter(note => note.id !== currentNote.id);
        
        // Calculate similarity scores (mock implementation)
        const relatedNotes = otherNotes.map(note => {
          // Count shared tags
          const sharedTags = note.tags.filter(tag => currentNote.tags.includes(tag)).length;
          
          // Simple content similarity (count word overlaps)
          const currentWords = new Set(currentNote.content.toLowerCase().split(/\s+/));
          const noteWords = new Set(note.content.toLowerCase().split(/\s+/));
          let wordOverlap = 0;
          
          noteWords.forEach(word => {
            if (currentWords.has(word) && word.length > 3) { // Only count meaningful words
              wordOverlap++;
            }
          });
          
          // Calculate overall score
          const score = (sharedTags * 0.6) + (wordOverlap * 0.4);
          
          return { note, score };
        });
        
        // Sort by score and return top results
        const sortedResults = relatedNotes
          .sort((a, b) => b.score - a.score)
          .filter(item => item.score > 0)
          .slice(0, 3);
        
        resolve(sortedResults);
      }, 800);
    });
  },
  
  /**
   * Categorizes notes into study topics
   * @param notes Array of notes to categorize
   * @returns Object with categories as keys and arrays of note IDs as values
   */
  categorizeNotes: (notes: Note[]): Promise<Record<string, string[]>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories: Record<string, string[]> = {};
        
        // Group notes by their most common tag
        notes.forEach(note => {
          if (note.tags.length > 0) {
            // Use the first tag as the primary category
            const primaryTag = note.tags[0];
            
            if (!categories[primaryTag]) {
              categories[primaryTag] = [];
            }
            
            categories[primaryTag].push(note.id);
          }
        });
        
        resolve(categories);
      }, 600);
    });
  }
};