/**
 * Logika wyceny wydruków 3D.
 * Zaktualizowana wersja: Czas w min/h, rozdzielenie materiałów.
 */

const FINAL_MARGIN_PCT = 40;
const LANG_KEY = "printPricing_lang";

const STRINGS = {
  pl: {
    langLabel: "Język",
    langAria: "Wybór języka interfejsu",
    docTitle: "Wycena wydruków 3D",
    eyebrow: "Kalkulator",
    heroTitle: "Wycena produktów z druku 3D",
    heroLede:
      "Filament, czas pracy maszyny, robocizna, CAD, opakowanie — wypełniasz formularz a cena sama się policzy.",
    btnReset: "Przywróć domyślne",
    btnPrint: "Drukuj / PDF",
    sectionJob: "Zlecenie i druk",
    labelPartName: "Nazwa części",
    labelRevision: "Rewizja",
    labelDate: "Data",
    labelPreparedBy: "Opracował",
    labelMaterial: "Materiał (filament)",
    labelFilamentKg: "Cena filamentu (zł/kg)",
    labelFilamentG: "Zużycie filamentu (g)",
    labelPrintHours: "Czas druku (h / min)",
    labelLaborMin: "Robocizna (min)",
    sectionAdv: "Ustawienia zaawansowane",
    show: "Pokaż",
    hide: "Ukryj",
    advHint:
      "Koszty drukarki, prąd i stratność materiału — do wyliczenia stawki maszyny (zł/h), <code>Zaawansowane</code>.",
    labelMatEff: "Współczynnik strat materiału",
    titleMatEff: "np. 1,1 = 10% zapasu na odpad, retrakcje itd.",
    labelLaborRate: "Stawka robocizny (zł/h)",
    labelPrinterCost: "Koszt drukarki (zł)",
    labelUpfront: "Dodatkowe koszty startowe (zł)",
    labelMaint: "Serwis i utrzymanie (zł/rok)",
    labelLife: "Szacowany okres eksploatacji (lata)",
    labelUptime: "Wykorzystanie roczne (0–1)",
    titleUptime: "Jaka część roku drukarka faktycznie pracuje (udział)",
    labelPower: "Średnia moc (W)",
    labelElec: "Cena energii (zł/kWh)",
    labelBuffer: "Bufor kosztów maszyny",
    titleBuffer: "np. nieprzewidziane koszty, przestoje",
    derivedTitle: "Wyliczona stawka maszyny",
    dtInvestment: "Łączna inwestycja",
    dtLifetime: "Koszt przez cały cykl życia",
    dtUptimeYr: "Czas pracy (h/rok)",
    dtCapital: "Amortyzacja (zł/h)",
    dtElec: "Energia (zł/h)",
    dtPrintRate: "Stawka za czas druku (zł/h)",
    sectionMaterials: "Materiały",
    thName: "Nazwa",
    thQty: "Ilość",
    thUnit: "Cena j. (zł)",
    thTotal: "Razem (zł)",
    totalMaterialsFooter: "Suma materiałów",
    cadTitle: "CAD / modelowanie",
    cadOptional: "(opcjonalnie)",
    cadCheck: "Uwzględnij CAD / modelowanie w koszcie materiałów",
    labelCadLevel: "Poziom trudności",
    cadOpt1: "1 — łatwy",
    cadOpt2: "2 — średni",
    cadOpt3: "3 — trudny",
    cadOpt4: "4 — poprawki",
    labelCadHours: "Czas CAD (h / min)",
    labelCadCharge: "Koszt CAD (zł)",
    cadRatesHint: "Stawki: poziom 1→25, 2→35, 3→50, 4→10 zł/h.",
    subheadHardware: "Dodatkowe części",
    addHw: "+ Dodaj wiersz części",
    sectionPack: "Opakowanie i wysyłka",
    addPack: "+ Dodaj opakowanie",
    labelPostage: "Koszt wysyłki (zł)",
    sectionTotals: "Podsumowanie i ceny",
    dtSumMat: "Materiały (Filament)",
    dtSumLabor: "Robocizna",
    dtSumMachine: "Maszyna (czas druku)",
    dtSumPack: "Opakowanie i wysyłka",
    dtLanded: "Pełny koszt własny",
    marginTitle: "Ostateczna cena",
    marginHint: "Cena bez podatku VAT",
    footer:
      "Wartości przeliczają się na bieżąco. Waluta: zł.",
    lineName: "Nazwa",
    lineQty: "Ilość",
    lineUnit: "Cena j. (zł)",
    lineRemove: "Usuń",
    rowPrinted: "Wydrukowana część",
    rowCad: "Modelowanie 3D / CAD",
    marginPct: "Ostateczna cena",
    hPerYr: "h/rok",
    zlPerH: "zł/h",
    currencySuffix: "zł",
    defaultHw2: "Część 2",
    defaultHw3: "Część 3",
    defaultPack1: "Opakowanie 1",
  },
  en: {
    langLabel: "Language",
    langAria: "Interface language",
    docTitle: "3D print pricing",
    eyebrow: "Estimator",
    heroTitle: "3D printed product pricing",
    heroLede:
      "Filament, machine time, labor, CAD, packaging — same logic as your spreadsheet, clearer layout.",
    btnReset: "Reset to defaults",
    btnPrint: "Print / PDF",
    sectionJob: "Job & print",
    labelPartName: "Part name",
    labelRevision: "Revision",
    labelDate: "Date",
    labelPreparedBy: "Prepared by",
    labelMaterial: "Material (filament)",
    labelFilamentKg: "Filament price (PLN/kg)",
    labelFilamentG: "Filament used (g)",
    labelPrintHours: "Print time (h / min)",
    labelLaborMin: "Labor (min)",
    sectionAdv: "Advanced settings",
    show: "Show",
    hide: "Hide",
    advHint:
      "Printer economics, power use, and material waste factor — used to compute the hourly machine rate (PLN/h), like the <code>Adv. Inputs</code> sheet.",
    labelMatEff: "Material waste factor",
    titleMatEff: "e.g. 1.1 = 10% extra for waste, retractions, etc.",
    labelLaborRate: "Labor rate (PLN/h)",
    labelPrinterCost: "Printer cost (PLN)",
    labelUpfront: "Extra upfront cost (PLN)",
    labelMaint: "Service & maintenance (PLN/yr)",
    labelLife: "Expected service life (years)",
    labelUptime: "Annual utilization (0–1)",
    titleUptime: "Share of the year the printer is actually running",
    labelPower: "Average power (W)",
    labelElec: "Electricity price (PLN/kWh)",
    labelBuffer: "Machine cost buffer",
    titleBuffer: "e.g. unexpected costs, downtime",
    derivedTitle: "Derived machine rate",
    dtInvestment: "Total investment",
    dtLifetime: "Lifetime cost",
    dtUptimeYr: "Run time (h/yr)",
    dtCapital: "Capital cost (PLN/h)",
    dtElec: "Power (PLN/h)",
    dtPrintRate: "Print-time rate (PLN/h)",
    sectionMaterials: "Materials",
    thName: "Name",
    thQty: "Qty",
    thUnit: "Unit (PLN)",
    thTotal: "Total (PLN)",
    totalMaterialsFooter: "Total materials",
    cadTitle: "CAD / modeling",
    cadOptional: "(optional)",
    cadCheck: "Include CAD / modeling in material cost",
    labelCadLevel: "Difficulty",
    cadOpt1: "1 — Easy",
    cadOpt2: "2 — Medium",
    cadOpt3: "3 — Hard",
    cadOpt4: "4 — Revisions",
    labelCadHours: "CAD time (h / min)",
    labelCadCharge: "CAD charge (PLN)",
    cadRatesHint: "Rates match the sheet: level 1→25, 2→35, 3→50, 4→10 PLN/h.",
    subheadHardware: "Extra parts",
    addHw: "+ Add parts row",
    sectionPack: "Packaging & shipping",
    addPack: "+ Add packaging row",
    labelPostage: "Shipping cost (PLN)",
    sectionTotals: "Totals & prices",
    dtSumMat: "Materials (Filament)",
    dtSumLabor: "Labor",
    dtSumMachine: "Machine (print time)",
    dtSumPack: "Packaging & shipping",
    dtLanded: "Total landed cost",
    marginTitle: "Final price",
    marginHint: "Price excluding VAT",
    footer:
      "Values update live. Currency: PLN (zł). Logic matches the Excel workbook.",
    lineName: "Name",
    lineQty: "Qty",
    lineUnit: "Unit (PLN)",
    lineRemove: "Remove",
    rowPrinted: "Printed part",
    rowCad: "3D modeling / CAD",
    marginPct: "Final price",
    hPerYr: "h/yr",
    zlPerH: "PLN/h",
    currencySuffix: "PLN",
    defaultHw2: "Part 2",
    defaultHw3: "Part 3",
    defaultPack1: "Packaging 1",
  },
};

