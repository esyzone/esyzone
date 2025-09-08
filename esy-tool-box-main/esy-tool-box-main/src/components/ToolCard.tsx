import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tool } from "@/data/tools";
import * as Icons from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
}

const ToolCard = ({ tool, featured = false }: ToolCardProps) => {
  const navigate = useNavigate();
  
  // Get the icon component dynamically
  const IconComponent = Icons[tool.icon as keyof typeof Icons] as any;

  const categoryColors = {
    text: 'bg-category-text/10 text-category-text border-category-text/20',
    image: 'bg-category-image/10 text-category-image border-category-image/20',
    pdf: 'bg-category-pdf/10 text-category-pdf border-category-pdf/20',
    developer: 'bg-category-developer/10 text-category-developer border-category-developer/20',
    converter: 'bg-category-converter/10 text-category-converter border-category-converter/20',
    generator: 'bg-category-generator/10 text-category-generator border-category-generator/20',
  };

  const handleClick = () => {
    navigate(tool.route);
  };

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1 cursor-pointer bg-gradient-card border-card-border ${
        featured ? 'ring-2 ring-primary/20' : ''
      }`}
      onClick={handleClick}
    >
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            <Star className="h-3 w-3 fill-current" />
            <span>Popular</span>
          </div>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Icon */}
          <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center border transition-colors ${
            categoryColors[tool.category as keyof typeof categoryColors] || categoryColors.text
          }`}>
            {IconComponent && <IconComponent className="h-6 w-6" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {tool.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {tool.description}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity justify-center bg-muted/50 hover:bg-primary/10 hover:text-primary"
        >
          Use Tool
          <ArrowRight className="ml-2 h-3 w-3" />
        </Button>
      </CardContent>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
    </Card>
  );
};

export default ToolCard;