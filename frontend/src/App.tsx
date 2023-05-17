import "./App.css";
import Alerts from "./components/Alerts";
import EventsTable from "./components/EventsTable";
import GraphicInformation from "./components/GraphicInformation";
import AskDoc from "./components/AskDoc";
// import supabase from "./supabaseClient";
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'

const App = () => {
  // const [user, setUser] = useState(null);

  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // if (!session) {
  //   return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  // }

  return (
    <div className="app-container">
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
