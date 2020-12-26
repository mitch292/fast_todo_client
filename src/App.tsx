import React, { useEffect } from "react";
import { View } from "react-native-web";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login, Register } from "./Auth";
import { Tasks } from "./Tasks";
import { useStore } from "./store";

export const App = (): JSX.Element => {
  const {
    auth: { setInitialStatus },
  } = useStore();

  useEffect(() => {
    setInitialStatus();
  }, []);

  return (
    <Router>
      <View>
        <Switch>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </View>
    </Router>
  );
};
