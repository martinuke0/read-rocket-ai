import { supabase, ReadingSession, QuizResult } from '@/lib/supabase';

export interface ReadingStats {
  totalSessions: number;
  totalWordsRead: number;
  averageWpm: number;
  averageQuizScore: number;
}

class StatsService {
  private currentSession: ReadingSession | null = null;
  private wordCount = 0;
  private sessionStartTime: number = 0;
  private completionTimes: number[] = [];

  async startSession(textContent: string): Promise<void> {
    try {
      console.log('Starting new session with text:', textContent.substring(0, 50) + '...');
      
      // Calculate total words in text
      const totalWords = textContent.trim().split(/\s+/).length;
      console.log('Total words in text:', totalWords);
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      
      // Reset tracking variables
      this.wordCount = 0;
      this.sessionStartTime = Date.now();
      
      const { data, error } = await supabase
        .from('reading_sessions')
        .insert({
          text_content: textContent,
          words_read: 0,
          total_words: totalWords,
          avg_wpm: 0,
          completed: false
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }
      console.log('Session started successfully:', data);
      this.currentSession = data;
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    }
  }

  async updateProgress(wordsRead: number, currentWpm: number): Promise<void> {
    if (!this.currentSession) {
      console.log('No active session to update progress');
      return;
    }

    // Only update if we have actual progress
    if (wordsRead > this.wordCount) {
      this.wordCount = wordsRead;

      try {
        const { error } = await supabase
          .from('reading_sessions')
          .update({
            words_read: wordsRead
          })
          .eq('id', this.currentSession.id);

        if (error) throw error;
        console.log('Progress updated successfully');
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  }

  async endSession(): Promise<void> {
    if (!this.currentSession) {
      console.log('No active session to end');
      return;
    }

    try {
      console.log('Ending session:', this.currentSession.id);
      
      // Calculate actual WPM based on completion time
      const completionTime = (Date.now() - this.sessionStartTime) / 1000 / 60; // in minutes
      const actualWpm = Math.round(this.wordCount / completionTime);
      this.completionTimes.push(completionTime);

      console.log(`Session completed in ${completionTime.toFixed(2)} minutes, Actual WPM: ${actualWpm}`);

      const { error } = await supabase
        .from('reading_sessions')
        .update({
          ended_at: new Date().toISOString(),
          completed: true,
          avg_wpm: actualWpm
        })
        .eq('id', this.currentSession.id);

      if (error) throw error;
      console.log('Session ended successfully');
      
      this.currentSession = null;
      this.wordCount = 0;
    } catch (error) {
      console.error('Error ending session:', error);
    }
  }

  async saveQuizResult(score: number, maxScore: number): Promise<void> {
    if (!this.currentSession) return;

    try {
      await supabase
        .from('quiz_results')
        .insert({
          session_id: this.currentSession.id,
          score,
          max_score: maxScore
        });
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  }

  async getStats(): Promise<ReadingStats> {
    try {
      console.log('Fetching stats...');
      
      // Get sessions data
      const { data: sessions, error: sessionsError } = await supabase
        .from('reading_sessions')
        .select('total_words, avg_wpm, completed');

      if (sessionsError) throw sessionsError;
      console.log('Retrieved sessions:', sessions);

      // Get quiz results
      const { data: quizResults, error: quizError } = await supabase
        .from('quiz_results')
        .select('score, max_score');

      if (quizError) throw quizError;
      console.log('Retrieved quiz results:', quizResults);

      if (!sessions) {
        throw new Error('Failed to fetch sessions');
      }

      // Only count completed sessions
      const completedSessions = sessions.filter(session => session.completed);
      const totalSessions = completedSessions.length;
      
      // Sum total_words from completed sessions
      const totalWordsRead = completedSessions.reduce((sum, session) => sum + (session.total_words || 0), 0);
      
      const averageWpm = Math.round(
        completedSessions.reduce((sum, session) => sum + (session.avg_wpm || 0), 0) / totalSessions || 0
      );
      const averageQuizScore = quizResults ? Math.round(
        quizResults.reduce((sum, result) => sum + ((result.score / result.max_score) * 100), 0) / quizResults.length || 0
      ) : 0;

      const stats = {
        totalSessions,
        totalWordsRead,
        averageWpm,
        averageQuizScore
      };
      
      console.log('Calculated stats:', stats);
      return stats;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        totalSessions: 0,
        totalWordsRead: 0,
        averageWpm: 0,
        averageQuizScore: 0
      };
    }
  }
}

export const statsService = new StatsService(); 