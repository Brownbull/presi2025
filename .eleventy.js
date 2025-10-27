const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {

  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");

  // Configure markdown
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink()
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Add filters
  eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));

  eleventyConfig.addFilter("formatNumber", (num) => {
    if (num === null || num === undefined || num === "N/A") return "N/A";
    return parseFloat(num).toFixed(2);
  });

  eleventyConfig.addFilter("ratingColor", (rating) => {
    if (rating === null || rating === undefined || rating === "N/A") return "#9E9E9E";
    const num = parseFloat(rating);
    if (num >= 7) return "#4CAF50"; // Verde
    if (num >= 5) return "#FFC107"; // Amarillo
    if (num >= 3) return "#FF9800"; // Naranjo
    return "#F44336"; // Rojo
  });

  eleventyConfig.addFilter("slug", (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  eleventyConfig.addFilter("personaId", (numero) => {
    // Return the numero with leading zero if needed (01, 02, etc.)
    // If numero is already a 2-digit string, return as-is
    // If it's a single digit number or string, pad with zero
    if (!numero || numero === undefined || numero === null) {
      console.error('personaId filter received invalid numero:', numero);
      return '00'; // Default fallback
    }
    const numStr = numero.toString().trim();
    return numStr.length === 1 ? `0${numStr}` : numStr;
  });

  eleventyConfig.addFilter("find", (personas, numero) => {
    // Find persona by numero in personas array
    if (!personas || !Array.isArray(personas)) return null;
    // Convert both to integers for comparison to handle "01" vs "1"
    const numInt = parseInt(numero, 10);
    return personas.find(p => parseInt(p.numero, 10) === numInt);
  });

  // Add markdown filter to convert markdown to HTML
  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) return '';
    return markdownLibrary.render(content);
  });

  // Watch targets
  eleventyConfig.addWatchTarget("./assets/");

  // BrowserSync config
  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false
  });

  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
