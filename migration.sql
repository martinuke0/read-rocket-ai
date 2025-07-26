-- Add total_words column to reading_sessions table
ALTER TABLE reading_sessions
ADD COLUMN total_words integer DEFAULT 0;

-- Update existing rows to calculate total_words from text_content
UPDATE reading_sessions
SET total_words = array_length(regexp_split_to_array(trim(text_content), '\s+'), 1)
WHERE text_content IS NOT NULL; 