window.addEventListener("mouseup", () => {
  let msg = { text: window.getSelection().toString().trim() };
  if (msg.text.length > 0) chrome.runtime.sendMessage(msg);
});
