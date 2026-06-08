import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContact } from '../lib/supabase';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
  company: z.string().optional(),
  purpose: z.enum(['hiring', 'collaboration', 'question', 'other']),
});

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitContact(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 animate-slide-down">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 animate-slide-down">
          ✗ {error}
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Your Name *
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="John Doe"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 hover:border-primary-500 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900/60 focus:border-primary-500 outline-none transition-all duration-300"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Your Email *
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="john@example.com"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 hover:border-primary-500 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900/60 focus:border-primary-500 outline-none transition-all duration-300"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Phone Field (Optional) */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Phone (Optional)
        </label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="+1 (555) 123-4567"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 hover:border-primary-500 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900/60 focus:border-primary-500 outline-none transition-all duration-300"
        />
      </div>

      {/* Company Field (Optional) */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Company (Optional)
        </label>
        <input
          {...register('company')}
          type="text"
          placeholder="Your Company"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 hover:border-primary-500 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900/60 focus:border-primary-500 outline-none transition-all duration-300"
        />
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Subject *
        </label>
        <input
          {...register('subject')}
          type="text"
          placeholder="What's this about?"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 hover:border-primary-500 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900/60 focus:border-primary-500 outline-none transition-all duration-300"
        />
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
      </div>

      {/* Purpose Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Purpose *
        </label>
        <select
          {...register('purpose')}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 hover:border-primary-500 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900/60 focus:border-primary-500 outline-none transition-all duration-300"
        >
          <option value="other" className="dark:bg-slate-900">Select a purpose...</option>
          <option value="hiring" className="dark:bg-slate-900">Hiring / Collaboration</option>
          <option value="collaboration" className="dark:bg-slate-900">Project Collaboration</option>
          <option value="question" className="dark:bg-slate-900">Question / Support</option>
          <option value="other" className="dark:bg-slate-900">Other</option>
        </select>
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Message *
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell me about your project or inquiry..."
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 hover:border-primary-500 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900/60 focus:border-primary-500 outline-none transition-all duration-300"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform active:scale-95 inline-flex items-center justify-center gap-2 focus:ring-2 focus:ring-primary-500/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" opacity="0.25" strokeWidth="4" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Terms */}
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
        I'll respond to your message within 24 hours. Your information is safe with me.
      </p>
    </form>
  );
}
