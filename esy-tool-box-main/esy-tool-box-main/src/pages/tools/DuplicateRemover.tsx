import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Copy, Download, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DuplicateRemover = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [options, setOptions] = useState({
    caseSensitive: true,
    keepFirstOccurrence: true,
    trimWhitespace: true,
    ignoreEmptyLines: true
  });
  const [stats, setStats] = useState({
    originalLines: 0,
    uniqueLines: 0,
    duplicatesRemoved: 0
  });
  const { toast } = useToast();

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      setOutputText("");
      setStats({ originalLines: 0, uniqueLines: 0, duplicatesRemoved: 0 });
      return;
    }

    let lines = inputText.split('\n');
    const originalCount = lines.length;

    // Trim whitespace if option is enabled
    if (options.trimWhitespace) {
      lines = lines.map(line => line.trim());
    }

    // Ignore empty lines if option is enabled
    if (options.ignoreEmptyLines) {
      lines = lines.filter(line => line.length > 0);
    }

    // Remove duplicates
    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    lines.forEach(line => {
      const comparisonLine = options.caseSensitive ? line : line.toLowerCase();
      
      if (!seen.has(comparisonLine)) {
        seen.add(comparisonLine);
        uniqueLines.push(line);
      }
    });

    const result = uniqueLines.join('\n');
    setOutputText(result);
    
    setStats({
      originalLines: originalCount,
      uniqueLines: uniqueLines.length,
      duplicatesRemoved: originalCount - uniqueLines.length
    });
  };

  const copyToClipboard = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Deduplicated text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive"
      });
    }
  };

  const downloadText = () => {
    if (!outputText) return;
    
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deduplicated-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "deduplicated-text.txt downloaded successfully",
    });
  };

  const loadSampleText = () => {
    const sampleText = `apple
banana
cherry
apple
date
banana
elderberry
fig
cherry
grape
apple
date`;
    setInputText(sampleText);
  };

  const resetAll = () => {
    setInputText("");
    setOutputText("");
    setStats({ originalLines: 0, uniqueLines: 0, duplicatesRemoved: 0 });
  };

  // Auto-process when input or options change
  useState(() => {
    removeDuplicates();
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
            <li><Link to="/category/text" className="hover:text-primary transition-colors">Text Tools</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Duplicate Line Remover</li>
          </ol>
        </nav>

        {/* Tool Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-category-text/10 text-category-text px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trash2 className="h-4 w-4" />
            <span>Text Processing Tool</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Duplicate Line Remover</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Remove duplicate lines from your text while preserving the original order. 
            Perfect for cleaning up lists, logs, and data files.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="caseSensitive"
                        checked={options.caseSensitive}
                        onCheckedChange={(checked) => {
                          setOptions(prev => ({ ...prev, caseSensitive: !!checked }));
                          removeDuplicates();
                        }}
                      />
                      <Label htmlFor="caseSensitive" className="text-sm">Case sensitive</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trimWhitespace"
                        checked={options.trimWhitespace}
                        onCheckedChange={(checked) => {
                          setOptions(prev => ({ ...prev, trimWhitespace: !!checked }));
                          removeDuplicates();
                        }}
                      />
                      <Label htmlFor="trimWhitespace" className="text-sm">Trim whitespace</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ignoreEmptyLines"
                        checked={options.ignoreEmptyLines}
                        onCheckedChange={(checked) => {
                          setOptions(prev => ({ ...prev, ignoreEmptyLines: !!checked }));
                          removeDuplicates();
                        }}
                      />
                      <Label htmlFor="ignoreEmptyLines" className="text-sm">Ignore empty lines</Label>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-3">
                    <Button variant="outline" size="sm" onClick={loadSampleText} className="w-full">
                      Load Sample
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetAll} className="w-full">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset All
                    </Button>
                  </div>

                  {/* Stats */}
                  {stats.originalLines > 0 && (
                    <div className="pt-4 border-t space-y-2">
                      <h3 className="font-medium text-sm">Statistics</h3>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Original lines:</span>
                          <Badge variant="outline">{stats.originalLines}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Unique lines:</span>
                          <Badge variant="outline">{stats.uniqueLines}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duplicates removed:</span>
                          <Badge variant="outline" className="text-red-600">{stats.duplicatesRemoved}</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Input/Output Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Input */}
              <Card>
                <CardHeader>
                  <CardTitle>Input Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter text with duplicate lines here... Each line will be processed separately."
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      removeDuplicates();
                    }}
                    className="min-h-[300px] font-mono text-sm resize-none"
                  />
                </CardContent>
              </Card>

              {/* Output */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Deduplicated Text</CardTitle>
                    {stats.duplicatesRemoved > 0 && (
                      <Badge variant="outline" className="text-green-600">
                        {stats.duplicatesRemoved} duplicates removed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={outputText}
                    readOnly
                    className="min-h-[300px] font-mono text-sm resize-none bg-muted/30"
                    placeholder="Deduplicated text will appear here..."
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={copyToClipboard}
                      disabled={!outputText}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Result
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={downloadText}
                      disabled={!outputText}
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
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Trash2 className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Clean Data Lists</h3>
                  <p className="text-sm text-muted-foreground">Remove duplicate entries from contact lists, email addresses, or product catalogs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Copy className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Log File Processing</h3>
                  <p className="text-sm text-muted-foreground">Clean up log files by removing duplicate error messages or entries</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Download className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Text Processing</h3>
                  <p className="text-sm text-muted-foreground">Prepare clean text data for databases, spreadsheets, or other applications</p>
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

export default DuplicateRemover;