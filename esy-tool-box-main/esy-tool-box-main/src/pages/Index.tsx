import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import ToolCard from "@/components/ToolCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getFeaturedTools } from "@/data/tools";
import { Sparkles } from "lucide-react";

const Index = () => {
  const featuredTools = getFeaturedTools();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* Featured Tools */}
      <section className="py-16 bg-muted/20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Featured Tools
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Most Popular Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most-used tools that help thousands of users daily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTools.map((tool, index) => (
              <div 
                key={tool.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ToolCard tool={tool} featured={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="space-y-0">
        <CategorySection categoryId="text" />
        <div className="bg-muted/10">
          <CategorySection categoryId="image" />
        </div>
        <CategorySection categoryId="pdf" />
        <div className="bg-muted/10">
          <CategorySection categoryId="developer" />
        </div>
        <CategorySection categoryId="converter" />
        <div className="bg-muted/10">
          <CategorySection categoryId="generator" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;