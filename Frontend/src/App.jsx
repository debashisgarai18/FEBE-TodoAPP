import { useState } from "react";
import "./App.css";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";

function App() {
  const [showTasks, setShowTasks] = useState([
    {
      id: 1,
      task: "do DSa",
      desc: "complete the graphy theory basics 8-9",
      status: "ongoing",
    },
    {
      id: 2,
      task: "do Webdev",
      desc: "complete the basics 9-11",
      status: "ongoing",
    },
    {
      id: 3,
      task: "do gym",
      desc: "smash gym from 11-1",
      status: "ongoing",
    },
  ]);
  const [task, setTask] = useState("");
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
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button className="absolute right-[0.75rem] h-[4.1rem] w-[7.5rem] bg-[#212121] rounded-[3rem] font-semibold text-2xl text-white/50 shadow-lg">
                Add
              </button>
            </div>
            <div className="w-full flex flex-col gap-[0.75rem]">
              {showTasks &&
                showTasks.map((e) => {
                  return (
                    <div key={e.id} className="text-[#212121] flex text-2xl items-center justify-between bg-white/20 px-[1rem]">
                      <input type="checkbox" />
                      <div className="w-[60%]">
                      <div>Task : {e.task}</div>
                      <div className="overflow-hidden whitespace-nowrap text-ellipsis">Description : {e.desc}</div>
                      </div>
                      <MdOutlineDeleteOutline className="text-4xl"/>
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
