import React from 'react';

const Landing = ({ onGetStarted, onSignIn }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top pill navbar */}
      <header className="flex justify-center pt-6">
        <div className="flex items-center justify-between w-full max-w-5xl bg-white rounded-full shadow-md px-6 py-3">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
            <span className="font-semibold">Active</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <a className="hover:text-gray-900" href="#solutions">Solutions</a>
            <a className="hover:text-gray-900" href="#how">How it works</a>
            <a className="hover:text-gray-900" href="#pricing">Pricing</a>
          </nav>
          <div className="flex items-center space-x-3">
            <button onClick={onSignIn} className="text-sm font-semibold text-gray-700 hover:text-gray-900">Sign in</button>
            <button onClick={onGetStarted} className="text-sm bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900">Get started</button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="mt-10 bg-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold">Take Control of Your Social Media</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-indigo-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
          <button onClick={onGetStarted} className="mt-8 inline-flex items-center bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-900">
            Get started
          </button>
        </div>
      </section>

      {/* Product mock */}
      <section className="-mt-10 pb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <div className="rounded-xl border border-gray-200 p-4">
            {/* Simple mock using grid and chart line */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-indigo-100"></div>
              ))}
            </div>
            <div className="h-24 w-full rounded bg-gradient-to-r from-indigo-100 to-indigo-200" />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Let's grow your social media
            <span className="block">presence</span>
          </h2>
          <p className="mt-3 text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Schedule', desc: 'Plan posts and manage calendars efficiently.' },
            { title: 'Publish', desc: 'Publish to multiple channels with ease.' },
            { title: 'Analyze', desc: 'Track performance with intuitive dashboards.' },
            { title: 'Get leads', desc: 'Capture audience interest and convert.' },
          ].map((f, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">{idx + 1}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;