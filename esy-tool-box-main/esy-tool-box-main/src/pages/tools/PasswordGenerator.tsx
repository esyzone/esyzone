import { useState } from "react";
import { Link } from "react-router-dom";
import { Key, Copy, RefreshCw, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false
  });
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = "";
    
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (options.excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "");
    }
    
    if (options.excludeAmbiguous) {
      charset = charset.replace(/[{}[\]()\/\\'"~,;<>.]/g, "");
    }

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive"
      });
    }
  };

  const getStrengthColor = () => {
    if (length[0] < 8) return "text-red-500";
    if (length[0] < 12) return "text-orange-500";
    if (length[0] < 16) return "text-yellow-500";
    return "text-green-500";
  };

  const getStrengthText = () => {
    if (length[0] < 8) return "Weak";
    if (length[0] < 12) return "Fair";
    if (length[0] < 16) return "Good";
    return "Strong";
  };

  // Generate initial password
  useState(() => {
    generatePassword();
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
            <li><Link to="/category/generator" className="hover:text-primary transition-colors">Generators</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Password Generator</li>
          </ol>
        </nav>

        {/* Tool Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-category-generator/10 text-category-generator px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Key className="h-4 w-4" />
            <span>Security Tool</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Password Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate secure, random passwords with customizable options. 
            Create strong passwords to protect your accounts.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Password Output */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Generated Password
                    <span className={`text-sm font-medium ${getStrengthColor()}`}>
                      {getStrengthText()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Input
                      value={password}
                      readOnly
                      className="pr-20 font-mono text-lg h-12"
                      placeholder="Click generate to create password"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                      disabled={!password}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button onClick={generatePassword} className="flex-1">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate New
                    </Button>
                    <Button variant="outline" onClick={copyToClipboard} disabled={!password}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Use unique passwords for each account</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Store passwords in a secure password manager</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Enable two-factor authentication when available</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Avoid using personal information in passwords</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Length */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      Password Length: {length[0]}
                    </Label>
                    <Slider
                      value={length}
                      onValueChange={setLength}
                      min={4}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>4</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Character Types */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Character Types</Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="uppercase"
                          checked={options.uppercase}
                          onCheckedChange={(checked) =>
                            setOptions(prev => ({ ...prev, uppercase: !!checked }))
                          }
                        />
                        <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="lowercase"
                          checked={options.lowercase}
                          onCheckedChange={(checked) =>
                            setOptions(prev => ({ ...prev, lowercase: !!checked }))
                          }
                        />
                        <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="numbers"
                          checked={options.numbers}
                          onCheckedChange={(checked) =>
                            setOptions(prev => ({ ...prev, numbers: !!checked }))
                          }
                        />
                        <Label htmlFor="numbers">Numbers (0-9)</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="symbols"
                          checked={options.symbols}
                          onCheckedChange={(checked) =>
                            setOptions(prev => ({ ...prev, symbols: !!checked }))
                          }
                        />
                        <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Options */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Advanced Options</Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="excludeSimilar"
                          checked={options.excludeSimilar}
                          onCheckedChange={(checked) =>
                            setOptions(prev => ({ ...prev, excludeSimilar: !!checked }))
                          }
                        />
                        <Label htmlFor="excludeSimilar">Exclude Similar Characters (i, l, 1, L, o, 0, O)</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="excludeAmbiguous"
                          checked={options.excludeAmbiguous}
                          onCheckedChange={(checked) =>
                            setOptions(prev => ({ ...prev, excludeAmbiguous: !!checked }))
                          }
                        />
                        <Label htmlFor="excludeAmbiguous">Exclude Ambiguous Characters ({"{ }[ ]( )/ \\ ' \" ~ , ; < >"})</Label>
                      </div>
                    </div>
                  </div>
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

export default PasswordGenerator;