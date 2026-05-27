import type { Metadata } from "next";
import FoundationPage from "../../pages/FoundationPage";

export const metadata: Metadata = {
  title: "Foundation",
  description:
    "We step into your business, build the system, and make sure you understand it.",
};

export default function Foundation() {
  return <FoundationPage />;
}
