import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hash, FileText, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    });
  }, [text]);

  const statCards = [
    { icon: Hash, label: "Characters", value: stats.characters, color: "text-blue-600" },
    { icon: Hash, label: "Characters (no spaces)", value: stats.charactersNoSpaces, color: "text-green-600" },
    { icon: FileText, label: "Words", value: stats.words, color: "text-purple-600" },
    { icon: Target, label: "Sentences", value: stats.sentences, color: "text-orange-600" },
    { icon: FileText, label: "Paragraphs", value: stats.paragraphs, color: "text-red-600" },
    { icon: Clock, label: "Reading time (min)", value: stats.readingTime, color: "text-indigo-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/category/text" className="hover:text-primary transition-colors">Text Tools</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Word Counter</li>
          </ol>
        </nav>

        {/* Tool Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-category-text/10 text-category-text px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Hash className="h-4 w-4" />
            <span>Text Analysis Tool</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Word Counter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Count words, characters, sentences, and paragraphs in your text. 
            Get detailed statistics and estimated reading time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Text Input */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[400px] resize-none text-base leading-relaxed"
                />
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Statistics</h2>
            {statCards.map((stat, index) => (
              <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Hash className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Character Count</h3>
                <p className="text-sm text-muted-foreground">Count total characters including and excluding spaces</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Word Analysis</h3>
                <p className="text-sm text-muted-foreground">Accurate word and paragraph counting</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Reading Time</h3>
                <p className="text-sm text-muted-foreground">Estimate reading time based on average reading speed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WordCounter;