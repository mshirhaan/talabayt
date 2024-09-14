import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Box,
} from "@chakra-ui/react";

export function MaintenanceRequestForm({ category }: { category: string }) {
  const [specificIssue, setSpecificIssue] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("Low - No rush");
  const [preferredTimes, setPreferredTimes] = useState<string[]>([]);
  const { user } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, "maintenanceRequests"), {
        userId: user.uid,
        category,
        specificIssue,
        description,
        urgency,
        preferredTimes,
        status: "pending",
        createdAt: new Date(),
      });
      toast({
        title: "Request submitted.",
        description: "We've received your maintenance request.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Reset form fields
      setSpecificIssue("");
      setDescription("");
      setUrgency("Low - No rush");
      setPreferredTimes([]);
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "An error occurred.",
        description: "Unable to submit your request. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        <FormControl isRequired>
          <FormLabel>Specific Issue</FormLabel>
          <Input
            value={specificIssue}
            onChange={(e) => setSpecificIssue(e.target.value)}
            placeholder="E.g., Leaky faucet, Broken light switch"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide more details about the issue"
          />
        </FormControl>

        <FormControl as="fieldset" isRequired>
          <FormLabel as="legend">Urgency Level</FormLabel>
          <RadioGroup value={urgency} onChange={(value) => setUrgency(value)}>
            <Stack direction="column">
              <Radio value="Low - No rush">Low - No rush</Radio>
              <Radio value="Medium - Needs attention soon">
                Medium - Needs attention soon
              </Radio>
              <Radio value="High - Urgent issue">High - Urgent issue</Radio>
              <Radio value="Emergency - Immediate attention required">
                Emergency - Immediate attention required
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <Box>
          <Button type="submit" colorScheme="blue" width="full">
            Submit Request
          </Button>
        </Box>
      </VStack>
    </form>
  );
}
