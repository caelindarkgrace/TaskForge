/*******************************
 * jobName.js
 * Short job summary here
 * All comments <=33 chars
 *******************************/

const app = document.getElementById("app");

/*******************************
 * CONFIG
 * skipHeader=true removes line0
 * skipHeader=false keeps all
 *******************************/
const skipHeader = false;

/*******************************
 * UI
 *******************************/
app.innerHTML = `
  <h2>Job Title</h2>

  <input id="fileA" type="file" accept=".txt">

  <button id="runBtn">Run</button>

  <div id="out"></div>
`;

/*******************************
 * loadLines()
 * Uses loadTextFile()
 * Supports File or URL
 * Applies header skip
 *******************************/
async function loadLines(input) {

  const text = await loadTextFile(input);

  const lines = text.split(/\r?\n/);

  if (skipHeader) {
    return lines.slice(1);
  }

  return lines;
}

/*******************************
 * Main
 *******************************/
document.getElementById("runBtn")
.addEventListener("click", async () => {

  const file =
    document.getElementById("fileA").files[0];

  if (!file) return;

  const lines = await loadLines(file);

  document.getElementById("out").textContent =
    "Done";
});
