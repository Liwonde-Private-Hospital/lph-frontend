import React from "react";
import { Center, Text } from "@chakra-ui/react";

const AccessDenied: React.FC = () => {
  return (
    <Center h="100vh">
      <Text fontSize="2xl" color="red.500">
        Access Denied: You do not have permission to view this page.
      </Text>
    </Center>
  );
};

export default AccessDenied;
