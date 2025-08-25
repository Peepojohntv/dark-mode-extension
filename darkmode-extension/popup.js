document.getElementById("apply").addEventListener("click", async () => {
  let bgColor = document.getElementById("bgColor").value;
  let textColor = document.getElementById("textColor").value;
  let applyBody = document.getElementById("applyBody").checked;
  let applyLinks = document.getElementById("applyLinks").checked;
  let applyButtons = document.getElementById("applyButtons").checked;

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("chrome-extension://")) {
    alert("Diese Seite kann nicht angepasst werden.");
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: applyCustomDarkMode,
    args: [bgColor, textColor, applyBody, applyLinks, applyButtons]
  });
});

// Funktion, die im Content Script läuft
function applyCustomDarkMode(bgColor, textColor, applyBody, applyLinks, applyButtons) {
  const styleId = "custom-dark-mode-style";

  // Bestehendes entfernen
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) existingStyle.remove();

  let style = document.createElement("style");
  style.id = styleId;

  let css = "";
  if (applyBody) css += `body { background-color: ${bgColor} !important; color: ${textColor} !important; }`;
  if (applyLinks) css += `a { color: ${textColor} !important; }`;
  if (applyButtons) css += `button, input, textarea, select { background-color: ${bgColor} !important; color: ${textColor} !important; border-color: ${textColor} !important; }`;

  style.textContent = css;
  document.head.appendChild(style);
}
