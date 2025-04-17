// Map features to their example code
const featureCodeMap = {
  "grid-system": `
  <h1 class="text-2xl font-bold">Grid System Example</h1>
  <p class="text-base mb-4">A responsive 3-column grid layout with different background colors. Try editing the grid classes to see different layouts.</p>
  
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-1 bg-primary text-white p-2">Column 1</div>
    <div class="col-span-1 bg-secondary text-white p-2">Column 2</div>
    <div class="col-span-1 bg-tertiary text-white p-2">Column 3</div>
  </div>
  
  <div class="mt-4 grid grid-cols-2 gap-4">
    <div class="col-span-1 bg-success text-white p-2">Half Width</div>
    <div class="col-span-1 bg-danger text-white p-2">Half Width</div>
  </div>
  
  <div class="mt-4 grid grid-cols-4 gap-4">
    <div class="col-span-2 bg-warning text-white p-2">Half Width (2/4)</div>
    <div class="col-span-1 bg-primary text-white p-2">Quarter Width</div>
    <div class="col-span-1 bg-secondary text-white p-2">Quarter Width</div>
  </div>
  `,
  

  "typography": `
  <h1 class="text-2xl font-bold mb-2">Heading 1</h1>
  <h2 class="text-xl font-semibold mb-2">Heading 2</h2>
  <h3 class="text-lg font-medium mb-2">Heading 3</h3>
  <p class="mb-2">Regular paragraph text with <strong>bold</strong> and <em>italic</em> styles.</p>
  <p class="text-sm text-muted">Small muted text for captions</p>`,
   

  "buttons": `
  <h1 class="text-2xl font-bold ml-8">Button Preview</h1> <br>
  <button class="btn btn-primary">Primary Button</button>
  <button class="btn btn-secondary">Secondary Button</button>
  <button class="btn btn-danger">Danger Button</button>
  <button class="btn btn-success">Success Button</button>
  <div class="mt-3">
    <button class="btn btn-outline-primary">Outline</button>
  </div>`,
  `,
  

  "forms": `
   <div class="form-group">
    <label class="form-label">Username</label>
    <input type="text" class="form-control" placeholder="Enter username">
  </div>
  <div class="form-group">
    <label class="form-label">Select Option</label>
    <select class="form-control">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
  <div class="form-group">
    <label>
      <input type="checkbox"> Remember me
    </label>
  </div>`,
  
  "alerts": `
  <div class="alert alert-primary">
    <strong>Primary Alert:</strong> This is a primary alert message.
  </div>
  
  <div class="alert alert-secondary">
    <strong>Secondary Alert:</strong> This is a secondary alert message.
  </div>
  
  <div class="alert alert-success">
    <strong>Success Alert:</strong> This is a success alert message.
  </div>
  
  <div class="alert alert-danger">
    <strong>Danger Alert:</strong> This is a danger alert message.
  </div>
  
  <div class="alert alert-warning">
    <strong>Warning Alert:</strong> This is a warning alert message.
  </div>
  `,

  
  "Spacing and Utilities": `
   <div class="p-3 mb-3 bg-light border rounded">
    <p class="mb-2">Padding (p-3)</p>
  </div>
  <div class="mb-3 bg-primary text-light p-2 rounded">
    <p>Margin bottom (mb-3)</p>
  </div>
  <div class="flex justify-between items-center p-2 bg-light rounded">
    <span>Flex Start</span>
    <span>Flex End</span>
  </div>`
};

// Feature link click handler
document.querySelectorAll(".card-footer a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const featureCard = e.target.closest(".card");
    const featureId = featureCard?.getAttribute("data-feature-id")?.toLowerCase();
    if (featureId && featureCodeMap[featureId]) {
      sessionStorage.setItem("selectedFeatureCode", featureCodeMap[featureId].trim());
      window.location.href = "documentation.html";
    } else {
      alert("Feature not recognized or missing featureId.");
    }
  });
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
          });
      }
  });
});

document.getElementById('downloadCSS').addEventListener('click', async function () {
  if (typeof JSZip === 'undefined') {
      await loadJSZip();
  }
  const zip = new JSZip();
  const cssFiles = [
      'CSS_Library/style.css',
      'CSS_Library/colors.css',
      'CSS_Library/theme.css',
      'CSS_Library/navbar.css',
      'CSS_Library/flex.css',
      'CSS_Library/container.css',
      'CSS_Library/text.css',
      'CSS_Library/button.css',
      'CSS_Library/components.css',
      'CSS_Library/dark_mode.css'
  ];

  try {
      const fetchPromises = cssFiles.map(async (filePath) => {
          const response = await fetch(filePath);
          if (!response.ok) {
              throw new Error(`Failed to fetch ${filePath}`);
          }
          const content = await response.text();
          const fileName = filePath.split('/').pop();
          zip.file(fileName, content);
          return fileName;
      });
      const completedFiles = await Promise.all(fetchPromises);
      console.log(`Added ${completedFiles.length} files to zip archive`);
      const zipBlob = await zip.generateAsync({
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 }
      });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(zipBlob);
      downloadLink.download = 'css-library.zip';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);

  } catch (error) {
      console.error('Error creating zip file:', error);
      alert('Failed to download CSS files. Please check the console for details.');
  }
});

// Helper function to dynamically load JSZip if not available
function loadJSZip() {
  return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      script.integrity = 'sha512-XMVd28F1oH/O71fzwBnV7HucLxVwtxf26XV8P4wPk26EDxuGZ91N8bsOttmnomcCD3CS5ZMRL50H0GgOHvegtg==';
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load JSZip library'));
      document.head.appendChild(script);
  });
}
