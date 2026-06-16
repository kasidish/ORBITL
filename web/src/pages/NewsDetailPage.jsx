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
        const data = await fetchFromStrapi(
          `/articles?filters[documentId][$eq]=${id}&populate=cover`
        );
        if (cancelled || !data?.data || data.data.length === 0) {
          setArticle(null);
          return;
        }

        const attrs = data.data[0].attributes || data.data[0];
        const dateStr = attrs.date || attrs.publishedAt || attrs.createdAt;
        setArticle({
          title: attrs.title || '',
          date: dateStr
            ? new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '',
          description: attrs.description || '',
          content: attrs.content || attrs.description || '',
          image: getStrapiMedia(attrs.cover || attrs.image),
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
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-12 mb-8"
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
                      className="w-full max-h-[600px] object-contain rounded-2xl mb-8 bg-muted"
                    />
                  )}

                  <div className="prose prose-lg max-w-none text-foreground">
                    {article.content ? (
                      <div
                        className="text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    ) : (
                      <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {article.description}
                      </p>
                    )}
                  </div>
                </article>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                  <div className="bg-muted/50 rounded-full p-6 mb-6">
                    <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Article not found</h2>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    The article you're looking for doesn't exist, may have been moved, or is not yet published.
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-8">
                    If you just published this article in Strapi, it may take a moment to appear.
                  </p>
                  <Button asChild size="lg" className="glow-orange">
                    <Link to="/news">Browse All News</Link>
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
