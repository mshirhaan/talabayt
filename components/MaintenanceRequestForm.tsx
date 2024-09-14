// src/components/MaintenanceRequestForm.tsx

"use client";

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
  Select,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Box,
} from "@chakra-ui/react";

const maintenanceCategories = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Appliance Repair",
  "Structural",
  "Painting",
  "Flooring",
  "Landscaping",
  "Pest Control",
  "Other",
] as const;

const urgencyLevels = [
  "Low - No rush",
  "Medium - Needs attention soon",
  "High - Urgent issue",
  "Emergency - Immediate attention required",
] as const;

type MaintenanceCategory = (typeof maintenanceCategories)[number];
type UrgencyLevel = (typeof urgencyLevels)[number];
type PreferredTime = "morning" | "afternoon" | "evening";
type AdditionalService = "inspection" | "cleaning" | "preventive";

export function MaintenanceRequestForm() {
  const [category, setCategory] = useState<MaintenanceCategory | "">("");
  const [specificIssue, setSpecificIssue] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<UrgencyLevel>("Low - No rush");
  const [preferredTimes, setPreferredTimes] = useState<PreferredTime[]>([]);
  const [additionalServices, setAdditionalServices] = useState<
    AdditionalService[]
  >([]);
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
        additionalServices,
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
      setCategory("");
      setSpecificIssue("");
      setDescription("");
      setUrgency("Low - No rush");
      setPreferredTimes([]);
      setAdditionalServices([]);
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
          <FormLabel>Maintenance Category</FormLabel>
          <Select
            placeholder="Select category"
            value={category}
            onChange={(e) => setCategory(e.target.value as MaintenanceCategory)}
          >
            {maintenanceCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </FormControl>

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
          <RadioGroup
            value={urgency}
            onChange={(value) => setUrgency(value as UrgencyLevel)}
          >
            <Stack direction="column">
              {urgencyLevels.map((level) => (
                <Radio key={level} value={level}>
                  {level}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Preferred Service Times</FormLabel>
          <CheckboxGroup
            colorScheme="blue"
            value={preferredTimes}
            onChange={(values) => setPreferredTimes(values as PreferredTime[])}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Checkbox value="morning">Morning (8AM - 12PM)</Checkbox>
              <Checkbox value="afternoon">Afternoon (12PM - 5PM)</Checkbox>
              <Checkbox value="evening">Evening (5PM - 8PM)</Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Additional Services</FormLabel>
          <CheckboxGroup
            colorScheme="blue"
            value={additionalServices}
            onChange={(values) =>
              setAdditionalServices(values as AdditionalService[])
            }
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Checkbox value="inspection">General Inspection</Checkbox>
              <Checkbox value="cleaning">Cleaning Services</Checkbox>
              <Checkbox value="preventive">Preventive Maintenance</Checkbox>
            </Stack>
          </CheckboxGroup>
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
