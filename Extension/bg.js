const gotmessage = (request) => {
  window.text = request.text;
  window.mean = findmeaning(window.text);
};
chrome.runtime.onMessage.addListener(gotmessage);
const findmeaning = async (word) => {
  try {
    var message = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    message = await message.json();
    console.log(message[0].meanings[0].definitions[0].definition);
  } catch (e) {
    if (word) return "Meaning not found";
    return "Select a word";
  }
  return message[0].meanings[0].definitions[0].definition;
};
