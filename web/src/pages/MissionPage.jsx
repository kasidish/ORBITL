import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, Rocket } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function MissionPage() {
  return (
    <>
      <Helmet>
        <title>Our Mission - ORBITL</title>
        <meta name="description" content="Discover ORBITL's mission, vision, and goals for the future of space technology." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Mission & Vision</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Guiding our journey towards the stars with clear objectives and a bold vision for the future.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card border border-border rounded-3xl p-10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Target size={120} />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="text-primary" size={28} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To empower students with hands-on experience in aerospace engineering by designing, building, and operating functional satellite systems. We strive to foster a culture of innovation, teamwork, and technical excellence.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card border border-border rounded-3xl p-10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Eye size={120} />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="text-primary" size={28} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To become a globally recognized student organization that significantly contributes to the democratization of space access, making advanced space technology accessible, understandable, and achievable for the next generation.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Rocket className="text-primary" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-12">Strategic Goals</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                  {
                    title: "Technical Excellence",
                    desc: "Develop reliable, flight-ready hardware and software subsystems that meet rigorous aerospace standards."
                  },
                  {
                    title: "Knowledge Transfer",
                    desc: "Create a sustainable ecosystem where experienced members mentor new recruits, ensuring continuity of knowledge."
                  },
                  {
                    title: "Industry Collaboration",
                    desc: "Forge strong partnerships with aerospace companies and research institutions to align our projects with industry needs."
                  }
                ].map((goal, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-muted/50 border border-border/50">
                    <h3 className="text-xl font-semibold mb-3">{goal.title}</h3>
                    <p className="text-muted-foreground">{goal.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default MissionPage;