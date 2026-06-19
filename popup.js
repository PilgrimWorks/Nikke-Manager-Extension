const fetchBtn = document.getElementById("fetchBtn");
const downloadBtn = document.getElementById("downloadBtn");
const loginBtn = document.getElementById("loginBtn");
const statusEl = document.getElementById("status");
const metaEl = document.getElementById("meta");

const KEYS = ["status", "statusDetail", "lastFetched", "nikkeCount", "nikkeEquips"];

function render({ status, statusDetail, lastFetched, nikkeCount, nikkeEquips }) {
    const notLoggedIn = status === "error" && statusDetail === "not_logged_in";

    statusEl.className = "status " + (status || "");
    statusEl.textContent = notLoggedIn
        ? "Not logged in to blablalink.com"
        : statusDetail || (status === "done" ? "Done" : "Ready");

    fetchBtn.disabled = status === "fetching";
    downloadBtn.disabled = !nikkeEquips;
    loginBtn.style.display = notLoggedIn ? "block" : "none";

    metaEl.textContent =
        lastFetched && nikkeCount ? `${nikkeCount} nikkes - ${new Date(lastFetched).toLocaleString()}` : "";
}

chrome.storage.local.get(KEYS, render);

chrome.storage.onChanged.addListener(() => chrome.storage.local.get(KEYS, render));

fetchBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "FETCH" });
});

downloadBtn.addEventListener("click", () => {
    chrome.storage.local.get("nikkeEquips", ({ nikkeEquips }) => {
        if (!nikkeEquips) return;
        const blob = new Blob([JSON.stringify(nikkeEquips, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement("a"), { href: url, download: "nikke-equips.json" });
        a.click();
        URL.revokeObjectURL(url);
    });
});

loginBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: "https://www.blablalink.com/login" });
});
