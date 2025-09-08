import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategorySection from "@/components/CategorySection";
import { toolCategories } from "@/data/tools";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = toolCategories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
            <p className="text-muted-foreground">The requested category does not exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{category.name}</li>
          </ol>
        </nav>

        <CategorySection categoryId={categoryId!} showAll={true} />
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;