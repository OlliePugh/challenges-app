import React from "react";
import { Link, Redirect, Stack } from "expo-router";
import { Text, View } from "../../components/Themed";
import { Formik } from "formik";
import { Button, TextInput } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is Required"),
});

interface RegisterFormContents {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user != null) {
    return <Redirect href={"/"} />;
  }
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Register",
          headerTitleStyle: {
            color: "black",
            fontWeight: "bold",
          },
        }}
      />
      <Formik
        initialValues={
          {
            email: "",
            password: "",
            confirmPassword: "",
          } as RegisterFormContents
        }
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
          } catch (e) {
            const firebaseError = e as FirebaseError;
            if (firebaseError.code === "auth/email-already-in-use") {
              setErrors({ email: "Email is already in use" });
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

            <TextInput
              secureTextEntry
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
            )}

            <Button onPress={() => handleSubmit()} title="Register" />
            <Link href="/auth/sign-in">
              <Text>Already have an account? Sign In</Text>
            </Link>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;
