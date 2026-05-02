import { Show, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

const Home = () => {
  return (
    <div
      className="relative bg-fixed bg-cover bg-center text-gray-800"
      style={{ backgroundImage: "url('/howrah_bridge.jpg')" }}
    >
      {/* Global overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <section className="bg-black/50  min-h-screen flex flex-col justify-center items-center text-center px-6  text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Local Problem Solver
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mb-6 text-gray-100">
          Report local issues like traffic, water supply, sanitation, and
          healthcare delays. Help authorities take faster action using
          AI-powered prioritization.
        </p>

        <Show when="signed-in">
          <div className="flex gap-4">
            <Link
              href="/post"
              className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Report a Problem
            </Link>

            <Link
              href="/dashboard"
              className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition"
            >
              View Problems
            </Link>
          </div>
        </Show>

        <Show when="signed-out">
          
            <SignInButton mode="modal" />
          
        </Show>
      </section>

      {/* 🚀 FEATURES SECTION */}
      <section className="bg-black/50 py-16 px-6 mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          🚀 Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "📍 Easy Reporting",
              desc: "Submit local problems with description, address, and map link in seconds.",
            },
            {
              title: "🤖 AI Categorization",
              desc: "Automatically classifies issues and assigns urgency using AI.",
            },
            {
              title: "📊 Smart Dashboard",
              desc: "View all reported problems with filters and real-time updates.",
            },
            {
              title: "🗺️ Location Tracking",
              desc: "Attach Google Maps links to pinpoint exact issue locations.",
            },
            {
              title: "⚡ Priority System",
              desc: "Issues ranked based on severity and urgency for faster action.",
            },
            {
              title: "👥 Multi-User System",
              desc: "Secure authentication and personalized problem tracking.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🧠 HOW IT WORKS */}
      <section className="bg-black/50 py-16 px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          🧠 How It Works
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="backdrop-blur-md px-2 py-4 rounded-2xl">
            <h3 className="text-xl text-white font-semibold mb-2">1️⃣ Report</h3>
            <p className="text-white">
              Users submit local issues with description and location.
            </p>
          </div>

          <div className="backdrop-blur-md px-2 py-4 rounded-2xl">
            <h3 className="text-xl text-white font-semibold mb-2">2️⃣ Analyze</h3>
            <p className="text-white">
              AI categorizes the problem and assigns urgency automatically.
            </p>
          </div>

          <div className="backdrop-blur-md px-2 py-4 rounded-2xl">
            <h3 className="text-xl text-white  font-semibold mb-2">3️⃣ Act</h3>
            <p className="text-white">
              Authorities prioritize and respond to high-impact issues.
            </p>
          </div>
        </div>
      </section>

      {/* 🎯 CTA SECTION */}
      <section className="py-16 px-6 text-center bg-black/50 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Make Your City Better Today 🚀
        </h2>

        <p className="mb-6 text-gray-100">
          Your voice matters. Report issues and help improve your community.
        </p>

        <Link
          href="/post"
          className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </section>

      {/* 📌 FOOTER */}
      <footer className="text-center py-6 text-gray-500 text-sm bg-black/90">
        © 2026 Local Problem Solver. Built with ❤️ by Supratim Mandal
      </footer>
    </div>
  );
};

export default Home;
