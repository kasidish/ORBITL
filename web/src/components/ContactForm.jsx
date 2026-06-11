import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import supabase from '@/lib/supabaseClient';
import pb from '@/lib/pocketbaseClient';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      if (supabase) {
        // Supabase: insert record into `contact_messages`
        const { data, error } = await supabase
          .from('contact_messages')
          .insert([{ name: formData.name, email: formData.email, message: formData.message }]);

        if (error) throw error;
      } else {
        // fallback to PocketBase (or stub)
        await pb.collection('contact_messages').create(formData, { $autoCancel: false });
      }

      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your name"
          required
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your.email@example.com"
          required
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="How can we help you?"
          required
          className="min-h-[150px] bg-background"
        />
      </div>

      <Button
        type="submit"
        className="w-full glow-orange transition-smooth hover:scale-[1.02] active:scale-[0.98]"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

export default ContactForm;