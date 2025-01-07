"use client";
import React from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { WavyBackground } from "./ui/wavy-background";
import Image from "next/image";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "Collaborative Voting",
    description:
      "Work together in real time with your team, friends, and collaborators. Collaborate on topics, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Voting
      </div>
    ),
  },
  {
    title: "Real time voting",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your voting. Say goodbye to the chaos of delayed updates and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        Real time voting
      </div>
    ),
  },
  {
    title: "Image and Description",
    description:
      "Add images and descriptions to your voting. Our platform makes it easy to add images and descriptions to your voting, making it easier to understand and share your ideas.", 
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Image Description
      </div>
    ),
  },
  {
    title: "View History",
    description:
      "Keep track of all your lists and decisions over time. With our platform, you can view your list history in real time. No more confusion about the latest update of your voting.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        History at a Glance
      </div>
    ),
  },
];

const Features = () => {
  return (
    <div>
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Key Features
        </h2>
        <StickyScroll content={content} />
      </WavyBackground>
    </div>
  );
};

export default Features;
