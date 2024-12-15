import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function VerificationPendingPage() {
  const textColor = useColorModeValue("gray.800", "gray.200");
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box minH="100vh" bg={bgColor} color={textColor}>
      <Center h="100vh">
        <VStack gap={8}>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Your verification is pending, please contact Brother Green (4FA18),
            De Burgo (2SP20), or Ndofor (3FA21)
          </Text>
          <HStack gap={4}>
            <Button as={NextLink} href="/signin">
              Sign In
            </Button>
            <Button as={NextLink} href="/signup">
              Sign Up
            </Button>
          </HStack>
          <Button onClick={toggleColorMode}>
            Switch to {colorMode === "light" ? "Dark" : "Light"} Mode
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
