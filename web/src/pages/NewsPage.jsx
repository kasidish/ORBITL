import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import NewsCard from '@/components/NewsCard.jsx';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { fetchNews } from '@/lib/cmsClient';

const ITEMS_PER_PAGE = 4;

function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function loadNewsData(silent = false) {
    if (!silent) setLoading(true);
    else setIsRefreshing(true);
    
    try {
      const data = await fetchNews();
      setNewsItems(data);
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadNewsData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const hasMore = newsItems.length > visibleCount;
  const displayedItems = newsItems.slice(0, visibleCount);

  return (
    <>
      <Helmet>
        <title>News & Updates - ORBITL</title>
        <meta name="description" content="Stay updated with the latest news, achievements, and announcements from ORBITL." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Latest News</h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Stay up to date with our latest projects, milestones, and announcements from orbit.
                </p>
              </motion.div>
              
              {!loading && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => loadNewsData(true)} 
                  disabled={isRefreshing}
                  className="self-start md:self-auto flex items-center gap-2 text-muted-foreground hover:text-foreground rounded-full"
                >
                  <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
              )}
            </div>

            {loading ? (
              /* Loading Spinner Block */
              <div className="min-h-[30vh] flex flex-col items-center justify-center gap-4">
                <Spinner className="w-10 h-10 text-primary" />
                <p className="text-muted-foreground text-sm">Fetching telemetry data...</p>
              </div>
            ) : newsItems.length === 0 ? (
              /* Empty State Block */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 px-4 border border-dashed border-border rounded-3xl bg-card/10"
              >
                <p className="text-lg text-muted-foreground mb-4">No news articles available at the moment.</p>
                <Button onClick={() => loadNewsData()}>Retry Fetch</Button>
              </motion.div>
            ) : (
              /* News List and Pagination */
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatePresence mode="popLayout">
                    {displayedItems.map((item, index) => (
                      <NewsCard 
                        key={item.id}
                        id={item.id}
                        date={item.date}
                        title={item.title}
                        description={item.description}
                        image_url={item.image_url}
                        index={index % ITEMS_PER_PAGE}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {hasMore && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-16"
                  >
                    <Button
                      onClick={handleLoadMore}
                      size="lg"
                      className="rounded-full px-8 py-6 text-base glow-orange hover:scale-105 active:scale-[0.98] transition-all duration-300"
                    >
                      Load More Articles
                    </Button>
                  </motion.div>
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