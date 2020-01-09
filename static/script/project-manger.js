window.ajax = function(options) {
	let xhr = new XMLHttpRequest();
	let method = options.method;
	xhr.onreadystatechange = function() {
		if (4 === xhr.readyState && 200 === xhr.status) {
			options.success(JSON.parse(xhr.responseText));
		}
	};
	xhr.open(method, options.url, true);
	xhr.send();
};

const API_ROOT = "http://localhost:3000/projects";
let taskList = document.getElementById('task-list');


function getItemsData() {
	ajax({
		url: API_ROOT,
    method: "GET", 
		success: function(result) {
			addItems(result);
		}
	});
}

function addItems(task) {
	task.forEach(item => {
		taskList.innerHTML += `<tr>
    <td>${item.name}</td>
    <td><p class='description'>${item.description}</p></td>
    <td>${item.endTime}</td>
    <td>${item.status}</td>
    <td><button class='delete-btn'>删除</button></td>
    </tr>`;
  });
}

getItemsData();
