(function main () {
	function ReplaceNode(a, b) {
		a.parentNode.appendChild(b);
		a.parentNode.removeChild(a);
	}

	function TranslateButton_SetState() {
		if (this._ntext.parentNode !== null) {
			ReplaceNode(this._ntext, this._otext);
			this.innerText = TRANSLATE_TEXT;
		} else {
			ReplaceNode(this._otext, this._ntext);
			this.innerText = UNDO_TEXT;
		}
	}

	function TranslateButton_Translate() {
		this.onclick = TranslateButton_SetState;
		fetch(TARGET_API + `&tl=${TARGET_LAN}&dt=t&q=${encodeURIComponent(this._otext.innerText)}`)
			.then(response => response.json()).then(json => {
				for (let i = 0; i < json[0].length; i++) this._ntext.innerText += json[0][i][0].replace('\n', ' ');
				this.onclick();
			});
	}

	function ResetTranslateButton(tb) {
		if (tb._ntext.parentNode !== null) ReplaceNode(tb._ntext, tb._otext);

		tb._ntext.innerText = "";
		tb.innerText = TRANSLATE_TEXT;
		tb.onclick = TranslateButton_Translate;
	}

	function TranslateButton(main) {
		let tb = document.createElement("a");
		tb.id = "translate-button";
		tb.style = "margin-left: 5px";
		tb.classList = "yt-simple-endpoint style-scope yt-formatted-string";

		tb._otext = main.querySelector(QS_CONTENT_TEXT);
		tb._otext.addEventListener("DOMSubtreeModified", _ => ResetTranslateButton(tb));

		tb._ntext = document.createElement("div");
		tb._ntext.style.whiteSpace = "pre-wrap";
		tb._ntext.id = "content-text";
		tb._ntext.classList = "style-scope ytd-comment-renderer translate-text yt-formatted-string";

		ResetTranslateButton(tb);
		return tb;
	}

	/* Query Selectors */
	// From main
	const QS_TRANSLATE_BUTTON = "#header>#header-author>yt-formatted-string>#translate-button, #header>#header-author>#published-time-text>#translate-button";
	const QS_CONTENT_TEXT = "#expander>#content>#content-text";
	const QS_BUTTON_CONTAINER = "#header>#header-author>yt-formatted-string, #header>#header-author>#published-time-text";

	/* User settings */
	var TRANSLATE_TEXT = "translate", UNDO_TEXT = "undo", TARGET_API = "target_api", TARGET_LAN = navigator.language || navigator.userLanguage;

	if (typeof(chrome) !== "undefined" && typeof(chrome.storage) != "undefined")
		chrome.storage.sync.get({target_api: TARGET_API, undo_text: UNDO_TEXT}, items => {
			TRANSLATE_TEXT = items.translate_text;
			UNDO_TEXT = items.undo_text;
			TARGET_API = items.target_api;
			inject();
		});
	else
		inject();

	/* Functions */
	// Inject as soon as the comment section was loaded
	function inject () {
		const observerConfig = {childList: true, subtree: true};
		const commentObserver = new MutationObserver(e => {
			for (let mut of e) {
				if (mut.target.id == "contents") {
					for (let n of mut.addedNodes) {
						let main = n.querySelector("#body>#main");
						if (!main) continue;

						let tb = main.querySelector(QS_TRANSLATE_BUTTON);
						if (tb != null) {
							ResetTranslateButton(tb);
						} else {
							main.querySelector(QS_BUTTON_CONTAINER).appendChild(TranslateButton(main));
						}
					}
				}
			}
		});

		commentObserver.observe(document, observerConfig);
	}
})();