import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  Star,
  RefreshCw,
  Check,
  Sparkles,
  ClipboardCheck,
  Globe,
} from 'lucide-react';
import type { QuestionnaireData, AdminSettings, ReviewLength } from '../types';
import { generateReview, generateLocalFallbackReview } from '../services/aiService';
import AILoader from '../components/smoothui/components/ai-loader';
import ThemeToggle from '../components/ThemeToggle';

interface Props {
  data: QuestionnaireData;
  settings: AdminSettings;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onBack: () => void;
}

const LENGTH_OPTIONS: { label: string; value: ReviewLength }[] = [
  { label: 'Short', value: 'short' },
  { label: 'Balanced', value: 'balanced' },
  { label: 'Detailed', value: 'detailed' },
];

export default function GeneratedReviewPage({ data, settings, theme, onToggleTheme, onBack }: Props) {
  const [stars, setStars] = useState<number>(data.starRating);
  const [hoveredStars, setHoveredStars] = useState<number>(0);
  const [reviewLength, setReviewLength] = useState<ReviewLength>('balanced');
  const [reviewText, setReviewText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPostModal, setShowPostModal] = useState<boolean>(false);

  const starLabels: Record<number, string> = {
    5: 'Excellent experience',
    4: 'Very good experience',
    3: 'Average experience',
    2: 'Needs improvement',
    1: 'Poor experience',
  };

  const fetchReview = async (len: ReviewLength) => {
    setLoading(true);
    setReviewLength(len);
    try {
      const generated = await generateReview(
        { ...data, starRating: stars },
        len,
        settings
      );
      setReviewText(generated.text);
    } catch {
      const fallbackText = generateLocalFallbackReview(
        { ...data, starRating: stars },
        len,
        settings.businessName
      );
      setReviewText(fallbackText);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview(reviewLength);
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return true;
    } catch {
      return false;
    }
  };

  const handlePostReview = async () => {
    await copyToClipboard(reviewText);
    setShowPostModal(true);
  };

  const handleManualCopy = async () => {
    await copyToClipboard(reviewText);
  };

  const targetUrl = settings.googleReviewUrl || 'https://search.google.com/local/writereview';

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <header className="sticky top-0 z-20 glass-header">
        <div className="max-w-[var(--container)] mx-auto px-[var(--gutter)] py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Make Changes</span>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <span className="badge">Review Ready</span>
          </div>
        </div>
      </header>

      <main className="max-w-[var(--container)] mx-auto px-[var(--gutter)] py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">

        {/* Left Column: Store + Rating + Length Controls */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 flex flex-col gap-5">
          <div className="card overflow-hidden flex flex-col">
            {/* Store Header */}
            <div
              className="px-5 py-3.5 flex items-center gap-3"
              style={{
                background: 'var(--color-surface-elevated)',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <div
                className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shrink-0"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt={settings.businessName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-semibold text-xs" style={{ color: 'var(--color-text-primary)' }}>ME</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {settings.businessName}
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--color-text-tertiary)' }}>
                  {settings.businessAddress}
                </p>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
              {/* User info */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg font-semibold flex items-center justify-center text-xs text-white shrink-0"
                  style={{ background: 'var(--color-accent)' }}
                >
                  ME
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    Your Google Review
                  </p>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                    <Globe className="w-3 h-3" />
                    <span>Public review on Google Maps</span>
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div
                className="rounded-lg p-3.5 flex flex-col items-center gap-1.5"
                style={{
                  background: 'var(--color-surface-elevated)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
                  Your Rating
                </span>
                <div className="flex gap-1.5 justify-center" role="radiogroup" aria-label="Star rating">
                  {[1, 2, 3, 4, 5].map(s => {
                    const active = s <= (hoveredStars || stars);
                    return (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={s === stars}
                        onClick={() => setStars(s)}
                        onMouseEnter={() => setHoveredStars(s)}
                        onMouseLeave={() => setHoveredStars(0)}
                        className="p-0.5 rounded-md transition-transform active:scale-90 motion-reduce:transition-none hover:-translate-y-0.5"
                        aria-label={`${s} stars`}
                      >
                        <Star
                          className="w-7 h-7 transition-colors motion-reduce:transition-none"
                          style={{
                            color: active ? 'var(--color-star)' : 'var(--color-star-inactive)',
                            fill: active ? 'var(--color-star)' : 'transparent',
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  {starLabels[stars]} ({stars} / 5)
                </p>
              </div>

              {/* Length selector + regenerate */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div
                  className="flex p-0.5 rounded-lg"
                  style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}
                  role="tablist"
                >
                  {LENGTH_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      role="tab"
                      aria-selected={reviewLength === opt.value}
                      onClick={() => fetchReview(opt.value)}
                      className="px-3 py-1.5 text-xs font-medium rounded-md transition-all motion-reduce:transition-none"
                      style={{
                        background: reviewLength === opt.value ? 'var(--color-surface)' : 'transparent',
                        color: reviewLength === opt.value ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                        boxShadow: reviewLength === opt.value ? 'var(--shadow-sm)' : 'none',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => fetchReview(reviewLength)}
                  disabled={loading}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>New</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Review Editor + Actions + Instructions */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="card p-5 lg:p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Review Text
                </label>
                <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  Tap to edit
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Review text will appear here…"
                  rows={7}
                  className="input"
                  style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.7,
                    resize: 'vertical',
                    minHeight: '160px',
                  }}
                />

                {loading && (
                  <div
                    className="absolute inset-0 rounded-lg flex items-center justify-center p-4"
                    style={{ background: 'color-mix(in oklab, var(--color-surface) 95%, transparent)' }}
                  >
                    <AILoader
                      variant="grid"
                      label="Writing review variation..."
                      showElapsed
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-accent-text)' }} />
                <span>Tailored to your selected products. You can freely edit any part.</span>
              </div>
            </div>

            {/* Actions */}
            <div
              className="flex flex-col sm:flex-row gap-2.5 pt-3"
              style={{ borderTop: '1px solid var(--color-border-subtle)' }}
            >
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePostReview}
                className="btn-primary flex-1"
                style={{ padding: '14px var(--space-lg)', textDecoration: 'none' }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Post Review on Google</span>
              </a>

              <button
                type="button"
                onClick={handleManualCopy}
                className="btn-secondary sm:w-auto"
                style={{
                  padding: '12px var(--space-md)',
                  borderColor: copied ? 'var(--color-success)' : undefined,
                  color: copied ? 'var(--color-success)' : undefined,
                }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>

          {/* Post instructions */}
          <AnimatePresence>
            {showPostModal && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="card flex flex-col gap-3"
                style={{ padding: 'var(--space-lg)' }}
              >
                <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: 'var(--color-success)' }}>
                  <ClipboardCheck className="w-5 h-5 shrink-0" />
                  <span>Review Copied to Clipboard!</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  Google is opening in your browser. Simply{' '}
                  <strong style={{ color: 'var(--color-text-primary)' }}>paste (Ctrl+V / Long-press Paste)</strong>{' '}
                  your copied review into the Google review box, check your{' '}
                  <strong style={{ color: 'var(--color-text-primary)' }}>{stars}-star rating</strong>, and hit Submit!
                </p>
                <div
                  className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2"
                  style={{ borderTop: '1px solid var(--color-border-subtle)' }}
                >
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium flex items-center gap-1 hover:underline"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" style={{ color: 'var(--color-text-tertiary)' }} />
                    <span>Click here if review page didn't open</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowPostModal(false)}
                    className="btn-secondary"
                    style={{ padding: '4px 12px', fontSize: 'var(--text-xs)' }}
                  >
                    Got it
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
