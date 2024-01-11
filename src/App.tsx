import { useState, useRef, useEffect } from "react";
import { useTodoStore } from "./Store/Store";
import { v4 as uuid } from "uuid";
import gsap from "gsap";

const App = () => {
  const { addTodo, todos, deleteTodo, updateTodo, clearTodo } = useTodoStore();
  const [text, setText] = useState("");
  const [updatemode, setUpdateMode] = useState(false);
  const [updatingTodoId, setUpdatingTodoId] = useState("");

  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  console.log(cardRefs.current);

  useEffect(() => {
    // Animate each card when it is added
    const newTodoId = todos[todos.length - 1]?.id;

    const divToAnimate = cardRefs.current[newTodoId];

    if (newTodoId && divToAnimate) {
      const tl = gsap.timeline();
      tl.fromTo(
        divToAnimate,
        {
          y: 50,
          opacity: 0,
          duration: 0.5,
        },
        {
          y: 0,
          opacity: 1,
        }
      );
    }
  }, [todos]);

  const todoAddition = () => {
    if (text.length > 0) {
      if (updatemode) {
        updateTodo(updatingTodoId, text);
        setUpdateMode(false);
        setUpdatingTodoId("");
      } else {
        const todo = { text, id: uuid() };
        addTodo(todo);
        setText("");
      }
    }
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleUpdateTodo = (id: string, currentText: string) => {
    setText(currentText);
    setUpdateMode(true);
    setUpdatingTodoId(id);
  };

  const handleClearTodos = () => {
    clearTodo();
  };

  const reversedMap = todos.slice().reverse();

  return (
    <div className="min-h-screen bg-gray-600 flex justify-center items-center ">
      <div className="h-[450px] w-[350px] bg-gray-800 rounded-md px-5">
        <h1 className="font-bold font-sans text-white text-center mt-5 text-3xl">
          Zustand
        </h1>

        <div className="flex justify-center mt-6">
          <input
            type="text"
            className="w-full rounded-md outline-none px-3"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>

        <div className="flex justify-between mt-5">
          {!updatemode ? (
            <button
              className="bg-red-500 py-[.5] text-white px-2 rounded-md"
              onClick={todoAddition}
            >
              Create
            </button>
          ) : (
            <button
              className="bg-green-500 py-[.5] text-white px-2 rounded-md"
              onClick={todoAddition}
            >
              Update
            </button>
          )}

          <button
            className="bg-red-500 py-[.5] text-white px-2 rounded-md w-[65px]"
            onClick={handleClearTodos}
          >
            Clear
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4 h-[260px] bg-orange-400 px-2 py-3 rounded-md overflow-y-auto">
          {reversedMap.map((value) => {
            return (
              <div
                key={value.id}
                className="flex justify-between bg-white px-2 min-h-[43px] items-center rounded-md card"
                ref={(element) => {
                  console.log(element);
                  cardRefs.current[value.id] = element; //? element is representing the html element means the particular div on which the ref is attached.
                }}
              >
                <h1 className="font-semibold">{value.text}</h1>

                <div className="flex gap-2">
                  <button
                    className="bg-green-500 text-white px-2 rounded-md"
                    onClick={() => handleUpdateTodo(value.id, value.text)}
                  >
                    ✏️
                  </button>

                  <button
                    className="bg-red-500 text-white  px-2 rounded-md"
                    onClick={() => handleDeleteTodo(value.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
