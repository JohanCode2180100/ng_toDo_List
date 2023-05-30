import { Component } from '@angular/core';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <div>
      <ul>
        <li *ngFor="let todo of todos" [class.completed-task]="todo.completed">
          {{ todo.id }} -
          <span [ngClass]="{ 'completed-task': todo.completed }">{{
            todo.label
          }}</span>
          <button (click)="finishTask(todo)">terminée</button>
          <button (click)="deleteTask(todo)">supprimer</button>
        </li>
      </ul>
    </div>

    <form (submit)="createTodo()">
      <input
        type="text"
        name="todoLabel"
        placeholder="Enter new task"
        [(ngModel)]="newTodo"
      />
    </form>
  `,
  styles: [
    `
      .completed-Task {
        text-decoration: line-through;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Ma ToDo List';

  todos: Todo[] = [];
  newTodo: string = '';
  idCounter: number = 1;

  ngOnInit() {
    this.loadLocalStorage();
  }

  private loadLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  createTodo() {
    if (this.newTodo) {
      const todo: Todo = {
        id: this.idCounter++,
        label: this.newTodo,
        completed: false,
      };
      this.todos.push(todo);
      this.newTodo = '';
      this.saveToLocalStorage();
    }
  }
  finishTask(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos[index].completed = !this.todos[index].completed;
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
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
