import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const getlocal_storage = () => {
  let totaltodos = localStorage.getItem("totaltodos");
  if (totaltodos) {
    return (totaltodos = JSON.parse(localStorage.getItem("totaltodos")));
  } else {
    return [];
  }
};

const Mainbar = () => {
  const [todo, settodo] = useState("");
  const [totaltodos, settotaltodos] = useState(getlocal_storage());
  const ref = useRef();
  const [showfinish, setshowfinish] = useState(false);

  useEffect(() => {
    localStorage.setItem("totaltodos", JSON.stringify(totaltodos));
  }, [totaltodos]);

  const finished = () => {
    setshowfinish(!showfinish);
  };

  const addtask = () => {
    settotaltodos([...totaltodos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
  };

  const writetask = (e) => {
    settodo(e.target.value);
  };

  const handlecheck = (e) => {
    let i = e.target.name;
    let k = totaltodos.filter((p) => p.id === i);
    let newtodos = [...totaltodos];
    k[0].isCompleted = !k[0].isCompleted;
    settotaltodos(newtodos);
  };

  const handleedit = (e) => {
    let ids = e.target.id;
    let task = e.target.name;
    let task_1 = totaltodos.filter((t1) => t1.id === ids);
    settodo(task_1[0].todo);
    let newtodo = totaltodos.filter((p) => p.id != ids);
    settotaltodos(newtodo);
  };

  const handledelete = (e) => {
    let tar = e.target.id;
    let del = confirm(
      "Do you really want to delete this task?\n" + '"' + tar + '"'
    );
    if (del == true) {
      let id = e.target.name;
      let newtodo = totaltodos.filter((p) => p.id != id);
      settotaltodos(newtodo);
    }
  };

  return (
    <div className="w-full">
      <main className="flex justify-center items-center mt-8">
        <div className="bg-blue-100 h-[90%] sm:w-[40%] rounded-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] sm:min-w-[550px] w-[90%] min-w-[300px] sm:min-h-[80vh] min-h-[86vh]">
          <div className="h-fit flex justify-center items-end mt-1">
            <p className="text-center text-2xl font-bold">
              JustDo - Manage your todos at one place
            </p>
          </div>
          <div className="text-[16px] font-semibold mt-7 sm:ml-12 ml-6">
            Add a Task
          </div>
          <div className="flex items-center gap-3 w-full m-7 mt-2 sm:ml-10 sm:flex-row flex-col ml-0">
            <input
              type="text"
              placeholder="enter your task"
              value={todo}
              className="sm:w-[70%] w-[90%] h-9 p-3 pt-2 rounded-[4px] border border-slate-300  drop-shadow-md"
              onChange={writetask}
              ref={ref}
            />
            <button
              type="button"
              className="bg-blue-800 sm:w-[12%] w-[86%] rounded-[4px] h-8 text-white font-bold text-[18px] font-mono shadow-lg shadow-slate-500/40 cursor-pointer"
              onClick={addtask}
              disabled={todo.length < 1}
            >
              Save
            </button>
          </div>
          <div className="ml-11 flex items-center gap-1">
            <input
              type="checkbox"
              name="checks"
              id="checks"
              className="cursor-pointer"
              checked={showfinish}
              onChange={finished}
            />
            <label
              htmlFor="checks"
              className="text-[14px] font-[Roboto] tracking-[0.015em]"
            >
              Show finished Tasks
            </label>
          </div>
          <div className="w-[75%] h-[1.2px] ml-[12%] mt-5 bg-slate-400 shadow-2xl shadow-slate-900/40"></div>
          <div>
            <p className="mt-2 ml-12 font-bold text-[18px] underline">
              Your Tasks
            </p>
          </div>
          <div className="todoslist w-[83%] max-h-[53vh] overflow-y-auto m-auto">
            {totaltodos.length == 0 && (
              <div className="flex w-full h-[30vh] justify-center items-center text-2xl font-semibold font-mono tracking-tight">
                No todos to display
              </div>
            )}
            {totaltodos.map((item) => {
              return (
                ((showfinish && item.isCompleted) || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todos flex justify-start items-center text-[17px] font-normal gap-[8px] border-[0.3px] border-slate-400 bg-white h-max p-3 mt-3 mb-3 rounded-md shadow-lg shadow-slate-500/40 cursor-pointer w-full"
                  >
                    <input
                      type="checkbox"
                      name={item.id}
                      onChange={handlecheck}
                      checked={item.isCompleted}
                    />
                    <div className="w-[50vh] break-words overflow-hidden">
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex justify-end items-end w-[50%] gap-2">
                      <button
                        type="button"
                        className="w-11 h-7 bg-blue-800 rounded-md text-white font-semibold font-mono text-[17px] cursor-pointer"
                        onClick={handleedit}
                        name={item.todo}
                        id={item.id}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="w-16 h-7 bg-blue-800 rounded-md text-white font-semibold font-mono text-[17px] cursor-pointer"
                        onClick={handledelete}
                        name={item.id}
                        id={item.todo}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mainbar;
