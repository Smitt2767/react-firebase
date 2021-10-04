import React, { useRef, useEffect, useState, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { updateStatus } from "../../services/projectsService";
import { getAll } from "../../services/projectsService";
import { setProjects } from "./store/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const Todo = ({ title, data, onAdd, onEdit, status }) => {
  const dropRef = useRef();
  const {
    currentUser: { uid },
  } = useSelector((state) => state.auth);
  const [lastDoc, setLastDoc] = useState(null);
  const dispatch = useDispatch();

  const setData = useCallback(
    (snapshot) => {
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      dispatch(
        setProjects({
          data: snapshot.docs.map((project) => ({
            id: project.id,
            ...project.data(),
            created_at: project.data().created_at.toDate(),
            updated_at: project.data().updated_at.toDate(),
          })),
          status,
        })
      );
    },
    [dispatch, status]
  );
  useEffect(() => {
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
    console.log("hi");
    getAll(uid, status, lastDoc).startAfter(lastDoc).onSnapshot(setData);
  };

  return (
    // <div className="h-40 overflow-y-auto" id="scrollableDiv">
    //   <InfiniteScroll
    //     dataLength={data.length}
    //     next={next}
    //     hasMore={true}
    //     scrollableTarget="scrollableDiv"
    //   >
    //     {isActive && (
    //       <div className="h-20 mb-4 bg-gray-200 shadow-lg rounded-lg w-full border-4 border-primary border-dashed"></div>
    //     )}
    //     {data.map((item) => (
    //       <Card key={item.id} data={item} onEdit={onEdit} />
    //     ))}
    //   </InfiniteScroll>
    // </div>
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
      <div
        className={`gap-4 overflow-y-auto h-full`}
        id="scrollableDiv"
        ref={dropRef}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={next}
          hasMore={true}
          scrollableTarget="scrollableDiv"
        >
          {isActive && (
            <div className="h-20 mb-4 bg-gray-200 shadow-lg rounded-lg w-full border-4 border-primary border-dashed"></div>
          )}
          {data.map((item) => (
            <Card key={item.id} data={item} onEdit={onEdit} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Todo;
