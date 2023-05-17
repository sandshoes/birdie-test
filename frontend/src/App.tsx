import "./App.css";
import Alerts from "./components/Alerts";
import EventsTable from "./components/EventsTable";
import GraphicInformation from "./components/GraphicInformation";
import AskDoc from "./components/AskDoc";
import AuthComponent from "./components/Auth/Auth";
import { useAuth } from "./AuthContext";
import LoginBar from "./components/Auth/LoginBar";

const App = () => {
  const auth = useAuth();
  console.log(auth)
  if (!auth.session) {
    return <AuthComponent />;
  }

  return (
    <div className="app-container">
      <LoginBar />
      <div className="main-content">
        <div className="left-side">
          <Alerts />
          <AskDoc />
        </div>
        <div className="right-side">
          <EventsTable />
        </div>
      </div>
      <div className="graphic-info">
        <GraphicInformation />
      </div>
    </div>
  );
};

export default App;
