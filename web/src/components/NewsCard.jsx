import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function NewsCard({ id, date, title, description, image_url, index = 0 }) {
  return (
    <Link to={`/news/${id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/50 hover:shadow-primary/5 transition-all duration-300 group h-full flex flex-col"
      >
        {image_url && image_url.trim() !== '' && (
          <div className="h-48 w-full overflow-hidden relative">
            <img 
              src={image_url} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-80" />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <div className="text-sm font-medium text-primary mb-3">{date}</div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6 text-sm flex-1">
            {description}
          </p>
          <div className="text-primary text-sm font-semibold flex items-center gap-1 mt-auto">
            <span className="group-hover:mr-1 transition-all duration-300">Read Article</span> &rarr;
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default NewsCard;