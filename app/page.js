import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, List, Share, ThumbsUp } from 'lucide-react'

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


export default function Home(){
  return(
  <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create, Share, and Vote on Lists
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  WhatTo helps you make decisions collaboratively. Create lists, share them with friends, and vote on the best options.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
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
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
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
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Making Better Decisions?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join WhatTo today and experience the power of collaborative decision-making.
                </p>
              </div>
              <Button asChild>
                <Link href="/signup">Sign Up Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 WhatTo. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-center text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}
