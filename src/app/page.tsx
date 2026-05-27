import type { Metadata } from "next";
import HomePageClient from "../pages/HomePage";

export const metadata: Metadata = {
  title: "Flowtica — Media & Growth",
  description:
    "Build a predictable client acquisition system. Strategy, creative, and execution — built around your business.",
};

export default function HomePage() {
  return <HomePageClient />;
}
