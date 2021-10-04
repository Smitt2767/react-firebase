import React from "react";
import Devider from "../../components/Devider/Devider";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { Link, Redirect } from "react-router-dom";
import { forgotPassword } from "../../services/authService";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setMessage } from "../../store/layoutSlice";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email")
      .required("email must be required"),
  });

  const onSubmit = async (values) => {
    try {
      dispatch(setIsLoading(true));
      await forgotPassword(values);
      dispatch(setIsLoading(false));
      dispatch(setMessage("Reset password link sent to your email"));
    } catch (err) {
      console.dir(err);
      if (err.code === "auth/missing-email")
        dispatch(setMessage("Register your account first"));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit,
  });

  return (
    <>
      {currentUser && <Redirect to="/" />}
      <div className="w-full h-full flex items-center justify-center p-2">
        <div className="w-80 bg-white shadow-xl rounded-lg p-4 flex flex-col gap-4 ">
          <h1 className="text-2xl text-gray-700">Forgot Password</h1>

          <Devider />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className="flex flex-col gap-3 text-gray-700"
          >
            <TextInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            />

            <Button
              bgColor="blue"
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
            >
              Send Email
            </Button>
            <div className="w-full text-center text-sm ">
              <Link
                className="text-blue-500 font-bold hover:text-blue-600 "
                to="/signin"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
