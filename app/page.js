import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, List, Share, ThumbsUp } from "lucide-react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Working } from "@/components/Working";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <div className="container mx-auto px-4 py-20">
//         <div className="text-center">
//           <h1 className="text-6xl font-bold mb-6">WhatTo?</h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Make better decisions together. Create lists, vote, and collaborate.
//           </p>
//           <Button size="lg" asChild>
//             <Link href="/signup">Get Started</Link>
//           </Button>
//         </div>

//         <div className="mt-20">
//           <h2 className="text-3xl font-semibold text-center mb-12">Features</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//           {/* <FeatureCard
//               title="Create Lists"
//               description="Make lists for anything - food, places, songs, cars, and more."
//             />
//             <FeatureCard
//               title="Collaborate"
//               description="Vote on items and make decisions together as a group."
//             />
//             <FeatureCard
//               title="Track History"
//               description="Keep track of all your lists and decisions over time."
//             /> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section>
          <Hero />
        </section>
        {/* <div className="space-x-4">
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div> */}
        <section id="features" className="">
          {/* <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <FeatureCard
                icon={<List className="h-10 w-10 mb-4" />}
                title="Create Lists"
                description="Easily create lists for any topic or decision you need to make."
              />
              <FeatureCard
                icon={<Share className="h-10 w-10 mb-4" />}
                title="Share with Others"
                description="Invite friends, family, or colleagues to contribute to your lists."
              />
              <FeatureCard
                icon={<ThumbsUp className="h-10 w-10 mb-4" />}
                title="Vote on Items"
                description="Collaboratively vote on list items to reach a consensus."
              />
            </div> */}
          <Features />
        </section>
        <section id="how-it-works" className="w-full ">
          {/* <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <ol className="grid gap-6 md:grid-cols-3">
              <li className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <span className="text-2xl font-bold">1</span>
                <h3 className="text-xl font-semibold">Create a List</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">Start by creating a new list and adding items.</p>
              </li>
              <li className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <span className="text-2xl font-bold">2</span>
                <h3 className="text-xl font-semibold">Share with Others</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">Invite people to view and contribute to your list.</p>
              </li>
              <li className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <span className="text-2xl font-bold">3</span>
                <h3 className="text-xl font-semibold">Vote and Decide</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">Everyone votes on the items, helping you make a decision.</p>
              </li>
            </ol>
          </div> */}
          <Working />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black border-t">
          <Subscribe/>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-black">
        <Footer/>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-center text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
