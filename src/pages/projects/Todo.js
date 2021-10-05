import React, { useRef, useEffect, useState, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { updateStatus } from "../../services/projectsService";
import { getAll } from "../../services/projectsService";
import { setProjects, onLoadMoreProjects } from "./store/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import Circle from "../../components/Loader/Circle";
import { setMessage } from "../../store/layoutSlice";

const Todo = ({ title, data, onAdd, onEdit, status }) => {
  const dropRef = useRef();
  const {
    currentUser: { uid },
  } = useSelector((state) => state.auth);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const setData = useCallback(
    (snapshot, load = false) => {
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      const projects = snapshot.docs.map((project) => ({
        id: project.id,
        ...project.data(),
        created_at: project.data().created_at.toDate(),
        updated_at: project.data().updated_at.toDate(),
      }));
      console.log(snapshot);

      if (!!projects.length) setHasMore(true);
      else setHasMore(false);

      if (!load)
        dispatch(
          setProjects({
            data: projects,
            status,
          })
        );
      else {
        if (!!!projects.length)
          dispatch(setMessage(`No more todos ${title} tasks`));
        dispatch(
          onLoadMoreProjects({
            data: projects,
            status,
          })
        );
      }

      setLoading(false);
    },
    [dispatch, status, title]
  );

  useEffect(() => {
    setLoading(true);
    const unsub = getAll(uid, status).onSnapshot(setData);

    return unsub;
  }, [uid, dispatch, setData, status]);

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

  const next = () => {
    setLoading(true);
    getAll(uid, status)
      .startAfter(lastDoc)
      .onSnapshot((snapshot) => setData(snapshot, true));
  };

  return (
    <div className="bg-primary flex-grow max-w-sm bg-opacity-10 rounded-lg p-4 flex flex-col gap-3 overflow-hidden mb-20">
      <div className="flex justify-between items-center ">
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
      <div className={`gap-4 flex-grow overflow-y-auto`} ref={dropRef}>
        {isActive && (
          <div className="h-20 mb-4 bg-gray-200 shadow-lg rounded-lg w-full border-4 border-primary border-dashed"></div>
        )}
        {data.map((item) => (
          <Card key={item.id} data={item} onEdit={onEdit} />
        ))}
      </div>
      {hasMore && (
        <div className="w-full flex items-center justify-end ">
          {!loading ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1 text-xs font-bold"
              onClick={next}
              disabled={loading || !hasMore}
            >
              Load More
            </button>
          ) : (
            <Circle />
          )}
        </div>
      )}
    </div>
  );
};

export default Todo;
