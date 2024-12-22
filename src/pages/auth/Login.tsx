import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/input";
import { login } from "../../redux/slice/auth.slice";
import { RootState, AppDispatch } from "../../redux/store";
import style from "./style.module.css"; // Assuming you have a CSS module for styles
import CustomButton from "../../components/button";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const initialValues: FormValues = { email: "", password: "" };

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth) as {
    loading: boolean;
    error: string | { message: string } | null;
  };

  const onSubmit = async (values: FormValues): Promise<void> => {
    const resultAction = await dispatch(login(values));
    if (login.fulfilled.match(resultAction)) {
      navigate("/");
    } else if (login.rejected.match(resultAction)) {
      toast.error(resultAction.payload as string);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className={style.auth_form}>
              <CustomInput name="email" label="Email" placeholder="Email" />
              <CustomInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <CustomButton type="submit" label="Login" disabled={loading} />
              {error && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {typeof error === "string" ? error : error.message}
                </Typography>
              )}
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login;
