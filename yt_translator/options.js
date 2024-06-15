let translate_text = document.getElementById("translate_text");
let undo_text = document.getElementById("undo_text");
let target_api = document.getElementById("other_api");


function save()
{
	console.log(target_api)
	chrome.storage.sync.set({translate_text: translate_text.value,
	                              undo_text: undo_text.value,
                                  target_api:target_api.value}, () => {});
}

function load()
{
	chrome.storage.sync.get({translate_text: "translate",
	                              undo_text: "undo",
                                  target_api:"target_api"},
                             items => {
		translate_text.value = items.translate_text;
		undo_text.value = items.undo_text;
		target_api.value = items.target_api;
	});
}

document.addEventListener("DOMContentLoaded", load);
document.getElementById("save").addEventListener("click", save)