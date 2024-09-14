"use client";

import { MaintenanceRequestForm } from "@/components/MaintenanceRequestForm";
import { Box, Heading, Text, Container, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function RequestCategoryForm({ params }: { params: { category: string } }) {
  const router = useRouter();
  const category = params.category;

  return (
    <Container maxW="container.md" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl" mb={4}>
          Submit a Request for {category.charAt(0).toUpperCase() + category.slice(1)}
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Please provide as much detail as possible to help us address your maintenance needs efficiently.
        </Text>
      </Box>

      <MaintenanceRequestForm category={category} />

      <Button mt={6} colorScheme="blue" onClick={() => router.back()}>
        Go Back
      </Button>
    </Container>
  );
}
