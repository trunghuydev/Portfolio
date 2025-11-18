import React, { useState } from 'react';
import { FiSend, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { EmailPayload } from '@/Interface/TEmail';

interface ContactFormProps {
  onSubmit: (data: EmailPayload) => Promise<void>;
  email?: string;
  phone_number?: string;
  address?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  email,
  phone_number,
  address,
}) => {
  const [formData, setFormData] = useState<EmailPayload>({
    name: '',
    email: '',
    message: '',
    subject: 'Portfolio Contact Form',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EmailPayload, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EmailPayload, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', subject: 'Portfolio Contact Form' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EmailPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 bg-corp-gray-50"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="contact-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-corp-navy mb-12 text-center"
        >
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-corp-navy mb-4">
                Contact Information
              </h3>
              <p className="text-corp-gray-700 mb-6">
                Feel free to reach out if you'd like to discuss opportunities or have any questions.
              </p>
            </div>

            <div className="space-y-4">
              {email && (
                <div className="flex items-start gap-3">
                  <FiMail className="w-5 h-5 text-corp-accent mt-1 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-corp-gray-600">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-corp-accent hover:underline"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {phone_number && (
                <div className="flex items-start gap-3">
                  <FiPhone className="w-5 h-5 text-corp-accent mt-1 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-corp-gray-600">Phone</p>
                    <a
                      href={`tel:${phone_number}`}
                      className="text-corp-accent hover:underline"
                    >
                      {phone_number}
                    </a>
                  </div>
                </div>
              )}

              {address && (
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 text-corp-accent mt-1 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-corp-gray-600">Location</p>
                    <p className="text-corp-gray-700">{address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-corp-navy mb-2"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-corp-accent focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-corp-gray-300'
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-corp-navy mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-corp-accent focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-corp-gray-300'
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-corp-navy mb-2"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-corp-accent focus:border-transparent resize-none ${
                  errors.message ? 'border-red-500' : 'border-corp-gray-300'
                }`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {submitStatus === 'success' && (
              <div
                className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-md"
                role="alert"
              >
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div
                className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md"
                role="alert"
              >
                Something went wrong. Please try again later.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-corp-accent text-white font-semibold rounded-md hover:bg-corp-accent/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <FiSend className="w-5 h-5" aria-hidden="true" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

