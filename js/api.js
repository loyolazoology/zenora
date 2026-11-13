/* ZENORA 26 | api.js : talks to the Apps Script backend. */
(function () {
  const TOKEN_KEY = "zenora_token";
  const Z = {
    token: () => localStorage.getItem(TOKEN_KEY) || "",
    setToken: (t) => localStorage.setItem(TOKEN_KEY, t),
    logout() { localStorage.removeItem(TOKEN_KEY); location.href = "index.html"; },

    async api(action, data = {}, withToken = false) {
      const url = window.ZENORA_CONFIG.API_URL;
      if (!url || url.startsWith("PASTE")) throw new Error("The website is not connected to the server yet (see config.js).");
      let res;
      try {
        // text/plain avoids a browser pre-flight request, which Apps Script cannot answer.
        res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ action, data, token: withToken ? Z.token() : "" })
        });
      } catch (e) {
        throw new Error("Cannot reach the server. Please check your internet connection and try again.");
      }
      let json;
      try { json = await res.json(); } catch (e) { throw new Error("The server sent an unexpected reply. Please try again."); }
      if (!json.ok) {
        const err = new Error(json.error || "Something went wrong.");
        err.code = json.code || "";
        if (err.code === "AUTH") localStorage.removeItem(TOKEN_KEY);
        throw err;
      }
      return json.data;
    },

    esc: (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
    fmtDate(iso, opts = { day: "numeric", month: "long", year: "numeric" }) {
      if (!iso) return "";
      return new Date(iso + "T00:00:00+05:30").toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", ...opts });
    },
    daysUntil(iso) {
      if (!iso) return null;
      const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
      return Math.round((new Date(iso + "T00:00:00+05:30") - new Date(today + "T00:00:00+05:30")) / 864e5);
    },
    show(el, kind, msg) {
      el.className = "alert alert-" + kind;
      el.textContent = msg;
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    requireLogin() {
      if (!Z.token()) { location.href = "login.html?next=" + encodeURIComponent(location.pathname.split("/").pop()); return false; }
      return true;
    }
  };
  window.Z = Z;
})();
