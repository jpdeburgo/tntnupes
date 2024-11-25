import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function SignIn() {
  const { user } = useAuth();
  const router = useRouter();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    router.push("/dashboard");
    return null;
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Sign In</Heading>
      <VStack gap={4}>
        <Button onClick={signInWithGoogle}>Sign In with Google</Button>
        {/* Add email-password sign-in */}
      </VStack>
    </Box>
  );
}
