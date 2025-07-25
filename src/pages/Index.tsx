import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Zap, 
  Brain, 
  Trophy, 
  Crown, 
  Play, 
  Sparkles, 
  FileText, 
  TrendingUp,
  Users,
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">SpeedRead AI</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/reader">
                <Button variant="ghost">Reader</Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="ghost">Leaderboard</Button>
              </Link>
              <Link to="/pro">
                <Button variant="gradient" size="sm">
                  <Crown className="h-4 w-4 mr-1" />
                  Upgrade
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Brain className="h-3 w-3 mr-1" />
            AI-Powered Speed Reading
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Read Faster,
            <span className="gradient-hero bg-clip-text text-transparent"> Learn Better</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master speed reading with AI-generated content, PDF uploads, and intelligent comprehension tracking. 
            Join thousands improving their reading skills daily.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <Link to="/reader">
              <Button variant="hero" size="xl">
                <Play className="h-5 w-5 mr-2" />
                Start Reading Now
              </Button>
            </Link>
            <Link to="/pro">
              <Button variant="outline" size="xl">
                <Crown className="h-5 w-5 mr-2" />
                View Pro Features
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Content</h3>
              <p className="text-muted-foreground">Generate custom reading material with AI</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">Monitor WPM and comprehension scores</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compete</h3>
              <p className="text-muted-foreground">Join global leaderboards</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to accelerate your reading?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of readers improving daily</p>
          <Link to="/reader">
            <Button variant="gradient" size="xl">
              Get Started Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
