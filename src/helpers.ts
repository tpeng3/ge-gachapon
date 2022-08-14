// convert given text to a key-friendly string
export const slugify = function (text = "") {
  return text
      .toString()                   // Cast to string (optional)
      .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
      .toLowerCase()                // Convert the string to lowercase letters
      .trim()                       // Remove whitespace from both sides of a string (optional)
      .replace(/\s+/g, '')          // Remove spaces
      .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
      .replace(/\-\-+/g, '');       // Remove multiple
}