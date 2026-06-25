import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ServerWakeup from "./Components/ServerWakeup.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ServerWakeup>
      <App />
    </ServerWakeup>
  </BrowserRouter>
);
