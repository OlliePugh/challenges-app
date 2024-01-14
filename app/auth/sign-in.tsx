import { Link, Redirect, Stack } from "expo-router";
import { Text, View } from "../../components/Themed";
import { ErrorMessage, Formik, FormikHandlers } from "formik";
import { Button, Pressable, TextInput } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FirebaseError } from "firebase/app";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";

// Create a yup schema for validation
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

interface signInFormContents {
  email: string;
  password: string;
}

const SignIn = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user != null) {
    return <Redirect href={"/"} />;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Sign In",
          headerTitleStyle: {
            color: "black",
            fontWeight: "bold",
          },
        }}
      />
      <Formik
        initialValues={{ email: "", password: "" } as signInFormContents}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
          } catch (e) {
            const firebaseError = e as FirebaseError;
            console.log(firebaseError.code);

            if (firebaseError.code === "auth/invalid-credential") {
              setErrors({ password: "Invalid Email or password" });
            } else {
              setErrors({
                password: "Something went wrong, please try again later",
              });
            }
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
            />

            {errors.email && touched.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}

            <TextInput
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
            <Button onPress={() => handleSubmit()} title="Submit" />
            <Link href="/auth/register" asChild>
              <Pressable>
                <Text>Register</Text>
              </Pressable>
            </Link>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
