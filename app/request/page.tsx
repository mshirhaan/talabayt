"use client";

import {
  Box,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { maintenanceCategories } from "@/constants/maintenanceCategories";

export default function RequestForm() {
  const router = useRouter();

  // Get the color mode values
  const bg = useColorModeValue("white", "gray.800");
  const buttonBg = "#002f6d";
  const buttonHoverBg = "#001f4d";

  const handleCategoryClick = (category: string) => {
    router.push(`/request/${category.toLowerCase().replace(" ", "-")}`); // Navigate to the specific category route
  };

  return (
    <Box py={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Select a Maintenance Category
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {maintenanceCategories.map(({ name, icon: IconComponent }) => (
          <VStack
            key={name}
            bg={bg}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            p={6}
            textAlign={"center"}
            align={"center"}
            spacing={4}
          >
            {/* Wrap IconComponent inside Chakra's Icon component */}
            <Icon as={IconComponent} w={10} h={10} color="#ff9202" />
            <Heading fontSize={"2xl"}>{name}</Heading>
            <Text color={"gray.500"}>
              {`Submit a request for ${name} services`}
            </Text>
            <Button
              onClick={() => handleCategoryClick(name)}
              mt={2}
              fontSize={"sm"}
              rounded={"full"}
              bg={buttonBg}
              color={"white"}
              _hover={{
                bg: buttonHoverBg,
              }}
              _focus={{
                bg: buttonHoverBg,
              }}
            >
              Select {name}
            </Button>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
