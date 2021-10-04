import React, { useMemo, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Devider from "../../components/Devider/Devider";
import TextInput from "../../components/TextInput/TextInput";
import TextAreaInput from "../../components/TextInput/TextAreaInput";
import Button from "../../components/Button/Button";
import { add, edit } from "../../services/projectsService";
import Circle from "../../components/Loader/Circle";
import { setMessage } from "../../store/layoutSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import variants from "../../constants/variants";
const AddEditTodo = ({ data, setShowModal, status, uid }) => {
  const initialValues = useMemo(
    () => ({
      title: !!data ? data.title : "",
      desc: !!data ? data.desc : "",
    }),
    [data]
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("title must be required"),
    desc: Yup.string().required("description must be required"),
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      if (!!!data) {
        await add({ ...values, status, uid });
        dispatch(setMessage("Todo added!"));
      } else {
        await edit({ ...values, todo_id: data.id });
        dispatch(setMessage("Todo updated!"));
      }

      setIsLoading(false);
      setShowModal();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setShowModal();
    }
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <Modal setShowModal={setShowModal}>
      <motion.div
        initial="closed"
        animate="opened"
        exit="closed"
        transition={{
          damping: 300,
          times: [0, 0.9, 1],
          duration: 0.3,
        }}
        variants={variants.modal}
        className="max-w-sm w-full rounded-lg shadow-lg p-4 bg-white text-gray-700 flex flex-col gap-4 "
      >
        <h1 className="text-center text-4xl font-bold">
          {!!data ? "Edit Todo" : "Add Todo"}
        </h1>
        <Devider />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextInput
            label="Title"
            type="text"
            placeholder="Enter title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            error={touched.title && errors.title ? errors.title : ""}
          />
          <TextAreaInput
            label="Desription"
            placeholder="Enter description"
            name="desc"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.desc}
            error={touched.desc && errors.desc ? errors.desc : ""}
            rows={7}
          />
          <div className="flex justify-end items-center self-end w-40 mt-4 gap-4">
            <Button bgColor="yellow" onClick={setShowModal} type="button">
              cancel
            </Button>
            <Button
              bgColor="blue"
              type="submit"
              disabled={!dirty || !isValid || isLoading}
            >
              {isLoading ? <Circle /> : !!data ? "save" : "create"}
            </Button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};

export default AddEditTodo;
