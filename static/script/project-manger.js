const API_ROOT = "http://localhost:3000/projects";
let taskList = document.getElementById("task-list");
let countStr = document.getElementsByClassName("card-count");
let percentageStr = document.getElementsByClassName("card-percentage");

getItemsData();
function getItemsData() {
  let option = {
		url: API_ROOT,
		method: "GET",
		success: function(result) {
			addItems(result);
			calculateTasksPercentage();
		}
	};
	ajax(option);
}

function addItems(task) {
	task.forEach(item => {
		const taskStatus = statusColor(item.status);
		taskList.innerHTML += `<tr>
    <td>${item.name}</td>
    <td><p class='description'>${item.description}</p></td>
    <td>${item.endTime}</td>
    <td class='${taskStatus}'>${item.status}</td>
    <td><button class='delete-btn' onclick='popUps(${item.id})'>删除</button></td>
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
		let percentage =
			Number(countStr[i].innerHTML / countStr[0].innerHTML) * 100;
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
	ajax({
		url: API_ROOT,
		method: "POST",
		data: { id: id },
		dataType: "JSON",
		success: function(data) {
			deleteItems(data);
			//calculateTasksPercentage();
		}
	});
}

function deleteItems(task) {}
