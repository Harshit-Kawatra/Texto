let background = chrome.extension.getBackgroundPage();
var word = background.text;
var meaning = background.mean;
const updatetext = async () => {
  if (word) {
    document.querySelector(".word").innerHTML = word.toString().toUpperCase();
  }
  if (meaning) {
    meaning.then(
      (meaning) =>
        (document.querySelector(".meaning").innerHTML = `"${meaning}"`)
    );
  }
};
updatetext();
