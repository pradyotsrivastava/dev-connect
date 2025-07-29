import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to DevConnect 👋
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A community platform for developers to showcase projects, get
          feedback, and connect with other creators.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/all-projects"
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition"
          >
            Explore Projects
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          What You Can Do
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Create Profile
            </h3>
            <p className="text-gray-600">
              Build your personal dev profile with your name, bio, and links.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Share Projects
            </h3>
            <p className="text-gray-600">
              Post your work with descriptions and live/demo links to showcase
              your skills.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Give Feedback
            </h3>
            <p className="text-gray-600">
              Browse projects and leave comments to support and engage with
              other developers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Ready to join the DevConnect community?
        </h2>
        <Link
          to="/register"
          className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition"
        >
          Create Your Profile
        </Link>
      </section>
    </div>
  );
};

export default Home;
