let uncheckedTaskClass = "list-group-item d-flex justify-content-between align-items-center";
let checkedTaskClass = "list-group-item list-group-item-secondary d-flex justify-content-between align-items-center"

let emptyButton = '<i class="fa fa-arrow-up fa-blank"></i>';
let upButton = '<i class="fas fa-arrow-up"></i>';
let downButton = '<i class="fas fa-arrow-down"></i>';

let generateListObject = function(taskName, taskClass = uncheckedTaskClass, id = new Date().getTime().toString()) {

    let newTask = document.createElement("li");
    
    let name = document.createElement("p");
    name.setAttribute("style", "margin:0px");
    name.innerText = taskName;

    let buttonGroup = document.createElement("span");
    
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("name", "check");
    checkBox.setAttribute("style", "margin-right:1px; margin-top:1px; zoom:2.5")
    checkBox.setAttribute("class", "btn btn-light");
    checkBox.setAttribute("onclick", `toggleTask(${id})`);
    if(taskClass == checkedTaskClass) {
        checkBox.checked = true;
    }

    let upward = document.createElement("button");
    upward.innerHTML = upButton;
    upward.setAttribute("onclick", `moveUpwards(${id})`);
    upward.setAttribute("class", "btn btn-light");

    let downward = document.createElement("button");
    downward.innerHTML = downButton;
    downward.setAttribute("onclick", `moveDownwards(${id})`);
    downward.setAttribute("class", "btn btn-light");

    let remove = document.createElement("button");
    remove.innerHTML = '<i class="far fa-trash-alt"></i>';
    remove.setAttribute("onclick", `removeTask(${id})`);
    remove.setAttribute("class", "btn btn-light");

    buttonGroup.appendChild(checkBox);
    buttonGroup.appendChild(upward);
    buttonGroup.appendChild(downward);
    buttonGroup.appendChild(remove);
    
    newTask.appendChild(name);
    newTask.appendChild(buttonGroup);

    newTask.setAttribute("class", taskClass);
    newTask.setAttribute("id", id);
    return newTask;
}

let addNewTask = function() {
    let list = document.getElementById("task-list");
    let taskName = document.getElementById("task-name");
    if(taskName.value == "") {
        window.alert("Task name cannot be empty");
    }
    else {
        list.appendChild(generateListObject(taskName.value));
        boundaryCheck();
        taskName.value = "";
    }
}

let toggleTask = function(id) {
    if(document.getElementById(id).childNodes[1].childNodes[0].checked) {
        completeTask(id);
    }
    else {
        resetTask(id);
    }
}

let completeTask = function(id) {
    let task = document.getElementById(id);
    task.setAttribute("class", checkedTaskClass);
}

let resetTask = function(id) {
    let task = document.getElementById(id);
    task.setAttribute("class", uncheckedTaskClass);
}

let moveUpwards = function(id) {
    let thisNode = document.getElementById(id);
    let prevNode = thisNode.previousSibling;
    thisNode.parentNode.insertBefore(thisNode, prevNode);
    boundaryCheck();
}

let moveDownwards = function(id) {
    let thisNode = document.getElementById(id);
    let nextNode = thisNode.nextSibling;
    nextNode.parentNode.insertBefore(nextNode, thisNode);
    boundaryCheck();
}

let removeTask = function(id) {
    let thisNode = document.getElementById(id);
    thisNode.parentNode.removeChild(thisNode);
    boundaryCheck();
}

let boundaryCheck = function() {
    let list = document.getElementById("task-list");
    if(list != undefined && list.children.length != 0) {
        list.children[0].children[1].children[1].innerHTML = emptyButton;
        list.children[0].children[1].children[1].disabled = true;
    
        let last = list.children.length - 1;
        list.children[last].children[1].children[2].innerHTML = emptyButton;
        list.children[last].children[1].children[2].disabled = true;
    
        if (last > 0) {
            list.children[1].children[1].children[1].innerHTML = upButton;
            list.children[1].children[1].children[1].disabled = false;
    
            list.children[last-1].children[1].children[2].innerHTML = downButton;
            list.children[last-1].children[1].children[2].disabled = false;
        }
    }
}

let deleteCompleted = function() {
    let list = document.getElementById("task-list");
    if(list != undefined) {
        let removeList = [];
        for(let element of list.children) {
            if(element.getAttribute("class") == checkedTaskClass)
                removeList.push(element);
        }
        for(let remove of removeList) {
            list.removeChild(remove);
        }
        boundaryCheck();
    }
}

let sortTasks = function() {
    let list = document.getElementById("task-list");    
    if(list != undefined) {
        let checked = [];
        let unchecked = [];

        for(let task of list.children) {
            let name = task.children[0].innerText;
            let id = task.getAttribute("id");

            if(task.getAttribute("class") == checkedTaskClass)
                checked.push(generateListObject(name, checkedTaskClass, id));
            else
                unchecked.push(generateListObject(name, uncheckedTaskClass, id));
        }
        list.innerText = "";
        for(let task of unchecked) {
            list.appendChild(task);
        }
        for(let task of checked) {
            list.appendChild(task);        
        }
        boundaryCheck();
    }
}