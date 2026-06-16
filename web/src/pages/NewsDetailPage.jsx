import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { fetchFromStrapi, getStrapiMedia } from '@/lib/strapiClient.js';
import { Button } from '@/components/ui/button';

function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await fetchFromStrapi(`/articles/${id}`);
        if (cancelled || !data?.data) return;

        const attrs = data.data.attributes;
        setArticle({
          title: attrs.title || '',
          date: attrs.date
            ? new Date(attrs.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '',
          description: attrs.description || '',
          image: getStrapiMedia(attrs.image),
        });
      } catch {
        setArticle(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{article ? `${article.title} - ORBITL` : 'News - ORBITL'}</title>
        <meta
          name="description"
          content={article?.description?.slice(0, 160) || 'ORBITL news article'}
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
            >
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Link>

              <div className="max-w-4xl">
                {loading ? (
                <div className="animate-pulse space-y-6">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-64 bg-muted rounded-2xl" />
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-4 bg-muted rounded w-4/6" />
                  </div>
                </div>
              ) : article ? (
                <article>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {article.title}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    {article.date}
                  </p>

                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-80 object-cover rounded-2xl mb-8"
                    />
                  )}

                  <div className="prose prose-lg max-w-none text-foreground">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                      {article.description}
                    </p>
                  </div>
                </article>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold mb-4">Article not found</h2>
                  <p className="text-muted-foreground mb-8">
                    The article you're looking for doesn't exist or has been removed.
                  </p>
                  <Button asChild>
                    <Link to="/news">Back to News</Link>
                  </Button>
                </div>
              )}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default NewsDetailPage;
