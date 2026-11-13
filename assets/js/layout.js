/* ZENORA 26 | layout.js : shared header and footer. Edit NAV to add pages as they are built. */
(function () {
  const NAV = [
    ["events.html", "Events"]
    // Add as pages are built:
    // ["schedule.html", "Schedule"], ["results.html", "Results"], ["about-college.html", "College"],
    // ["about-department.html", "Department"], ["about-association.html", "Association"], ["contact.html", "Contact"]
  ];
  const here = location.pathname.split("/").pop() || "index.html";
  const loggedIn = !!localStorage.getItem("zenora_token");
  const links = () => NAV.map(([h, l]) => `<a href="${h}"${h === here ? ' aria-current="page"' : ""}>${l}</a>`).join("");

  const header = `
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap header-row">
      <a href="index.html" class="brand" aria-label="ZENORA 26 home"><span class="brand-name">ZENORA</span><span class="brand-year">26</span></a>
      <nav class="nav-desktop" aria-label="Main">${links()}</nav>
      <div class="header-actions">
        ${loggedIn
          ? `<a href="dashboard.html" class="link-quiet">My dashboard</a><button class="link-quiet" id="logout">Log out</button>`
          : `<a href="login.html" class="link-quiet">Log in</a><a href="register.html" class="btn btn-amber btn-sm">Register</a>`}
      </div>
    </div>
    <details class="nav-mobile"><summary>Menu</summary><nav aria-label="Main mobile">${links()}</nav></details>
  </header>`;

  const footer = `
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <p class="footer-brand">ZENORA 26</p>
        <p class="footer-line">Where every species has a place.</p>
        <p class="footer-small">Organised by the PG &amp; Research Department of Advanced Zoology and Biotechnology with the Zoologist Association of Loyola College, Loyola College (Autonomous), Sterling Road, Nungambakkam, Chennai 600 034.</p>
      </div>
      <nav class="footer-links" aria-label="Footer">${links()}<a href="https://www.loyolacollege.edu" target="_blank" rel="noopener noreferrer">Loyola College</a><a href="admin.html">Staff login</a></nav>
    </div>
    <div class="wrap footer-credit">Designed and developed by the Media and Digital Innovation Team, AZ-BT, Loyola College.</div>
  </footer>`;

  document.getElementById("site-header").innerHTML = header;
  document.getElementById("site-footer").innerHTML = footer;
  const out = document.getElementById("logout");
  if (out) out.addEventListener("click", () => Z.logout());
})();
