const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\aksha\\OneDrive\\Desktop\\Axicon-Automation\\public';

// Do not ruin the styling system variables we just defined
const excludeFiles = ['style.css', 'temporary-backup.css']; 

// Mapping for standard hex replacements
const hexMap = {
  '#1773d0': 'var(--primary-color)',
  '#1e3a8a': 'var(--primary-dark)',
  '#243b7a': 'var(--primary-dark)',
  '#3e4095': 'var(--primary-dark)',
  '#0ea5e9': 'var(--primary-light)',
  '#38bdf8': 'var(--primary-light)',
  '#f97316': 'var(--secondary-color)',
  '#ea580c': 'var(--secondary-color)',
  '#0f172a': 'var(--text-primary)',
  '#1f2937': 'var(--text-primary)',
  '#1e293b': 'var(--text-primary)',
  '#1d2024': 'var(--text-primary)',
  '#64748b': 'var(--text-secondary)',
  '#334155': 'var(--text-secondary)',
  '#f8fafc': 'var(--bg-secondary)',
  '#f1f5f9': 'var(--bg-secondary)',
  '#f7f9fc': 'var(--bg-secondary)',
  '#eff6ff': 'var(--bg-secondary)',
  '#0a1622': 'var(--bg-dark)',
  '#e2e8f0': 'var(--border-color)',
  '#cbd5e1': 'var(--border-color)',
  '#d1d5db': 'var(--border-color)',
  '#25d366': 'var(--success-color)'
};

// Tailwind classes mapping
const classMap = {
  // Text
  'text-\\[#1773d0\\]': 'text-brand',
  'text-\\[#1e3a8a\\]': 'text-brand-dark',
  'text-\\[#0ea5e9\\]': 'text-brand-light',
  'text-\\[#38bdf8\\]': 'text-brand-light',
  'text-\\[#f97316\\]': 'text-accent',
  'text-\\[#0f172a\\]': 'text-primary',
  'text-\\[#1f2937\\]': 'text-primary',
  'text-\\[#1e293b\\]': 'text-primary',
  'text-\\[#64748b\\]': 'text-secondary',
  'text-\\[#334155\\]': 'text-secondary',
  'text-\\[#ffffff\\]': 'text-light',
  
  'text-slate-800': 'text-primary',
  'text-slate-900': 'text-primary',
  'text-gray-800': 'text-primary',
  'text-gray-900': 'text-primary',
  'text-stone-800': 'text-primary',
  
  'text-slate-500': 'text-secondary',
  'text-slate-600': 'text-secondary',
  'text-gray-500': 'text-secondary',
  'text-gray-600': 'text-secondary',
  
  'text-white': 'text-light',
  'text-slate-50': 'text-light',
  
  'text-blue-500': 'text-brand',
  'text-blue-600': 'text-brand',
  'text-blue-700': 'text-brand-dark',
  'text-blue-800': 'text-brand-dark',
  'text-sky-500': 'text-brand-light',
  'text-sky-600': 'text-brand',
  
  // Hover Text
  'hover:text-blue-500': 'hover:text-brand',
  'hover:text-sky-500': 'hover:text-brand-light',
  'hover:text-\\[#38bdf8\\]': 'hover:text-brand-light',
  'hover:text-slate-800': 'hover:text-primary',
  'hover:text-gray-800': 'hover:text-primary',
  'hover:text-slate-500': 'hover:text-secondary',
  
  // Background
  'bg-\\[#1773d0\\]': 'bg-brand',
  'bg-\\[#1e3a8a\\]': 'bg-brand-dark',
  'bg-\\[#0ea5e9\\]': 'bg-brand-light',
  'bg-\\[#f8fafc\\]': 'bg-secondary',
  'bg-\\[#f1f5f9\\]': 'bg-secondary',
  'bg-\\[#ffffff\\]': 'bg-primary',
  'bg-\\[#0a1622\\]': 'bg-dark',
  
  'bg-slate-50': 'bg-secondary',
  'bg-slate-100': 'bg-secondary',
  'bg-gray-50': 'bg-secondary',
  'bg-gray-100': 'bg-secondary',
  'bg-white': 'bg-primary',
  
  'bg-blue-600': 'bg-brand',
  'bg-blue-700': 'bg-brand-dark',
  'bg-blue-800': 'bg-brand-dark',
  'bg-blue-900': 'bg-brand-dark',
  'bg-sky-500': 'bg-brand-light',
  
  // Border
  'border-\\[#e2e8f0\\]': 'border-color',
  'border-\\[#cbd5e1\\]': 'border-color',
  'border-\\[#1e293b\\]': 'border-dark',
  
  'border-slate-200': 'border-color',
  'border-slate-300': 'border-color',
  'border-gray-200': 'border-color',
  'border-gray-300': 'border-color',
  'border-slate-800': 'border-dark',
  'border-gray-800': 'border-dark',
  
  'border-blue-500': 'border-brand',
  'border-sky-500': 'border-brand-light'
};

function processFile(filePath) {
  const fileName = path.basename(filePath);
  if (excludeFiles.includes(fileName)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  if (filePath.endsWith('.html') || filePath.endsWith('.js')) {
    // Replace Tailwind classes
    for (const [twClass, customClass] of Object.entries(classMap)) {
      const regex = new RegExp(`(?<=[\\s"'\\\`])${twClass}(?=[\\s"'\\\`])`, 'g');
      content = content.replace(regex, customClass);
    }
  }
  
  if (filePath.endsWith('.css') || filePath.endsWith('.html') || filePath.endsWith('.js')) {
    // Replace hex codes
    for (const [hex, variable] of Object.entries(hexMap)) {
      const regex = new RegExp(hex, 'gi');
      content = content.replace(regex, variable);
    }
    
    // Specifically handle #ffffff globally
    content = content.replace(/color:\s*#ffffff/gi, 'color: var(--text-light)');
    content = content.replace(/background-color:\s*#ffffff/gi, 'background-color: var(--bg-primary)');
    content = content.replace(/border-color:\s*#ffffff/gi, 'border-color: var(--border-color)');
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

processDirectory(projectDir);
console.log('Finished refactoring colors!');
