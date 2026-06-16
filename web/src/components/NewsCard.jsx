import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function NewsCard({ id, date, title, description, image, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/news/${id}`}
        className="block bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
      >
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
        )}
        <div className="text-sm font-medium text-primary mb-3">{date}</div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
      </Link>
    </motion.div>
  );
}

export default NewsCard;
