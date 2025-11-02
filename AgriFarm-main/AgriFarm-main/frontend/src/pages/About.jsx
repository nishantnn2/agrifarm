import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Palette, Database } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const teamMembers = [
    {
      name: 'Nishant Patel',
      role: 'Full Stack Developer',
      icon: <Palette className="w-6 h-6" />,
      color: 'text-blue-400',
    },
    {
      name: 'Fazal',
      role: 'Team Leader',
      icon: <Code className="w-6 h-6" />,
      color: 'text-purple-400',
    },
    {
      name: 'Taslim',
      role: 'Frontend Developer',
      icon: <Code className="w-6 h-6" />,
      color: 'text-green-400',
    },
    {
      name: 'Pankaj Lodhi',
      role: 'Frontend Developer',
      icon: <Code className="w-6 h-6" />,
      color: 'text-yellow-400',
    },
  ];
  return (
    <div className="min-h-screen relative bg-gray-900 text-white">
      {/* Decorative subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/20 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        <header className="pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              About <span className="text-agri-green-light">AgriFarm</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Connecting farmers and consumers directly for fair pricing, fresher
              produce, and stronger local communities.
            </p>
          </div>
        </header>

        <main className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <section className="lg:col-span-2">
                <div className="bg-white/5 p-8 rounded-2xl shadow-sm border border-white/5">
                  <h2 className="text-2xl font-bold text-white mb-4">Who we are</h2>
                  <p className="text-white/75 leading-relaxed mb-4">
                    AgriFarm is a community-driven marketplace built to bridge the gap
                    between smallholder farmers and consumers. We strive to reduce
                    intermediaries, increase transparency in pricing, and deliver
                    fresher produce from farm to table.
                  </p>
                  <p className="text-white/75 leading-relaxed">
                    This page is a starter scaffold — provide your preferred copy,
                    team details, and images and I will incorporate them into a
                    polished layout consistent with the rest of the site.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-dark rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">Our mission</h3>
                    <p className="text-white/70">Build a direct marketplace that reduces waste, boosts farmer incomes, and connects consumers with fresh local produce.</p>
                  </div>
                  <div className="glass-dark rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">What we do</h3>
                    <p className="text-white/70">Provide farmer listings, ordering, cart and dashboard tools so farmers and buyers can transact directly and transparently.</p>
                  </div>
                </div>
              </section>

              <aside>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h4 className="text-lg font-semibold text-white mb-3">Get involved</h4>
                  <p className="text-white/75 mb-4">Want to join as a farmer, consumer, or partner? Share the details below and we'll add them to the page.</p>
                  <ul className="list-disc list-inside text-white/70 space-y-2">
                    <li>Main headline / tagline</li>
                    <li>1–3 paragraphs describing AgriFarm</li>
                    <li>Mission statement</li>
                    <li>Team names & roles (photo URLs optional)</li>
                    <li>Contact email / phone / CTA</li>
                  </ul>
                </div>
              </aside>
            </div>

            {/* Team Members Section */}
            <section className="mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Our <span className="text-agri-green-light">Team</span>
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                  Meet the talented individuals behind AgriFarm
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-agri-green/50 transition-all duration-300 text-center group"
                  >
                    <div className={`inline-flex p-4 rounded-xl bg-white/5 mb-4 ${member.color} group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                      {member.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-agri-green-light transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default About;
