import { useState } from "react";
import { Link } from "react-router-dom";
import { Braces, Copy, Download, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const JSONFormatter = () => {
  const [inputJSON, setInputJSON] = useState("");
  const [formattedJSON, setFormattedJSON] = useState("");
  const [minifiedJSON, setMinifiedJSON] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const formatJSON = () => {
    try {
      if (!inputJSON.trim()) {
        setFormattedJSON("");
        setMinifiedJSON("");
        setIsValid(null);
        setError("");
        return;
      }

      const parsed = JSON.parse(inputJSON);
      const formatted = JSON.stringify(parsed, null, 2);
      const minified = JSON.stringify(parsed);
      
      setFormattedJSON(formatted);
      setMinifiedJSON(minified);
      setIsValid(true);
      setError("");
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setFormattedJSON("");
      setMinifiedJSON("");
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} JSON copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy JSON",
        variant: "destructive"
      });
    }
  };

  const downloadJSON = (text: string, filename: string) => {
    if (!text) return;
    
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: `${filename} downloaded successfully`,
    });
  };

  const loadSampleJSON = () => {
    const sampleJSON = {
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "profile": {
          "age": 30,
          "city": "New York",
          "interests": ["programming", "music", "travel"]
        },
        "isActive": true,
        "lastLogin": "2024-01-15T10:30:00Z"
      },
      "settings": {
        "theme": "dark",
        "notifications": {
          "email": true,
          "push": false,
          "sms": true
        }
      }
    };
    
    setInputJSON(JSON.stringify(sampleJSON));
  };

  // Format JSON when input changes
  useState(() => {
    formatJSON();
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/category/developer" className="hover:text-primary transition-colors">Developer Tools</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">JSON Formatter</li>
          </ol>
        </nav>

        {/* Tool Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-category-developer/10 text-category-developer px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Braces className="h-4 w-4" />
            <span>Developer Tool</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">JSON Formatter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Format, validate, and minify JSON data. Perfect for developers working with APIs, 
            configuration files, and data structures.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Input JSON</CardTitle>
                    <div className="flex items-center space-x-2">
                      {isValid === true && (
                        <Badge variant="outline" className="text-green-600 border-green-600/20 bg-green-600/10">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Valid
                        </Badge>
                      )}
                      {isValid === false && (
                        <Badge variant="outline" className="text-red-600 border-red-600/20 bg-red-600/10">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Invalid
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste your JSON here..."
                    value={inputJSON}
                    onChange={(e) => {
                      setInputJSON(e.target.value);
                      formatJSON();
                    }}
                    className="min-h-[400px] font-mono text-sm resize-none"
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={loadSampleJSON}>
                      <Upload className="mr-2 h-4 w-4" />
                      Load Sample
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(inputJSON, "Input")}
                      disabled={!inputJSON}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Input
                    </Button>
                  </div>
                  
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
                      <strong>Error:</strong> {error}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              {/* Formatted JSON */}
              <Card>
                <CardHeader>
                  <CardTitle>Formatted JSON</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={formattedJSON}
                    readOnly
                    className="min-h-[300px] font-mono text-sm resize-none bg-muted/30"
                    placeholder="Formatted JSON will appear here..."
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(formattedJSON, "Formatted")}
                      disabled={!formattedJSON}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => downloadJSON(formattedJSON, "formatted.json")}
                      disabled={!formattedJSON}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Minified JSON */}
              <Card>
                <CardHeader>
                  <CardTitle>Minified JSON</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={minifiedJSON}
                    readOnly
                    className="min-h-[150px] font-mono text-sm resize-none bg-muted/30"
                    placeholder="Minified JSON will appear here..."
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(minifiedJSON, "Minified")}
                      disabled={!minifiedJSON}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => downloadJSON(minifiedJSON, "minified.json")}
                      disabled={!minifiedJSON}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">JSON Validation</h3>
                  <p className="text-sm text-muted-foreground">Instantly validate JSON syntax and catch errors</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Braces className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Pretty Formatting</h3>
                  <p className="text-sm text-muted-foreground">Format JSON with proper indentation and structure</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Download className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Download & Copy</h3>
                  <p className="text-sm text-muted-foreground">Easy copy to clipboard and file download options</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JSONFormatter;