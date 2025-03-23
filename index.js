function loadScript(file) {
    const newScript = document.createElement("script");
    newScript.setAttribute("src", file);
    newScript.setAttribute("type", "text/javascript");
    newScript.setAttribute("async", "true");

    newScript.onload = () => console.log(`${file} loaded successfully.`);
    newScript.onerror = () => console.error(`Error loading script: ${file}`);

    document.head.appendChild(newScript);
}
const urlParams = new URLSearchParams(window.location.search);
const script = urlParams.get("script");
if (script === null) {
    loadScript("tostatic.js");
} else {
    loadScript(script);
}
