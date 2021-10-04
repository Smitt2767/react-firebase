import React, { useState, useRef } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import Modal from "../../components/Modal/Modal";
import SquareButton from "../../components/Button/Button";
import Circle from "../../components/Loader/Circle";
import { del } from "../../services/projectsService";
import { useDrag } from "react-dnd";
import { setMessage } from "../../store/layoutSlice";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import variants from "../../constants/variants";

const Button = ({ children, bgColor, onClick }) => (
  <button
    className={`bg-${bgColor}-400 text-center p-2 rounded-full text-gray-100 hover:text-gray-50 hover:bg-${bgColor}-600`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Card = ({ data, onEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(true);
  const dragRef = useRef();

  const [{ isDragging }, drag] = useDrag({
    type: "TODO",
    item: () => ({
      id: data.id,
      status: data.status,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragRef);

  const handleDelete = (value) => {
    setShowDeleteModal(value);
  };

  const handleDeleteProject = async () => {
    try {
      setIsLoading(true);
      if (!!data) await del(data.id);
      dispatchEvent(setMessage("Todo deleted!"));
      setIsLoading(false);
      handleDelete(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      handleDelete(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showDeleteModal && (
          <Modal setShowModal={() => handleDelete(false)}>
            <motion.div
              variants={variants.modal}
              initial="closed"
              animate="opened"
              exit="closed"
              transition={{
                damping: 300,
                times: [0, 0.9, 1],
                duration: 0.3,
              }}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col text-gray-700 w-96 max-w-sm items-center gap-5"
            >
              <h1 className="text-2xl font-bold text-center">Are you sure?</h1>
              <div className="flex items-center gap-3 w-40">
                <SquareButton
                  bgColor="yellow"
                  onClick={() => handleDelete(false)}
                >
                  No
                </SquareButton>
                <SquareButton
                  bgColor="blue"
                  onClick={() => {
                    handleDeleteProject();
                  }}
                >
                  {isLoading ? <Circle /> : "Yes"}
                </SquareButton>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <div
        className={` shdow-2xl w-full rounded-lg p-4 flex flex-col mb-4 ${
          isDragging ? "bg-gray-100 bg-opacity-30" : "bg-white"
        } `}
        ref={dragRef}
      >
        <div className="flex items-center justify-between">
          <h1
            className="font-bold cursor-pointer"
            onClick={() => setShowCardInfo((prevState) => !prevState)}
          >
            {data.title}
          </h1>
          <div className="flex gap-1 items-center">
            <Button bgColor="red" onClick={() => handleDelete(true)}>
              <BsTrash />
            </Button>
            <Button bgColor="blue" onClick={() => onEdit(data)}>
              <BsPencil />
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {showCardInfo && (
            <motion.div
              variants={variants.accordion}
              initial="closed"
              animate="opened"
              exit="closed"
              className="overflow-hidden"
            >
              <p className="text-md text-gray-400 text-justify mt-4">
                {data.desc}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">
                  {moment(data.created_at).format("MMM Do [at] hh:mm a")}
                </span>
                <span className="text-xs text-gray-400">
                  last updated:- {moment(data.updated_at).fromNow()}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Card;
