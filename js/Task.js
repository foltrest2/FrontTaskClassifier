class Task{

    constructor(task){
      this.task = task;
      Object.seal(this);
    }

    render = (container) =>{
        let card = document.createElement("div");
        let div = document.createElement("div");
        let closeBtn = document.createElement("button");
        let title = document.createElement("h5");
        let desc = document.createElement("p");
        let date = document.createElement("p");
        let date2 = document.createElement("small");
        let icon = document.createElement("i");
        let cont = document.createElement("div");

        card.classList.add("card");
        card.classList.add("w-100");
        card.classList.add("cardMargin");
        card.classList.add("cardCss");
        card.id = this.task.id;

        div.classList.add("card-body");

        closeBtn.type = "button";
        closeBtn.classList.add("btn-close");
        closeBtn.classList.add("btnCss");
        closeBtn.ariaLabel = "Close";
        closeBtn.textContent = "Delete";

        cont.classList.add("fix-icon");
        cont.appendChild(icon);
        cont.appendChild(title);

        icon.classList.add("fas")
        icon.classList.add("fa-hand-rock")
        icon.classList.add("fas-color")

        title.classList.add("card-title");
        title.textContent = this.task.title;

        desc.classList.add("card-text");
        desc.textContent = this.task.description;

        date.classList.add("card-text");
        date2.classList.add("text-muted");
        date2.textContent = this.task.date;
        date.appendChild(date2);

        div.appendChild(closeBtn);
        div.appendChild(cont);
        div.appendChild(desc);
        div.appendChild(date);
        
        let forwardBtn = document.createElement("a");
        forwardBtn.classList.add("btn");
        forwardBtn.classList.add("btn-primary");
        forwardBtn.textContent = "Forward";
        
        let backwardBtn = document.createElement("a");
        backwardBtn.classList.add("btn");
        backwardBtn.classList.add("btn-warning");
        backwardBtn.textContent = "Backward";

        if(this.task.type == "TO DO"){
            forwardBtn.style = "float: right"
            div.appendChild(forwardBtn);
        }
        else if(this.task.type == "DOING"){
            forwardBtn.style = "float: right"
            div.appendChild(backwardBtn);
            backwardBtn.style = "float: left"
            div.appendChild(forwardBtn);
        }
        else if(this.task.type == "DONE"){
            backwardBtn.style = "float: left"
            div.appendChild(backwardBtn);
        }
        card.appendChild(div);

        container.appendChild(card);

        closeBtn.addEventListener("click", async ()=>{
            let json = JSON.stringify(this.task);

            let response = await fetch("https://foltrestfirstapp.herokuapp.com/api/task/delete", {
                method: "DELETE",
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
        });

        forwardBtn.addEventListener("click", async ()=>{
            if(this.task.type === "TO DO"){
                this.task.type = "DOING"
            } else if(this.task.type === "DOING"){
                this.task.type = "DONE"
            }
            let json = JSON.stringify(this.task);

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
        });

        backwardBtn.addEventListener("click", async ()=>{
            if(this.task.type === "DONE"){
                this.task.type = "DOING"
            } else if(this.task.type === "DOING"){
                this.task.type = "TO DO"
            }
            let json = JSON.stringify(this.task);

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
        });
    }
}