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

  eleventyConfig.addFilter("personaId", (nombre) => {
    // Extract number from "01. Nombre Apellido" format
    const match = nombre.match(/^(\d+)\./);
    return match ? match[1] : "00";
  });

  // Watch targets
  eleventyConfig.addWatchTarget("./assets/");

  // BrowserSync config
  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false
  });

  return {
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
