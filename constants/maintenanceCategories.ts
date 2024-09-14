import {
  FaTools,
  FaPlug,
  FaFan,
  FaPaintRoller,
  FaBug,
  FaBroom,
  FaScrewdriver,
} from "react-icons/fa";

export const maintenanceCategories = [
  { name: "Plumbing", icon: FaTools },
  { name: "Electrical", icon: FaPlug },
  { name: "HVAC", icon: FaFan },
  { name: "Carpentry", icon: FaScrewdriver },
  { name: "Painting", icon: FaPaintRoller },
  { name: "Pest Control", icon: FaBug },
  { name: "Cleaning", icon: FaBroom },
  { name: "Appliance Repair", icon: FaTools },
] as const;
