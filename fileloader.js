/*********************************
 * fileloader.js
 * File + URL text loader
 *********************************/

/* Load text from File or URL */
function loadTextFile(input) {
  return new Promise((resolve, reject) => {

    /* Handle File object */
    if (input instanceof File) {
      const reader = new FileReader();
      reader.onload = e =>
        resolve(e.target.result);
      reader.onerror = e =>
        reject(e);
      reader.readAsText(input);
      return;
    }

    /* Handle URL string */
    fetch(input)
      .then(r => r.text())
      .then(resolve)
      .catch(reject);
  });
}

/*********************************
 * File info helpers
 *********************************/

/* Count selected files */
function countFiles(list) {
  return list ? list.length : 0;
}

/* Get file names array */
function getFileNames(list) {
  if (!list) return [];
  return Array.from(list)
    .map(f => f.name);
}

/* Format file info text */
function fileInfoText(list) {
  const n = countFiles(list);
  if (n === 0) return "No files";
  if (n === 1) return "1 file: " +
    list[0].name;
  return n + " files selected";
}
