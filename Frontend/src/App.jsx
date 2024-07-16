import { useEffect, useState } from "react";
import "./App.css";
import { LuListTodo } from "react-icons/lu";
import TodoData from "./componenets/TodoData";

function App() {
  const [showTasks, setShowTasks] = useState([]);
  const [todotask, setTodoTask] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  // function to show all the TODOS on the API call
  const getData = async () => {
    const resp = await fetch("http://localhost:3000/todos");
    const data = await resp.json();
    data && setShowTasks(data);
  };

  useEffect(() => {
    setInterval(() => {
      getData();
    }, 100);
  }, []);

  // function to add TODO
  const addTodo = async () => {
    if (todotask.length === 0) {
      alert("Please enter a task then add");
      return;
    }
    const task = {
      task: todotask,
      desc: todoDesc,
      completed: false,
    };

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);

      return res.json();
    });

    setTodoTask("");
    setTodoDesc("");
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#212121] pt-[7rem]">
        <div className="w-[60%] min-h-[300px] bg-white/70 m-auto rounded-xl px-[1rem] py-[2rem]">
          <div className="w-full h-fit">
            <div className="w-full flex items-center gap-[0.75rem] text-[2.5rem] px-[0.5rem] mb-[2rem] drop-shadow-lg">
              <div className="font-bold">To-do List</div>
              <LuListTodo />
            </div>
            <div className="w-full relative px-[1rem] mb-[1.5rem] flex flex-col gap-[0.2rem]">
              <input
                type="text"
                className="w-full h-[4.1rem] rounded-[3rem] px-[1.5rem] text-2xl focus:outline-none focus:border-none shadow-lg"
                placeholder="Add your task..."
                value={todotask}
                onChange={(e) => setTodoTask(e.target.value)}
              />
              <textarea
                className="w-full h-[4rem] rounded-[3rem] px-[1.5rem] text-base focus:outline-none focus:border-none shadow-lg py-[1.2rem]"
                rows={1}
                placeholder="Enter the description.."
                wrap="hard"
                value={todoDesc}
                onChange={(e) => setTodoDesc(e.target.value)}
              ></textarea>
              <button
                className="absolute right-[0.75rem] h-[4.1rem] w-[8rem] bg-[#212121] rounded-[2rem] font-semibold text-2xl text-white/50 shadow-lg"
                onClick={addTodo}
              >
                Add
              </button>
            </div>
            <div className="w-full flex flex-col gap-[0.75rem]">
              {showTasks &&
                showTasks.map((e) => {
                  return <TodoData key={e._id} data={e} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
