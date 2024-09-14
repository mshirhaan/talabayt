// src/app/my-requests/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface MaintenanceRequest {
  id: string;
  category: string;
  specificIssue: string;
  status: string;
  createdAt: Date;
}

export default function MyRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (user) {
        const q = query(
          collection(db, "maintenanceRequests"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedRequests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        })) as MaintenanceRequest[];
        setRequests(fetchedRequests);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  return (
    <ProtectedRoute>
      <Container maxW={"5xl"} py={12}>
        <Heading as="h1" mb={6} color={"#002f6d"}>
          My Maintenance Requests
        </Heading>
        {loading ? (
          <Spinner />
        ) : requests.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {requests.map((request) => (
              <Box key={request.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{request.specificIssue}</Heading>
                <Text mt={4}>Category: {request.category}</Text>
                <Text>Status: {request.status}</Text>
                <Text>Created: {request.createdAt.toLocaleDateString()}</Text>
              </Box>
            ))}
          </VStack>
        ) : (
          <Text>You haven&apos;t submitted any maintenance requests yet.</Text>
        )}
      </Container>
    </ProtectedRoute>
  );
}
