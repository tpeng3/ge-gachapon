/**
 * frogLibrary.js contains all code pertaining
 * to saving frogs on a user's local machine.
 * Please read docs on local storage before editing
 * this file.
 * Important localStorage notes:
    * It is a synchronous operation.
    * Do not store any secure data.
    * Stored on the browser.

 * @author Kredgons, do not use without permission.
 *
 * @TODO a more elegant way of handling rarities?
    * note: could just loop over each
*/

var totalFrogs = 0;
const frogsInGame = Object.keys(FROG_CARDS.common).length + Object.keys(FROG_CARDS.uncommon).length + Object.keys(FROG_CARDS.rare).length;

/**
 * Build the library when the page loads if user has been here before.
 *
 * @return {boolean} false if user has never been to frogpon
*/
function buildLibraryOnload() {
  if (localStorage.getItem("visitedBefore") === null) {
    localStorage.setItem("visitedBefore", true);
    return false;
  }

  Object.keys(localStorage).forEach((key) => {
    let frog = getFrog(key);
    if (frog !== -1) {
      addToLibrary(key, frog);
    }
  });
}

/**
 * Save the newfound frog to the user's local storage.
 * We assume frog does is new based on the call to this function.
 *
 * @param {object} frog The frog to store.
 * @return {boolean} Status of adding.
*/
function saveToLibrary(frog, frogName) {
  if (!frog || !frogName) return -1;
  window.localStorage.setItem(frogName, frogName);
  addToLibrary(frogName, frog);
}

/**
 * Add the frog to the HTML library.
 * @param {object} frog The frog to be added to the library.
 * @return {void}
*/
function addToLibrary(frogKey, frog) {
  let frogCard = document.createElement("div");
  frogCard.className = 'card slide-card';
  frogCard.innerHTML = "<img src='" + frog.image + "' alt='Card for " + frog.name + ". Description states, " + frog.description + "' tabindex='0' / >";
  document.getElementById('saved-cards').appendChild(frogCard);

  frogCard.onclick = function () {
    artistCreditsModal(frogKey);
  }
  updateTotalFrogs();
}

/**
 * Check if a frog exists in the library already.
 *
 * @param {object} frog The frog to be checked.
 * @return {boolean} false if it doesn't exist
*/
function frogExists(frogName) {
  let exists = false;
  Object.keys(window.localStorage).forEach((key) => {
    let currFrog = window.localStorage.getItem(key);
    if (currFrog === frogName) {
      exists = true;
    }
  });

  return exists;
}

/**
 * Retrieve frog object.
 *
 * @param {string} frogName the name to match.
 * @return {object}
*/
function getFrog(frogKey) {
  if (cards.common[frogKey]) return cards.common[frogKey];
  else if (cards.uncommon[frogKey]) return cards.uncommon[frogKey];
  else if (cards.rare[frogKey]) return cards.rare[frogKey];
  else return -1; //frog was not found

}

/**
 * Get total number frogs found.
 *
 * @param {string} frogName the name to match.
 * @return {object}
*/
function updateTotalFrogs() {
  let totalFrogEl = document.querySelector('#total-frogs');

  totalFrogs++;
  totalFrogEl.innerHTML = totalFrogs + " / " + frogsInGame;
}