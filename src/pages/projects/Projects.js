import React, { useState, useEffect } from "react";
import constants from "../../constants";
import AddEditTodo from "./AddEditTodo";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AnimatePresence } from "framer-motion";
import { resetProjects } from "./store/projectSlice";

const Projects = () => {
  const [modal, setModal] = useState("");
  const [data, setData] = useState(null);
  const {
    currentUser: { uid },
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetProjects());
    };
  }, [dispatch]);

  const { completedProjects, notCompletedProjects, inProgressProjects } =
    useSelector((state) => state.project);

  const handleAdd = (value) => {
    setModal(value);
  };

  const handleEdit = (data, value) => {
    setData(data);
    setModal(value);
  };

  return (
    <>
      <AnimatePresence>
        {modal && (
          <AddEditTodo
            data={data}
            status={modal}
            setShowModal={() => {
              if (data) setData(null);
              setModal("");
            }}
            uid={uid}
          />
        )}
      </AnimatePresence>

      <div className="h-full w-full text-gray-700 overflow-hidden">
        <div className="w-full py-4">
          <h1 className="text-4xl">Projects</h1>
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className="flex gap-4 h-full w-full">
            <Todo
              title="To do"
              onAdd={handleAdd.bind(null, constants.todoStatus.notCompleted)}
              data={notCompletedProjects}
              onEdit={(data) =>
                handleEdit(data, constants.todoStatus.notCompleted)
              }
              status={constants.todoStatus.notCompleted}
            />

            <Todo
              title="In Progress"
              onAdd={handleAdd.bind(null, constants.todoStatus.inProgress)}
              data={inProgressProjects}
              npm
              start
              onEdit={(data) =>
                handleEdit(data, constants.todoStatus.inProgress)
              }
              status={constants.todoStatus.inProgress}
            />

            <Todo
              title="Completed"
              onAdd={handleAdd.bind(null, constants.todoStatus.completed)}
              data={completedProjects}
              onEdit={(data) =>
                handleEdit(data, constants.todoStatus.completed)
              }
              status={constants.todoStatus.completed}
            />
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default Projects;
