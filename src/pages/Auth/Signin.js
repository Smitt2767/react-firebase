import React from "react";
import SigninSignupWithGoogleButton from "../../components/Button/SigninSignupWithGoogleButton";
import Devider from "../../components/Devider/Devider";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput/TextInput";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "../../components/Button/Button";
import { Link, Redirect } from "react-router-dom";
import { signInWithGoogle, signin } from "../../services/authService";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setMessage } from "../../store/layoutSlice";

const initialValues = {
  email: "",
  password: "",
};

const Signin = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email")
      .required("email must be required"),
    password: Yup.string()
      .min(4, "password length must be 4 or more than 4")
      .required("password must be required"),
  });

  const onSubmit = async (values) => {
    try {
      dispatch(setIsLoading(true));
      await signin(values);
    } catch (err) {
      if (err.code === "auth/wrong-password")
        dispatch(setMessage("Invalid password!"));

      if (err.code === "auth/user-not-found")
        dispatch(setMessage("Email doesn't exist, pls signup first"));
      console.dir(err);
      if (err.code === "auth/too-many-requests")
        dispatch(setMessage("To many attempts, pls try again later"));
    }
    dispatch(setIsLoading(false));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit,
  });

  return (
    <>
      {currentUser && <Redirect to="/" />}
      <div className="w-full h-full flex items-center justify-center p-2">
        <div className="w-80 bg-white shadow-xl rounded-lg p-4 flex flex-col gap-4 ">
          <h1 className="text-2xl text-gray-700">Sign in</h1>
          <SigninSignupWithGoogleButton
            title="Sign in with Google"
            onClick={() => signInWithGoogle()}
          />
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
            <TextInput
              label="Password"
              type="password"
              changeToType="text"
              placeholder="Enter your password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              IconA={<AiFillEye />}
              IconB={<AiFillEyeInvisible />}
            />

            <Button
              bgColor="blue"
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
            >
              Sign in
            </Button>
            <div className="w-full text-center text-sm ">
              <Link
                className="text-blue-500 font-bold hover:text-blue-600 "
                to="/forgotPassword"
              >
                Forgot Password?
              </Link>
            </div>
            <Devider />
            <div className="w-full text-center text-sm text-gray-400">
              <p>Don't have an account?</p>
              <Link
                className="text-blue-500 font-bold hover:text-blue-600"
                to="/signup"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
