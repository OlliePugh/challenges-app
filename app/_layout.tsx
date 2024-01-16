import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import { store } from "../redux/state/store";
import AuthListener from "../components/AuthListener";

export default function Layout() {
  return (
    <Provider store={store}>
      <AuthListener>
        <Stack />
      </AuthListener>
    </Provider>
  );
}
