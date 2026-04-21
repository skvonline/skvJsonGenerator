const CONFIG = {
  DEFAULT_BASE_URL: "https://richti03.github.io/skvstatic",
  GITHUB_OWNER: "richti03",
  GITHUB_REPO: "skvstatic",
  GITHUB_BRANCH: "SkvJsonGenerator"
};

const linkLabelOptions = [
  { value: "", label: "Bitte wählen", type: "" },
  { value: "Mehr erfahren", label: "Mehr erfahren", type: "more" },
  { value: "Instagram", label: "Instagram", type: "instagram" },
  { value: "Facebook", label: "Facebook", type: "facebook" },
  { value: "TikTok", label: "TikTok", type: "tiktok" },
  { value: "E-Mail", label: "E-Mail", type: "mail" },
  { value: "Maps", label: "Maps", type: "maps" }
];

const vorstandSocialLabelOptions = [
  { value: "", label: "Bitte wählen" },
  { value: "E-Mail", label: "E-Mail" },
  { value: "Instagram", label: "Instagram" },
  { value: "Facebook", label: "Facebook" },
  { value: "TikTok", label: "TikTok" }
];

const vorstandSocialClassOptions = [
  { value: "", label: "Bitte wählen" },
  { value: "liEmail", label: "liEmail" },
  { value: "liInsta", label: "liInsta" },
  { value: "liFacebook", label: "liFacebook" },
  { value: "liTiktok", label: "liTiktok" }
];

const vorstandSocialIconOptions = [
  { value: "", label: "Bitte wählen" },
  { value: "@", label: "@" },
  { value: "Instagram", label: "Instagram" },
  { value: "f", label: "f" },
  { value: "♪", label: "♪" }
];

const linktreeIconOptions = [
  { value: "", label: "Bitte wählen" },
  { value: "website", label: "website" },
  { value: "instagram", label: "instagram" },
  { value: "facebook", label: "facebook" },
  { value: "download", label: "download" }
];

const specs = {
  news: {
    filename: "news.json",
    summaryKeys: ["title", "date"],
    fields: [
      { name: "title", type: "text", required: true },
      { name: "date", type: "date", required: true },
      { name: "text", type: "textarea", required: true },
      { name: "image", type: "text", filenameOnly: true, pathPrefix: "./src/img/news/" },
      { name: "publishAt", type: "datetime", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "datetime", required: true, placeholder: "JJJJ-MM-TT-HH:mm", allowAuto: true },
      {
        name: "links",
        type: "list",
        itemFields: [
          { name: "label", type: "select", required: true, options: linkLabelOptions },
          { name: "url", type: "text", required: true }
        ]
      }
    ],
    template: {
      title: "Beispielnews",
      date: "01.01.2027",
      text: "Text der News",
      publishAt: "2026-12-01-00:00",
      deleteAt: "2027-01-31-23:59",
      links: [{ type: "more", label: "Mehr erfahren", url: "https://example.org" }]
    }
  },
  events: {
    filename: "events.json",
    summaryKeys: ["title", "date", "location"],
    fields: [
      { name: "title", type: "text", required: true },
      { name: "date", type: "date", required: true },
      { name: "time", type: "time" },
      { name: "einlass", type: "time" },
      { name: "preis", type: "currency" },
      { name: "location", type: "text" },
      { name: "description", type: "textarea" },
      { name: "image", type: "text", filenameOnly: true, pathPrefix: "./src/img/events/" },
      { name: "publishAt", type: "datetime", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "autoDeleteAt", required: true },
      {
        name: "links",
        type: "list",
        itemFields: [
          { name: "label", type: "select", required: true, options: linkLabelOptions },
          { name: "url", type: "text", required: true }
        ]
      }
    ],
    template: {
      title: "Beispielveranstaltung",
      date: "11.11.2026",
      time: "11:11 Uhr",
      location: "Rathaus",
      publishAt: "2026-10-01-00:00",
      deleteAt: "2026-11-11-23:59"
    }
  },
  vorstand: {
    filename: "vorstand.json",
    summaryKeys: ["name", "role"],
    fields: [
      { name: "name", type: "text", required: true },
      { name: "role", type: "text", required: true },
      { name: "image", type: "text", required: true, filenameOnly: true, pathPrefix: "./src/img/verein/vorstand/" },
      { name: "tags", type: "csv", required: true, placeholder: "Tag1, Tag2" },
      { name: "description", type: "textarea", required: true },
      {
        name: "socials",
        type: "list",
        required: true,
        itemFields: [
          { name: "label", type: "select", required: true, options: vorstandSocialLabelOptions },
          { name: "href", type: "text", required: true },
          { name: "className", type: "select", required: true, options: vorstandSocialClassOptions },
          { name: "icon", type: "select", required: true, options: vorstandSocialIconOptions }
        ]
      }
    ],
    template: {
      name: "Max Mustermann",
      role: "Präsident",
      image: "./src/img/verein/vorstand/max-mustermann.png",
      tags: ["Leitung"],
      description: "Kurztext",
      socials: [{ label: "E-Mail", href: "mailto:max@example.org", className: "liEmail", icon: "@" }]
    }
  },
  elferrat: {
    filename: "elferrat.json",
    summaryKeys: ["name", "role"],
    fields: [
      { name: "name", type: "text", required: true },
      { name: "role", type: "text", required: true },
      { name: "image", type: "text", required: true, filenameOnly: true, pathPrefix: "./src/img/verein/elferrat/" }
    ],
    template: {
      name: "Erika Muster",
      role: "Programm",
      image: "./src/img/verein/elferrat/erika-muster.svg"
    }
  },
  royals: {
    filename: "royals.json",
    summaryKeys: ["session", "year"],
    fields: [
      { name: "session", type: "text", required: true },
      { name: "year", type: "text", required: true },
      { name: "image", type: "text", required: true, filenameOnly: true, pathPrefix: "./src/img/verein/prinzenpaare/" },
      { name: "adultPair", type: "pairList", required: true, maxItems: 1 },
      { name: "childPair", type: "pairList", maxItems: 1 }
    ],
    template: {
      session: "48. Session",
      year: "2026/2027",
      image: "./src/img/verein/prinzenpaare/pp2627.JPG",
      adultPair: [{ prince: "Max I.", princess: "Mia I." }]
    }
  },
  linktree: {
    filename: "linktree.json",
    summaryKeys: ["text", "url"],
    fields: [
      { name: "icon", type: "select", required: true, options: linktreeIconOptions },
      { name: "text", type: "text", required: true },
      { name: "url", type: "text", required: true }
    ],
    template: {
      icon: "website",
      text: "Webseite",
      url: "https://example.org"
    }
  },
  downloads: {
    filename: "downloads.json",
    summaryKeys: ["title", "file"],
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
      { name: "file", type: "text", required: true, filenameOnly: true, pathPrefix: "./src/downloads/" },
      { name: "label", type: "text", required: true }
    ],
    template: {
      title: "Anmeldung Umzug Sandersdorf",
      description: "Anmeldeformular für den Umzug in Sandersdorf.",
      file: "./src/downloads/AnmeldungUmzugSandersdorf.pdf",
      label: "PDF herunterladen"
    }
  },
  "header-notices": {
    filename: "header-notices.json",
    summaryKeys: ["text", "countdown"],
    fields: [
      { name: "text", type: "textarea", required: true },
      { name: "countdown", type: "datetime", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "publishAt", type: "datetime", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "datetime", required: true, placeholder: "JJJJ-MM-TT-HH:mm" }
    ],
    template: {
      text: "Hinweistext",
      countdown: "2026-05-09-16:30",
      publishAt: "2026-04-18-15:00",
      deleteAt: "2026-05-09-16:30"
    }
  },
  gallery: {
    filename: "gallerys/{xyz}.json",
    summaryKeys: ["src", "alt"],
    fields: [
      { name: "src", type: "text", required: true, filenameOnly: true, pathPrefix: "./src/img/home-gallery/" },
      { name: "alt", type: "text" }
    ],
    template: {
      src: "./src/img/home-gallery/01.JPG",
      alt: "Titelbild"
    }
  }
};

