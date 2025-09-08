import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToolCard from "./ToolCard";
import { toolCategories, getToolsByCategory } from "@/data/tools";
import * as Icons from "lucide-react";

interface CategorySectionProps {
  categoryId: string;
  showAll?: boolean;
}

const CategorySection = ({ categoryId, showAll = false }: CategorySectionProps) => {
  const category = toolCategories.find(cat => cat.id === categoryId);
  const tools = getToolsByCategory(categoryId);
  const displayTools = showAll ? tools : tools.slice(0, 6);
  
  if (!category) return null;

  const IconComponent = Icons[category.icon as keyof typeof Icons] as any;

  return (
    <section className="py-12">
      <div className="container">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-${category.color}/10 text-${category.color} border border-${category.color}/20`}>
              {IconComponent && <IconComponent className="h-6 w-6" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
          
          {!showAll && tools.length > 6 && (
            <Button variant="outline" asChild>
              <Link to={`/category/${categoryId}`}>
                View All ({tools.length})
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTools.map((tool, index) => (
            <div 
              key={tool.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ToolCard tool={tool} featured={tool.featured} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">No tools available in this category yet.</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;