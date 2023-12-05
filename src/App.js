import React from "react";
import MenuBar from "./MenuBar/MenuBar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import HomePage from "./Pages/HomePage";
import ForecastPage from "./Pages/ForecastPage";
import ClimatologyPage from "./Pages/ClimatologyPage";
import HallOfFame from "./Pages/HallOfFame";
import HistoryPage from "./Pages/HistoryPage";
import StandingsPage from "./Pages/StandingsPage";
import ProfilePage from "./Pages/ProfilePage";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { BackEnd } from "./Utils/HttpClient";
import { updateUser } from "./redux/actions/user";
import { updateStatus } from "./redux/actions/status";
import AdminPage from "./Pages/Admin/AdminPage";
import AdminForecastPage from "./Pages/Admin/AdminForecastPage";
import AdminUserPage from "./Pages/Admin/AdminUserPage";
import AdminObservationPage from "./Pages/Admin/AdminObservationPage";
import AdminForecastDatePage from "./Pages/Admin/AdminForecastDatePage";

const salisbury = createTheme({
  palette: {
    primary: {
      main: "#800000",
    },
    secondary: {
      main: "#F7C55A",
    },
  },
});

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.token);
  const isAdmin = useSelector((store) => store.user?.isAdmin);
  
  const isRegistrationAllowed = useSelector(
    (store) => store.status.registrationOpen
  );
  

  BackEnd.get("status").then((resp) => {
    if (resp?.status < 300) {
      dispatch(updateStatus(resp.data));
    }
  });
  if (token) {
    BackEnd.get("user/me").then((resp) => {
      if (resp?.status < 300) {
        dispatch(updateUser(resp.data));
      }
    });
  }

  return (
    <MuiThemeProvider theme={salisbury}>
      <BrowserRouter>
        {!token ? (
          <Switch>
            { isRegistrationAllowed && (
              <Route path={"/register"} component={Register} />
            )}
            <Route path={"/login"} component={Login} />
            <Route>
              <Redirect to={"/login"} />
            </Route>
          </Switch>
        ) : (
          <>
            <MenuBar />
            <Switch>
              <Route exact path={"/"} component={HomePage} />
              <Route path={"/forecast"} component={ForecastPage} />
              <Route path={"/history"} component={HistoryPage} />
              <Route path={"/standings"} component={StandingsPage} />
              <Route path={"/climatology"} component={ClimatologyPage} />
              <Route path={"/hof"} component={HallOfFame} />
              <Route path={"/profile"} component={ProfilePage} />
              {isAdmin && <Route exact path={"/admin"} component={AdminPage} />}
              {isAdmin && (
                <Route path={"/admin/forecast"} component={AdminForecastPage} />
              )}
              {isAdmin && (
                <Route
                  path={"/admin/observed"}
                  component={AdminObservationPage}
                />
              )}
              {isAdmin && (
                <Route path={"/admin/newUser"} component={AdminUserPage} />
              )}
              {isAdmin && (
                <Route
                  path={"/admin/forecastDate"}
                  component={AdminForecastDatePage}
                />
              )}
              {isAdmin && (
                <Route path={"/admin/registration"} component={AdminPage} />
              )}
              <Route>
                <Redirect to={"/"} />
              </Route>
            </Switch>
          </>
        )}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
