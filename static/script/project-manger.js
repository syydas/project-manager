const API_ROOT = "http://localhost:3000/projects";
let taskList = document.getElementById("task-list");
let countStr = document.getElementsByClassName("card-count");
let percentageStr = document.getElementsByClassName("card-percentage");

function getItemsData() {
	let options = {
		url: API_ROOT,
		method: "GET",
		success: function(result) {
			addItems(result);
		}
	};
	ajax(options);
}

function addItems(task) {
	task.forEach(item => {
		const taskStatus = statusChange(item.status);
		taskList.innerHTML += `<tr id='${item.id}'>
    <td>${item.name}</td>
    <td><p class='description'>${item.description}</p></td>
    <td>${item.endTime}</td>
    <td class='${taskStatus}'>${item.status}</td>
    <td><button class='delete-btn' onclick='popUps(${item.id})'>删除</button></td>
    </tr>`;
	});
	calculateTasksPercentage();
}

function statusChange(status) {
	let allTasks = Number(countStr[0].innerHTML);
	let activeTasks = Number(countStr[1].innerHTML);
	let pendingTasks = Number(countStr[2].innerHTML);
	let closedTasks = Number(countStr[3].innerHTML);
	countStr[0].innerHTML = allTasks + 1;
	switch (status) {
		case "ACTIVE":
			countStr[1].innerHTML = activeTasks + 1;
			return "active-task";
		case "PENDING":
			countStr[2].innerHTML = pendingTasks + 1;
			return "pending-task";
		case "CLOSED":
			countStr[3].innerHTML = closedTasks + 1;
			return "closed-task";
		default:
			break;
	}
}

function calculateTasksPercentage() {
	for (let i = 1; i < countStr.length; i++) {
		let percentage = Math.round(
			Number(countStr[i].innerHTML / countStr[0].innerHTML) * 100
		);
		percentageStr[i - 1].innerHTML = percentage + "%";
	}
}

function popUps(id) {
	let confirmPage = document.getElementsByClassName("confirm-page")[0];
	confirmPage.style.display = "block";
	confirmPage.addEventListener("click", function(event) {
		let operate = event.target;
		let name = operate.className;
		switch (name) {
			case "cancel-btn":
				confirmPage.style.display = "none";
				break;
			case "iconfont icon-guanbi":
				confirmPage.style.display = "none";
				break;
			case "confirm-btn":
				deleteItemsData(id);
				confirmPage.style.display = "none";
				break;
			default:
				break;
		}
	});
}

function deleteItemsData(id) {
	let options = {
		url: API_ROOT + "/" + id,
		method: "DELETE",
		success: function() {
			deleteItems(id);
		}
	};
	ajax(options);
}

function deleteItems(id) {
	let allTasks = document.getElementById("task-list");
	let removeTask = document.getElementById(id);
	let status = removeTask.children[3].innerHTML;
	allTasks.removeChild(removeTask);
	deleteTaskNum(status);
	calculateTasksPercentage();
}

function deleteTaskNum(status) {
	countStr[0].innerHTML = Number(countStr[0].innerHTML) - 1;
	switch (status) {
		case "ACTIVE":
			countStr[1].innerHTML = Number(countStr[1].innerHTML) - 1;
			break;
		case "PENDING":
			countStr[2].innerHTML = Number(countStr[2].innerHTML) - 1;
			break;
		case "CLOSED":
			countStr[3].innerHTML = Number(countStr[3].innerHTML) - 1;
			break;
		default:
			break;
	}
}

getItemsData();
