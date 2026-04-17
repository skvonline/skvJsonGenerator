const specs = {
  news: {
    filename: "news.json",
    fields: [
      { name: "title", type: "text", required: true },
      { name: "date", type: "text", required: true, placeholder: "TT.MM.JJJJ" },
      { name: "text", type: "textarea", required: true },
      { name: "image", type: "text" },
      { name: "publishAt", type: "text", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "text", required: true, placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "large", type: "checkbox" },
      { name: "links", type: "list", itemFields: [
        { name: "type", type: "text" },
        { name: "label", type: "text" },
        { name: "url", type: "text", required: true }
      ] }
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
    fields: [
      { name: "title", type: "text", required: true },
      { name: "date", type: "text", required: true, placeholder: "TT.MM.JJJJ" },
      { name: "time", type: "text" },
      { name: "einlass", type: "text" },
      { name: "preis", type: "text" },
      { name: "location", type: "text" },
      { name: "description", type: "textarea" },
      { name: "image", type: "text" },
      { name: "publishAt", type: "text", placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "deleteAt", type: "text", required: true, placeholder: "JJJJ-MM-TT-HH:mm" },
      { name: "links", type: "list", itemFields: [
        { name: "type", type: "text" },
        { name: "label", type: "text" },
        { name: "url", type: "text", required: true }
      ] }
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
    fields: [
      { name: "name", type: "text", required: true },
      { name: "role", type: "text", required: true },
      { name: "image", type: "text", required: true },
      { name: "tags", type: "csv", required: true, placeholder: "Tag1, Tag2" },
      { name: "description", type: "textarea", required: true },
      { name: "socials", type: "list", required: true, itemFields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "className", type: "text", required: true },
        { name: "icon", type: "text", required: true }
      ] }
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
    fields: [
      { name: "name", type: "text", required: true },
      { name: "role", type: "text", required: true },
      { name: "image", type: "text", required: true }
    ],
    template: {
      name: "Erika Muster",
      role: "Programm",
      image: "./src/img/verein/elferrat/erika-muster.svg"
    }
  },
  royals: {
    filename: "royals.json",
    fields: [
      { name: "session", type: "text", required: true },
      { name: "year", type: "text", required: true },
      { name: "image", type: "text", required: true },
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
    fields: [
      { name: "src", type: "text", required: true },
      { name: "alt", type: "text" }
    ],
    template: {
      src: "./src/img/home-gallery/01.JPG",
      alt: "Titelbild"
    }
  }
};

const typeSelect = document.querySelector("#typeSelect");
const entriesEl = document.querySelector("#entries");
const outputEl = document.querySelector("#output");
const validationList = document.querySelector("#validationList");
const addEntryBtn = document.querySelector("#addEntryBtn");
const generateBtn = document.querySelector("#generateBtn");
const copyBtn = document.querySelector("#copyBtn");
const downloadBtn = document.querySelector("#downloadBtn");

Object.keys(specs).forEach((key) => {
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = `${key} (${specs[key].filename})`;
  typeSelect.append(opt);
});

const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
const windowRegex = /^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}$/;

function toInputValue(value, fieldType) {
  if (fieldType === "csv") return Array.isArray(value) ? value.join(", ") : "";
  if (fieldType === "checkbox") return !!value;
  return value ?? "";
}

function createInput(field, value) {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = `${field.name}${field.required ? " *" : ""}`;
  wrapper.append(label);

  let input;
  if (field.type === "textarea") {
    input = document.createElement("textarea");
  } else if (field.type === "checkbox") {
    input = document.createElement("input");
    input.type = "checkbox";
    input.checked = toInputValue(value, field.type);
  } else {
    input = document.createElement("input");
    input.type = "text";
    input.value = toInputValue(value, field.type);
  }

  if (field.placeholder) input.placeholder = field.placeholder;
  input.dataset.field = field.name;
  input.dataset.fieldType = field.type;
  input.dataset.required = String(!!field.required);
  wrapper.append(input);

  return { wrapper, input };
}

function createListBlock(field, value = []) {
  const block = document.createElement("div");
  block.className = "list-block";
  const title = document.createElement("p");
  title.innerHTML = `<strong>${field.name}${field.required ? " *" : ""}</strong>`;
  block.append(title);

  const listContainer = document.createElement("div");
  block.append(listContainer);

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.textContent = `${field.name}-Eintrag hinzufügen`;
  addBtn.addEventListener("click", () => addListItem(field, listContainer));
  block.append(addBtn);

  const listValues = Array.isArray(value) ? value : [];
  listValues.forEach((item) => addListItem(field, listContainer, item));
  if (listValues.length === 0 && field.required) addListItem(field, listContainer);

  block.dataset.field = field.name;
  block.dataset.fieldType = field.type;
  block.dataset.required = String(!!field.required);
  return block;
}

function addListItem(field, container, value = {}) {
  const item = document.createElement("div");
  item.className = "list-item";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Entfernen";
  removeBtn.addEventListener("click", () => item.remove());
  item.append(removeBtn);

  const definition = field.type === "pairList"
    ? [{ name: "prince", type: "text", required: true }, { name: "princess", type: "text", required: true }]
    : field.itemFields;

  definition.forEach((subField) => {
    const { wrapper, input } = createInput(subField, value[subField.name]);
    input.dataset.subField = subField.name;
    input.dataset.required = String(!!subField.required);
    item.append(wrapper);
  });

  container.append(item);
}

function renderEntries(typeKey) {
  entriesEl.innerHTML = "";
  const spec = specs[typeKey];
  addEntry(spec.template);
}

function addEntry(defaults = {}) {
  const typeKey = typeSelect.value;
  const spec = specs[typeKey];
  const entry = document.createElement("article");
  entry.className = "entry";

  const header = document.createElement("div");
  header.className = "entry-header";
  const title = document.createElement("h3");
  title.textContent = `Eintrag ${entriesEl.children.length + 1}`;
  const delBtn = document.createElement("button");
  delBtn.textContent = "Eintrag löschen";
  delBtn.type = "button";
  delBtn.addEventListener("click", () => entry.remove());
  header.append(title, delBtn);
  entry.append(header);

  spec.fields.forEach((field) => {
    if (field.type === "list" || field.type === "pairList") {
      entry.append(createListBlock(field, defaults[field.name]));
    } else {
      const { wrapper } = createInput(field, defaults[field.name]);
      entry.append(wrapper);
    }
  });

  entriesEl.append(entry);
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

    let value = input.value.trim();
    if (!value) return;

    if (type === "csv") {
      data[name] = value.split(",").map((part) => part.trim()).filter(Boolean);
    } else {
      data[name] = value;
    }
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
  const [date, time] = value.split("-").reduce((acc, part, i) => {
    if (i < 3) acc[0].push(part);
    else acc[1].push(part);
    return acc;
  }, [[], []]);
  const [y, m, d] = date.map(Number);
  const [h, min] = time.join("-").split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, h, min));
}

