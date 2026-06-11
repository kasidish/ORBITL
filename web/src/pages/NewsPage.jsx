import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import NewsCard from '@/components/NewsCard.jsx';

function NewsPage() {
  const newsItems = [
    {
      id: 1,
      date: "June 10, 2026",
      title: "ORBITL Announces New Recruitment Drive",
      description: "We are opening our doors to passionate students from all engineering disciplines to join our upcoming satellite project."
    },
    {
      id: 2,
      date: "May 24, 2026",
      title: "Successful Test of New Propulsion Module",
      description: "Our propulsion team successfully completed the static fire test of the new micro-thruster design in the KMITL labs."
    },
    {
      id: 3,
      date: "April 15, 2026",
      title: "Partnership with National Space Agency",
      description: "ORBITL has signed a memorandum of understanding to collaborate on educational outreach programs."
    },
    {
      id: 4,
      date: "March 02, 2026",
      title: "Avionics Team Finalizes PCB Design",
      description: "The core flight computer design has been finalized and sent for manufacturing, marking a major milestone."
    }
  ];

  return (
    <>
      <Helmet>
        <title>News & Updates - ORBITL</title>
        <meta name="description" content="Stay updated with the latest news, achievements, and announcements from ORBITL." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Latest News</h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Stay up to date with our latest projects, milestones, and announcements.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItems.map((item, index) => (
                <NewsCard 
                  key={item.id}
                  date={item.date}
                  title={item.title}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default NewsPage;