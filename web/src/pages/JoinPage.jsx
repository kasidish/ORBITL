import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import pb from '@/lib/pocketbaseClient';

function JoinPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    major: '',
    year_of_study: '',
    area_of_interest: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.major || !formData.year_of_study || !formData.area_of_interest) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await pb.collection('members').create(formData, { $autoCancel: false });
      
      toast.success('Welcome to ORBITL! Your membership application has been submitted.');
      
      setFormData({
        full_name: '',
        email: '',
        major: '',
        year_of_study: '',
        area_of_interest: ''
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Join ORBITL - Membership Application`}</title>
        <meta name="description" content="Apply to join ORBITL and contribute to space and satellite technology innovation" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Join ORBITL</h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-prose mx-auto">
                  Take the first step toward advancing space technology. Fill out the form below to apply for membership.
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@university.edu"
                      required
                      className="text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="major">
                      University Major <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="major"
                      name="major"
                      type="text"
                      value={formData.major}
                      onChange={handleInputChange}
                      placeholder="e.g., Aerospace Engineering"
                      required
                      className="text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year_of_study">
                      Year of Study <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.year_of_study}
                      onValueChange={(value) => handleSelectChange('year_of_study', value)}
                      required
                    >
                      <SelectTrigger id="year_of_study" className="text-foreground">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Freshman">Freshman</SelectItem>
                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area_of_interest">
                      Primary Area of Interest <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.area_of_interest}
                      onValueChange={(value) => handleSelectChange('area_of_interest', value)}
                      required
                    >
                      <SelectTrigger id="area_of_interest" className="text-foreground">
                        <SelectValue placeholder="Select your area of interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Avionics">Avionics</SelectItem>
                        <SelectItem value="Propulsion">Propulsion</SelectItem>
                        <SelectItem value="Structure">Structure</SelectItem>
                        <SelectItem value="EPS">EPS (Electrical Power Systems)</SelectItem>
                        <SelectItem value="ADCS">ADCS (Attitude Determination & Control)</SelectItem>
                        <SelectItem value="OBC">OBC (Onboard Computer)</SelectItem>
                        <SelectItem value="FSW">FSW (Flight Software)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full glow-orange transition-smooth hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default JoinPage;