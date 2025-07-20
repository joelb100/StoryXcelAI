import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, 
  Users, 
  Zap, 
  BookOpen, 
  Film, 
  FileText, 
  Package, 
  Presentation,
  ArrowRight,
  Play,
  Star,
  CheckCircle
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: BookOpen,
      title: "Story Builder",
      description: "Craft compelling narratives with AI-powered story development tools"
    },
    {
      icon: Film,
      title: "Production Builder", 
      description: "Manage production schedules, budgets, and resource allocation"
    },
    {
      icon: Package,
      title: "Asset Builder",
      description: "Organize and manage all your creative assets in one place"
    },
    {
      icon: FileText,
      title: "Script Builder",
      description: "Write, format, and collaborate on scripts with industry-standard tools"
    },
    {
      icon: Presentation,
      title: "Deck Builder",
      description: "Create stunning pitch decks and presentations"
    },
    {
      icon: Layers,
      title: "World Builder",
      description: "Develop rich, detailed worlds for your creative projects"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Film Producer",
      content: "StoryXcel AI transformed how we manage our creative projects. The collaboration features are incredible.",
      rating: 5
    },
    {
      name: "Marcus Rivera",
      role: "Screenwriter",
      content: "The script builder tools are exactly what I needed. Professional formatting made easy.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Creative Director",
      content: "Finally, a platform that understands the creative workflow. Game-changing for our team.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-charcoal">StoryXcel AI</h1>
            </div>
            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" />
            AI-Powered Creative Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-charcoal via-primary to-secondary bg-clip-text text-transparent">
            Create. Collaborate. Excel.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The comprehensive creative project management platform that serves as your expert assistant 
            for developing, organizing, and producing story-driven projects across all creative phases.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => window.location.href = "/api/login"}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-4"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Creating Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              <Film className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-success" />
              Free to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-success" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-success" />
              Collaborate with teams
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Six Specialized Builder Modules</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to bring your creative vision to life, from initial concept to final presentation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <Users className="w-3 h-3 mr-1" />
                Team Collaboration
              </Badge>
              
              <h2 className="text-4xl font-bold mb-6">
                Work Together, Create Better
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Invite team members, share projects, and collaborate in real-time. 
                Track progress, manage resources, and keep everyone aligned on your creative vision.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Real-time collaboration tools",
                  "Project sharing and permissions",
                  "Resource and budget tracking", 
                  "Milestone management",
                  "Team communication features"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Sarah", status: "online", avatar: "S" },
                    { name: "Marcus", status: "away", avatar: "M" },
                    { name: "Emma", status: "online", avatar: "E" },
                    { name: "Alex", status: "offline", avatar: "A" }
                  ].map((user, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-1 ${
                              user.status === 'online' ? 'bg-success' : 
                              user.status === 'away' ? 'bg-accent' : 'bg-gray-300'
                            }`} />
                            {user.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Creators Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              See what our community has to say about StoryXcel AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-all">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Creative Process?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using StoryXcel AI to bring their visions to life.
          </p>
          <Button 
            size="lg" 
            onClick={() => window.location.href = "/api/login"}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4"
          >
            Start Your Project Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-charcoal text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">StoryXcel AI</span>
            </div>
            <p className="text-white/70">
              © 2024 StoryXcel AI. Empowering creators worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
