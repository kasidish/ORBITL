import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import NewsCard from '@/components/NewsCard.jsx';
import { fetchFromStrapi, getStrapiMedia } from '@/lib/strapiClient.js';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const FALLBACK_NEWS = [
  {
    id: 1,
    date: 'June 10, 2026',
    title: 'ORBITL Announces New Recruitment Drive',
    description: 'We are opening our doors to passionate students from all engineering disciplines to join our upcoming satellite project. This is a great opportunity to gain hands-on experience in space technology.',
  },
  {
    id: 2,
    date: 'May 24, 2026',
    title: 'Successful Test of New Propulsion Module',
    description: 'Our propulsion team successfully completed the static fire test of the new micro-thruster design in the KMITL labs. The test validated our custom injector design and achieved target thrust levels.',
  },
  {
    id: 3,
    date: 'April 15, 2026',
    title: 'Partnership with National Space Agency',
    description: 'ORBITL has signed a memorandum of understanding to collaborate on educational outreach programs. This partnership will provide our members with access to industry experts and launch opportunities.',
  },
  {
    id: 4,
    date: 'March 02, 2026',
    title: 'Avionics Team Finalizes PCB Design',
    description: 'The core flight computer design has been finalized and sent for manufacturing, marking a major milestone. The board features radiation-tolerant components and redundant communication buses.',
  },
  {
    id: 5,
    date: 'February 18, 2026',
    title: 'Ground Station Antenna Installation Complete',
    description: 'Our ground station team has successfully installed and tested the new 3-axis antenna tracking system. The system can now automatically track LEO satellites for telemetry reception.',
  },
  {
    id: 6,
    date: 'January 25, 2026',
    title: 'ORBITL Wins Best Student Project Award',
    description: 'Our team received the Best Student Project Award at the annual KMITL Engineering Expo for our CubeSat development work. The judges praised our integrated approach to satellite subsystems.',
  },
  {
    id: 7,
    date: 'December 10, 2025',
    title: 'ADCS Prototype Passes Environmental Testing',
    description: 'The attitude determination and control subsystem prototype has passed vibration and thermal vacuum testing. The reaction wheels and star tracker performed within specifications.',
  },
  {
    id: 8,
    date: 'November 05, 2025',
    title: 'New Members Complete Basic Training',
    description: 'Congratulations to our 15 new members who completed the basic satellite engineering training program. They are now ready to contribute to ongoing projects across all subsystems.',
  },
];

const PAGE_SIZE = 6;

function NewsPage() {
  const [newsItems, setNewsItems] = useState(FALLBACK_NEWS);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await fetchFromStrapi(
          `/articles?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&sort=date:desc`
        );

        if (cancelled || !data?.data) return;

        const items = data.data.map((item) => ({
          id: item.id,
          date: item.attributes.date
            ? new Date(item.attributes.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '',
          title: item.attributes.title || '',
          description: item.attributes.description || '',
          image: getStrapiMedia(item.attributes.image),
        }));

        setNewsItems(items);
        setPageCount(data.meta?.pagination?.pageCount || 1);
      } catch {
        // Strapi not configured — keep fallback data
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [page]);

  return (
    <>
      <Helmet>
        <title>News - ORBITL</title>
        <meta
          name="description"
          content="Stay updated with the latest news, achievements, and announcements from ORBITL."
        />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-12">
                Latest News
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Stay up to date with our latest projects, milestones, and
                announcements.
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-muted rounded-2xl h-64"
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newsItems.map((item, index) => (
                    <NewsCard
                      key={item.id}
                      id={item.id}
                      date={item.date}
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      index={index}
                    />
                  ))}
                </div>

                {pageCount > 1 && (
                  <Pagination className="mt-12">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage((p) => Math.max(1, p - 1));
                          }}
                          className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>

                      {Array.from({ length: pageCount }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={page === i + 1}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(i + 1);
                            }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage((p) => Math.min(pageCount, p + 1));
                          }}
                          className={page === pageCount ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default NewsPage;
