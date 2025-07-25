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
  Sun
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Reader = () => {
  const [text, setText] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(250);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);

  // Sample text for demo
  const sampleText = "Welcome to SpeedRead AI! This revolutionary application uses RSVP (Rapid Serial Visual Presentation) techniques to help you read faster and comprehend better. Start by pasting your text, uploading a PDF, or generating AI content. Then adjust your reading speed and enjoy the enhanced reading experience with AI-powered comprehension tracking.";

  useEffect(() => {
    if (text) {
      const wordArray = text.split(/\s+/).filter(word => word.length > 0);
      setWords(wordArray);
      setCurrentWordIndex(0);
      setProgress(0);
    }
  }, [text]);

  useEffect(() => {
    setProgress(words.length > 0 ? (currentWordIndex / words.length) * 100 : 0);
  }, [currentWordIndex, words.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentWordIndex < words.length) {
      interval = setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev >= words.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 60000 / wpm);
    }
    return () => clearInterval(interval);
  }, [isPlaying, wpm, currentWordIndex, words.length]);

  const handlePlay = () => {
    if (words.length === 0) {
      toast({
        title: "No text to read",
        description: "Please enter some text first.",
        variant: "destructive"
      });
      return;
    }
    if (currentWordIndex >= words.length - 1) {
      setCurrentWordIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentWordIndex(0);
  };

  const loadSample = () => {
    setText(sampleText);
    toast({
      title: "Sample text loaded",
      description: "Ready to start speed reading!"
    });
  };

  const generateAIContent = () => {
    toast({
      title: "AI Content Generation",
      description: "Connect to OpenAI API to generate content. Feature coming soon!",
      variant: "destructive"
    });
  };

  const uploadPDF = () => {
    toast({
      title: "PDF Upload",
      description: "PDF processing feature coming soon!",
      variant: "destructive"
    });
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
                  placeholder="Paste your text here to start speed reading..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
                
                <div className="flex gap-2">
                  <Button onClick={loadSample} variant="outline" size="sm">
                    Load Sample
                  </Button>
                  <Button onClick={generateAIContent} variant="reader" size="sm">
                    <Sparkles className="h-4 w-4" />
                    AI Generate
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
                        Play
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
                  <span>Word {currentWordIndex + 1} of {words.length}</span>
                  <span>{Math.round(progress)}%</span>
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
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground">Sessions</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground">Words Read</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{wpm}</div>
            <div className="text-sm text-muted-foreground">Avg WPM</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground">Quiz Score</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reader;