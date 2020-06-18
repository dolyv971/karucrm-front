import React from "react";
import { useSelector } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
// Notification
import "react-notifications/lib/notifications.css";
import { notificationSelector } from "./redux/selectors/selectors";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Login/Login"));
const Register = React.lazy(() => import("./views/Register/Register"));
const UserValidate = React.lazy(() => import("./views/User/Validate/Validate"));
const UserInitPassword = React.lazy(() =>
  import("./views/User/InitPassword/InitPassword")
);
// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const App = () => {
  const notification = useSelector(notificationSelector);
  console.log(notification);

  React.useEffect(() => {
    if (notification.visible) {
      if (notification.type === "success") {
        NotificationManager.success(
          notification.message,
          notification.title,
          notification.time
        );
      } else if (notification.type === "info") {
        NotificationManager.info(
          notification.message,
          notification.title,
          notification.time
        );
      } else if (notification.type === "error") {
        NotificationManager.error(
          notification.message,
          notification.title,
          notification.time
        );
      }
    }
  }, [notification]);
  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route
            exact
            path="/"
            name="Login"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Inscription"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/users/validation/:userId/:confirmationToken"
            name="Validation de compte"
            render={(props) => <UserValidate {...props} />}
          />
          <Route
            exact
            path="/users/init-password/:userId/:resetPasswordToken"
            name="Initialiser votre mot de passe"
            render={(props) => <UserInitPassword {...props} />}
          />
          {/*              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
        </Switch>
        <NotificationContainer />
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
