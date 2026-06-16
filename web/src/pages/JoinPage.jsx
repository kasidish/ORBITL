import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import supabase from '@/lib/supabaseClient';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
];

function JoinPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    major: '',
    year_of_study: '',
    area_of_interest: '',
    portfolio_file: null,
    additional_notes: '',
  });
  const [filePreview, setFilePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Please upload a PDF, JPEG, PNG, or WebP file');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setFormData(prev => ({ ...prev, portfolio_file: file }));

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, portfolio_file: null }));
    setFilePreview(null);
  };

  const uploadFile = async (file) => {
    if (!supabase || !file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `portfolios/${fileName}`;

    const { error } = await supabase.storage
      .from('member-uploads')
      .upload(filePath, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('member-uploads')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.major || !formData.year_of_study || !formData.area_of_interest) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      if (!supabase) throw new Error('Supabase not configured');

      let portfolio_url = null;
      if (formData.portfolio_file) {
        portfolio_url = await uploadFile(formData.portfolio_file);
      }

      const { error } = await supabase.from('members').insert([{
        full_name: formData.full_name,
        email: formData.email,
        major: formData.major,
        year_of_study: formData.year_of_study,
        area_of_interest: formData.area_of_interest,
        portfolio_url,
        additional_notes: formData.additional_notes || null,
      }]);

      if (error) throw error;

      toast.success('Welcome to ORBITL! Your membership application has been submitted.');

      setFormData({
        full_name: '',
        email: '',
        major: '',
        year_of_study: '',
        area_of_interest: '',
        portfolio_file: null,
        additional_notes: '',
      });
      setFilePreview(null);

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Join ORBITL`}</title>
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-12">Join ORBITL</h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-prose mx-auto">
                  Take the first step toward advancing space technology.
                  Fill out the form below to apply for membership.
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
                      placeholder="e.g., Space Engineering"
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
                          <SelectItem value="1">Freshman (year 1)</SelectItem>
                          <SelectItem value="2">Sophomore (year 2)</SelectItem>
                          <SelectItem value="3">Junior (year 3)</SelectItem>
                          <SelectItem value="4">Senior (year 4)</SelectItem>
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
                        <SelectItem value="Payload">Payload</SelectItem>
                        <SelectItem value="Structure">Structure</SelectItem>
                        <SelectItem value="OBC_FSW">OBC & FSW</SelectItem>
                        <SelectItem value="EPS">EPS (Electrical Power Systems)</SelectItem>
                        <SelectItem value="ADCS">ADCS (Attitude Determination & Control)</SelectItem>
                        <SelectItem value="COMMS">COMMS (CubeSat Communication System)</SelectItem>
                        <SelectItem value="Business">Business Team</SelectItem>
                        <SelectItem value="SocialMedia">Social Media Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">
                      Portfolio / CV / Documents
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Upload your portfolio, CV, or any relevant documents (PDF, JPEG, PNG, WebP — max 10MB)
                    </p>

                    {formData.portfolio_file ? (
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                        {filePreview ? (
                          <img src={filePreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                        ) : (
                          <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{formData.portfolio_file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(formData.portfolio_file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-background rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </span>
                        <input
                          id="portfolio"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpeg,.jpg,.png,.webp"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional_notes">
                      Additional Notes / Questions / Links
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Share any questions, links to your work (GitHub, portfolio), or additional information
                    </p>
                    <Textarea
                      id="additional_notes"
                      name="additional_notes"
                      value={formData.additional_notes}
                      onChange={handleInputChange}
                      placeholder="e.g., Check out my GitHub: https://github.com/yourname&#10;Or any questions you have..."
                      className="min-h-[120px] text-foreground"
                    />
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