const typeSelect = document.querySelector("#typeSelect");
const galleryNameWrap = document.querySelector("#galleryNameWrap");
const galleryNameInput = document.querySelector("#galleryNameInput");
const confirmGalleryBtn = document.querySelector("#confirmGalleryBtn");
const galleryConfirmHint = document.querySelector("#galleryConfirmHint");
const loadOnlineBtn = document.querySelector("#loadOnlineBtn");
const entriesEl = document.querySelector("#entries");
const outputEl = document.querySelector("#output");
const validationList = document.querySelector("#validationList");
const validationPanel = document.querySelector("#validationPanel");
const addEntryBtn = document.querySelector("#addEntryBtn");
const galleryImagePicker = document.querySelector("#galleryImagePicker");
const generateBtn = document.querySelector("#generateBtn");
const copyBtn = document.querySelector("#copyBtn");
const downloadBtn = document.querySelector("#downloadBtn");
const commitBtn = document.querySelector("#commitBtn");
const resultActions = document.querySelector("#resultActions");
const commitStatus = document.querySelector("#commitStatus");
const commitDialog = document.querySelector("#commitDialog");
const commitForm = document.querySelector("#commitForm");
const githubUsernameInput = document.querySelector("#githubUsernameInput");
const githubTokenInput = document.querySelector("#githubTokenInput");
const commitMessageInput = document.querySelector("#commitMessageInput");
const cancelCommitDialogBtn = document.querySelector("#cancelCommitDialogBtn");
const scrollTopBtn = document.querySelector("#scrollTopBtn");
const DEFAULT_GALLERY_NAME = "home-gallery";
let confirmedGalleryName = "";
let galleryNameConfirmed = false;
const selectedGalleryFiles = new Map();
let onlineJsonLoaded = false;

function appendOption(key) {
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = `${key} (${specs[key].filename})`;
  typeSelect.append(opt);
}

Object.keys(specs).forEach((key) => appendOption(key));

const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
const windowRegex = /^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}$/;

function findLinkOptionByType(typeValue) {
  if (typeof typeValue !== "string") return null;
  let normalizedType = typeValue.trim().toLowerCase();
  if (normalizedType.startsWith("type=")) normalizedType = normalizedType.slice(5).trim();
  if (!normalizedType) return null;

  return (
    linkLabelOptions.find((option) => option.type.toLowerCase() === normalizedType) ||
    linkLabelOptions.find((option) => option.value.toLowerCase() === normalizedType) ||
    linkLabelOptions.find((option) => option.label.toLowerCase() === normalizedType) ||
    null
  );
}

