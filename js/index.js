var toDo = document.getElementById("toDo");
var doing = document.getElementById("doing");
var done = document.getElementById("done");

var title = document.getElementById("title");
var description = document.getElementById("description");
var addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", async ()=>{
    let task = {
        title: title.value,
        description: description.value
    };
    
    let json = JSON.stringify(task);

    let response = await fetch("https://foltrestfirstapp.herokuapp.com/api/task/create", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: json
    });
    if(response.ok){
        let data = await response.json();
        console.log(data);
        title.value = "";
        description.value = "";
        getAllTasks();
    }

});

const getAllTasks = async () => {
    let response = await fetch("https://foltrestfirstapp.herokuapp.com/api/task/all")
    let data = await response.json();
    toDo.innerHTML = "";
    doing.innerHTML = "";
    done.innerHTML = "";
    for(let i in data){
        let task = data[i];
        let taskView = new Task(task);
        if(task.type === "TO DO"){
            taskView.render(toDo);
        }
        else if(task.type === "DOING"){
            taskView.render(doing);
        }
        else if(task.type === "DONE"){
            taskView.render(done);
        }
    }
}

const updateTaskDragged = async (id, destiny) =>{
    console.log("Si abres la consola, verás que necesitas agarrar y soltar dos veces.");
    console.log("Eso es un bug!")
    let response = await fetch("https://foltrestfirstapp.herokuapp.com/api/task/all")
    let data = await response.json();
    for(let i in data){
        let task = data[i];
        if(task.id == id){
            task.type = destiny;
            let json = JSON.stringify(task);
            let response = await fetch("https://foltrestfirstapp.herokuapp.com/api/task/edit", {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: json
            });
            if(response.ok){
                let data = await response.json();
                console.log(data);
                getAllTasks();
            }
        }
    }
}

getAllTasks();