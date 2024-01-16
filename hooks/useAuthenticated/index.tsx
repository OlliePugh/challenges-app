import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { Redirect } from "expo-router";

export default () => {
  const { user } = useSelector((state: RootState) => state.user);
  if (user == null) {
    return <Redirect href="/auth/sign-in" />;
  }
};
