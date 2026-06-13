import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import MapComponent from '@/components/MapComponent.jsx';
import SocialLinks from '@/components/SocialLinks.jsx';

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us - ORBITL</title>
        <meta name="description" content="Get in touch with ORBITL. Find our location at KMITL and send us a message." />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-16">Get in Touch</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Have questions about our projects or want to collaborate? We'd love to hear from you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6 ">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <a href="mailto:kmitlspace@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                          kmitlspace@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          King Mongkut's Institute of Technology Ladkrabang (KMITL)<br />
                          1 Chalong Krung 1 Alley, Lat Krabang<br />
                          Bangkok 10520, Thailand
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="font-semibold mb-4">Follow Us</h3>
                    <SocialLinks />
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden border border-border shadow-sm">
                  <MapComponent />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border border-border rounded-3xl p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ContactPage;