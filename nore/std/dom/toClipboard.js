// feross/clipboard-copys
// TODO: add docs & test
export default function toClipboard(text) {
	// use the Async Clipboard API when available
	// Requires a secure browing context (i.e. HTTPS)
	if (navigator.clipboard) {
		return navigator.clipboard.writeText(text);
	}

	// put the text to copy into a <span>
	const span = document.createElement("span");

	// preserve consecutive spaces and newlines
	span.style.whiteSpace = "pre";
	span.textContent = text;

	// add the <span> to the page
	document.body.appendChild(span);

	// selection object representing the range
	// of text selected by the user
	const selection = window.getSelection();
	const range = document.createRange();

	selection.removeAllRanges();
	range.selectNode(span);
	selection.addRange(range);

	let error = null;

	try {
		// copy text to the clipboard
		document.execCommand("copy");
	} catch (err) {
		error = err;
	}

	// cleanup
	selection.removeAllRanges();
	document.body.removeChild(span);

	// the Async Clipboard API returns a promise that may reject with `undefined`
	// so we match that here for consistency.
	return error ? Promise.reject(error) : Promise.resolve();
}
