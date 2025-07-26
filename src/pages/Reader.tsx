import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  FileText, 
  Sparkles,
  Upload,
  Moon,
  Sun,
  Loader2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateContent } from "@/services/openai";
import { statsService } from "@/services/stats";
import type { ReadingStats } from "@/services/stats";

const Reader = () => {
  const [text, setText] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(250);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [stats, setStats] = useState<ReadingStats>({
    totalSessions: 0,
    totalWordsRead: 0,
    averageWpm: 0,
    averageQuizScore: 0
  });

  // Load stats on mount
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const newStats = await statsService.getStats();
    setStats(newStats);
  };

  // Random prompts for variety
  const randomPrompts = [
    "Write an engaging article about the psychology of learning and memory retention.",
    "Create a story about a person who discovers they can read minds through speed reading.",
    "Explain the evolution of reading techniques throughout human history.",
    "Discuss how technology is changing the way we consume written content.",
    "Write about the connection between reading speed and comprehension.",
    "Describe the future of reading in the digital age.",
    "Share tips for improving focus and concentration while reading.",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentWordIndex < words.length) {
      interval = setInterval(async () => {
        setCurrentWordIndex(prev => {
          const nextIndex = prev + 1;
          // Update progress for the current word
          statsService.updateProgress(nextIndex, wpm);
          
          if (nextIndex >= words.length) {
            setIsPlaying(false);
            // End session when reading completes and refresh stats
            statsService.endSession().then(() => {
              loadStats(); // Refresh stats after session ends
            });
            return prev; // Keep the last word
          }
          return nextIndex;
        });
      }, 60000 / wpm);
    }
    return () => clearInterval(interval);
  }, [isPlaying, wpm, currentWordIndex, words.length]);

  useEffect(() => {
    if (text) {
      const wordArray = text.split(/\s+/).filter(word => word.length > 0);
      setWords(wordArray);
      setCurrentWordIndex(0);
      setProgress(0);
      // Start new session when text changes and refresh stats
      statsService.startSession(text).then(() => {
        loadStats(); // Refresh stats after new session starts
      });
    } else {
      setWords([]);
      setCurrentWordIndex(0);
      setProgress(0);
    }
  }, [text]);

  useEffect(() => {
    if (words.length === 0) {
      setProgress(0);
      return;
    }
    const progress = ((currentWordIndex + 1) / words.length) * 100;
    setProgress(Math.min(progress, 100)); // Ensure progress doesn't exceed 100%
  }, [currentWordIndex, words.length]);

  const handlePlay = async () => {
    if (words.length === 0) {
      toast({
        title: "No text to read",
        description: "Please enter some text first.",
        variant: "destructive"
      });
      return;
    }
    
    // If we're at the end, start a new session
    if (currentWordIndex >= words.length - 1) {
      setCurrentWordIndex(0);
      // End previous session and start a new one
      await statsService.endSession();
      await statsService.startSession(text);
      await loadStats(); // Refresh stats after session changes
    }
    
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = async () => {
    setIsPlaying(false);
    setCurrentWordIndex(0);
    // End current session if exists and start a new one
    await statsService.endSession();
    await statsService.startSession(text);
    await loadStats(); // Refresh stats after session changes
  };

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    return randomPrompts[randomIndex];
  };

  const generateAIContent = async () => {
    try {
      setIsGenerating(true);
      setText(""); // Clear existing text
      const prompt = customPrompt.trim() || getRandomPrompt();
      setCustomPrompt(""); // Clear the custom prompt
      
      await generateContent(prompt, (chunk) => {
        setText(prev => prev + chunk); // Append each chunk to the text
      });

      toast({
        title: "AI Content Generated",
        description: "New content has been generated and loaded.",
      });
    } catch (error) {
      toast({
        title: "Error Generating Content",
        description: "Please check your OpenAI API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const uploadPDF = () => {
    toast({
      title: "PDF Upload",
      description: "PDF processing feature coming soon!",
      variant: "destructive"
    });
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length > 1000) {
      toast({
        title: "Word Limit Exceeded",
        description: "Please keep your prompt under 1000 words.",
        variant: "destructive"
      });
      return;
    }
    setCustomPrompt(e.target.value);
  };

  const currentWord = words[currentWordIndex] || "";
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark reader-bg' : 'bg-background'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">SpeedRead AI</h1>
            <p className="text-muted-foreground">Enhanced reading with AI-powered comprehension</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Badge variant="secondary">Free Tier</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Text Input */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Text Input
              </h3>
              
              <div className="space-y-4">
                <Textarea
                  placeholder="Read me..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
                
                <Textarea
                  placeholder="Describe the story you want to read (leave empty for random story)..."
                  value={customPrompt}
                  onChange={handlePromptChange}
                  className="min-h-[80px] resize-none"
                />

                <div className="flex gap-2">
                  <Button 
                    onClick={generateAIContent} 
                    variant="reader" 
                    size="sm"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI Generate
                      </>
                    )}
                  </Button>
                  <Button onClick={uploadPDF} variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </Card>

            {/* Speed Controls */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Speed Controls
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Reading Speed</label>
                    <span className="text-sm text-muted-foreground">{wpm} WPM</span>
                  </div>
                  <Slider
                    value={[wpm]}
                    onValueChange={(value) => setWpm(value[0])}
                    max={1000}
                    min={50}
                    step={25}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={isPlaying ? handlePause : handlePlay}
                    variant="gradient"
                    size="lg"
                    className="flex-1"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Read
                      </>
                    )}
                  </Button>
                  
                  <Button onClick={handleReset} variant="outline" size="lg">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Progress */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {words.length > 0 
                      ? `Word ${currentWordIndex + 1} of ${words.length}`
                      : 'Waiting for text...'
                    }
                  </span>
                  <span>
                    {words.length > 0 
                        ? Math.round(progress) + '%'
                        : ''
                      }
                    
                    </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Reader Display */}
          <div className="lg:col-span-2">
            <Card className={`h-[600px] flex items-center justify-center ${isDarkMode ? 'reader-bg border-primary/20' : ''}`}>
              <div className="text-center p-8">
                {currentWord ? (
                  <div className="space-y-8">
                    <div className="reader-highlight text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide animate-fade-in">
                      {currentWord}
                    </div>
                    
                    <div className="text-muted-foreground">
                      <div className="mb-2">Reading at {wpm} WPM</div>
                      <div className="text-sm">
                        {isPlaying ? "Reading..." : "Paused"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground space-y-4">
                    <div className="text-xl">Ready to start speed reading?</div>
                    <div>Enter some text and click play to begin</div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.totalSessions}</div>
            <div className="text-sm text-muted-foreground">Sessions</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.totalWordsRead}</div>
            <div className="text-sm text-muted-foreground">Words Read</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.averageWpm}</div>
            <div className="text-sm text-muted-foreground">Avg WPM</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.averageQuizScore}%</div>
            <div className="text-sm text-muted-foreground">Quiz Score</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reader;