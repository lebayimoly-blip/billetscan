const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const replacements = [
  // Supprime les imports erronés
  {
    pattern: /import\s+\{?\s*ZXingScanner\s*\}?\s+from\s+['"]@zxing\/browser['"];/gi,
    replacement: '',
  },
  {
    pattern: /import\s+\{?\s*QrReader\s*\}?\s+from\s+['"]react-qr-reader['"];/gi,
    replacement: 'import ZXingScanner from "../components/ZXingScanner";',
  },
  // Remplace les composants QrReader par ZXingScanner
  {
    pattern: /<QrReader([^>]*)\/>/gi,
    replacement: '<ZXingScanner$1 />',
  },
  {
    pattern: /QrReader/gi,
    replacement: 'ZXingScanner',
  },
];

function scanAndReplace(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanAndReplace(fullPath);
    } else if (extensions.includes(path.extname(file))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      replacements.forEach(({ pattern, replacement }) => {
        content = content.replace(pattern, replacement);
      });

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Import corrigé : ${fullPath}`);
      }
    }
  });
}

scanAndReplace(targetDir);
console.log('🔄 Remplacement des imports react-qr-reader terminé.');
