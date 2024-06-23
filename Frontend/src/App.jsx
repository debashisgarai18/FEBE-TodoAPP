import { useState } from "react";
import "./App.css";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";

function App() {
  const [showTasks, setShowTasks] = useState([]);
  const [todotask, setTodoTask] = useState("");
  const [taskid, setTaskId] = useState(1);

  // function to add TODO
  const addTodo = () => {
    setTaskId(taskid + 1);
    const task = {
      id: taskid,
      task: todotask,
      completed: false,
    };
    
    setShowTasks([...showTasks, task]);
    setTodoTask("");
  };
  
  // function to delete TODO
  const deleteTodo = (idx) => {
    console.log("insidee this function", idx);
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
                      className="text-[#212121] flex text-2xl items-center justify-between bg-white/50 px-[1rem] py-[0.5rem] rounded-lg"
                    >
                      <input type="checkbox" />
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
