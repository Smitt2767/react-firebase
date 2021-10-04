import React, { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { updateStatus } from "../../services/projectsService";

const Todo = ({ title, data, onAdd, onEdit, status }) => {
  const dropRef = useRef();

  const [{ isActive }, drop] = useDrop({
    accept: "TODO",
    collect: (monitor) => {
      return {
        isActive: monitor.isOver() && monitor.getItem()?.status !== status,
      };
    },
    drop: (item) => {
      if (item.status !== status)
        updateStatus({
          todo_id: item.id,
          status,
        });
    },
  });

  drop(dropRef);

  return (
    <div className="bg-primary flex-grow max-w-sm bg-opacity-10 rounded-lg p-4 flex flex-col gap-3 overflow-hidden mb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <span className="bg-primary bg-opacity-20 px-2 rounded-lg text-primary font-bold">
          {data.length}
        </span>
      </div>
      <button
        className="focus:outline-none bg-primary flex items-center justify-center p-2 rounded-lg bg-opacity-20 text-primary text-xl hover:bg-opacity-30"
        onClick={onAdd}
      >
        <AiOutlinePlus />
      </button>
      <div className={`flex-grow gap-4 overflow-y-auto`} ref={dropRef}>
        {isActive && (
          <div className="h-20 mb-4 bg-gray-200 shadow-lg rounded-lg w-full border-4 border-primary border-dashed"></div>
        )}
        {data.map((item) => (
          <Card key={item.id} data={item} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