let currentLang = "pl";

const $ = (id) => document.getElementById(id);

function t(key) {
  const pack = STRINGS[currentLang] || STRINGS.pl;
  return pack[key] ?? STRINGS.en[key] ?? key;
}

function moneyLocale() {
  return currentLang === "en" ? "en-US" : "pl-PL";
}

const money = (n) =>
  (Number.isFinite(n) ? n : 0).toLocaleString(moneyLocale(), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function readLang() {
  const s = localStorage.getItem(LANG_KEY);
  return s === "en" ? "en" : "pl";
}

function setLang(lang) {
  if (lang !== "pl" && lang !== "en") return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  applyStaticI18n();
  const hw = collectLineRows($("hardware-rows"));
  const pk = collectLineRows($("pack-rows"));
  renderLineRows($("hardware-rows"), hw, true);
  renderLineRows($("pack-rows"), pk, true);
  syncAdvToggleLabel();
  syncCadUi();
  recalc();
}

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (key) el.innerHTML = t(key);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (key) el.title = t(key);
  });
  const titleEl = document.querySelector("title");
  if (titleEl) titleEl.textContent = t("docTitle");
  $("cadLevel")?.querySelectorAll("option[data-i18n]").forEach((o) => {
    const key = o.getAttribute("data-i18n");
    if (key) o.textContent = t(key);
  });
  document.querySelectorAll(".lang-switch__btn").forEach((b) => {
    const on = b.getAttribute("data-lang") === currentLang;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  const grp = $("lang-switch-group");
  if (grp) grp.setAttribute("aria-label", t("langAria"));
}

function syncAdvToggleLabel() {
  const btn = $("btn-toggle-adv");
  const panel = $("adv-panel");
  if (!btn || !panel) return;
  btn.textContent = panel.classList.contains("hidden") ? t("show") : t("hide");
}

function cadHourlyRate(level) {
  const L = Number(level);
  if (L === 1) return 25;
  if (L === 2) return 35;
  if (L === 4) return 10;
  return 50;
}

function computeMachineRate() {
  const printerCost = +$("printerCost").value || 0;
  const upfront = +$("upfrontExtra").value || 0;
  const maint = +$("maintAnnual").value || 0;
  const life = +$("lifeYrs").value || 1;
  const uptime = +$("uptimePct").value || 0;
  const powerW = +$("powerW").value || 0;
  const elec = +$("elecPerKwh").value || 0;
  const buffer = +$("bufferFactor").value || 1;

  const investment = printerCost + upfront;
  const lifetimeCost = investment + maint * life;
  const uptimeHrPerYr = 8760 * uptime;
  const capitalPerHr =
    uptimeHrPerYr > 0 && life > 0 ? lifetimeCost / (uptimeHrPerYr * life) : 0;
  const elecPerHr = (powerW / 1000) * elec;
  const printRateHr = (capitalPerHr + elecPerHr) * buffer;

  return {
    investment,
    lifetimeCost,
    uptimeHrPerYr,
    capitalPerHr,
    elecPerHr,
    printRateHr,
  };
}

function printedMaterialCost() {
  const g = +$("filamentG").value || 0;
  const perKg = +$("filamentPerKg").value || 0;
  const eff = +$("matEfficiency").value || 1;
  return (g / 1000) * perKg * eff;
}

function cadCharge() {
  // Przeliczanie h + (minuty / 60) dla CAD
  const h = (+$("cadHours").value || 0) + (+$("cadMins").value || 0) / 60;
  const level = +$("cadLevel").value || 1;
  return h * cadHourlyRate(level);
}

function cadIncluded() {
  return $("cadEnabled")?.checked === true;
}

function syncCadUi() {
  const on = cadIncluded();
  const fields = $("cad-fields");
  if (fields) fields.classList.toggle("cad-fields--off", !on);
  const level = $("cadLevel");
  const hours = $("cadHours");
  const mins = $("cadMins");
  const charge = $("cadCharge");
  if (level) level.disabled = !on;
  if (hours) hours.disabled = !on;
  if (mins) mins.disabled = !on;
  if (charge) charge.disabled = !on;
}

function sumLineRows(container) {
  let sum = 0;
  container.querySelectorAll(".line-row").forEach((row) => {
    const q = +row.querySelector(".qty")?.value || 0;
    const u = +row.querySelector(".unit")?.value || 0;
    sum += q * u;
  });
  return sum;
}

function defaultHardwareRows() {
  return [
    { name: t("defaultHw2"), qty: 0, unit: 0 },
    { name: t("defaultHw3"), qty: 0, unit: 0 },
  ];
}

function defaultPackRows() {
  return [{ name: t("defaultPack1"), qty: 0, unit: 0 }];
}

function renderLineRows(container, rows, showRemove) {
  container.innerHTML = "";
  rows.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "line-row";
    const rm = showRemove
      ? `<button type="button" class="remove" data-i="${i}">${escapeAttr(t("lineRemove"))}</button>`
      : "";
    div.innerHTML = `
      <label><span class="line-lbl">${escapeAttr(t("lineName"))}</span> <input type="text" class="name" value="${escapeAttr(r.name)}" /></label>
      <label><span class="line-lbl">${escapeAttr(t("lineQty"))}</span> <input type="number" class="qty" min="0" step="1" value="${r.qty}" /></label>
      <label><span class="line-lbl">${escapeAttr(t("lineUnit"))}</span> <input type="number" class="unit" min="0" step="0.01" value="${r.unit}" /></label>
      ${rm}
    `;
    container.appendChild(div);
  });
  container.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = +btn.dataset.i;
      const all = [...container.querySelectorAll(".line-row")];
      all[idx]?.remove();
      recalc();
    });
  });
  container.querySelectorAll("input").forEach((inp) =>
    inp.addEventListener("input", recalc)
  );
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function collectLineRows(container) {
  return [...container.querySelectorAll(".line-row")].map((row) => ({
    name: row.querySelector(".name")?.value ?? "",
    qty: +row.querySelector(".qty")?.value || 0,
    unit: +row.querySelector(".unit")?.value || 0,
  }));
}

