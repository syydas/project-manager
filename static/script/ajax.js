window.ajax = function(options) {
	const option = {
		url: options.url || "",
		method: options.method || "GET",
		header: options.header || "",
		data: options.data || null,
		success: options.success || function(result) {},
		fail: options.fail || function(result) {}
	};

	let xhr = new XMLHttpRequest();

	if ("POST" === option.method || "PUT" === option.method) {
		xhr.setRequestHeader = ("content-type", "application/json");
		option.data = JSON.stringify(option.data);
	}

	xhr.onload = () => option.success(JSON.parse(xhr.responseText));
	xhr.onerror = () => option.fail(xhr.status);
	xhr.open(option.method, option.url, true);
	xhr.send(option.data);
};
