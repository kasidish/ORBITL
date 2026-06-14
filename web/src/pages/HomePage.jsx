import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Satellite, Zap, Antenna } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>ORBITL</title>
        <meta name="description" content="Join ORBITL to advance space and satellite technology through student innovation and collaboration" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="relative min-h-[100dvh] flex items-center justify-center star-field overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1460186136353-977e9d6085a1)',
                filter: 'brightness(0.3)'
              }}
            />
            <div className="absolute inset-0 space-gradient" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="orbitl-logo text-6xl md:text-[96px] lg:text-[140px] mb-6 text-glow leading-none">
                  ORBITL
                </h1>
                <p className="text-lg md:text-2xl lg:text-3xl text-white/90 font-medium mb-8 max-w-3xl mx-auto leading-snug">
                  Pioneering the future of space and satellite technology through student-driven innovation
                </p>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 py-4 text-lg glow-orange transition-smooth hover:scale-105 active:scale-[0.98] bg-primary text-primary-foreground"
                >
                  <Link to="/join">Join ORBITL</Link>
                </Button>
              </motion.div>
            </div>
          </section>

          <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What we do</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Building the next generation of space technology across multiple disciplines
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Antenna className="text-primary" size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Ground Station</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Develop and operate ground station infrastructure for satellite telemetry, command, and data downlink
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Satellite className="text-primary" size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Satellite Engineering</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Develop cutting-edge satellite systems including ADCS, EPS, and communication subsystems
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Zap className="text-primary" size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Flight Software</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Create robust flight software and onboard computer systems for mission-critical operations
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-primary mb-4">7</div>
                      <p className="text-xl font-medium">Technical Disciplines</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Payload • Structure • OBC & FSW • EPS • ADCS • COMMS
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to launch your career?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join a community of passionate students working on real space technology projects
                </p>
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 glow-orange transition-smooth hover:scale-105 active:scale-[0.98]"
                >
                  <Link to="/join">Become a member</Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;