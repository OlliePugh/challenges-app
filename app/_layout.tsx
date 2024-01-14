import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import { store } from "../redux/state/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
