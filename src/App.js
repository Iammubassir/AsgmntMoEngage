import "./App.css";
import HomePage from "./components/HomePage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import animeCardDetails from "./components/AnimeCardDetails";
import NotFound from "http-errors";
import ProtectedRoute from "./components/ProtectedPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute
            exact
            path="/anime-search/:id/:title"
            component={animeCardDetails}
          />
          <ProtectedRoute component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
