import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Square from "./components/Loader/Square";
import { auth } from "./config/firebase.config";
import { currentUserProfileDocument, signOut } from "./services/authService";
import { setCurrentUser } from "./pages/Auth/store/authSlice";
import { setIsLoading, setMessage } from "./store/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import FullScreenLoader from "./components/Loader/FullScreenLoader";
import Alert from "./components/Alert/Alert";
import _404 from "./pages/_404";
import { AnimatePresence } from "framer-motion";

const Signin = lazy(() =>
  import(/* webpackChunkName: 'Signin' */ "./pages/Auth/Signin")
);
const Signup = lazy(() =>
  import(/* webpackChunkName: 'Signup' */ "./pages/Auth/Signup")
);
const ForgotPassword = lazy(() =>
  import(
    /* webpackChunkName: 'Forgot Password' */ "./pages/Auth/ForgotPassword"
  )
);
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ "./pages/Home"));
const Projects = lazy(() =>
  import(
    /* webpackChunkName: 'Projects' */
    "./pages/projects/Projects"
  )
);
const Profile = lazy(() =>
  import(
    /* webpackChunkName: 'Profile' */
    "./pages/Profile"
  )
);
const Settings = lazy(() => import("./pages/Settings"));

const App = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, message } = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  useEffect(() => {
    let id;
    if (!!message) {
      setOpen(true);
      id = setTimeout(() => {
        setOpen(false);
        dispatch(setMessage(""));
      }, 5000);
    }
    return () => clearTimeout(id);
  }, [message]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      dispatch(setIsLoading(true));

      if (user) {
        if (!user.emailVerified) {
          dispatch(setMessage("Your account is not verified, verify first."));
          signOut();
          dispatch(setIsLoading(false));
        } else {
          const userRef = await currentUserProfileDocument(user);
          userRef.onSnapshot((snapshot) => {
            dispatch(
              setCurrentUser({
                uid: snapshot.id,
                ...snapshot.data(),
                createdAt: snapshot.data()?.createdAt.toDate(),
              })
            );
            dispatch(setIsLoading(false));
          });
        }
      } else {
        dispatch(setCurrentUser(user));
        dispatch(setIsLoading(false));
      }
    });
    return () => unsub();
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => dispatch(setMessage("")), 300);
  };

  return (
    <>
      <AnimatePresence>
        {!!open && <Alert message={message} onClose={handleClose} />}
      </AnimatePresence>

      <div className="h-screen w-screen bg-gray-100">
        <Suspense
          fallback={
            <FullScreenLoader>
              <Square />
            </FullScreenLoader>
          }
        >
          <Router>
            {!isLoading && (
              <Switch>
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route
                  exact
                  path="/forgotPassword"
                  component={ForgotPassword}
                />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/projects" component={Projects} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/settings" component={Settings} />
                <Route path="*" component={_404} />
              </Switch>
            )}
          </Router>

          {isLoading && (
            <FullScreenLoader>
              <Square />
            </FullScreenLoader>
          )}
        </Suspense>
      </div>
    </>
  );
};

export default App;
