import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Check, 
  X, 
  Sparkles, 
  FileText, 
  Trophy, 
  Zap,
  Infinity,
  Shield,
  Star
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Pro = () => {
  const handleUpgrade = () => {
    toast({
      title: "Stripe Integration Required",
      description: "Connect Stripe to enable Pro subscriptions. Feature coming soon!",
      variant: "destructive"
    });
  };

  const features = [
    {
      category: "AI Content Generation",
      free: "3 generations (300-400 words)",
      pro: "Unlimited generations (up to 1000 words)",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      category: "PDF Upload",
      free: "5 pages / 1500 words max",
      pro: "Full PDF (up to 1MB)",
      icon: <FileText className="h-5 w-5" />
    },
    {
      category: "Custom Text Reading",
      free: "Not available",
      pro: "Paste/type unlimited text",
      icon: <FileText className="h-5 w-5" />
    },
    {
      category: "Leaderboard Access",
      free: "View only",
      pro: "Full participation & rankings",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      category: "Reading Analytics",
      free: "Local storage only",
      pro: "Cloud sync & detailed stats",
      icon: <Zap className="h-5 w-5" />
    },
    {
      category: "Comprehension Quizzes",
      free: "Basic quizzes",
      pro: "Advanced AI-powered quizzes",
      icon: <Shield className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 px-4 py-2 rounded-full border border-yellow-500/20 mb-6">
            <Crown className="h-4 w-4 text-yellow-600" />
            <span className="text-yellow-700 font-medium">Upgrade to Pro</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlock Your
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              {" "}Full Potential
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take your speed reading to the next level with unlimited AI content, 
            full PDF support, and advanced analytics.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Check className="h-3 w-3 mr-1" />
              30-day money back guarantee
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              <Infinity className="h-3 w-3 mr-1" />
              Cancel anytime
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Free Plan */}
          <Card className="p-8 relative">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-2">$0</div>
              <p className="text-muted-foreground">Perfect for getting started</p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span>3 AI generations per month</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span>Basic PDF upload (5 pages)</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span>View leaderboard</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span>Basic comprehension quizzes</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="h-4 w-4 text-red-500" />
                <span className="text-muted-foreground">Custom text reading</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="h-4 w-4 text-red-500" />
                <span className="text-muted-foreground">Leaderboard participation</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card className="p-8 relative border-primary shadow-lg ring-2 ring-primary/20">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                <Star className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <Crown className="h-6 w-6 text-yellow-500" />
                Pro
              </h3>
              <div className="text-4xl font-bold mb-2">
                $10
                <span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">Everything you need to excel</p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>Unlimited</strong> AI generations</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>Full PDF</strong> upload (1MB)</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>Custom text</strong> reading</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>Leaderboard</strong> participation</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>Advanced</strong> analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>AI-powered</strong> quizzes</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span><strong>Priority</strong> support</span>
              </div>
            </div>
            
            <Button 
              variant="gradient" 
              className="w-full shadow-lg" 
              onClick={handleUpgrade}
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </Button>
          </Card>
        </div>

        {/* Feature Comparison */}
        <Card className="p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Feature Comparison</h3>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <span className="font-medium">{feature.category}</span>
                </div>
                
                <div className="text-muted-foreground">
                  <Badge variant="outline">{feature.free}</Badge>
                </div>
                
                <div className="text-primary font-medium">
                  <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                    {feature.pro}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
          
          <div className="space-y-6 text-left">
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-muted-foreground">
                Yes! You can cancel your Pro subscription at any time. You'll continue to have access 
                to Pro features until the end of your billing period.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-2">What happens to my data if I downgrade?</h4>
              <p className="text-muted-foreground">
                Your reading history and stats will be preserved. However, you'll lose access to Pro features 
                like unlimited AI generations and leaderboard participation.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-muted-foreground">
                We offer a 30-day money-back guarantee instead of a free trial. This way you can try 
                all Pro features risk-free for a full month.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro;