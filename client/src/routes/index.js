import { createBrowserRouter} from "react-router-dom";
import Join from "../components/Join/Join";
import Chat from "../components/Chat/Chat";
import ErrorPageHandler from "../components/ErrorPageHandler/ErrorPageHandler";

const routes = createBrowserRouter([
  {
    path: "/join",
    element: <Join />,
  },
  {
    path:"/chat",
    element: <Chat />
  },
  {
    path:"/",
    errorElement: <ErrorPageHandler/>
  }
]);

export default routes;