function setDateDefault() {
  const el = $("jobDate");
  if (!el.value) {
    el.value = new Date().toISOString().slice(0, 10);
  }
}

function cur() {
  return t("currencySuffix");
}

function recalc() {
  syncCadUi();
  const m = computeMachineRate();
  const z = cur();
  $("out-investment").textContent = `${money(m.investment)} ${z}`;
  $("out-lifetime").textContent = `${money(m.lifetimeCost)} ${z}`;
  $("out-uptime-hr").textContent = `${money(m.uptimeHrPerYr)} ${t("hPerYr")}`;
  $("out-capital-hr").textContent = `${money(m.capitalPerHr)} ${t("zlPerH")}`;
  $("out-elec-hr").textContent = `${money(m.elecPerHr)} ${t("zlPerH")}`;
  $("out-machine-hr").textContent = `${money(m.printRateHr)} ${t("zlPerH")}`;

  const printed = printedMaterialCost();
  const onCad = cadIncluded();
  const cad = onCad ? cadCharge() : 0;
  if ($("cadCharge")) {
    $("cadCharge").value = onCad ? `${money(cad)} ${z}` : "—";
  }

  const hw = sumLineRows($("hardware-rows"));
  
  // Tabela materiałów na środku strony oblicza już tylko Filament + CAD (bez części)
  const tbody = $("mat-body");
  let matRows = `
    <tr>
      <td>${escapeAttr(t("rowPrinted"))}</td>
      <td class="num">1</td>
      <td class="num">${money(printed)}</td>
      <td class="num">${money(printed)}</td>
    </tr>`;
  if (onCad) {
    matRows += `
    <tr>
      <td>${escapeAttr(t("rowCad"))}</td>
      <td class="num">1</td>
      <td class="num">${money(cad)}</td>
      <td class="num">${money(cad)}</td>
    </tr>`;
  }
  tbody.innerHTML = matRows;
  $("total-materials").textContent = money(printed + cad);

  const laborHr = (+$("laborMin").value || 0) / 60;
  const laborRate = +$("laborRateHr").value || 0;
  const laborCost = laborHr * laborRate;

  // Przeliczanie h + (minuty / 60) dla czasu druku
  const printH = (+$("printHours").value || 0) + (+$("printMins").value || 0) / 60;
  const machineCost = printH * m.printRateHr;

  const packLines = sumLineRows($("pack-rows"));
  const postage = +$("postage").value || 0;
  const packTotal = packLines + postage;

  const qty = Math.max(1, +$("partQty")?.value || 1);
  // Koszty produkcyjne (filament, CAD, robocizna, maszyna) mnożymy przez liczbę sztuk
  const productionCost = (printed + cad + hw + laborCost + machineCost) * qty;
  const landed = productionCost + packTotal;

  // --- LOGIKA PODSUMOWANIA (rozdzielenie wartości) ---
  $("sum-mat").textContent = `${money(printed)} ${z}`; // W linii Materiały jest TYLKO filament

  const dtCad = $("dt-sum-cad");
  const ddCad = $("sum-cad");
  if (dtCad && ddCad) {
    if (onCad) { 
      dtCad.style.display = ""; 
      ddCad.style.display = ""; 
      ddCad.textContent = `${money(cad)} ${z}`; 
    } else {
      dtCad.style.display = "none"; 
      ddCad.style.display = "none";
    }
  }

  // Automatyczne pokazywanie linijki Dodatkowe części
  const dtHw = $("dt-sum-hw");
  const ddHw = $("sum-hw");
  if (dtHw && ddHw) {
    if (hw > 0) { 
      dtHw.style.display = ""; 
      ddHw.style.display = ""; 
      ddHw.textContent = `${money(hw)} ${z}`; 
    } else {
      dtHw.style.display = "none"; 
      ddHw.style.display = "none";
    }
  }

  $("sum-labor").textContent = `${money(laborCost)} ${z}`;
  $("sum-machine").textContent = `${money(machineCost)} ${z}`;
  $("sum-pack").textContent = `${money(packTotal)} ${z}`;
  $("landed").textContent = `${money(landed)} ${z}`;

  const ul = $("margin-list");
  ul.innerHTML = "";
  const price = landed * (1 + FINAL_MARGIN_PCT / 100);
  const li = document.createElement("li");
  li.className = "final-price";
  li.innerHTML = `<span class="pct">${escapeAttr(t("marginPct"))}</span><span>${money(price)} ${z}</span>`;
  ul.appendChild(li);

  try {
    localStorage.setItem(
      "printPricing_v1",
      JSON.stringify({
        partName: $("partName").value,
        revision: $("revision").value,
        partQty: $("partQty").value,
        jobDate: $("jobDate").value,
        preparedBy: $("preparedBy").value,
        materialUsed: $("materialUsed").value,
        filamentPerKg: $("filamentPerKg").value,
        filamentG: $("filamentG").value,
        printHours: $("printHours").value,
        printMins: $("printMins").value,
        laborMin: $("laborMin").value,
        matEfficiency: $("matEfficiency").value,
        laborRateHr: $("laborRateHr").value,
        printerCost: $("printerCost").value,
        upfrontExtra: $("upfrontExtra").value,
        maintAnnual: $("maintAnnual").value,
        lifeYrs: $("lifeYrs").value,
        uptimePct: $("uptimePct").value,
        powerW: $("powerW").value,
        elecPerKwh: $("elecPerKwh").value,
        bufferFactor: $("bufferFactor").value,
        cadEnabled: cadIncluded(),
        cadLevel: $("cadLevel").value,
        cadHours: $("cadHours").value,
        cadMins: $("cadMins").value,
        postage: $("postage").value,
        hardware: collectLineRows($("hardware-rows")),
        packaging: collectLineRows($("pack-rows")),
      })
    );
  } catch (_) {
    /* ignore */
  }
}

