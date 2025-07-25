import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  Users, 
  TrendingUp,
  Calendar,
  Target
} from "lucide-react";

const Leaderboard = () => {
  // Mock leaderboard data
  const leaderboardData = {
    wpm: [
      { rank: 1, name: "Alex Rodriguez", nickname: "SpeedDemon", wpm: 450, sessions: 89, accuracy: 94, isPro: true },
      { rank: 2, name: "Sarah Chen", nickname: "QuickReader", wpm: 425, sessions: 76, accuracy: 92, isPro: true },
      { rank: 3, name: "Michael Johnson", nickname: "FlashRead", wpm: 410, sessions: 95, accuracy: 89, isPro: true },
      { rank: 4, name: "Emma Wilson", nickname: "BookWorm", wpm: 395, sessions: 67, accuracy: 96, isPro: true },
      { rank: 5, name: "David Kim", nickname: "ReadMaster", wpm: 380, sessions: 82, accuracy: 91, isPro: true },
      { rank: 6, name: "Lisa Thompson", nickname: "PageTurner", wpm: 365, sessions: 54, accuracy: 88, isPro: true },
      { rank: 7, name: "James Brown", nickname: "TextRacer", wpm: 350, sessions: 71, accuracy: 93, isPro: true },
      { rank: 8, name: "Anna Garcia", nickname: "SwiftReader", wpm: 340, sessions: 63, accuracy: 90, isPro: true },
    ],
    sessions: [
      { rank: 1, name: "Michael Johnson", nickname: "FlashRead", sessions: 95, wpm: 410, accuracy: 89, isPro: true },
      { rank: 2, name: "Alex Rodriguez", nickname: "SpeedDemon", sessions: 89, wpm: 450, accuracy: 94, isPro: true },
      { rank: 3, name: "David Kim", nickname: "ReadMaster", sessions: 82, wpm: 380, accuracy: 91, isPro: true },
      { rank: 4, name: "Sarah Chen", nickname: "QuickReader", sessions: 76, wpm: 425, accuracy: 92, isPro: true },
      { rank: 5, name: "James Brown", nickname: "TextRacer", sessions: 71, wpm: 350, accuracy: 93, isPro: true },
      { rank: 6, name: "Emma Wilson", nickname: "BookWorm", sessions: 67, wpm: 395, accuracy: 96, isPro: true },
      { rank: 7, name: "Anna Garcia", nickname: "SwiftReader", sessions: 63, wpm: 340, accuracy: 90, isPro: true },
      { rank: 8, name: "Lisa Thompson", nickname: "PageTurner", sessions: 54, wpm: 365, accuracy: 88, isPro: true },
    ],
    accuracy: [
      { rank: 1, name: "Emma Wilson", nickname: "BookWorm", accuracy: 96, wpm: 395, sessions: 67, isPro: true },
      { rank: 2, name: "Alex Rodriguez", nickname: "SpeedDemon", accuracy: 94, wpm: 450, sessions: 89, isPro: true },
      { rank: 3, name: "James Brown", nickname: "TextRacer", accuracy: 93, wpm: 350, sessions: 71, isPro: true },
      { rank: 4, name: "Sarah Chen", nickname: "QuickReader", accuracy: 92, wpm: 425, sessions: 76, isPro: true },
      { rank: 5, name: "David Kim", nickname: "ReadMaster", accuracy: 91, wpm: 380, sessions: 82, isPro: true },
      { rank: 6, name: "Anna Garcia", nickname: "SwiftReader", accuracy: 90, wpm: 340, sessions: 63, isPro: true },
      { rank: 7, name: "Michael Johnson", nickname: "FlashRead", accuracy: 89, wpm: 410, sessions: 95, isPro: true },
      { rank: 8, name: "Lisa Thompson", nickname: "PageTurner", accuracy: 88, wpm: 365, sessions: 54, isPro: true },
    ]
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold">{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-600 to-orange-700";
      default:
        return "";
    }
  };

  const LeaderboardList = ({ data, metric }: { data: any[], metric: string }) => (
    <div className="space-y-3">
      {data.map((user) => (
        <Card key={user.rank} className={`p-4 ${user.rank <= 3 ? 'ring-2 ring-primary/20' : ''}`}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              user.rank <= 3 ? getRankBadge(user.rank) : 'bg-muted'
            }`}>
              {getRankIcon(user.rank)}
            </div>

            <Avatar className="h-12 w-12">
              <AvatarImage src={`/placeholder-avatar-${user.rank}.jpg`} />
              <AvatarFallback>{user.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{user.name}</h3>
                {user.isPro && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{user.nickname}</p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {metric === 'wpm' && `${user.wpm}`}
                {metric === 'sessions' && user.sessions}
                {metric === 'accuracy' && `${user.accuracy}%`}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric === 'wpm' && 'WPM'}
                {metric === 'sessions' && 'Sessions'}
                {metric === 'accuracy' && 'Accuracy'}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
          <p className="text-muted-foreground">Compete with speed readers worldwide</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="p-2 bg-primary/10 rounded-lg w-fit mx-auto mb-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <div className="text-sm text-muted-foreground">Active Readers</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="p-2 bg-primary/10 rounded-lg w-fit mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">450</div>
            <div className="text-sm text-muted-foreground">Highest WPM</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="p-2 bg-primary/10 rounded-lg w-fit mx-auto mb-2">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">5,892</div>
            <div className="text-sm text-muted-foreground">Sessions Today</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="p-2 bg-primary/10 rounded-lg w-fit mx-auto mb-2">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">89%</div>
            <div className="text-sm text-muted-foreground">Avg Accuracy</div>
          </Card>
        </div>

        {/* Pro Upgrade Notice for Free Users */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">Join the Competition!</h3>
              <p className="text-muted-foreground">
                Upgrade to Pro to participate in the leaderboard and compete with readers worldwide.
              </p>
            </div>
            <Button variant="gradient">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="wpm" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="wpm" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Reading Speed
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Most Active
            </TabsTrigger>
            <TabsTrigger value="accuracy" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Best Accuracy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wpm">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Speed Readers
              </h3>
              <LeaderboardList data={leaderboardData.wpm} metric="wpm" />
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Most Active Readers
              </h3>
              <LeaderboardList data={leaderboardData.sessions} metric="sessions" />
            </Card>
          </TabsContent>

          <TabsContent value="accuracy">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Most Accurate Readers
              </h3>
              <LeaderboardList data={leaderboardData.accuracy} metric="accuracy" />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;