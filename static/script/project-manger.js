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
let taskList = document.getElementById("task-list");
let countStr = document.getElementsByClassName("card-count");
let percentageStr = document.getElementsByClassName("card-percentage");

function getItemsData() {
	ajax({
		url: API_ROOT,
		method: "GET",
		success: function(result) {
			addItems(result);
			calculateTasksPercentage();
		}
	});
}

function addItems(task) {
	task.forEach(item => {
		const taskStatus = statusColor(item.status);
		taskList.innerHTML += `<tr>
    <td>${item.name}</td>
    <td><p class='description'>${item.description}</p></td>
    <td>${item.endTime}</td>
    <td class='${taskStatus}'>${item.status}</td>
    <td><button class='delete-btn'>删除</button></td>
    </tr>`;
	});
}

function statusColor(status) {
	countStr[0].innerHTML = Number(countStr[0].innerHTML) + 1;
	switch (status) {
		case "ACTIVE":
      countStr[1].innerHTML = Number(countStr[1].innerHTML) + 1;
			return "active-task";
		case "PENDING":
      countStr[2].innerHTML = Number(countStr[2].innerHTML) + 1;
			return "pending-task";
		case "CLOSED":
      countStr[3].innerHTML = Number(countStr[3].innerHTML) + 1;
			return "closed-task";
		default:
			break;
	}
}


function calculateTasksPercentage() {
	for (let i = 1; i < countStr.length; i++) {
		let percentage = Math.round(
			(Number(countStr[i].innerHTML) * 100) / Number(countStr[0].innerHTML)
		);
		percentageStr[i - 1].innerHTML = percentage + "%";
	}
}

getItemsData();
