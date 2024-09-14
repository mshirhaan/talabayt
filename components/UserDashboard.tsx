import React from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiAlertCircle, FiClock, FiCheckCircle } from "react-icons/fi";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  stat: number | string;
  status: string;
  icon: IconType; // Type for the icon (from react-icons)
}

const StatCard: React.FC<StatCardProps> = ({ title, stat, status, icon }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      bg={bgColor}
    >
      <StatLabel fontWeight={"medium"} isTruncated color={textColor}>
        {title}
      </StatLabel>
      <StatNumber
        fontSize={"2xl"}
        fontWeight={"medium"}
        color={useColorModeValue("gray.800", "white")}
      >
        {stat}
      </StatNumber>
      <StatHelpText>
        <Box as={icon} display="inline-block" mr={2} />
        {status}
      </StatHelpText>
    </Stat>
  );
};

export default function UserDashboard() {
  const router = useRouter();

  // Placeholder data - replace with real data from your backend
  const activeRequests = 2;
  const pendingRequests = 1;
  const completedRequests = 5;

  return (
    <Box maxWidth="1200px" margin="auto" p={5}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>Welcome back, [User Name]</Heading>
          <Text fontSize="xl">
            Here&apos;s an overview of your maintenance requests:
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatCard
            title="Active Requests"
            stat={activeRequests}
            status="In Progress"
            icon={FiClock}
          />
          <StatCard
            title="Pending Requests"
            stat={pendingRequests}
            status="Awaiting Review"
            icon={FiAlertCircle}
          />
          <StatCard
            title="Completed Requests"
            stat={completedRequests}
            status="Resolved"
            icon={FiCheckCircle}
          />
        </SimpleGrid>

        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => router.push("/request")}
        >
          Create New Maintenance Request
        </Button>

        {/* Placeholder for additional sections */}
        <Box>
          <Heading size="md" mb={4}>
            Upcoming Maintenance Visits
          </Heading>
          <Text>No upcoming visits scheduled.</Text>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Recent Activity
          </Heading>
          <Text>No recent activity to display.</Text>
        </Box>
      </VStack>
    </Box>
  );
}
