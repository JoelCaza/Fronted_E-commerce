const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');
const stylesDir = path.join(srcDir, 'styles');

if (!fs.existsSync(stylesDir)) fs.mkdirSync(stylesDir);

function moveCssAndUpdateImports(dir, depth) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'styles' && file !== 'assets' && file !== 'services' && file !== 'context') {
                moveCssAndUpdateImports(fullPath, depth + 1);
            }
        } else if (file.endsWith('.css')) {
            const destPath = path.join(stylesDir, file);
            fs.renameSync(fullPath, destPath);
            console.log(`Moved ${file} to styles/`);
        } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.main')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Reemplazar imports de CSS locales
            const relStyles = depth === 0 ? './styles' : '../styles';
            let changed = false;
            content = content.replace(/import\s+['"]\.\/([^'"]+\.css)['"]/g, (match, p1) => {
                changed = true;
                return `import '${relStyles}/${p1}'`;
            });
            
            // Especial para main.jsx (que podría no estar en el primer nivel si está en src, depth 0)
            if (file === 'main.jsx') {
               content = content.replace(/import\s+['"]\.\/index\.css['"]/g, `import './styles/index.css'`);
               changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated imports in ${file}`);
            }
        }
    }
}

moveCssAndUpdateImports(srcDir, 0);
