/*
 Easing -> funciones de tiempo en animaciones https://easings.net
 Tuto drag and drop https://www.youtube.com/watch?v=xJLDtWZjFgE
*/

var toDo = document.getElementById("toDo");
var doing = document.getElementById("doing");
var done = document.getElementById("done");

var start;
var end;
var card;

const toDoSortable = Sortable.create(toDo, {
	group: "tasks",
	animation: 300,
	handle: ".fas",
	dataIdAttr: 'id',
	onStart: function(){
		start = toDoSortable.toArray();
	},
	onEnd: function(){
		end = toDoSortable.toArray();
		if(start.length != end.length){
			for(let i in start){
				if(!end.includes(start[i])){
					card = start[i];
				}
			}
		}
	},
	onAdd: function(){
		let arrive = toDoSortable.toArray();
		if(arrive.includes(card)){
			updateTaskDragged(card, "TO DO");
		}
	}
});
const doingSortable = Sortable.create(doing, {
	group: "tasks",
	animation: 300,
	handle: ".fas",
	dataIdAttr: 'id',
	onStart: function(){
		start = doingSortable.toArray();
	},
	onEnd: function(){
		end = doingSortable.toArray();
		if(start.length != end.length){
			for(let i in start){
				if(!end.includes(start[i])){
					card = start[i];
				}
			}
		}
	},
	onAdd: function(){
		let arrive = doingSortable.toArray();
		if(arrive.includes(card)){
			updateTaskDragged(card, "DOING");
		}
	}
});
const doneSortable = Sortable.create(done, {
	group: "tasks",
	animation: 300,
	handle: ".fas",
	dataIdAttr: 'id',
	onStart: function(){
		start = doneSortable.toArray();
	},
	onEnd: function(){
		end = doneSortable.toArray();
		if(start.length != end.length){
			for(let i in start){
				if(!end.includes(start[i])){
					card = start[i];
				}
			}
		}
	},
	onAdd: function(){
		let arrive = doneSortable.toArray();
		if(arrive.includes(card)){
			updateTaskDragged(card, "DONE");
		}
	}
});