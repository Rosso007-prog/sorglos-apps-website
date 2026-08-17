const assert = require("node:assert/strict");

function deriveState(config) {
  const published = config.petitionStatus === "published";
  const official = typeof config.officialPetitionUrl === "string"
    && /^https:\/\/epetitionen\.bundestag\.de\//.test(config.officialPetitionUrl);
  return {
    signingLink: published && official ? config.officialPetitionUrl : null,
    signaturesVisible: published && Boolean(config.lastVerifiedAt) && config.currentSignatures !== null,
    deadlineVisible: published && Boolean(config.lastVerifiedAt) && Boolean(config.petitionDeadline)
  };
}

const base = { petitionStatus: "pending", officialPetitionUrl: null, currentSignatures: null, petitionDeadline: null, lastVerifiedAt: "2026-08-17" };
assert.equal(deriveState(base).signingLink, null, "pending ohne URL");
assert.equal(deriveState({ ...base, officialPetitionUrl: "https://epetitionen.bundestag.de/example" }).signingLink, null, "pending trotz URL");
assert.equal(deriveState({ ...base, petitionStatus: "published", officialPetitionUrl: "https://epetitionen.bundestag.de/example" }).signingLink, "https://epetitionen.bundestag.de/example", "published mit offizieller URL");
assert.equal(deriveState({ ...base, petitionStatus: "published" }).signingLink, null, "published ohne URL");
assert.equal(deriveState(base).signaturesVisible, false, "keine erfundene Signaturzahl");
assert.equal(deriveState(base).deadlineVisible, false, "keine erfundene Frist");
console.log("Petitions-Zustandstests: 6/6 erfolgreich");
