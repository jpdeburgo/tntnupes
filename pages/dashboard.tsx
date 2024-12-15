import { useAuth } from "../context/AuthContext";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import withAuth from "../utils/withAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box p={8}>
      <VStack gap={4}>
        <Heading>Welcome, {user.displayName || user.email}!</Heading>
        <Text>Email: {user.email}</Text>
        <Button onClick={logout}>Sign Out</Button>
      </VStack>
    </Box>
  );
};

export default withAuth(Dashboard);
