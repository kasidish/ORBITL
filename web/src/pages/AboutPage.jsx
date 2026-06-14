import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx'; 
import myImage from '../images/2048-1365-max (2).jpg';

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About - ORBITL</title>
        <meta name="description" content="Learn about ORBITL, our team, and our role in advancing space technology at KMITL." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mt-16">About ORBITL</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We are a student-led group at King Mongkut's Institute of Technology Ladkrabang (KMITL) dedicated to pushing the boundaries of space and satellite technology.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-video rounded-2xl overflow-hidden bg-muted relative">
                  <img
                    src={myImage}
                    alt="SPACE01" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">Our Organization</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded by passionate engineering students, ORBITL serves as a hub for innovation, research, and practical application of space engineering principles. We bridge the gap between theoretical knowledge and real-world space missions.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through hands-on projects, collaborative research, and industry partnerships, we prepare the next generation of engineers to tackle the complex challenges of space exploration.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Our Role at KMITL</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                As a premier technical institute in Thailand, KMITL provides the perfect ecosystem for ORBITL. We leverage the university's state-of-the-art facilities and expert faculty to design, build, and test satellite subsystems. Our goal is to establish KMITL as a leading institution for student-driven space research in Southeast Asia.
              </p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default AboutPage;