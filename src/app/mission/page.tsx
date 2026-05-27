import type { Metadata } from "next";
import MissionPage from "../../views/MissionPage";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "Our mission is to give business owners the system, the clarity, and the confidence to grow.",
};

export default function Mission() {
  return <MissionPage />;
}
