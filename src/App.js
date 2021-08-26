import './App.css';
import LoginPage from './components/Login/LoginPage'
import { Route, Switch } from "react-router-dom";
import Student from './components/Student/Student';
import Alumni from './components/Alumni/Alumni';

function App() {
  return (
    <Switch>
      <Route exact path="/">
       <LoginPage/>
      </Route>
      <Route path="/student" component={Student} />
      <Route path="/alumni" component={Alumni} />
    </Switch>
  );
}

export default App;