function wireInputs() {
  const ids = [
    "partName",
    "revision",
    "partQty",
    "jobDate",
    "preparedBy",
    "materialUsed",
    "filamentPerKg",
    "filamentG",
    "printHours",
    "printMins",
    "laborMin",
    "matEfficiency",
    "laborRateHr",
    "printerCost",
    "upfrontExtra",
    "maintAnnual",
    "lifeYrs",
    "uptimePct",
    "powerW",
    "elecPerKwh",
    "bufferFactor",
    "cadLevel",
    "cadHours",
    "cadMins",
    "postage",
    "cadEnabled",
  ];
  ids.forEach((id) => {
    const el = $(id);
    if (el) el.addEventListener("input", recalc);
    if (el) el.addEventListener("change", recalc);
  });
}

function init() {
  currentLang = readLang();
  document.documentElement.lang = currentLang;

  setDateDefault();
  const raw = localStorage.getItem("printPricing_v1");
  let loaded = false;
  if (raw) {
    try {
      const d = JSON.parse(raw);
      Object.entries({
        partName: d.partName,
        revision: d.revision,
        partQty: d.partQty,
        jobDate: d.jobDate,
        preparedBy: d.preparedBy,
        materialUsed: d.materialUsed,
        filamentPerKg: d.filamentPerKg,
        filamentG: d.filamentG,
        printHours: d.printHours,
        printMins: d.printMins,
        laborMin: d.laborMin,
        matEfficiency: d.matEfficiency,
        laborRateHr: d.laborRateHr,
        printerCost: d.printerCost,
        upfrontExtra: d.upfrontExtra,
        maintAnnual: d.maintAnnual,
        lifeYrs: d.lifeYrs,
        uptimePct: d.uptimePct,
        powerW: d.powerW,
        elecPerKwh: d.elecPerKwh,
        bufferFactor: d.bufferFactor,
        cadLevel: d.cadLevel,
        cadHours: d.cadHours,
        cadMins: d.cadMins,
        postage: d.postage,
      }).forEach(([k, v]) => {
        if (v != null && $(k)) $(k).value = v;
      });
      const ce = $("cadEnabled");
      if (ce) {
        if (d.cadEnabled !== undefined) ce.checked = !!d.cadEnabled;
        else ce.checked = true;
      }
      const hw = Array.isArray(d.hardware) && d.hardware.length ? d.hardware : defaultHardwareRows();
      const pk = Array.isArray(d.packaging) && d.packaging.length ? d.packaging : defaultPackRows();
      renderLineRows($("hardware-rows"), hw, true);
      renderLineRows($("pack-rows"), pk, true);
      loaded = true;
    } catch (_) {
      loaded = false;
    }
  }
  if (!loaded) {
    renderLineRows($("hardware-rows"), defaultHardwareRows(), true);
    renderLineRows($("pack-rows"), defaultPackRows(), true);
  }

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });

  $("btn-toggle-adv").addEventListener("click", () => {
    const p = $("adv-panel");
    const hidden = p.classList.toggle("hidden");
    $("btn-toggle-adv").setAttribute("aria-expanded", String(!hidden));
    syncAdvToggleLabel();
  });

  $("add-hw").addEventListener("click", () => {
    const rows = collectLineRows($("hardware-rows"));
    rows.push({ name: "", qty: 1, unit: 0 });
    renderLineRows($("hardware-rows"), rows, true);
    recalc();
  });

  $("add-pack").addEventListener("click", () => {
    const rows = collectLineRows($("pack-rows"));
    rows.push({ name: "", qty: 1, unit: 0 });
    renderLineRows($("pack-rows"), rows, true);
    recalc();
  });

  $("btn-print").addEventListener("click", () => window.print());

  $("btn-reset").addEventListener("click", () => {
    localStorage.removeItem("printPricing_v1");
    location.reload();
  });

  wireInputs();
  applyStaticI18n();
  syncAdvToggleLabel();
  syncCadUi();
  recalc();
}

init();