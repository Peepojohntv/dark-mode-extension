(function() {
  const styleId = "dark-mode-style-extension";

  if (!document.body.classList.contains("dark-mode-extension")) {
    document.body.classList.add("dark-mode-extension");

    let style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      html, body {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
        transition: background-color 0.3s, color 0.3s;
      }
      img, video {
        filter: brightness(0.8) contrast(1.2) !important;
        transition: filter 0.3s;
      }
      a { color: #80cbc4 !important; }
      button, input, textarea, select {
        background-color: #1e1e1e !important;
        color: #e0e0e0 !important;
        border-color: #444 !important;
      }
      table, th, td {
        background-color: #1c1c1c !important;
        color: #e0e0e0 !important;
      }
    `;
    document.head.appendChild(style);

  } else {
    document.body.classList.remove("dark-mode-extension");
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) existingStyle.remove();
  }
})();
