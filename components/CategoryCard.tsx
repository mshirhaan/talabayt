// src/components/CategoryCard.tsx

import { Box, Text, Flex } from "@chakra-ui/react";

interface CategoryCardProps {
  category: string;
  onSelect: () => void;
}

export function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <Box
      onClick={onSelect}
      p={6}
      bg="gray.100"
      borderRadius="md"
      cursor="pointer"
      _hover={{ bg: "gray.200" }}
      transition="background-color 0.2s"
    >
      <Flex justify="center" align="center" height="100%">
        <Text fontSize="lg" fontWeight="bold">
          {category}
        </Text>
      </Flex>
    </Box>
  );
}
