const CONFIG = {
  DEFAULT_BASE_URL: "https://richti03.github.io/skvstatic"
};

const specs = {
  news: {
    filename: "news.json",
    summaryKeys: ["title", "date"],
    fields: [
      { name: "title", type: "text", required: true },
      { name: "date", type: "text", required: true, placeholder: "TT.MM.JJJJ" },
      { name: "text", type: "textarea", required: true },
      { name: "image", type: "text", filenameOnly: true, pathPrefix: "./src/img/news/" },
      { name: "publishAt", type: "text", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "text", required: true, placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "large", type: "checkbox" },
      {
        name: "links",
        type: "list",
        itemFields: [
          { name: "type", type: "text" },
          { name: "label", type: "text" },
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
      links: [{ type: "more", label: "Mehr", url: "https://example.org" }]
    }
  },
  events: {
    filename: "events.json",
    summaryKeys: ["title", "date", "location"],
    fields: [
      { name: "title", type: "text", required: true },
      { name: "date", type: "text", required: true, placeholder: "TT.MM.JJJJ" },
      { name: "time", type: "text" },
      { name: "einlass", type: "text" },
      { name: "preis", type: "text" },
      { name: "location", type: "text" },
      { name: "description", type: "textarea" },
      { name: "image", type: "text", filenameOnly: true, pathPrefix: "./src/img/events/" },
      { name: "publishAt", type: "text", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "text", required: true, placeholder: "JJJJ-MM-TT-HH:mm" },
      {
        name: "links",
        type: "list",
        itemFields: [
          { name: "type", type: "text" },
          { name: "label", type: "text" },
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
      deleteAt: "2026-11-12-00:00"
    }
  },
  vorstand: {
    filename: "vorstand.json",
    summaryKeys: ["name", "role"],
    fields: [
      { name: "name", type: "text", required: true },
      { name: "role", type: "text", required: true },
      { name: "image", type: "text", required: true, filenameOnly: true, pathPrefix: "src/img/verein/vorstand/" },
      { name: "tags", type: "csv", required: true, placeholder: "Tag1, Tag2" },
      { name: "description", type: "textarea", required: true },
      {
        name: "socials",
        type: "list",
        required: true,
        itemFields: [
          { name: "label", type: "text", required: true },
          { name: "href", type: "text", required: true },
          { name: "className", type: "text", required: true },
          { name: "icon", type: "text", required: true }
        ]
      }
    ],
    template: {
      name: "Max Mustermann",
      role: "Präsident",
      image: "src/img/verein/vorstand/max-mustermann.png",
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
      { name: "adultPair", type: "pairList", required: true },
      { name: "childPair", type: "pairList" }
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
      { name: "icon", type: "text", placeholder: "website|instagram|facebook|download" },
      { name: "text", type: "text", required: true },
      { name: "url", type: "text", required: true }
    ],
    template: {
      icon: "website",
      text: "Webseite",
      url: "https://example.org"
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
const loadOnlineBtn = document.querySelector("#loadOnlineBtn");
const entriesEl = document.querySelector("#entries");
const outputEl = document.querySelector("#output");
const validationList = document.querySelector("#validationList");
const addEntryBtn = document.querySelector("#addEntryBtn");
const generateBtn = document.querySelector("#generateBtn");
const copyBtn = document.querySelector("#copyBtn");
const downloadBtn = document.querySelector("#downloadBtn");
const resultActions = document.querySelector("#resultActions");

Object.keys(specs).forEach((key) => {
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = `${key} (${specs[key].filename})`;
  typeSelect.append(opt);
});

const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
const windowRegex = /^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}$/;

function updateTypeDependentUi() {
  galleryNameWrap.classList.toggle("hidden", typeSelect.value !== "gallery");
}

function clearResult() {
  outputEl.textContent = "";
  resultActions.classList.add("hidden");
}

function resetValidationUi() {
  validationList.innerHTML = "";
  entriesEl.querySelectorAll(".has-error").forEach((el) => el.classList.remove("has-error"));
  clearResult();
}

function toInputValue(value, fieldType) {
  if (fieldType === "csv") return Array.isArray(value) ? value.join(", ") : "";
  if (fieldType === "checkbox") return !!value;
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
  } else {
    input = document.createElement("input");
    input.type = "text";
    input.value = toInputValue(normalizedValue, field.type);
  }

  if (field.placeholder) input.placeholder = field.placeholder;
  input.dataset.field = field.name;
  input.dataset.fieldType = field.type;
  input.dataset.required = String(!!field.required);

  if (field.filenameOnly && field.pathPrefix && field.type !== "textarea" && field.type !== "checkbox") {
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

  return { wrapper, input };
}

function addListItem(field, container, value = {}) {
  const item = document.createElement("div");
  item.className = "list-item";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Entfernen";
  removeBtn.addEventListener("click", () => {
    item.remove();
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

  definition.forEach((subField) => {
    const { wrapper, input } = createInput(subField, value[subField.name]);
    input.dataset.subField = subField.name;
    input.dataset.required = String(!!subField.required);
    item.append(wrapper);
  });

  container.append(item);
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
  addBtn.addEventListener("click", () => {
    setCollapsed(false);
    addListItem(field, listContainer);
    resetValidationUi();
  });
  content.append(addBtn);

  const listValues = Array.isArray(value) ? value : [];
  listValues.forEach((item) => addListItem(field, listContainer, item));
  if (listValues.length === 0 && field.required) addListItem(field, listContainer);

  block.dataset.field = field.name;
  block.dataset.fieldType = field.type;
  block.dataset.required = String(!!field.required);
  setCollapsed(true);
  return block;
}

function readEntry(entryEl) {
  const data = {};

  entryEl.querySelectorAll("input[data-field], textarea[data-field]").forEach((input) => {
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
  });

  return data;
}

function parseDateWindow(value) {
  if (!windowRegex.test(value)) return null;
  const [year, month, day, hm] = value.split("-");
  const [hour, minute] = hm.split(":");
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)));
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

      const input = entryEl.querySelector(`[data-field="${field.name}"]`);
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

function addEntry(defaults = {}, { expand = true } = {}) {
  const typeKey = typeSelect.value;
  const spec = specs[typeKey];

  const entry = document.createElement("article");
  entry.className = "entry";

  const header = document.createElement("div");
  header.className = "entry-header";

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
  header.append(summary, actions);

  const body = document.createElement("div");
  body.className = "entry-body";

  spec.fields.forEach((field) => {
    if (field.type === "list" || field.type === "pairList") {
      body.append(createListBlock(field, defaults[field.name]));
    } else {
      const { wrapper } = createInput(field, defaults[field.name]);
      body.append(wrapper);
    }
  });

  entry.append(header, body);
  entriesEl.append(entry);

  if (expand) expandEntry(entry);
  else collapseAllEntries();

  renumberAndRefreshSummaries();
}

function validateAndGenerate() {
  resetValidationUi();

  const entries = [...entriesEl.querySelectorAll(".entry")].map(readEntry);
  const errors = validate(entries, typeSelect.value);
  renderValidation(errors);

  if (errors.length === 0) {
    outputEl.textContent = JSON.stringify(entries, null, 2);
    resultActions.classList.remove("hidden");
  }
}

function renderEntries(typeKey, dataList = null) {
  entriesEl.innerHTML = "";
  resetValidationUi();

  const spec = specs[typeKey];
  const defaults = Array.isArray(dataList) && dataList.length > 0 ? dataList : [spec.template];

  defaults.forEach((item, index) => addEntry(item, { expand: index === 0 }));
  if (defaults.length > 1) collapseAllEntries();
  renumberAndRefreshSummaries();
}

function getFetchUrl() {
  const base = CONFIG.DEFAULT_BASE_URL.replace(/\/$/, "");

  if (typeSelect.value === "gallery") {
    const galleryName = galleryNameInput.value.trim() || "home-gallery";
    return `${base}/src/data/gallerys/${galleryName}.json`;
  }

  return `${base}/src/data/${specs[typeSelect.value].filename}`;
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
    loadOnlineBtn.textContent = "Online JSON geladen";
  } catch (error) {
    loadOnlineBtn.textContent = `Fehler beim Laden (${error.message})`;
  } finally {
    setTimeout(() => {
      loadOnlineBtn.textContent = previousText;
      loadOnlineBtn.disabled = false;
    }, 1600);
  }
}

typeSelect.addEventListener("change", () => {
  updateTypeDependentUi();
  renderEntries(typeSelect.value);
});

addEntryBtn.addEventListener("click", () => {
  addEntry();
  resetValidationUi();
});

generateBtn.addEventListener("click", validateAndGenerate);
loadOnlineBtn.addEventListener("click", loadOnlineJson);

galleryNameInput.addEventListener("input", () => {
  if (typeSelect.value === "gallery") resetValidationUi();
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
    const galleryName = galleryNameInput.value.trim() || "home-gallery";
    a.download = `${galleryName}.json`;
  } else {
    a.download = specs[typeSelect.value].filename;
  }

  a.click();
  URL.revokeObjectURL(a.href);
});

entriesEl.addEventListener("input", (event) => {
  const entryEl = event.target.closest(".entry");
  if (entryEl) {
    const index = [...entriesEl.querySelectorAll(".entry")].indexOf(entryEl);
    refreshEntrySummary(entryEl, index);
  }
  resetValidationUi();
});

typeSelect.value = "news";
updateTypeDependentUi();
renderEntries("news");
