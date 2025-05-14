import Navbar from "../components/navbar/Navbar"
import Footer from "../components/Footer"
import Image01 from "../images/home-image.png"
import "../App.css"

function Homepage() {
  return (
    <div 
      className="flex flex-col min-h-screen font-Poppins"
      style={{ background: "linear-gradient(to bottom, #73AE88, #142D1D)" }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden md:pt-24 md:pb-32">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                <span className="block">Modern solutions for</span>
                <span className="block text-primary-600">your digital needs</span>
              </h1>
              <p className="max-w-2xl text-lg text-white md:text-xl md:max-w-3xl">
                Create stunning experiences with our platform. Built for developers and designers who want to move fast.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                <button className="px-6 py-3 font-medium text-white transition-colors rounded-lg shadow-lg bg-primary-600 hover:bg-primary-700 shadow-primary-600/20">
                  Get Started
                </button>
                <button className="px-6 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative z-10 overflow-hidden shadow-2xl rounded-2xl">
                <img src={Image01 || "/placeholder.svg"} alt="Modern home" className="object-cover w-full h-auto" />
              </div>
              <div className="absolute w-64 h-64 rounded-full opacity-50 -bottom-6 -right-6 bg-primary-200 filter blur-3xl"></div>
              <div className="absolute w-48 h-48 rounded-full opacity-50 -top-6 -left-6 bg-secondary-200 filter blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 ">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Our Features</h2>
            <p className="max-w-2xl mx-auto text-lg text-white">
              Everything you need to create amazing digital experiences
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Modern Design",
                description: "Clean, responsive layouts that look great on any device",
                icon: "✨",
              },
              {
                title: "Fast Performance",
                description: "Optimized for speed to provide the best user experience",
                icon: "⚡",
              },
              {
                title: "Easy Integration",
                description: "Simple to integrate with your existing systems and workflows",
                icon: "🔄",
              },
            ].map((feature, index) => (
              <div key={index} className="p-8 transition-shadow shadow-sm bg-gray-50 rounded-xl hover:shadow-md">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      

      {/* CTA Section */}
    

      <Footer />
    </div>
  )
}

export default Homepage