function formatDateWindow(value) {
  return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}-${String(value.getUTCDate()).padStart(2, "0")}-${String(value.getUTCHours()).padStart(2, "0")}:${String(value.getUTCMinutes()).padStart(2, "0")}`;
}

function parseDate(value) {
  if (!dateRegex.test(value)) return null;
  const [day, month, year] = value.split(".");
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0));
}

function toDateInputValue(value) {
  if (typeof value !== "string" || !dateRegex.test(value)) return "";
  const [day, month, year] = value.split(".");
  return `${year}-${month}-${day}`;
}

function fromDateInputValue(value) {
  if (typeof value !== "string" || !value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return "";
  return `${day}.${month}.${year}`;
}

function toDateTimeInputValue(value) {
  if (typeof value !== "string" || !windowRegex.test(value)) return "";
  const [year, month, day, hm] = value.split("-");
  return `${year}-${month}-${day}T${hm}`;
}

function fromDateTimeInputValue(value) {
  if (typeof value !== "string" || !value.includes("T")) return "";
  const [datePart, timePart] = value.split("T");
  if (!datePart || !timePart) return "";
  return `${datePart}-${timePart}`;
}

function toTimeInputValue(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{2}:\d{2})(?:\s*Uhr)?$/i);
  return match ? match[1] : "";
}

function fromTimeInputValue(value) {
  if (typeof value !== "string" || !value) return "";
  const match = value.match(/^\d{2}:\d{2}$/);
  if (!match) return "";
  return `${value} Uhr`;
}

function toCurrencyInputValue(value) {
  if (typeof value !== "string") return "";
  return value.replace(/\s*€\s*$/, "").trim();
}

function updateTypeDependentUi() {
  galleryNameWrap.classList.toggle("hidden", typeSelect.value !== "gallery");
  updateGalleryConfirmationState();
}

function normalizeGalleryName(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return "";
  return trimmed.replace(/\.json$/i, "");
}

function getActiveGalleryName() {
  return confirmedGalleryName || normalizeGalleryName(galleryNameInput.value) || DEFAULT_GALLERY_NAME;
}

function getGalleryImagePrefix() {
  return `./src/img/gallerys/${getActiveGalleryName()}/`;
}

function hasEntries() {
  return entriesEl.querySelectorAll(".entry").length > 0;
}

function setGalleryHint(text, { warning = false } = {}) {
  if (!galleryConfirmHint) return;
  galleryConfirmHint.textContent = text;
  galleryConfirmHint.classList.toggle("is-warning", warning);
}

function updateGalleryConfirmationState() {
  const isGalleryType = typeSelect.value === "gallery";
  const currentName = normalizeGalleryName(galleryNameInput?.value);
  const needsConfirmation = isGalleryType && (!galleryNameConfirmed || currentName !== confirmedGalleryName);

  loadOnlineBtn.disabled = needsConfirmation;
  addEntryBtn.disabled = needsConfirmation || !onlineJsonLoaded;

  if (!isGalleryType) {
    setGalleryHint("Bitte Ordnernamen bestätigen, bevor Einträge geladen oder erstellt werden.");
    return;
  }

  if (needsConfirmation) {
    setGalleryHint("Bitte den Ordnernamen bestätigen. Danach kannst du Online-JSON laden oder Einträge hinzufügen.", { warning: true });
    return;
  }

  setGalleryHint(`Ordner bestätigt: ${confirmedGalleryName}. Du kannst jetzt laden oder Einträge hinzufügen.`);
}

function confirmGalleryName() {
  if (typeSelect.value !== "gallery") return;
  const normalizedName = normalizeGalleryName(galleryNameInput.value) || DEFAULT_GALLERY_NAME;
  const isNameChange = galleryNameConfirmed && normalizedName !== confirmedGalleryName;

  if (isNameChange && hasEntries()) {
    const shouldClearEntries = window.confirm(
      `Der Ordner wurde geändert von "${confirmedGalleryName}" auf "${normalizedName}". Alle aktuellen Einträge werden gelöscht. Fortfahren?`
    );
    if (!shouldClearEntries) {
      galleryNameInput.value = confirmedGalleryName;
      updateGalleryConfirmationState();
      return;
    }
    renderEntries("gallery");
    [...selectedGalleryFiles.values()].forEach((item) => {
      if (item?.objectUrl) URL.revokeObjectURL(item.objectUrl);
    });
    selectedGalleryFiles.clear();
  }

  confirmedGalleryName = normalizedName;
  galleryNameConfirmed = true;
  galleryNameInput.value = normalizedName;
  updateGalleryConfirmationState();
}

function clearResult() {
  outputEl.textContent = "";
  resultActions.classList.add("hidden");
  setCommitStatus("");
}

function setOnlineJsonLoaded(value) {
  onlineJsonLoaded = Boolean(value);
  updateGalleryConfirmationState();
}

function rememberGalleryFiles(files) {
  if (!Array.isArray(files) || files.length === 0) return;
  const folder = getActiveGalleryName();

  files.forEach((file) => {
    const safeFilename = getFilenameOnly(file?.name || "");
    if (!safeFilename) return;
    const repoPath = `src/img/gallerys/${folder}/${safeFilename}`;
    const existing = selectedGalleryFiles.get(repoPath);
    if (existing?.objectUrl) URL.revokeObjectURL(existing.objectUrl);
    selectedGalleryFiles.set(repoPath, {
      file,
      objectUrl: URL.createObjectURL(file)
    });
  });
}

function resetValidationUi() {
  validationList.innerHTML = "";
  entriesEl.querySelectorAll(".has-error").forEach((el) => el.classList.remove("has-error"));
  clearResult();
}

function toInputValue(value, fieldType) {
  if (fieldType === "csv") return Array.isArray(value) ? value.join(", ") : "";
  if (fieldType === "checkbox") return !!value;
  if (fieldType === "date") return toDateInputValue(value);
  if (fieldType === "datetime") return toDateTimeInputValue(value);
  if (fieldType === "time") return toTimeInputValue(value);
  if (fieldType === "currency") return toCurrencyInputValue(value);
  if (fieldType === "textarea") {
    if (Array.isArray(value)) return value.join("\n\n");
    if (value && typeof value === "object") return JSON.stringify(value, null, 2);
  }
  return value ?? "";
}

function getFilenameOnly(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.split(/[\\/]/).pop() || "";
}

function updateImagePreviewForInput(input) {
  if (!input || input.dataset.filenameOnly !== "true") return;
  const previewEl = input.closest(".form-field")?.querySelector(".image-preview");
  if (!previewEl) return;

  const filename = getFilenameOnly(input.value);
  const pathPrefix = input.dataset.pathPrefix || "";
  if (!filename || !pathPrefix) {
    previewEl.classList.add("hidden");
    previewEl.removeAttribute("src");
    delete previewEl.dataset.fallbackSrc;
    return;
  }

  const relativeSrc = `${pathPrefix}${filename}`;
  const isGalleryImage = typeSelect.value === "gallery" && input.dataset.field === "src";
  const galleryRepoPath = relativeSrc.replace(/^\.\//, "");
  const selectedGalleryFile = isGalleryImage ? selectedGalleryFiles.get(galleryRepoPath) : null;
  if (selectedGalleryFile?.objectUrl) {
    previewEl.src = selectedGalleryFile.objectUrl;
    previewEl.alt = `Vorschau ${filename}`;
    previewEl.classList.remove("hidden");
    delete previewEl.dataset.fallbackSrc;
    return;
  }

  const normalizedRelative = relativeSrc.replace(/^\.\//, "");
  const absoluteSrc = `${CONFIG.DEFAULT_BASE_URL.replace(/\/$/, "")}/${normalizedRelative}`;

  previewEl.dataset.fallbackSrc = relativeSrc;
  previewEl.src = absoluteSrc;
  previewEl.alt = `Vorschau ${filename}`;
  previewEl.classList.remove("hidden");
}

function createInput(field, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "form-field";

  const label = document.createElement("label");
  label.textContent = `${field.name}${field.required ? " *" : ""}`;
  wrapper.append(label);

  let input;
  const normalizedValue = field.filenameOnly ? getFilenameOnly(value) : value;

  if (field.type === "textarea") {
    input = document.createElement("textarea");
    input.value = toInputValue(normalizedValue, field.type);
  } else if (field.type === "checkbox") {
    input = document.createElement("input");
    input.type = "checkbox";
    input.checked = toInputValue(normalizedValue, field.type);
  } else if (field.type === "date") {
    input = document.createElement("input");
    input.type = "date";
    input.value = toInputValue(normalizedValue, field.type);
  } else if (field.type === "datetime") {
    input = document.createElement("input");
    input.type = "datetime-local";
    input.value = toInputValue(normalizedValue, field.type);
  } else if (field.type === "time") {
    input = document.createElement("input");
    input.type = "time";
    input.value = toInputValue(normalizedValue, field.type);
  } else if (field.type === "select") {
    input = document.createElement("select");
    const options = Array.isArray(field.options) ? field.options : [];
    options.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      input.append(optionEl);
    });
    input.value = String(normalizedValue ?? "");
  } else {
    input = document.createElement("input");
    input.type = "text";
    input.value = toInputValue(normalizedValue, field.type);
  }

  if (field.placeholder) input.placeholder = field.placeholder;
  input.dataset.field = field.name;
  input.dataset.fieldType = field.type;
  input.dataset.required = String(!!field.required);

  if (field.type === "currency") {
    const inputWithPrefix = document.createElement("div");
    inputWithPrefix.className = "input-with-prefix";

    const prefix = document.createElement("span");
    prefix.className = "input-prefix";
    prefix.textContent = "€";
    inputWithPrefix.append(prefix, input);
    wrapper.append(inputWithPrefix);
  } else if (field.filenameOnly && field.pathPrefix && field.type !== "textarea" && field.type !== "checkbox") {
    const inputWithPrefix = document.createElement("div");
    inputWithPrefix.className = "input-with-prefix";

    const prefix = document.createElement("span");
    prefix.className = "input-prefix";
    prefix.textContent = field.pathPrefix;
    inputWithPrefix.append(prefix, input);
    wrapper.append(inputWithPrefix);
  } else {
    wrapper.append(input);
  }

  if (field.filenameOnly) input.dataset.filenameOnly = "true";
  if (field.pathPrefix) input.dataset.pathPrefix = field.pathPrefix;
  if (field.allowAuto) input.dataset.allowAuto = "true";

  if (field.filenameOnly) {
    const preview = document.createElement("img");
    preview.className = "image-preview hidden";
    preview.loading = "lazy";
    preview.decoding = "async";
    preview.alt = "Bildvorschau";
    preview.addEventListener("error", () => {
      const fallbackSrc = preview.dataset.fallbackSrc;
      if (fallbackSrc && preview.src !== fallbackSrc) {
        preview.src = fallbackSrc;
        delete preview.dataset.fallbackSrc;
        return;
      }
      preview.classList.add("hidden");
      preview.removeAttribute("src");
      delete preview.dataset.fallbackSrc;
    });
    wrapper.append(preview);
    updateImagePreviewForInput(input);
  }

  return { wrapper, input };
}

function addListItem(field, container, value = {}, onChange = () => {}) {
  const item = document.createElement("div");
  item.className = "list-item";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Entfernen";
  removeBtn.addEventListener("click", () => {
    item.remove();
    onChange();
    resetValidationUi();
  });
  item.append(removeBtn);

  const definition =
    field.type === "pairList"
      ? [
          { name: "prince", type: "text", required: true },
          { name: "princess", type: "text", required: true }
        ]
      : field.itemFields;

  const normalizedValue = { ...value };
  if (field.name === "links") {
    const hasValidLabel = linkLabelOptions.some((option) => option.value === normalizedValue.label);
    const matchingOption = hasValidLabel
      ? null
      : findLinkOptionByType(normalizedValue.type) || findLinkOptionByType(normalizedValue.label);
    if (matchingOption) normalizedValue.label = matchingOption.value;
  }

  definition.forEach((subField) => {
    const { wrapper, input } = createInput(subField, normalizedValue[subField.name]);
    input.dataset.subField = subField.name;
    input.dataset.required = String(!!subField.required);
    item.append(wrapper);
  });

  container.append(item);
  onChange();
}

function createListBlock(field, value = []) {
  const block = document.createElement("div");
  block.className = "list-block";

  const header = document.createElement("div");
  header.className = "list-block-header";

  const title = document.createElement("p");
  title.className = "list-block-title";
  title.innerHTML = `<strong>${field.name}${field.required ? " *" : ""}</strong>`;
  header.append(title);

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.className = "list-toggle-btn";
  toggleBtn.textContent = "Aufklappen";
  header.append(toggleBtn);
  block.append(header);

  const content = document.createElement("div");
  content.className = "list-block-content";
  block.append(content);

  function setCollapsed(collapsed) {
    block.classList.toggle("is-collapsed", collapsed);
    content.hidden = collapsed;
    toggleBtn.textContent = collapsed ? "Aufklappen" : "Zuklappen";
    toggleBtn.setAttribute("aria-expanded", String(!collapsed));
  }

  toggleBtn.addEventListener("click", () => {
    const willCollapse = !block.classList.contains("is-collapsed");
    setCollapsed(willCollapse);
  });

  const listContainer = document.createElement("div");
  content.append(listContainer);

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.textContent = `${field.name}-Eintrag hinzufügen`;
  const maxItems = Number.isFinite(field.maxItems) ? Math.max(0, Number(field.maxItems)) : Infinity;

  const updateAddButtonState = () => {
    const currentCount = listContainer.querySelectorAll(".list-item").length;
    addBtn.hidden = currentCount >= maxItems;
  };

  addBtn.addEventListener("click", () => {
    const currentCount = listContainer.querySelectorAll(".list-item").length;
    if (currentCount >= maxItems) return;
    setCollapsed(false);
    addListItem(field, listContainer, {}, updateAddButtonState);
    resetValidationUi();
  });
  content.append(addBtn);

  const listValues = Array.isArray(value) ? value : [];
  listValues.forEach((item) => addListItem(field, listContainer, item, updateAddButtonState));
  if (listValues.length === 0 && field.required) addListItem(field, listContainer, {}, updateAddButtonState);
  updateAddButtonState();

  block.dataset.field = field.name;
  block.dataset.fieldType = field.type;
  block.dataset.required = String(!!field.required);
  setCollapsed(true);
  return block;
}

function readEntry(entryEl) {
  const data = {};

  entryEl.querySelectorAll("input[data-field], textarea[data-field], select[data-field]").forEach((input) => {
    if (input.dataset.subField) return;

    const name = input.dataset.field;
    const type = input.dataset.fieldType;

    if (type === "checkbox") {
      if (input.checked) data[name] = true;
      return;
    }

    if (type === "textarea") {
      const rawValue = input.value;
      if (!rawValue.trim()) return;
      data[name] = rawValue;
      return;
    }

    const value = input.value.trim();
    if (!value) return;

    if (type === "date") {
      data[name] = fromDateInputValue(value);
      return;
    }

    if (type === "datetime") {
      data[name] = fromDateTimeInputValue(value);
      return;
    }

    if (type === "time") {
      data[name] = fromTimeInputValue(value);
      return;
    }

    if (type === "currency") {
      const normalizedCurrency = toCurrencyInputValue(value);
      if (!normalizedCurrency) return;
      data[name] = `${normalizedCurrency} €`;
      return;
    }

    if (type === "csv") {
      data[name] = value.split(",").map((part) => part.trim()).filter(Boolean);
      return;
    }

    if (input.dataset.filenameOnly === "true") {
      const filename = getFilenameOnly(value);
      if (!filename) return;
      const prefix = input.dataset.pathPrefix || "";
      data[name] = `${prefix}${filename}`;
      return;
    }

    data[name] = value;
  });

  entryEl.querySelectorAll(".list-block[data-field]").forEach((block) => {
    const fieldName = block.dataset.field;
    const blockType = block.dataset.fieldType;
    const items = [];

    block.querySelectorAll(".list-item").forEach((item) => {
      const row = {};
      item.querySelectorAll("[data-sub-field]").forEach((subInput) => {
        const val = subInput.value.trim();
        if (val) row[subInput.dataset.subField] = val;
      });
      if (Object.keys(row).length > 0) items.push(row);
    });

    if (items.length > 0) data[fieldName] = items;
    else if (blockType === "pairList" && block.dataset.required === "true") data[fieldName] = [];

    if (fieldName === "links" && Array.isArray(data[fieldName])) {
      data[fieldName] = data[fieldName].map((item) => {
        const linkLabel = item.label || "";
        const matchingOption = linkLabelOptions.find((option) => option.value === linkLabel);
        if (!matchingOption || !matchingOption.type) return item;
        return { ...item, type: matchingOption.type };
      });
    }
  });

  if (typeSelect.value === "news") {
    data.large = Boolean(data.image);
  }

  return data;
}

function parseDateWindow(value) {
  if (!windowRegex.test(value)) return null;
  const [year, month, day, hm] = value.split("-");
  const [hour, minute] = hm.split(":");
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)));
}

function calculateNewsDeleteAt(entry) {
  if (!entry || typeof entry !== "object") return null;

  const publishDate = entry.publishAt ? parseDateWindow(entry.publishAt) : null;
  const fallbackDate = entry.date ? parseDate(entry.date) : null;
  const baseDate = publishDate || fallbackDate;
  if (!baseDate) return null;

  const targetDate = new Date(baseDate.getTime());
  targetDate.setUTCDate(targetDate.getUTCDate() + 365);
  targetDate.setUTCHours(23, 59, 0, 0);
  return formatDateWindow(targetDate);
}

function calculateEventDeleteAt(entry) {
  if (!entry || typeof entry !== "object") return null;
  const eventDate = entry.date ? parseDate(entry.date) : null;
  if (!eventDate) return null;
  const targetDate = new Date(eventDate.getTime());
  targetDate.setUTCHours(23, 59, 0, 0);
  return formatDateWindow(targetDate);
}

function updateNewsDeleteAt(entryEl) {
  if (typeSelect.value !== "news") return;
  const deleteInput = entryEl.querySelector('[data-field="deleteAt"]');
  if (!deleteInput || deleteInput.dataset.allowAuto !== "true") return;

  const isAuto = deleteInput.dataset.autoManaged === "true";
  const isEmpty = !deleteInput.value.trim();
  if (!isAuto && !isEmpty) return;

  const draft = readEntry(entryEl);
  const autoValue = calculateNewsDeleteAt(draft);
  if (!autoValue) return;

  deleteInput.value = toDateTimeInputValue(autoValue);
  deleteInput.dataset.autoManaged = "true";
}

function updateHeaderNoticesDeleteAt(entryEl) {
  if (typeSelect.value !== "header-notices") return;
  const countdownInput = entryEl.querySelector('[data-field="countdown"]');
  const deleteInput = entryEl.querySelector('[data-field="deleteAt"]');
  if (!countdownInput || !deleteInput) return;

  const hasCountdown = !!countdownInput.value.trim();
  if (hasCountdown) {
    deleteInput.value = countdownInput.value;
    deleteInput.disabled = true;
    return;
  }

  deleteInput.disabled = false;
}

function updateEventDeleteAt(entryData) {
  if (typeSelect.value !== "events") return entryData;
  const calculatedDeleteAt = calculateEventDeleteAt(entryData);
  if (!calculatedDeleteAt) return entryData;
  return { ...entryData, deleteAt: calculatedDeleteAt };
}

function syncEntryExpiredState(entryEl) {
  if (!entryEl) return;
  const entryData = updateEventDeleteAt(readEntry(entryEl));
  const deleteDate = entryData.deleteAt ? parseDateWindow(entryData.deleteAt) : null;
  const isExpired = deleteDate instanceof Date && !Number.isNaN(deleteDate.getTime()) && deleteDate.getTime() < Date.now();
  entryEl.classList.toggle("is-expired-news", isExpired);
}

function markFieldError(element) {
  const wrapper = element.closest(".form-field") || element;
  wrapper.classList.add("has-error");
}

function validate(entries, typeKey) {
  const errors = [];
  const spec = specs[typeKey];

  if (!Array.isArray(entries)) {
    errors.push({ text: "Top-Level ist kein Array." });
    return errors;
  }

  entries.forEach((entry, idx) => {
    const entryEl = entriesEl.querySelectorAll(".entry")[idx];

    spec.fields.forEach((field) => {
      if (field.type === "list" || field.type === "pairList") {
        const block = entryEl.querySelector(`.list-block[data-field="${field.name}"]`);
        const items = Array.isArray(entry[field.name]) ? entry[field.name] : [];

        if (field.required && items.length === 0) {
          errors.push({ text: `Eintrag ${idx + 1}: Pflichtfeld '${field.name}' fehlt.`, element: block });
        }

        const itemDefs = field.type === "pairList"
          ? [
              { name: "prince", required: true },
              { name: "princess", required: true }
            ]
          : field.itemFields || [];

        block.querySelectorAll(".list-item").forEach((itemEl, itemIdx) => {
          itemDefs.forEach((subField) => {
            if (!subField.required) return;
            const subInput = itemEl.querySelector(`[data-sub-field="${subField.name}"]`);
            if (subInput && !subInput.value.trim()) {
              errors.push({ text: `Eintrag ${idx + 1}, ${field.name} ${itemIdx + 1}: '${subField.name}' fehlt.`, element: subInput });
            }
          });
        });

        return;
      }

      if (!field.required) return;
      if (field.type === "autoDeleteAt") return;

      const input = entryEl.querySelector(`[data-field="${field.name}"]`);
      if (!input) return;
      const hasValue = field.type === "checkbox" ? input.checked : !!input.value.trim();
      if (!hasValue) {
        errors.push({ text: `Eintrag ${idx + 1}: Pflichtfeld '${field.name}' ist leer.`, element: input });
      }
    });

    if (entry.date && !dateRegex.test(entry.date)) {
      const input = entryEl.querySelector('[data-field="date"]');
      errors.push({ text: `Eintrag ${idx + 1}: date hat nicht das Format TT.MM.JJJJ.`, element: input });
    }

    if (entry.publishAt && !windowRegex.test(entry.publishAt)) {
      const input = entryEl.querySelector('[data-field="publishAt"]');
      errors.push({ text: `Eintrag ${idx + 1}: publishAt hat nicht das Format JJJJ-MM-TT-HH:mm.`, element: input });
    }

    if (entry.deleteAt && !windowRegex.test(entry.deleteAt)) {
      const input = entryEl.querySelector('[data-field="deleteAt"]');
      errors.push({ text: `Eintrag ${idx + 1}: deleteAt hat nicht das Format JJJJ-MM-TT-HH:mm.`, element: input });
    }

    if (typeKey === "events" && entry.preis) {
      const preisInput = entryEl.querySelector('[data-field="preis"]');
      if (!/^\d+(?:[.,]\d{2})\s€$/.test(entry.preis)) {
        errors.push({ text: `Eintrag ${idx + 1}: preis muss genau zwei Nachkommastellen haben (z. B. 12,00 €).`, element: preisInput });
      }
    }

    if (entry.publishAt && entry.deleteAt && windowRegex.test(entry.publishAt) && windowRegex.test(entry.deleteAt)) {
      if (parseDateWindow(entry.publishAt) >= parseDateWindow(entry.deleteAt)) {
        const publishInput = entryEl.querySelector('[data-field="publishAt"]');
        const deleteInput = entryEl.querySelector('[data-field="deleteAt"]');
        errors.push({ text: `Eintrag ${idx + 1}: publishAt muss vor deleteAt liegen.`, element: publishInput });
        errors.push({ text: `Eintrag ${idx + 1}: deleteAt muss nach publishAt liegen.`, element: deleteInput });
      }
    }
  });

  return errors;
}

function renderValidation(errors) {
  validationList.innerHTML = "";

  if (errors.length === 0) {
    const li = document.createElement("li");
    li.className = "ok";
    li.textContent = "✔ Keine Fehler gefunden. JSON wurde erstellt.";
    validationList.append(li);
    return;
  }

  errors.forEach((error) => {
    const li = document.createElement("li");
    li.className = "err";
    li.textContent = `✖ ${error.text}`;
    validationList.append(li);

    if (error.element) {
      if (error.element.classList.contains("list-block")) error.element.classList.add("has-error");
      else markFieldError(error.element);
    }
  });
}

function collapseAllEntries() {
  entriesEl.querySelectorAll(".entry").forEach((entry) => {
    entry.classList.add("is-collapsed");
    const editBtn = entry.querySelector(".edit-btn");
    const doneBtn = entry.querySelector(".done-btn");
    if (editBtn) editBtn.classList.remove("hidden");
    if (doneBtn) doneBtn.classList.add("hidden");
  });
}

function expandEntry(entryEl) {
  collapseAllEntries();
  entryEl.classList.remove("is-collapsed");
  entryEl.querySelector(".edit-btn")?.classList.add("hidden");
  entryEl.querySelector(".done-btn")?.classList.remove("hidden");
}

function getEntrySummary(data, typeKey, index) {
  const summaryKeys = specs[typeKey].summaryKeys || [];
  const parts = summaryKeys.map((key) => data[key]).filter(Boolean);
  if (parts.length === 0) return `Eintrag ${index + 1}`;
  return `Eintrag ${index + 1}: ${parts.join(" | ")}`;
}

function refreshEntrySummary(entryEl, index) {
  const data = readEntry(entryEl);
  const summaryEl = entryEl.querySelector(".entry-summary");
  summaryEl.textContent = getEntrySummary(data, typeSelect.value, index);
}

function renumberAndRefreshSummaries() {
  [...entriesEl.querySelectorAll(".entry")].forEach((entry, index) => {
    refreshEntrySummary(entry, index);
  });
}

function moveEntry(entryEl, direction) {
  if (direction < 0) {
    const previous = entryEl.previousElementSibling;
    if (previous) entriesEl.insertBefore(entryEl, previous);
  } else {
    const next = entryEl.nextElementSibling;
    if (next) entriesEl.insertBefore(next, entryEl);
  }

  renumberAndRefreshSummaries();
  resetValidationUi();
}

function addEntry(defaults = {}, { expand = true, insert = "auto", scrollToEntry = true } = {}) {
  const typeKey = typeSelect.value;
  const spec = specs[typeKey];
  const shouldPrepend = insert === "start" || (insert === "auto" && (typeKey === "news" || typeKey === "royals"));

  const entry = document.createElement("article");
  entry.className = "entry";
  entry.draggable = true;

  const header = document.createElement("div");
  header.className = "entry-header";

  const dragHandle = document.createElement("button");
  dragHandle.type = "button";
  dragHandle.className = "drag-handle";
  dragHandle.textContent = "☰";
  dragHandle.title = "Eintrag per Drag & Drop verschieben";
  dragHandle.setAttribute("aria-label", "Eintrag per Drag & Drop verschieben");

  const summary = document.createElement("p");
  summary.className = "entry-summary";
  summary.textContent = "Neuer Eintrag";

  const actions = document.createElement("div");
  actions.className = "entry-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.textContent = "Bearbeiten";
  editBtn.className = "edit-btn hidden";
  editBtn.addEventListener("click", () => expandEntry(entry));

  const doneBtn = document.createElement("button");
  doneBtn.type = "button";
  doneBtn.textContent = "Fertig";
  doneBtn.className = "done-btn";
  doneBtn.addEventListener("click", () => {
    collapseAllEntries();
    renumberAndRefreshSummaries();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Eintrag löschen";
  deleteBtn.addEventListener("click", () => {
    entry.remove();
    renumberAndRefreshSummaries();
    resetValidationUi();
  });

  actions.append(editBtn, doneBtn, deleteBtn);
  header.append(dragHandle, summary, actions);

  const body = document.createElement("div");
  body.className = "entry-body";

  spec.fields.forEach((field) => {
    const effectiveField = typeKey === "gallery" && field.name === "src"
      ? { ...field, pathPrefix: getGalleryImagePrefix() }
      : field;

    if (field.type === "autoDeleteAt") return;
    if (field.type === "list" || field.type === "pairList") {
      body.append(createListBlock(effectiveField, defaults[field.name]));
    } else {
      const { wrapper } = createInput(effectiveField, defaults[field.name]);
      body.append(wrapper);
    }
  });

  entry.append(header, body);
  if (shouldPrepend) entriesEl.prepend(entry);
  else entriesEl.append(entry);

  if (expand) expandEntry(entry);
  else collapseAllEntries();

  renumberAndRefreshSummaries();
  syncEntryExpiredState(entry);
  updateHeaderNoticesDeleteAt(entry);

  if (scrollToEntry) {
    entry.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function validateAndGenerate() {
  resetValidationUi();

  const entries = [...entriesEl.querySelectorAll(".entry")].map((entryEl) => {
    updateNewsDeleteAt(entryEl);
    syncEntryExpiredState(entryEl);
    return updateEventDeleteAt(readEntry(entryEl));
  });
  const errors = validate(entries, typeSelect.value);
  renderValidation(errors);

  if (errors.length === 0) {
    outputEl.textContent = JSON.stringify(entries, null, 2);
    resultActions.classList.remove("hidden");
  }

  validationPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderEntries(typeKey, dataList = null, { useTemplate = false } = {}) {
  entriesEl.innerHTML = "";
  resetValidationUi();

  const defaults = Array.isArray(dataList) && dataList.length > 0
    ? dataList
    : useTemplate
      ? [specs[typeKey].template]
      : [];

  if (defaults.length === 0) return;

  defaults.forEach((item, index) => addEntry(item, {
    expand: index === 0,
    insert: "end",
    scrollToEntry: false
  }));
  if (defaults.length > 1) collapseAllEntries();
  renumberAndRefreshSummaries();
}

function getFetchUrl() {
  const base = CONFIG.DEFAULT_BASE_URL.replace(/\/$/, "");

  if (typeSelect.value === "gallery") {
    const galleryName = getActiveGalleryName();
    return `${base}/src/data/gallerys/${galleryName}.json`;
  }

  return `${base}/src/data/${specs[typeSelect.value].filename}`;
}

function getDataPath() {
  if (typeSelect.value === "gallery") {
    const galleryName = getActiveGalleryName();
    return `src/data/gallerys/${galleryName}.json`;
  }
  return `src/data/${specs[typeSelect.value].filename}`;
}

function getOutputJson() {
  const jsonText = outputEl.textContent.trim();
  if (!jsonText) return null;

  try {
    const parsed = JSON.parse(jsonText);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function setCommitStatus(text, state = "") {
  if (!commitStatus) return;
  commitStatus.innerHTML = text;
  commitStatus.classList.remove("is-success", "is-error");
  if (state === "success") commitStatus.classList.add("is-success");
  if (state === "error") commitStatus.classList.add("is-error");
}

function toBase64Utf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Datei konnte nicht gelesen werden."));
        return;
      }
      const base64 = result.split(",")[1];
      if (!base64) {
        reject(new Error("Datei konnte nicht in Base64 umgewandelt werden."));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Fehler beim Lesen der Datei."));
    reader.readAsDataURL(file);
  });
}

async function githubApiRequest(url, { token, method = "GET", body } = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API Fehler (${response.status}): ${errorText}`);
  }

  return response.json();
}

