import { useAuth } from "../context/AuthContext";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Box p={8}>
        <Heading>Please Sign In</Heading>
      </Box>
    );
  }

  console.log(user);

  return (
    <Box p={8}>
      <VStack gap={4}>
        <Heading>Welcome, {user.displayName || user.email}!</Heading>
        <Text>Email: {user.email}</Text>
        <Button onClick={logout}>Sign Out</Button>
      </VStack>
    </Box>
  );
}
