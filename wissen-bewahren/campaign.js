(function () {
  "use strict";
  const config = window.PETITION_CONFIG;
  if (!config || !["pending", "published"].includes(config.petitionStatus)) { console.error("Ungültige Petitionskonfiguration."); return; }
  const isPublished = config.petitionStatus === "published";
  const hasOfficialUrl = typeof config.officialPetitionUrl === "string" && /^https:\/\/epetitionen\.bundestag\.de\//.test(config.officialPetitionUrl);
  const canSign = isPublished && hasOfficialUrl;
  if (isPublished && !hasOfficialUrl) console.error("Published-Modus benötigt eine verifizierte offizielle Bundestags-URL.");

  document.querySelectorAll("[data-petition-id]").forEach((node) => { node.textContent = config.petitionId; });
  document.querySelectorAll("[data-petition-status]").forEach((node) => { node.textContent = isPublished ? (canSign ? "Mitzeichnung geöffnet" : "Konfigurationsfehler – Mitzeichnung nicht verfügbar") : "Veröffentlichung wird geprüft"; });
  document.querySelectorAll("[data-petition-type]").forEach((node) => { node.textContent = isPublished ? "Öffentliche Petition beim Deutschen Bundestag" : "Beim Deutschen Bundestag eingereicht"; });
  document.querySelectorAll("[data-pending-only]").forEach((node) => { node.hidden = isPublished; });

  document.querySelectorAll("[data-petition-cta]").forEach((link) => {
    if (canSign) {
      link.textContent = "Jetzt beim Deutschen Bundestag mitzeichnen ↗";
      link.href = config.officialPetitionUrl; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled"); link.classList.remove("is-disabled");
    } else {
      link.textContent = isPublished ? "Mitzeichnung derzeit nicht verfügbar" : "Warum diese Petition?";
      link.href = isPublished ? "#status" : "#worum-geht-es"; link.removeAttribute("target"); link.removeAttribute("rel");
      link.removeAttribute("aria-disabled"); link.classList.toggle("is-disabled", isPublished);
    }
  });

  const officialLink = document.querySelector("[data-official-link]");
  if (officialLink && canSign) { officialLink.href = config.officialPetitionUrl; officialLink.textContent = "Offizielle Petitionsseite beim Deutschen Bundestag ↗"; officialLink.hidden = false; }
  const metrics = document.querySelector("[data-petition-metrics]");
  if (metrics && isPublished && config.lastVerifiedAt && (config.currentSignatures !== null || config.petitionDeadline)) {
    if (config.currentSignatures !== null) metrics.insertAdjacentHTML("beforeend", `<span><strong>${Number(config.currentSignatures).toLocaleString("de-DE")}</strong> verifizierte Mitzeichnungen</span>`);
    if (config.petitionDeadline) metrics.insertAdjacentHTML("beforeend", `<span><strong>Mitzeichnungsfrist:</strong> ${new Date(config.petitionDeadline + "T12:00:00").toLocaleDateString("de-DE")}</span>`);
    metrics.hidden = false;
  }

  const shareButton = document.querySelector("[data-share]");
  const copyButton = document.querySelector("[data-copy]");
  const shareStatus = document.querySelector("[data-share-status]");
  const pendingText = `Ein KI-Modell ist kein Archiv. Petition ${config.petitionId} wurde beim Deutschen Bundestag eingereicht und wird derzeit zur Veröffentlichung geprüft. Wissen und Kulturerbe sollen bei destruktiver Massendigitalisierung nicht verloren gehen.`;
  const publishedText = `Ein KI-Modell ist kein Archiv. Unterstütze Petition ${config.petitionId} für Wissenserhaltung und verantwortungsvolle Digitalisierung. Alle Informationen und der offizielle Mitzeichnungslink: ${config.campaignUrl}`;
  const shareText = isPublished ? publishedText : pendingText;
  async function copyCampaign() {
    const copyText = `${shareText} ${config.campaignUrl}`;
    try { await navigator.clipboard.writeText(copyText); shareStatus.textContent = "Kampagnenlink und Text wurden kopiert."; }
    catch (_) { window.prompt("Diesen Text kopieren:", copyText); }
  }
  if (shareButton && navigator.share) { shareButton.hidden = false; shareButton.addEventListener("click", async () => { try { await navigator.share({ title: document.title, text: shareText, url: config.campaignUrl }); } catch (error) { if (error.name !== "AbortError") copyCampaign(); } }); }
  if (copyButton) copyButton.addEventListener("click", copyCampaign);
})();
