export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  featured?: boolean;
  route: string;
}

export const toolCategories = [
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Text manipulation and formatting tools',
    color: 'category-text',
    icon: 'Type'
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Image editing and conversion tools',
    color: 'category-image',
    icon: 'Image'
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    description: 'PDF manipulation and conversion tools',
    color: 'category-pdf',
    icon: 'FileText'
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Programming and development utilities',
    color: 'category-developer',
    icon: 'Code'
  },
  {
    id: 'converter',
    name: 'Converters',
    description: 'Unit and format conversion tools',
    color: 'category-converter',
    icon: 'RefreshCw'
  },
  {
    id: 'generator',
    name: 'Generators',
    description: 'Generate passwords, QR codes, and more',
    color: 'category-generator',
    icon: 'Sparkles'
  }
];

export const tools: Tool[] = [
  // Text Tools
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, and paragraphs', category: 'text', icon: 'Hash', route: '/tools/word-counter', featured: true },
  { id: 'case-converter', name: 'Case Converter', description: 'Convert text between different cases', category: 'text', icon: 'Type', route: '/tools/case-converter' },
  { id: 'text-formatter', name: 'Text Formatter', description: 'Format and clean up text', category: 'text', icon: 'AlignLeft', route: '/tools/text-formatter' },
  { id: 'lorem-generator', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text', category: 'text', icon: 'FileText', route: '/tools/lorem-generator' },
  { id: 'text-diff', name: 'Text Diff Checker', description: 'Compare two texts for differences', category: 'text', icon: 'GitCompare', route: '/tools/text-diff' },
  { id: 'text-replacer', name: 'Text Replacer', description: 'Find and replace text', category: 'text', icon: 'Replace', route: '/tools/text-replacer' },
  { id: 'duplicate-remover', name: 'Duplicate Line Remover', description: 'Remove duplicate lines from text', category: 'text', icon: 'Trash2', route: '/tools/duplicate-remover' },
  { id: 'text-sorter', name: 'Text Sorter', description: 'Sort text lines alphabetically', category: 'text', icon: 'ArrowUpDown', route: '/tools/text-sorter' },
  { id: 'whitespace-remover', name: 'Whitespace Remover', description: 'Remove extra whitespace from text', category: 'text', icon: 'Minus', route: '/tools/whitespace-remover' },

  // Image Tools
  { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to custom dimensions', category: 'image', icon: 'Maximize', route: '/tools/image-resizer', featured: true },
  { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size', category: 'image', icon: 'Minimize', route: '/tools/image-compressor' },
  { id: 'image-converter', name: 'Image Format Converter', description: 'Convert between image formats', category: 'image', icon: 'RefreshCw', route: '/tools/image-converter' },
  { id: 'image-cropper', name: 'Image Cropper', description: 'Crop images to specific dimensions', category: 'image', icon: 'Crop', route: '/tools/image-cropper' },
  { id: 'image-rotator', name: 'Image Rotator', description: 'Rotate images by any angle', category: 'image', icon: 'RotateCw', route: '/tools/image-rotator' },
  { id: 'image-filter', name: 'Image Filter', description: 'Apply filters and effects to images', category: 'image', icon: 'Palette', route: '/tools/image-filter' },
  { id: 'background-remover', name: 'Background Remover', description: 'Remove backgrounds from images', category: 'image', icon: 'Scissors', route: '/tools/background-remover' },
  { id: 'watermark-remover', name: 'Watermark Remover', description: 'Remove watermarks from images', category: 'image', icon: 'Eraser', route: '/tools/watermark-remover' },

  // PDF Tools
  { id: 'pdf-merger', name: 'PDF Merger', description: 'Merge multiple PDF files', category: 'pdf', icon: 'Combine', route: '/tools/pdf-merger', featured: true },
  { id: 'pdf-splitter', name: 'PDF Splitter', description: 'Split PDF into separate pages', category: 'pdf', icon: 'Split', route: '/tools/pdf-splitter' },
  { id: 'pdf-compressor', name: 'PDF Compressor', description: 'Reduce PDF file size', category: 'pdf', icon: 'Minimize', route: '/tools/pdf-compressor' },
  { id: 'pdf-converter', name: 'PDF Converter', description: 'Convert PDFs to other formats', category: 'pdf', icon: 'FileText', route: '/tools/pdf-converter' },
  { id: 'pdf-password', name: 'PDF Password Remover', description: 'Remove passwords from PDFs', category: 'pdf', icon: 'Unlock', route: '/tools/pdf-password' },
  { id: 'pdf-watermark', name: 'PDF Watermark', description: 'Add watermarks to PDFs', category: 'pdf', icon: 'Droplet', route: '/tools/pdf-watermark' },
  { id: 'pdf-rotator', name: 'PDF Page Rotator', description: 'Rotate PDF pages', category: 'pdf', icon: 'RotateCw', route: '/tools/pdf-rotator' },
  { id: 'pdf-extractor', name: 'PDF Text Extractor', description: 'Extract text from PDFs', category: 'pdf', icon: 'FileText', route: '/tools/pdf-extractor' },

  // Developer Tools
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', category: 'developer', icon: 'Braces', route: '/tools/json-formatter', featured: true },
  { id: 'base64-encoder', name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64', category: 'developer', icon: 'Lock', route: '/tools/base64-encoder' },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', description: 'Encode and decode URLs', category: 'developer', icon: 'Link', route: '/tools/url-encoder' },
  { id: 'html-encoder', name: 'HTML Encoder/Decoder', description: 'Encode and decode HTML entities', category: 'developer', icon: 'Code', route: '/tools/html-encoder' },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA1, SHA256 hashes', category: 'developer', icon: 'Hash', route: '/tools/hash-generator' },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions', category: 'developer', icon: 'Search', route: '/tools/regex-tester' },
  { id: 'color-picker', name: 'Color Picker', description: 'Pick and convert colors', category: 'developer', icon: 'Palette', route: '/tools/color-picker' },
  { id: 'css-minifier', name: 'CSS Minifier', description: 'Minify CSS code', category: 'developer', icon: 'Minimize', route: '/tools/css-minifier' },
  { id: 'js-minifier', name: 'JS Minifier', description: 'Minify JavaScript code', category: 'developer', icon: 'Minimize', route: '/tools/js-minifier' },

  // Converter Tools
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between different units', category: 'converter', icon: 'ArrowLeftRight', route: '/tools/unit-converter', featured: true },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Convert between currencies', category: 'converter', icon: 'DollarSign', route: '/tools/currency-converter' },
  { id: 'number-base', name: 'Number Base Converter', description: 'Convert between number bases', category: 'converter', icon: 'Calculator', route: '/tools/number-base' },
  { id: 'timestamp-converter', name: 'Timestamp Converter', description: 'Convert timestamps to dates', category: 'converter', icon: 'Clock', route: '/tools/timestamp-converter' },
  { id: 'temperature-converter', name: 'Temperature Converter', description: 'Convert temperature units', category: 'converter', icon: 'Thermometer', route: '/tools/temperature-converter' },
  { id: 'length-converter', name: 'Length Converter', description: 'Convert length measurements', category: 'converter', icon: 'Ruler', route: '/tools/length-converter' },
  { id: 'weight-converter', name: 'Weight Converter', description: 'Convert weight measurements', category: 'converter', icon: 'Weight', route: '/tools/weight-converter' },
  { id: 'speed-converter', name: 'Speed Converter', description: 'Convert speed measurements', category: 'converter', icon: 'Gauge', route: '/tools/speed-converter' },

  // Generator Tools
  { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', category: 'generator', icon: 'Key', route: '/tools/password-generator', featured: true },
  { id: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes', category: 'generator', icon: 'QrCode', route: '/tools/qr-generator' },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', category: 'generator', icon: 'Fingerprint', route: '/tools/uuid-generator' },
  { id: 'barcode-generator', name: 'Barcode Generator', description: 'Generate barcodes', category: 'generator', icon: 'ScanLine', route: '/tools/barcode-generator' },
  { id: 'fake-data', name: 'Fake Data Generator', description: 'Generate fake data for testing', category: 'generator', icon: 'Database', route: '/tools/fake-data' },
  { id: 'credit-card', name: 'Credit Card Generator', description: 'Generate test credit card numbers', category: 'generator', icon: 'CreditCard', route: '/tools/credit-card' },
  { id: 'color-palette', name: 'Color Palette Generator', description: 'Generate color palettes', category: 'generator', icon: 'Palette', route: '/tools/color-palette' },
  { id: 'gradient-generator', name: 'Gradient Generator', description: 'Generate CSS gradients', category: 'generator', icon: 'Gradient', route: '/tools/gradient-generator' }
];

export const getFeaturedTools = () => tools.filter(tool => tool.featured);
export const getToolsByCategory = (category: string) => tools.filter(tool => tool.category === category);
export const getToolById = (id: string) => tools.find(tool => tool.id === id);