import { useEffect, useState } from "react";
import "./App.css";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./checkBox.css";

function App() {
  const [showTasks, setShowTasks] = useState([]);
  const [todotask, setTodoTask] = useState("");
  const [taskid, setTaskId] = useState(1);

  // function to show all the TODOS on the API call
  const getData = async () => {
    const resp = await fetch("http://localhost:3000/todos");
    const data = await resp.json();
    setShowTasks(data);
  };

  useEffect(() => {
    getData();
  }, [showTasks]);

  // function to add TODO
  const addTodo = async () => {
    setTaskId(taskid + 1);

    if (todotask.length === 0) {
      alert("Please enter a task then add");
      return;
    }
    const task = {
      id: taskid,
      task: todotask,
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
  };

  // function to delete TODO
  const deleteTodo = (idx) => {
    const temp = [...showTasks];
    temp.splice(idx, 1);
    setShowTasks(temp);
  };

  return (
    <>
      <div className="w-full h-screen bg-[#212121] pt-[7rem]">
        <div className="w-[35%] min-h-[300px] bg-white/70 m-auto rounded-xl px-[1rem] py-[2rem]">
          <div className="w-full h-fit">
            <div className="w-full flex items-center gap-[0.75rem] text-[2.5rem] px-[0.5rem] mb-[2rem] drop-shadow-lg">
              <div className="font-bold">To-do List</div>
              <LuListTodo />
            </div>
            <div className="w-full relative px-[1rem] mb-[1.5rem]">
              <input
                type="text"
                className="w-full h-[4.1rem] rounded-[3rem] px-[1.5rem] text-2xl focus:outline-none focus:border-none shadow-lg"
                placeholder="Add your task"
                value={todotask}
                onChange={(e) => setTodoTask(e.target.value)}
              />
              <button
                className="absolute right-[0.75rem] h-[4.1rem] w-[7.5rem] bg-[#212121] rounded-[3rem] font-semibold text-2xl text-white/50 shadow-lg"
                onClick={addTodo}
              >
                Add
              </button>
            </div>
            <div className="w-full flex flex-col gap-[0.75rem]">
              {showTasks &&
                showTasks.map((e, idx) => {
                  return (
                    <div
                      key={e.id}
                      className="text-[#212121] flex text-2xl items-center justify-between bg-white/50 px-[1rem] py-[0.5rem] rounded-xl hover:bg-white/30 cursor-pointer"
                    >
                      <div className="inline-flex items-center">
                        <label
                          className="relative flex items-center p-3 rounded-full cursor-pointer"
                          htmlFor="customStyle"
                        >
                          <input
                            type="checkbox"
                            className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                            id="customStyle"
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                            >
                              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                            </svg>
                          </span>
                        </label>
                      </div>
                      <div className="w-[60%]">
                        <div>{e.task}</div>
                        {/* <div className="overflow-hidden whitespace-nowrap text-ellipsis">Description : {e.desc}</div> */}
                      </div>
                      <MdOutlineDeleteOutline
                        className="text-4xl cursor-pointer"
                        onClick={() => deleteTodo(idx)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
