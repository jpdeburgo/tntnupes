import {
  Box,
  Button,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ signInWithEmail, register, errors }) => (
  <form onSubmit={signInWithEmail}>
    <VStack gap={4}>
      <FormControl isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input type="email" {...register("email")} required />
        {errors.email && <p>{errors.email.message}</p>}
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("password")} required />
        {errors.password && <p>{errors.password.message}</p>}
      </FormControl>
      <Button type="submit">Sign In with Email</Button>
    </VStack>
  </form>
);

export default function SignIn() {
  const { authUser, user, signInWithEmailAndPassword, signInWithGoogle } =
    useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signInWithEmail = async (data) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      setError("Failed to sign in with email and password");
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <Box p={8}>
      <Heading mb={4}>Sign In</Heading>
      <VStack gap={4}>
        <SignInForm
          signInWithEmail={handleSubmit(signInWithEmail)}
          register={register}
          errors={errors}
        />
        {error && <p>{error}</p>}
        <Button onClick={signInWithGoogle}>Sign In with Google</Button>
      </VStack>
    </Box>
  );
}