async function createGitBlob({ owner, repo, token, contentBase64 }) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/blobs`;
  const payload = await githubApiRequest(url, {
    token,
    method: "POST",
    body: {
      content: contentBase64,
      encoding: "base64"
    },
  });
  return payload.sha;
}

async function getCommitTreeSha({ owner, repo, token, commitSha }) {
  const payload = await githubApiRequest(`https://api.github.com/repos/${owner}/${repo}/git/commits/${commitSha}`, { token });
  return payload?.tree?.sha || null;
}

async function createGitTree({ owner, repo, token, baseTreeSha, entries }) {
  const payload = await githubApiRequest(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
    token,
    method: "POST",
    body: {
      base_tree: baseTreeSha,
      tree: entries
    }
  });
  return payload.sha;
}

async function createGitCommit({ owner, repo, token, message, treeSha, parentSha }) {
  const payload = await githubApiRequest(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
    token,
    method: "POST",
    body: {
      message,
      tree: treeSha,
      parents: [parentSha]
    }
  });
  return payload.sha;
}

async function updateBranchRef({ owner, repo, token, branch, commitSha }) {
  await githubApiRequest(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${encodeURIComponent(branch)}`, {
    token,
    method: "PATCH",
    body: { sha: commitSha, force: false }
  });
}

async function createSingleGitHubCommit({ owner, repo, branch, token, message, files }) {
  const headSha = await getBranchHeadSha({ owner, repo, branch, token });
  if (!headSha) throw new Error(`Branch '${branch}' konnte nicht aufgelöst werden.`);

  const baseTreeSha = await getCommitTreeSha({ owner, repo, token, commitSha: headSha });
  if (!baseTreeSha) throw new Error("Basis-Tree konnte nicht geladen werden.");

  const treeEntries = [];
  for (const file of files) {
    const blobSha = await createGitBlob({ owner, repo, token, contentBase64: file.contentBase64 });
    treeEntries.push({
      path: file.path,
      mode: "100644",
      type: "blob",
      sha: blobSha
    });
  }

  const treeSha = await createGitTree({ owner, repo, token, baseTreeSha, entries: treeEntries });
  const commitSha = await createGitCommit({ owner, repo, token, message, treeSha, parentSha: headSha });
  await updateBranchRef({ owner, repo, token, branch, commitSha });
  return commitSha;
}

async function getRepositoryDefaultBranch({ owner, repo, token }) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Repository konnte nicht geladen werden (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  return payload.default_branch || "main";
}

async function getBranchHeadSha({ owner, repo, branch, token }) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${encodeURIComponent(branch)}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Branch-Info konnte nicht geladen werden (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  return payload?.object?.sha || null;
}

async function createBranchFromDefault({ owner, repo, branch, token }) {
  const defaultBranch = await getRepositoryDefaultBranch({ owner, repo, token });
  const baseSha = await getBranchHeadSha({ owner, repo, branch: defaultBranch, token });
  if (!baseSha) {
    throw new Error(`Default-Branch '${defaultBranch}' konnte nicht aufgelöst werden.`);
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: `refs/heads/${branch}`,
      sha: baseSha
    })
  });

  if (response.status === 422) {
    return;
  }
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Branch konnte nicht erstellt werden (${response.status}): ${errorText}`);
  }
}

