var stars = {};

var storedTask = [];

var priorityGlobal = 1;


stars[0] = document.getElementById("star1");
stars[1] = document.getElementById("star2");
stars[2] = document.getElementById("star3");
stars[3] = document.getElementById("star4");
stars[4] = document.getElementById("star5");

stars[0].addEventListener("mouseover", function(){fillStarCrateTask(1)});
stars[1].addEventListener("mouseover", function(){fillStarCrateTask(2)});
stars[2].addEventListener("mouseover", function(){fillStarCrateTask(3)});
stars[3].addEventListener("mouseover", function(){fillStarCrateTask(4)});
stars[4].addEventListener("mouseover", function(){fillStarCrateTask(5)});

//when the users click the button
document.getElementById("btn_add").addEventListener("click", function(){

    var task = {
        name: document.getElementById("input_task").value,
        description: document.getElementById("input_description").value,
        workTime: document.getElementById("input_work_time").value,
        longBreak: document.getElementById("input_long_break").value,
        shortBreak: document.getElementById("input_short_break").valu,
        priority: priorityGlobal
    };
    
    addToList(task);
});

function fillStarCrateTask(pos){
    //store the priority
    priorityGlobal = pos;
    for(var i = 0; i < pos; i++){
        stars[i].style.color = "rgb(255, 239, 12)";
    }

    for(var i = pos; i < 5; i++){
        stars[i].style.color = "rgb(212, 212, 212)";
    }
}

//Store the new task
function addToList(newTask){
    addItemToDOM(newTask);
    console.log(storedTask);
}

function addItemToDOM(newTask){
    //get the list
    var list = document.getElementById('listTask');

    //Create un item for the list
    var item = document.createElement('li');

    //Global div
    var divItems = document.createElement('div');
    divItems.classList.add('items');

    var divItemTask = document.createElement('div');
    divItemTask.classList.add('itemTask');

    var task = document.createElement('h4');
    task.innerText = "Task";

    

    var nameTask = document.createElement('h3');
    nameTask.innerText = newTask.name;

    //Adding the elements to the div
    divItemTask.appendChild(task);
    divItemTask.appendChild(nameTask);
    
    //this is the div for the description
    var divDesc = document.createElement('div');
    divDesc.classList.add('itemDescription');

    var descriptionTitle = document.createElement('h4');
    descriptionTitle.innerText = "Description"

    var description = document.createElement('h3');
    description.innerText = newTask.description;

    //Adding the elements to the div
    divDesc.appendChild(descriptionTitle);
    divDesc.appendChild(description);

    //Div for the rating bar
    var divRating = document.createElement('div');
    divRating.classList.add("ratingBar");

    

    //add the checked stars
    for(var i = 0; i < newTask.priority; i++){
        var starChecked = document.createElement('i');
        starChecked.classList.add("fa", "fa-star", "checked");
        divRating.appendChild(starChecked);
    }

    //add the unchecked stars
    for(var i = newTask.priority; i < 5; i++){
        var starUnChecked = document.createElement('i');
        starUnChecked.classList.add("fa", "fa-star", "nochecked");
        divRating.appendChild(starUnChecked);
    }   
    
    //Div fot the buttons
    var divButtons = document.createElement('div');
    divButtons.classList.add("buttons");

    var btn_play = document.createElement('button');
    var icon_play = document.createElement('i');
    icon_play.classList.add("material-icons");
    icon_play.innerText = "play_arrow";
    btn_play.appendChild(icon_play);

    var btn_remove = document.createElement('button');
    var icon_remove = document.createElement('i');
    icon_remove.classList.add("material-icons");
    icon_remove.innerText = "remove";
    btn_remove.appendChild(icon_remove);

    divButtons.appendChild(btn_play);
    divButtons.appendChild(btn_remove);

    //add all the div to the global div
    divItems.appendChild(divItemTask);
    divItems.appendChild(divDesc);
    divItems.appendChild(divRating);
    divItems.appendChild(divButtons);

    //add everthing to the item
    item.appendChild(divItems);

    //get the position where the item must be stored
    var pos = getPositionTask(newTask.priority);
    
    //splice allows us to add items at specific
    //index
    storedTask.splice(pos, 0, newTask);

    list.insertBefore(item, list.childNodes[pos]);
}

function getPositionTask(priority){    
    var pos = 0;
    //iterate through the list
    for(var i = storedTask.length - 1; i >= 0; i--){
        debugger;
        if(storedTask[i].priority < priority){
            pos = i;
            break;
        }
    }
    return pos;
}