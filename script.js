// Map features to their example code
const featureCodeMap = {
  "grid-system": `
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-1 bg-primary text-white p-2">Column 1</div>
    <div class="col-span-1 bg-secondary text-white p-2">Column 2</div>
    <div class="col-span-1 bg-tertiary text-white p-2">Column 3</div>
  </div>`,

  "typography": `
  <h1 class="text-4xl font-bold color-primary">Typography Example</h1>
  <p class="text-base color-gray">This is a paragraph styled using the CSS library.</p>`,
  
  "buttons": `
  <h1 class="text-4xl font-bold color-primary">Typography Example</h1>
  <p class="text-base color-gray">This is a paragraph styled using the CSS library.</p>`,

  "forms": `
  <h1 class="text-4xl font-bold color-primary">Typography Example</h1>
  <p class="text-base color-gray">This is a paragraph styled using the CSS library.</p>`,

  "alerts": `alert
  <h1 class="text-4xl font-bold color-primary">Typography Example</h1>
  <p class="text-base color-gray">This is a paragraph styled using the CSS library.</p>`,

  
  "Spacing and Utilities": `spa and uti
  <h1 class="text-4xl font-bold color-primary">Typography Example</h1>
  <p class="text-base color-gray">This is a paragraph styled using the CSS library.</p>`
};

document.querySelectorAll(".card-footer a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const featureCard = e.target.closest(".card");
    const featureId = featureCard?.getAttribute("data-feature-id");
    if (featureId && featureCodeMap[featureId]) {
      sessionStorage.setItem(
        "selectedFeatureCode",
        featureCodeMap[featureId].trim()
      );
      window.location.href = "documentation.html";
    } else {
      alert("Feature not recognized or missing featureId.");
    }
  });
});