async function ensureBranchExists({ owner, repo, branch, token }) {
  const existingSha = await getBranchHeadSha({ owner, repo, branch, token });
  if (existingSha) return;
  await createBranchFromDefault({ owner, repo, branch, token });
}

function openCommitDialog(defaultMessage) {
  if (!commitDialog || !commitForm || !githubTokenInput || !commitMessageInput) return Promise.resolve(null);
  if (typeof commitDialog.showModal !== "function") {
    const token = window.prompt("GitHub Personal Access Token eingeben:");
    if (!token) return Promise.resolve(null);
    const commitMessage = window.prompt("Commit-Message:", defaultMessage);
    if (!commitMessage) return Promise.resolve(null);
    return Promise.resolve({ token: token.trim(), commitMessage: commitMessage.trim(), username: "" });
  }

  commitMessageInput.value = defaultMessage;

  return new Promise((resolve) => {
    const closeDialog = (result = null) => {
      commitForm.removeEventListener("submit", handleSubmit);
      cancelCommitDialogBtn?.removeEventListener("click", handleCancel);
      commitDialog.removeEventListener("cancel", handleCancel);
      if (commitDialog.open) commitDialog.close();
      resolve(result);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const token = githubTokenInput.value.trim();
      const commitMessage = commitMessageInput.value.trim();
      if (!token || !commitMessage) return;
      const username = githubUsernameInput?.value?.trim() || "";
      closeDialog({ token, commitMessage, username });
    };

    const handleCancel = () => closeDialog(null);

    commitForm.addEventListener("submit", handleSubmit);
    cancelCommitDialogBtn?.addEventListener("click", handleCancel);
    commitDialog.addEventListener("cancel", handleCancel);
    commitDialog.showModal();
    githubTokenInput.focus();
    githubTokenInput.select();
  });
}

