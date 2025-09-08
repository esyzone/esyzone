import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toolCategories, getToolsByCategory } from "@/data/tools";
import * as Icons from "lucide-react";

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tool Categories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of professional tools organized by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((category, index) => {
            const IconComponent = Icons[category.icon as keyof typeof Icons] as any;
            const toolCount = getToolsByCategory(category.id).length;

            return (
              <Card 
                key={category.id}
                className="group hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-gradient-card border-card-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-${category.color}/10 text-${category.color} border border-${category.color}/20 group-hover:scale-110 transition-transform`}>
                      {IconComponent && <IconComponent className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                      <p className="text-xs text-primary font-medium mt-2">
                        {toolCount} tools available
                      </p>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all"
                    asChild
                  >
                    <Link to={`/category/${category.id}`}>
                      Explore {category.name}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;