// src/app/request/page.tsx

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MaintenanceRequestForm } from "@/components/MaintenanceRequestForm";
import { Box, Heading, Text, Container } from "@chakra-ui/react";

export default function RequestForm() {
  return (
    <ProtectedRoute>
      <Container maxW="container.md" py={8}>
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            Submit a Maintenance Request
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Please provide as much detail as possible to help us address your
            maintenance needs efficiently.
          </Text>
        </Box>
        <MaintenanceRequestForm />
      </Container>
    </ProtectedRoute>
  );
}
