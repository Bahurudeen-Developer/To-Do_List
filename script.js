document.addEventListener("DOMContentLoaded", () => {
    const todoinput = document.getElementById("todoinput");
    const addtodo = document.getElementById("addtodo");
    const taskadd = document.getElementById("taskadd");

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    function savetodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function rendertodos() {
        taskadd.innerHTML = "";

        todos.forEach((todo, index) => {
            const li = document.createElement("li");

            // Creating structure with createElement instead of innerHTML
            const taskContainer = document.createElement("div");
            taskContainer.className = "styles";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;

            const span = document.createElement("span");
            span.className = "todo-text";
            span.textContent = todo.text;
            if (todo.completed) {
                span.style.textDecoration = "line-through";
                span.style.color = "gray";
            }

            checkbox.addEventListener("change", () => {
                todo.completed = checkbox.checked;
                savetodos();
                rendertodos();
            });

            taskContainer.appendChild(checkbox);
            taskContainer.appendChild(span);

            const btnContainer = document.createElement("div");

            const editbtn = document.createElement("button");
            editbtn.textContent = "Edit";
            editbtn.className = "innerbutton";
            editbtn.addEventListener("click", () => {
                const newText = prompt("Edit task:", todo.text);
                if (newText !== null && newText.trim() !== "") {
                    todo.text = newText.trim();
                    savetodos();
                    rendertodos();
                }
            });

            const deletebtn = document.createElement("button");
            deletebtn.textContent = "Delete";
            deletebtn.className = "innerbutton2";
            deletebtn.addEventListener("click", () => {
                todos.splice(index, 1);
                savetodos();
                rendertodos();
            });

            btnContainer.appendChild(editbtn);
            btnContainer.appendChild(deletebtn);

            li.appendChild(taskContainer);
            li.appendChild(btnContainer);
            taskadd.appendChild(li);
        });
    }

    addtodo.addEventListener("click", () => {
        const text = todoinput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoinput.value = "";
            savetodos();
            rendertodos();
        }
    });

    todoinput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addtodo.click();
        }
    });

    rendertodos();
});