async function commitGeneratedJson() {
  const parsedJson = getOutputJson();
  if (!parsedJson) {
    setCommitStatus("Bitte zuerst erfolgreich validieren, damit ein gültiges JSON vorhanden ist.", "error");
    return;
  }

  const owner = CONFIG.GITHUB_OWNER;
  const repo = CONFIG.GITHUB_REPO;
  const branch = CONFIG.GITHUB_BRANCH;
  const path = getDataPath();

  const defaultMessage = `Update ${path} via SKV JSON Generator`;
  const commitInput = await openCommitDialog(defaultMessage);
  if (!commitInput) {
    setCommitStatus("Commit abgebrochen.", "error");
    return;
  }

  commitBtn.disabled = true;
  setCommitStatus("Branch wird geprüft...");

  try {
    await ensureBranchExists({ owner, repo, branch, token: commitInput.token });
    setCommitStatus("Commit wird erstellt...");
    const normalizedJson = JSON.stringify(parsedJson, null, 2);
    const filesForCommit = [
      { path, contentBase64: toBase64Utf8(`${normalizedJson}\n`) }
    ];

    if (typeSelect.value === "gallery") {
      const galleryFilePaths = new Set(
        parsedJson
          .map((entry) => (entry?.src && typeof entry.src === "string" ? entry.src : ""))
          .filter(Boolean)
          .map((src) => src.replace(/^\.\//, ""))
      );

      const filesToUpload = [...selectedGalleryFiles.entries()]
        .filter(([filePath]) => galleryFilePaths.has(filePath))
        .map(([filePath, data]) => ({ filePath, file: data.file }));

      for (const item of filesToUpload) {
        const contentBase64 = await fileToBase64(item.file);
        filesForCommit.push({ path: item.filePath, contentBase64 });
      }
    }

    const commitSha = await createSingleGitHubCommit({
      owner,
      repo,
      branch,
      token: commitInput.token,
      message: commitInput.commitMessage,
      files: filesForCommit
    });

    const commitUrl = commitSha ? `https://github.com/${owner}/${repo}/commit/${commitSha}` : "";
    const statusText = commitUrl
      ? `Commit erfolgreich: <a href="https://github.com/richti03/skvstatic/compare/SkvJsonGenerator" target="_blank">${commitUrl}</a>`
      : "Commit erfolgreich erstellt.";
    setCommitStatus(statusText, "success");
  } catch (error) {
    setCommitStatus(`Commit fehlgeschlagen: ${error.message}`, "error");
  } finally {
    commitBtn.disabled = false;
  }
}

async function loadOnlineJson() {
  const url = getFetchUrl();
  if (!url) return;

  const previousText = loadOnlineBtn.textContent;
  loadOnlineBtn.textContent = "Lade...";
  loadOnlineBtn.disabled = true;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (!Array.isArray(json)) throw new Error("Top-Level ist kein Array");

    const normalizedJson = json.map((entry) => {
      if (typeSelect.value !== "news") return entry;

      if (entry && !entry.text && typeof entry.description === "string") {
        return { ...entry, text: entry.description };
      }

      return entry;
    });

    renderEntries(typeSelect.value, normalizedJson);
    setOnlineJsonLoaded(true);
    loadOnlineBtn.textContent = "Online JSON geladen";
  } catch (error) {
    setOnlineJsonLoaded(false);
    loadOnlineBtn.textContent = `Fehler beim Laden (${error.message})`;
  } finally {
    setTimeout(() => {
      loadOnlineBtn.textContent = previousText;
      loadOnlineBtn.disabled = false;
    }, 1600);
  }
}

typeSelect.addEventListener("change", () => {
  setOnlineJsonLoaded(false);
  if (typeSelect.value === "gallery" && !galleryNameConfirmed) {
    galleryNameInput.value = DEFAULT_GALLERY_NAME;
  }
  updateTypeDependentUi();
  renderEntries(typeSelect.value);
});

addEntryBtn.addEventListener("click", () => {
  if (typeSelect.value === "gallery" && galleryImagePicker) {
    galleryImagePicker.value = "";
    galleryImagePicker.click();
    return;
  }
  addEntry();
  resetValidationUi();
});

galleryImagePicker?.addEventListener("change", () => {
  const files = [...(galleryImagePicker.files || [])];
  if (files.length === 0) return;

  rememberGalleryFiles(files);
  files.forEach((file) => addEntry({ src: file.name, alt: "" }, { expand: false, insert: "end", scrollToEntry: false }));
  collapseAllEntries();
  renumberAndRefreshSummaries();
  resetValidationUi();
});

generateBtn.addEventListener("click", validateAndGenerate);
loadOnlineBtn.addEventListener("click", loadOnlineJson);
confirmGalleryBtn.addEventListener("click", confirmGalleryName);

galleryNameInput.addEventListener("input", () => {
  if (typeSelect.value !== "gallery") return;
  updateGalleryConfirmationState();
  resetValidationUi();
});

copyBtn.addEventListener("click", async () => {
  if (!outputEl.textContent.trim()) return;
  try {
    await navigator.clipboard.writeText(outputEl.textContent);
    copyBtn.textContent = "Kopiert";
  } catch {
    copyBtn.textContent = "Kopieren fehlgeschlagen";
  }

  setTimeout(() => {
    copyBtn.textContent = "JSON kopieren";
  }, 1500);
});

downloadBtn.addEventListener("click", () => {
  if (!outputEl.textContent.trim()) return;

  const blob = new Blob([outputEl.textContent], { type: "application/json;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);

  if (typeSelect.value === "gallery") {
    const galleryName = getActiveGalleryName();
    a.download = `${galleryName}.json`;
  } else {
    a.download = specs[typeSelect.value].filename;
  }

  a.click();
  URL.revokeObjectURL(a.href);
});

commitBtn.addEventListener("click", commitGeneratedJson);

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  const shouldShow = window.scrollY > 320;
  scrollTopBtn?.classList.toggle("hidden", !shouldShow);
});

entriesEl.addEventListener("input", (event) => {
  const entryEl = event.target.closest(".entry");
  if (entryEl) {
    updateImagePreviewForInput(event.target);
    if (event.target.dataset.field === "deleteAt") {
      event.target.dataset.autoManaged = "false";
    }
    if (event.target.dataset.field === "date" || event.target.dataset.field === "publishAt") {
      updateNewsDeleteAt(entryEl);
    }
    if (event.target.dataset.field === "countdown") {
      updateHeaderNoticesDeleteAt(entryEl);
    }
    const index = [...entriesEl.querySelectorAll(".entry")].indexOf(entryEl);
    refreshEntrySummary(entryEl, index);
    syncEntryExpiredState(entryEl);
  }
  resetValidationUi();
});

function getDragInsertBefore(container, pointerY) {
  const draggableEntries = [...container.querySelectorAll(".entry:not(.is-dragging)")];

  return draggableEntries.reduce(
    (closest, current) => {
      const box = current.getBoundingClientRect();
      const offset = pointerY - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: current };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}

let dragFromHandle = false;

entriesEl.addEventListener("pointerdown", (event) => {
  dragFromHandle = !!event.target.closest(".drag-handle");
});

entriesEl.addEventListener("dragstart", (event) => {
  const entry = event.target.closest(".entry");
  if (!entry) return;
  if (!dragFromHandle) {
    event.preventDefault();
    return;
  }

  entry.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", "entry");
  dragFromHandle = false;
});

entriesEl.addEventListener("dragover", (event) => {
  event.preventDefault();
  const dragging = entriesEl.querySelector(".entry.is-dragging");
  if (!dragging) return;

  const insertBeforeEl = getDragInsertBefore(entriesEl, event.clientY);
  if (!insertBeforeEl) entriesEl.append(dragging);
  else entriesEl.insertBefore(dragging, insertBeforeEl);
});

entriesEl.addEventListener("dragend", (event) => {
  const entry = event.target.closest(".entry");
  if (!entry) return;

  entry.classList.remove("is-dragging");
  dragFromHandle = false;
  renumberAndRefreshSummaries();
  resetValidationUi();
});

typeSelect.value = "news";
updateTypeDependentUi();
renderEntries("news");
