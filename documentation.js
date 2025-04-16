const codeInput = document.getElementById("codeInput");
const previewFrame = document.getElementById("previewFrame");

function autoResizeTextarea() {
  codeInput.style.height = "auto";
  codeInput.style.height = codeInput.scrollHeight + "px";
}

function loadCode(exampleCode) {
  codeInput.value = exampleCode;
  autoResizeTextarea();
}

function updatePreview() {
  const code = codeInput.value;
  const output =
    previewFrame.contentDocument || previewFrame.contentWindow.document;
  output.open();
  output.write(`
       <html>
        <head>
            <link rel="stylesheet" href="CSS_Library/style.css">
            <link rel="stylesheet" href="CSS_Library/colors.css">
            <link rel="stylesheet" href="CSS_Library/theme.css">
            <link rel="stylesheet" href="CSS_Library/navbar.css">
            <link rel="stylesheet" href="CSS_Library/flex.css">
            <link rel="stylesheet" href="CSS_Library/container.css">
            <link rel="stylesheet" href="CSS_Library/text.css">
            <link rel="stylesheet" href="CSS_Library/button.css">
            <link rel="stylesheet" href="CSS_Library/components.css">
            <link rel="stylesheet" href="CSS_Library/dark_mode.css">
         </head>
         <body>
           ${code}
         </body>
       </html>
     `);
  output.close();
}

window.onload = () => {
  const savedCode = sessionStorage.getItem("selectedFeatureCode");
  const exampleCode = savedCode || `
<h1 class="text color-pink">Hello, World!</h1>
  `.trim();
  loadCode(exampleCode);
};

codeInput.addEventListener("input", autoResizeTextarea);

const submitButton = document.querySelector("#submitBtn button");
submitButton.addEventListener("click", updatePreview);
