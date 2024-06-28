import { useState } from "react";
import PropTypes from "prop-types";
import { IoPencil } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";

const TodoData = ({ data }) => {
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [editEnabled, setEditEnabled] = useState(false);

  // function to delete TODO
  const deleteTodo = async (idx) => {
    await fetch(`http://localhost:3000/todos/${idx}`, {
      method: "DELETE",
    });
  };

  // function to Update a todo
  const updateTask = (idx) => {
    console.log(idx);
    console.log(updatedTodo)
    setEditEnabled(!editEnabled);
  };
//   console.log(data.taskName);
  return (
    <>
      <div className="text-[#212121] flex text-2xl items-center justify-between bg-white/50 px-[1rem] py-[0.5rem] rounded-xl hover:bg-white/30 cursor-pointer">
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
          {!editEnabled ? (
            <div className="overflow-hidden whitespace-nowrap text-ellipsis">
              {data.taskName}
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Enter the text"
                value={updatedTodo}
                onChange={(e) => setUpdatedTodo(e.target.value)}
                className="w-full px-3 py-2 outline-none border-none bg-transparent"
              />
            </div>
          )}
        </div>
        <div className="flex gap-[1rem] items-center">
          {!editEnabled ? (
            <IoPencil
              className="text-3xl cursor-pointer"
              onClick={() => setEditEnabled(!editEnabled)}
            />
          ) : (
            <FaCheck
              className="text-3xl cursor-pointer"
              onClick={() => updateTask(data._id)}
            />
          )}
          <MdOutlineDeleteOutline
            className="text-4xl cursor-pointer"
            onClick={() => deleteTodo(data._id)}
          />
        </div>
      </div>
    </>
  );
};

TodoData.propTypes = {
  data: PropTypes.object.isRequired,
};
export default TodoData;
