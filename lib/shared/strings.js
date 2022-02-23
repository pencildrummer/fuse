// Function to transform group key into pretty human readable text (title case)
const titleCase = s => s
  .replace(/(^|[_-])([A-Za-z])/g, (a, b, c) => c.toUpperCase()) // Uppercase first letter before dashes and underscore and remove dashaes and underscore
  .replace(/([a-z])([A-Z])/g, (a, b, c) => `${b} ${c}`); // Add space between uppercase and lowercase letters

// Storage path case
const pathCase = s => s.toLowerCase().trim().replace(' ','_')

module.exports = {
  titleCase,
  pathCase
}