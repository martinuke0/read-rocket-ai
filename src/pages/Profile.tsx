import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Trophy, 
  BookOpen, 
  Clock, 
  Target,
  Settings,
  Crown,
  Calendar
} from "lucide-react";

const Profile = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    nickname: "SpeedReader",
    isPro: false,
    joinDate: "2024-01-15",
    stats: {
      totalSessions: 42,
      totalWordsRead: 125000,
      averageWPM: 285,
      bestWPM: 350,
      quizAccuracy: 87,
      currentStreak: 7
    }
  };

  const recentSessions = [
    { id: 1, source: "AI Generated", wordsRead: 450, wpm: 290, accuracy: 85, date: "2024-01-20" },
    { id: 2, source: "PDF Upload", wordsRead: 1200, wpm: 275, accuracy: 92, date: "2024-01-19" },
    { id: 3, source: "Random Content", wordsRead: 380, wpm: 305, accuracy: 88, date: "2024-01-18" },
    { id: 4, source: "User Input", wordsRead: 650, wpm: 270, accuracy: 90, date: "2024-01-17" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Dashboard</h1>
          <p className="text-muted-foreground">Track your reading progress and achievements</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Card */}
            <Card className="p-6">
              <div className="text-center space-y-4">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">@{user.nickname}</p>
                </div>

                <div className="flex justify-center">
                  {user.isPro ? (
                    <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                      <Crown className="h-3 w-3 mr-1" />
                      Pro Member
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Free Tier</Badge>
                  )}
                </div>

                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Button>
                  {!user.isPro && (
                    <Button variant="gradient" size="sm">
                      <Crown className="h-4 w-4 mr-1" />
                      Upgrade
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Member since</span>
                  <span className="text-sm font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current streak</span>
                  <span className="text-sm font-medium">{user.stats.currentStreak} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Best WPM</span>
                  <span className="text-sm font-medium">{user.stats.bestWPM}</span>
                </div>
              </div>
            </Card>

            {/* Progress to Pro */}
            {!user.isPro && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Upgrade to Pro</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Unlock unlimited AI generations, full PDF uploads, and leaderboard participation.
                  </p>
                  <Button variant="gradient" className="w-full">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Now - $10/month
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Right Panel - Stats & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Reading Sessions</h3>
                    <p className="text-2xl font-bold text-primary">{user.stats.totalSessions}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Average WPM</h3>
                    <p className="text-2xl font-bold text-primary">{user.stats.averageWPM}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Words Read</h3>
                    <p className="text-2xl font-bold text-primary">{user.stats.totalWordsRead.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Quiz Accuracy</h3>
                    <p className="text-2xl font-bold text-primary">{user.stats.quizAccuracy}%</p>
                  </div>
                </div>
                <Progress value={user.stats.quizAccuracy} className="mt-2" />
              </Card>
            </div>

            {/* Recent Sessions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Sessions
              </h3>
              
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{session.source}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.wordsRead} words • {session.wpm} WPM • {session.accuracy}% accuracy
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{session.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Sessions
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;