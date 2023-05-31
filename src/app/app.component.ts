import { Component } from "@angular/core";
import { Todo } from "./todo.interface";

@Component({
  selector: "app-root",
  template: `
    <h1>{{ title }}</h1>

    <form (submit)="createTodo()">
      <input
        type="text"
        name="todoLabel"
        placeholder="Enter new task"
        [(ngModel)]="newTodo"
      />
    </form>
    <div>
      <ul>
        <li *ngFor="let todo of todos; let i = index">
          <span [ngClass]="{ completed: todo.completed }"
            >{{ todo.label }} - {{ todo.createdAt | date:'short'}}</span
          >

          <ion-icon
            name="checkmark-done-outline"
            (click)="finishTask(todo)"
          ></ion-icon>
          <ion-icon name="trash-outline" (click)="deleteTask(todo)"></ion-icon>
        </li>
      </ul>
      <h3>{{ message() }}</h3>
    </div>
  `,
  styleUrls: ["app.component.css"],
})
export class AppComponent {
  title = "Ma ToDo List";

  todos: Todo[] = [];
  newTodo: string = "";
  idCounter: number = 1;

  ngOnInit() {
    this.loadLocalStorage();
  }

  private loadLocalStorage() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }
  taskMessageNumber: string = "";

  message() {
    if (this.todos.length === 0) {
      this.taskMessageNumber =
        "Vous n'avez aucune tache dans votre toDo List, Vous etes a jour !!!";
    } else if (this.todos.length === 1) {
      this.taskMessageNumber = "Vous avez une tache dans votre toDo List";
    } else {
      this.taskMessageNumber = `Vous avez ${this.todos.length} tâches dans votre toDo List`;
    }

    return this.taskMessageNumber;
  }

  createTodo() {
    if (this.newTodo) {
      const todo: Todo = {
        label: this.newTodo,
        completed: false,
        createdAt: new Date(),
      };
      this.todos.push(todo);
      this.newTodo = "";

      this.saveToLocalStorage();
    }
  }
  finishTask(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      todo.completed = !todo.completed;

      this.saveToLocalStorage();
    }
  }

  deleteTask(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);

      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
