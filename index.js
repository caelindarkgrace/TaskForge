/*********************************
 * MENU CONFIG GUIDE
 * Brackets & commas
 *********************************
 * JOB_LIST uses JS object rules.
 * Edit categories & items here.
 *
 * { } wrap the whole object.
 * key: [ ... ] defines a menu.
 *
 * [ ] holds job filenames.
 * Each item ends with a comma,
 * except the final item in the
 * list. Same rule for categories.
 *
 * Add a category:
 *   reports: [ "A.js", "B.js" ],
 *
 * Remove a category:
 *   delete the whole block.
 *
 * Add items:
 *   util: [ "A.js", "B.js" ]
 *
 * Remove items:
 *   delete the filename line.
 *
 * Summary:
 * { } object
 * [ ] list
 * , separates items
 * Last item no comma
 *********************************/

const JOB_LIST = {
  verify: [
    "Verse-Extractor.js",
    "Verse-Replacer.js"
  ],
  util: [
    "Builder.js"
  ],
  test: [
    "test1.js"
  ]
};

/*********************************
 * MENU ENGINE STARTS HERE
 * Do not edit below this line
 *********************************/

/*********************************
 * Back button controls
 *********************************/
function showBackButton() {
  document
    .getElementById(
      "globalBackBtn"
    )
    .style.display =
      "inline-block";
}

function hideBackButton() {
  document
    .getElementById(
      "globalBackBtn"
    )
    .style.display =
      "none";
}

/*********************************
 * Back button listener
 *********************************/
document
  .getElementById(
    "globalBackBtn"
  )
  .addEventListener(
    "click",
    () => {
      returnToMainMenu();
    }
  );

/*********************************
 * Load job via URL param
 *********************************/
function loadJob(scriptName) {
  window.location.href =
    "index.html?job=" +
    scriptName;
}

/*********************************
 * Return to main menu
 *********************************/
function returnToMainMenu() {
  window.location.href =
    "index.html";
}

/*********************************
 * Build main menu
 *********************************/
function buildMainMenu() {
  hideBackButton();

  const menu =
    document.getElementById(
      "menu"
    );
  const header =
    document.querySelector(
      "h1"
    );

  if (header)
    header.style.display =
      "block";

  menu.innerHTML = "";

  Object
    .keys(JOB_LIST)
    .forEach(key => {
      const label =
        key.toUpperCase() +
        " TOOLS";

      menu.appendChild(
        makeButton(
          label,
          () =>
            buildSubmenu(
              key
            )
        )
      );
    });
}

/*********************************
 * Build submenu
 *********************************/
function buildSubmenu(type) {
  const menu =
    document.getElementById(
      "menu"
    );
  menu.innerHTML = "";

  const items =
    JOB_LIST[type];

  const headerDiv =
    document.createElement(
      "div"
    );
  headerDiv.className =
    "submenu-header";
  headerDiv.textContent =
    type.toUpperCase() +
    " TOOLS";

  menu.appendChild(
    headerDiv
  );

  items.forEach(file => {
    const label =
      file.replace(
        ".js",
        ""
      );

    menu.appendChild(
      makeButton(
        label,
        () =>
          loadJob(
            file
          )
      )
    );
  });

  menu.appendChild(
    makeButton(
      "← Back to Main Menu",
      returnToMainMenu
    )
  );
}

/*********************************
 * Button factory
 *********************************/
function makeButton(
  label,
  onClick
) {
  const btn =
    document.createElement(
      "button"
    );

  btn.textContent = label;
  btn.className =
    "menu-btn";
  btn.onclick =
    onClick;

  return btn;
}

/*********************************
 * Start job if ?job= exists
 *********************************/
function startJob(scriptName) {
  const app =
    document.getElementById("app");
  const menu =
    document.getElementById("menu");
  const header =
    document.querySelector("h1");

  app.innerHTML = "";
  menu.innerHTML = "";
  if (header)
    header.style.display = "none";

  showBackButton();

  const s =
    document.createElement("script");

  s.src =
    "JOBS/" + scriptName +
    "?v=" + Date.now();

  s.onerror = () => {
    app.style.textAlign = "center";
    app.innerHTML =
      "<div>Job not found</div>";

    const backBtn =
      document.getElementById(
        "globalBackBtn"
      );

    backBtn.style.display =
      "block";
    backBtn.style.margin =
      "20px auto";
  };

  document.body.appendChild(s);
}

/*********************************
 * Init
 *********************************/
const params =
  new URLSearchParams(
    window.location.search
  );

const job =
  params.get("job");

if (job) {
  startJob(job);
} else {
  buildMainMenu();
}
