// Store/Store.ts
import { create } from "zustand";
import { v4 as uuid } from "uuid";

type Todo = {
  text: string;
  id: string;
};

type CounterStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, newText: string) => void;
  clearTodo: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  todos: [{ text: "Buy a new book", id: uuid() }],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  updateTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    })),

  clearTodo: () => set({ todos: [] }),
}));
