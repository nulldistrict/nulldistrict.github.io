(() => {
  "use strict";
  const dialog = document.getElementById("disablejs");
  const icon = document.querySelector('link[rel="shortcut icon"]');
  if (!dialog || !icon || typeof dialog.showModal !== "function") return;

  const originalTitle = document.title;
  const originalIcon = icon.href;
  const services = [
  {
    "title": "Official Church of Scientology: Difficulties on the Job - Online Course",
    "icon": "sy.png"
  },
  {
    "title": "Ask HN: How could I safely contact drug cartels?",
    "icon": "hn.png"
  },
  {
    "title": "rust programming socks - Google Shopping",
    "icon": "go.ico"
  },
  {
    "title": "Adult entertainment clubs - Google Maps",
    "icon": "gm.png"
  },
  {
    "title": "Pick up lines suggestions - ChatGPT",
    "icon": "cgpt.png"
  },
  {
    "title": "The Flat Earth Society",
    "icon": "fes.png"
  },
  {
    "title": "Amazon.com: taylor swift merch",
    "icon": "az.ico"
  },
  {
    "title": "Amazon.com: waifu pillow",
    "icon": "az.ico"
  },
  {
    "title": "r/wallstreetbets on Reddit",
    "icon": "rd.png"
  },
  {
    "title": "Infowars: There's a War on For Your Mind!",
    "icon": "iw.png"
  },
  {
    "title": "The Anarchist Cookbook by William Powell | Goodreads",
    "icon": "gr.png"
  },
  {
    "title": "Fifty Shades of Grey | Netflix",
    "icon": "nx.ico"
  },
  {
    "title": "jeff bezos nudes - Google Image Search",
    "icon": "go.ico"
  },
  {
    "title": "Rick Astley - Never Gonna Give You Up - YouTube",
    "icon": "yt.ico"
  },
  {
    "title": "MrBeast en Español - YouTube",
    "icon": "yt.ico"
  },
  {
    "title": "FTX Cryptocurrency Exchange",
    "icon": "ftx.png"
  }
];
  let remaining = [];
  let spoofed = false;
  let generation = 0;
  const dismissalKey = "null-district:disablejs-dismissed:v1";
  const closeHints = dialog.querySelectorAll("[data-close-hint]");
  let dismissed = false;
  let unlockAt = 0;
  let unlockTimer;
  try {
    dismissed = sessionStorage.getItem(dismissalKey) === "yes";
  } catch {
    // Storage may be blocked; keep the preference for this page in memory.
  }

  function showWarning() {
    if (dismissed || dialog.open) return;
    unlockAt = performance.now() + 3000;
    closeHints.forEach((hint) => {
      hint.textContent = "Bu uyarıyı 3 saniye sonra kapatabilirsin.";
    });
    dialog.showModal();
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(() => {
      closeHints.forEach((hint) => {
        hint.textContent = "Kapatmak için bu katmana tıkla, dokun veya Esc tuşuna bas.";
      });
    }, 3000);
  }

  function dismissWarning() {
    if (!dialog.open || performance.now() < unlockAt) return;
    dismissed = true;
    try {
      sessionStorage.setItem(dismissalKey, "yes");
    } catch {
      // The in-memory preference still prevents repeated dialogs on this page.
    }
    clearTimeout(unlockTimer);
    dialog.close();
  }

  function restore() {
    generation++;
    document.title = originalTitle;
    icon.href = originalIcon;
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (dialog.open) {
        clearTimeout(unlockTimer);
        dialog.close();
      }
      if (!remaining.length) remaining = services.slice();
      const index = Math.floor(Math.random() * remaining.length);
      const [service] = remaining.splice(index, 1);
      const current = ++generation;
      document.title = service.title;
      icon.href = originalIcon;
      // Keep the real favicon when an optional prank icon is not installed.
      const preview = new Image();
      preview.onload = () => {
        if (document.hidden && generation === current) icon.href = preview.src;
      };
      preview.src = dialog.dataset.iconBase + service.icon;
      spoofed = true;
    } else {
      restore();
      if (spoofed) {
        spoofed = false;
        showWarning();
      }
    }
  });

  dialog.addEventListener("click", (event) => {
    // Let the information link navigate normally.
    if (!event.target.closest("a")) dismissWarning();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dismissWarning();
  });
  window.addEventListener("pagehide", restore);
})();
