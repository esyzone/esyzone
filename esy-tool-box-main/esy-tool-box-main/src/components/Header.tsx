import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tools } from "@/data/tools";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof tools>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = tools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleToolSelect = (toolRoute: string) => {
    navigate(toolRoute);
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Esytool
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex relative flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 h-10 bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-background border border-border rounded-lg shadow-medium max-h-96 overflow-y-auto z-50">
              {searchResults.slice(0, 8).map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolSelect(tool.route)}
                  className="w-full text-left px-4 py-3 hover:bg-muted/50 flex items-center space-x-3 transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm font-medium">
                      {tool.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{tool.name}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/categories">Categories</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 h-10 bg-muted/50 border-0"
              />
            </div>

            {/* Mobile Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="bg-muted/30 rounded-lg p-2 space-y-1">
                {searchResults.slice(0, 5).map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      handleToolSelect(tool.route);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-background rounded-lg flex items-center space-x-3 transition-colors"
                  >
                    <div className="h-6 w-6 rounded bg-gradient-primary/10 flex items-center justify-center">
                      <span className="text-primary text-xs font-medium">
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{tool.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;