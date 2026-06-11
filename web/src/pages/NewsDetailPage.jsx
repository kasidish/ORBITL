import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { fetchNewsById } from '@/lib/cmsClient';

function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function loadArticle() {
      try {
        const article = await fetchNewsById(id);
        if (isMounted) {
          setNews(article);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(err.message || 'Article not found');
          setLoading(false);
        }
      }
    }

    loadArticle();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  // Basic client-side helper to render paragraph spacing, list items, and headers from Markdown
  const renderFormattedContent = (text) => {
    if (!text) return null;

    return text.split('\n\n').map((block, idx) => {
      const trimmedBlock = block.trim();
      
      // Render Headers (e.g. ### Header)
      if (trimmedBlock.startsWith('###')) {
        return (
          <h3 key={idx} className="text-2xl font-semibold mt-8 mb-4 text-foreground/90 tracking-tight">
            {trimmedBlock.replace(/^###\s*/, '')}
          </h3>
        );
      }
      if (trimmedBlock.startsWith('##')) {
        return (
          <h2 key={idx} className="text-3xl font-bold mt-10 mb-4 text-foreground tracking-tight border-b border-border/50 pb-2">
            {trimmedBlock.replace(/^##\s*/, '')}
          </h2>
        );
      }

      // Render bullet list items
      if (trimmedBlock.startsWith('- ') || trimmedBlock.startsWith('* ')) {
        const items = trimmedBlock.split(/\n[-*]\s+/);
        return (
          <ul key={idx} className="list-disc pl-6 my-4 space-y-2 text-muted-foreground leading-relaxed">
            {items.map((item, itemIdx) => {
              // Strip leading markup if it's the very first element of split
              const cleanedItem = itemIdx === 0 ? item.replace(/^[-*]\s+/, '') : item;
              return <li key={itemIdx}>{parseInlineFormatting(cleanedItem)}</li>;
            })}
          </ul>
        );
      }

      // Render standard paragraph
      return (
        <p key={idx} className="text-muted-foreground leading-relaxed text-lg mb-6 whitespace-pre-line">
          {parseInlineFormatting(trimmedBlock)}
        </p>
      );
    });
  };

  // Basic helper to parse inline formatting (like bold and internal link Markdown)
  const parseInlineFormatting = (text) => {
    // Basic Markdown Bold parser (**text**)
    const boldRegex = /\*\*(.*?)\*\*/g;
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    
    let parts = [];
    let lastIndex = 0;
    let match;

    // We can do a simple string replacement or structure rendering.
    // For safety and robustness, let's render standard segments.
    // Since complex nested regex parses can get messy, we do a simple replacement for bold & links:
    let tempText = text;
    
    // Check if we have links or bold
    const hasBold = boldRegex.test(text);
    const hasLinks = linkRegex.test(text);
    
    if (!hasBold && !hasLinks) {
      return text;
    }

    // Reset regex index
    boldRegex.lastIndex = 0;
    
    // We will return a dangerouslySetInnerHTML for parsed inline elements
    // to keep rendering code concise while providing standard markdown parsing.
    let htmlContent = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline transition-colors">$1</a>');

    return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  return (
    <>
      {news && (
        <Helmet>
          <title>{news.title} - ORBITL News</title>
          <meta name="description" content={news.description} />
        </Helmet>
      )}

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            {/* Navigation back and Share tools */}
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/news')}
                className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors rounded-full"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to News
              </Button>
              
              {!loading && !error && (
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:bg-muted rounded-full"
                >
                  <Share2 size={16} />
                  Share
                </Button>
              )}
            </div>

            {loading ? (
              <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
                <Spinner className="w-10 h-10 text-primary" />
                <p className="text-muted-foreground">Loading news article...</p>
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center min-h-[40vh] flex flex-col items-center justify-center p-8 bg-card border border-border rounded-3xl"
              >
                <AlertCircle className="text-destructive mb-4" size={48} />
                <h2 className="text-2xl font-bold mb-2">Failed to load article</h2>
                <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
                <Button asChild>
                  <Link to="/news">Return to News Section</Link>
                </Button>
              </motion.div>
            ) : (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-3xl border border-border/80 bg-card/40 backdrop-blur-md shadow-lg"
              >
                {/* Hero Banner / Cover Image */}
                {news.image_url ? (
                  <div className="relative h-64 sm:h-96 w-full overflow-hidden">
                    <img
                      src={news.image_url}
                      alt={news.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>
                ) : (
                  <div className="h-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                )}

                <div className="p-6 sm:p-10">
                  {/* Article Metadata */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{news.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground tracking-tight leading-tight">
                    {news.title}
                  </h1>

                  {/* Divider */}
                  <div className="border-b border-border/50 my-6" />

                  {/* Full Article Content */}
                  <div className="prose prose-invert max-w-none">
                    {renderFormattedContent(news.content)}
                  </div>
                </div>
              </motion.article>
            )}

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default NewsDetailPage;
