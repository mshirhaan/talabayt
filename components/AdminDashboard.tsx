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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiAlertCircle,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";
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

export default function AdminDashboard() {
  // Placeholder data - replace with real data from your backend
  const pendingRequests = 5;
  const inProgressRequests = 3;
  const completedRequests = 15;
  const monthlyRevenue = 5000;

  const recentRequests = [
    { id: 1, title: "Leaky Faucet", status: "Pending", date: "2023-09-15" },
    { id: 2, title: "Broken AC", status: "In Progress", date: "2023-09-14" },
    { id: 3, title: "Paint Touch-up", status: "Completed", date: "2023-09-13" },
  ];

  return (
    <Box maxWidth="1200px" margin="auto" p={5}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>Admin Dashboard</Heading>
          <Text fontSize="xl">
            Here&apos;s an overview of all maintenance requests:
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
          <StatCard
            title="Pending Requests"
            stat={pendingRequests}
            status="Needs Action"
            icon={FiAlertCircle}
          />
          <StatCard
            title="In Progress"
            stat={inProgressRequests}
            status="Active"
            icon={FiClock}
          />
          <StatCard
            title="Completed Requests"
            stat={completedRequests}
            status="This Month"
            icon={FiCheckCircle}
          />
          <StatCard
            title="Monthly Revenue"
            stat={`$${monthlyRevenue}`}
            status="This Month"
            icon={FiDollarSign}
          />
        </SimpleGrid>

        <Box>
          <Heading size="md" mb={4}>
            Recent Maintenance Requests
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Status</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentRequests.map((request) => (
                <Tr key={request.id}>
                  <Td>{request.id}</Td>
                  <Td>{request.title}</Td>
                  <Td>{request.status}</Td>
                  <Td>{request.date}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Button colorScheme="blue" size="lg">
          View All Requests
        </Button>

        {/* Placeholder for additional sections */}
        <Box>
          <Heading size="md" mb={4}>
            Performance Metrics
          </Heading>
          <Text>Average Response Time: 24 hours</Text>
          <Text>Customer Satisfaction: 4.5/5</Text>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Inventory Status
          </Heading>
          <Text>Low stock alert: Plumbing fixtures, Light bulbs</Text>
        </Box>
      </VStack>
    </Box>
  );
}
