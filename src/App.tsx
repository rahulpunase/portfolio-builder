import { Provider } from "react-redux";
import RouterConfiguration from "./router-configuration";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <RouterConfiguration />
    </Provider>
  );
}

export default App;
