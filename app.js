//SELECTEURS//
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//ECOUTEURS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);



//FONCTIONS
function addTodo(event){
   event.preventDefault();
   //Todo DIV
   const todoDiv = document.createElement("div")
   // Ajout d'une classe a cette div -> todo
   todoDiv.classList.add("todo");

   //Créer le Li 
   const newTodo = document.createElement("li");
   //On ajoute du texte à ce li
   newTodo.innerText =todoInput.value;
   //Ajout d'une classe a ce li -> todo-item
   newTodo.classList.add("todo-item");

   //Pour lié ce li à la div 
todoDiv.appendChild(newTodo);
    //Ajouter la todo au localStorage
    saveLocalTodos(todoInput.value);
    //Boutton Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);

    //Boutton Supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//AJOUTER NOTRE TODO A TODO-LIST
todoList.appendChild(todoDiv);
//Retirer l'élement après chaque entrée dans la bar
todoInput.value="";
}


function deleteCheck(e){
    const item =e.target
    //DELETE TODO
    if(item.classList[0]==="trash-btn"){
        const todo=item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    //CHECK MARK 
    if(item.classList[0]==="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display ="none";
                }
                break;
             case "uncompleted":
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    } else {
                        todo.style.display ="none";
                    }
                    break;
        }
    })
}


//stocker les todos pour éviter de les perdres en actualisant

function saveLocalTodos(todo){
    //checker si il y a des items existants
    let todos;
    if(localStorage.getItem("todos") === null){
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//les élemenst sont sauvegardés mais ne s'affiche pas encore

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    
    todos.forEach(function(todo){
         //Todo DIV
   const todoDiv = document.createElement("div")
   // Ajout d'une classe a cette div -> todo
   todoDiv.classList.add("todo");

   //Créer le Li 
   const newTodo = document.createElement("li");
   //On ajoute du texte à ce li
   newTodo.innerText =todo;
   //Ajout d'une classe a ce li -> todo-item
   newTodo.classList.add("todo-item");

   //Pour lié ce li à la div 
todoDiv.appendChild(newTodo);
    //Boutton Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);

    //Boutton Supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//AJOUTER NOTRE TODO A TODO-LIST
todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}