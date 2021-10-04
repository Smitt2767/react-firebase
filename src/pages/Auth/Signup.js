import React from "react";
import SigninSignupWithGoogleButton from "../../components/Button/SigninSignupWithGoogleButton";
import Devider from "../../components/Devider/Devider";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput/TextInput";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "../../components/Button/Button";
import { Link, Redirect } from "react-router-dom";
import {
  signInWithGoogle,
  signup,
  currentUserProfileDocument,
  signOut,
} from "../../services/authService";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setMessage } from "../../store/layoutSlice";

const initialValues = {
  username: "",
  email: "",
  password: "",
  checkedTermsAndPrivacy: false,
};

const Signup = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("username must be required"),
    email: Yup.string()
      .email("invalid email")
      .required("email must be required"),
    password: Yup.string()
      .min(6, "password length must be 6 or more than 6")
      .required("password must be required"),
    checkedTermsAndPrivacy: Yup.bool().required(""),
  });

  const onSubmit = async (values) => {
    dispatch(setIsLoading(true));
    try {
      const user = await signup(values);
      user.user.sendEmailVerification();
      signOut();
      dispatch(setMessage("We have sent an email to confirm your account."));

      await currentUserProfileDocument(user.user, {
        displayName: values.username,
      });
    } catch (err) {
      if (err.code === "auth/weak-password") {
        dispatch(setMessage("password must be 6 charactor long"));
      }
      if (err.code === "auth/email-already-in-use") {
        dispatch(setMessage("already registered, pls login to continue"));
      }
      dispatch(setIsLoading(false));
    }
    formik.resetForm();
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
        <div className="w-80 bg-white shadow-xl rounded-lg p-4 flex flex-col gap-4">
          <h1 className="text-2xl text-gray-700">Sign up</h1>
          <SigninSignupWithGoogleButton
            title="Sign up with Google"
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
              label="Name"
              type="text"
              placeholder="Enter your name"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : ""
              }
              value={formik.values.username}
            />
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
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="checkedTermsAndPrivacy"
                onChange={formik.handleChange}
                value={formik.values.checkedTermsAndPrivacy}
                className="cursor-pointer"
              />
              <p className="text-gray-400 text-xs font-bold">
                I agree with
                <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
                  {" "}
                  Terms{" "}
                </span>
                and
                <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
                  {" "}
                  Privacy
                </span>
              </p>
            </div>
            <Button
              bgColor="blue"
              type="submit"
              disabled={
                !formik.isValid ||
                !formik.dirty ||
                !formik.values.checkedTermsAndPrivacy
              }
            >
              Sign up
            </Button>
            <Devider />
            <div className="w-full text-center text-sm text-gray-400">
              <p>Already have an account?</p>
              <Link
                className="text-blue-500 font-bold hover:text-blue-600"
                to="/signin"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
