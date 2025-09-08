import { useState } from "react";
import { Link } from "react-router-dom";
import { Type, Copy, ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const { toast } = useToast();

  const conversions = [
    {
      name: "UPPERCASE",
      description: "Convert text to UPPERCASE",
      convert: (text: string) => text.toUpperCase()
    },
    {
      name: "lowercase",
      description: "Convert text to lowercase",
      convert: (text: string) => text.toLowerCase()
    },
    {
      name: "Title Case",
      description: "Convert Text To Title Case",
      convert: (text: string) => 
        text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
    },
    {
      name: "Sentence case",
      description: "Convert text to sentence case",
      convert: (text: string) => 
        text.toLowerCase().replace(/(^\w|\.\s+\w)/g, char => char.toUpperCase())
    },
    {
      name: "camelCase",
      description: "convertTextToCamelCase",
      convert: (text: string) => 
        text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
          .replace(/^[A-Z]/, char => char.toLowerCase())
    },
    {
      name: "PascalCase",
      description: "ConvertTextToPascalCase",
      convert: (text: string) => 
        text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
          .replace(/^[a-z]/, char => char.toUpperCase())
    },
    {
      name: "snake_case",
      description: "convert_text_to_snake_case",
      convert: (text: string) => 
        text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '')
    },
    {
      name: "kebab-case",
      description: "convert-text-to-kebab-case",
      convert: (text: string) => 
        text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')
    }
  ];

  const copyToClipboard = async (text: string, conversionName: string) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${conversionName} text copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive"
      });
    }
  };

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
            <li className="text-foreground font-medium">Case Converter</li>
          </ol>
        </nav>

        {/* Tool Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-category-text/10 text-category-text px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Type className="h-4 w-4" />
            <span>Text Conversion Tool</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Case Converter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert text between different cases including uppercase, lowercase, title case, 
            camelCase, snake_case, kebab-case, and more.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Input */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Your Text</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type or paste your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px] text-base"
              />
            </CardContent>
          </Card>

          {/* Conversions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conversions.map((conversion, index) => {
              const convertedText = inputText ? conversion.convert(inputText) : "";
              
              return (
                <Card 
                  key={conversion.name}
                  className="animate-fade-in hover:shadow-medium transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{conversion.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {conversion.description}
                        </p>
                      </div>
                      <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Textarea
                        value={convertedText}
                        readOnly
                        className="min-h-[100px] resize-none bg-muted/30 text-sm"
                        placeholder={inputText ? "Converted text will appear here" : "Enter text above to see conversion"}
                      />
                      {convertedText && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(convertedText, conversion.name)}
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Type className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Programming</h3>
                  <p className="text-sm text-muted-foreground">Convert variable names to camelCase, snake_case, or PascalCase</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <ArrowRightLeft className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Content Writing</h3>
                  <p className="text-sm text-muted-foreground">Fix text formatting for titles, headings, and proper names</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Copy className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Data Processing</h3>
                  <p className="text-sm text-muted-foreground">Standardize text data for databases and spreadsheets</p>
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

export default CaseConverter;