function validate(entries, typeKey) {
  const checks = [];
  const spec = specs[typeKey];

  checks.push({
    ok: Array.isArray(entries),
    text: "Top-Level ist ein Array"
  });

  entries.forEach((entry, idx) => {
    spec.fields.forEach((field) => {
      if (!field.required) return;
      const hasValue = field.type === "checkbox"
        ? entry[field.name] === true
        : Array.isArray(entry[field.name]) ? entry[field.name].length > 0 : !!entry[field.name];
      checks.push({
        ok: hasValue,
        text: `Eintrag ${idx + 1}: Pflichtfeld '${field.name}' ist gesetzt`
      });
    });

    if (entry.date) {
      checks.push({ ok: dateRegex.test(entry.date), text: `Eintrag ${idx + 1}: date hat Format TT.MM.JJJJ` });
    }
    if (entry.publishAt) {
      checks.push({ ok: windowRegex.test(entry.publishAt), text: `Eintrag ${idx + 1}: publishAt hat Format JJJJ-MM-TT-HH:mm` });
    }
    if (entry.deleteAt) {
      checks.push({ ok: windowRegex.test(entry.deleteAt), text: `Eintrag ${idx + 1}: deleteAt hat Format JJJJ-MM-TT-HH:mm` });
    }
    if (entry.publishAt && entry.deleteAt && windowRegex.test(entry.publishAt) && windowRegex.test(entry.deleteAt)) {
      checks.push({
        ok: parseDateWindow(entry.publishAt) < parseDateWindow(entry.deleteAt),
        text: `Eintrag ${idx + 1}: publishAt liegt vor deleteAt`
      });
    }

    if (Array.isArray(entry.links)) {
      entry.links.forEach((link, linkIdx) => {
        checks.push({
          ok: !!link.url,
          text: `Eintrag ${idx + 1}, Link ${linkIdx + 1}: url ist gesetzt`
        });
      });
    }
  });

  return checks;
}

function renderValidation(checks) {
  validationList.innerHTML = "";
  checks.forEach((check) => {
    const li = document.createElement("li");
    li.className = check.ok ? "ok" : "err";
    li.textContent = `${check.ok ? "✔" : "✖"} ${check.text}`;
    validationList.append(li);
  });

  if (checks.length === 0) {
    const li = document.createElement("li");
    li.className = "warn";
    li.textContent = "Keine Einträge vorhanden.";
    validationList.append(li);
  }
}

function generateJson() {
  const entries = [...entriesEl.querySelectorAll(".entry")].map(readEntry);
  const checks = validate(entries, typeSelect.value);
  renderValidation(checks);
  outputEl.textContent = JSON.stringify(entries, null, 2);
}

typeSelect.addEventListener("change", () => {
  renderEntries(typeSelect.value);
  generateJson();
});

addEntryBtn.addEventListener("click", () => {
  addEntry();
  generateJson();
});

generateBtn.addEventListener("click", generateJson);

copyBtn.addEventListener("click", async () => {
  if (!outputEl.textContent.trim()) generateJson();
  try {
    await navigator.clipboard.writeText(outputEl.textContent);
    copyBtn.textContent = "Kopiert";
    setTimeout(() => (copyBtn.textContent = "JSON kopieren"), 1500);
  } catch {
    copyBtn.textContent = "Kopieren fehlgeschlagen";
    setTimeout(() => (copyBtn.textContent = "JSON kopieren"), 1500);
  }
});

downloadBtn.addEventListener("click", () => {
  if (!outputEl.textContent.trim()) generateJson();
  const typeKey = typeSelect.value;
  const blob = new Blob([outputEl.textContent], { type: "application/json;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = specs[typeKey].filename;
  a.click();
  URL.revokeObjectURL(a.href);
});

entriesEl.addEventListener("input", () => generateJson());

typeSelect.value = "news";
renderEntries("news");
generateJson();
