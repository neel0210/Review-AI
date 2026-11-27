import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  Star,
  Check,
  AlertCircle,
  Sparkles,
  ShoppingBag,
  ThumbsUp,
} from 'lucide-react';
import type { QuestionnaireData, Product, ExperienceOption, AdminSettings } from '../types';
import ProductIcon from '../components/ProductIcon';
import ThemeToggle from '../components/ThemeToggle';

interface Props {
  products: Product[];
  experiences: ExperienceOption[];
  settings: AdminSettings;
  initialData?: QuestionnaireData | null;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onGenerate: (data: QuestionnaireData) => void;
}

export default function SinglePageReviewApp({
  products,
  experiences,
  settings,
  initialData,
  theme,
  onToggleTheme,
  onGenerate,
}: Props) {
  const [starRating, setStarRating] = useState<number>(initialData?.starRating || 5);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    initialData?.selectedProducts || []
  );
  const [otherProductText, setOtherProductText] = useState<string>(
    initialData?.otherProductText || ''
  );
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(
    initialData?.selectedExperiences || []
  );
  const [otherExperienceText, setOtherExperienceText] = useState<string>(
    initialData?.otherExperienceText || ''
  );
  const [errorMsg, setErrorMsg] = useState<string>('');

  const enabledProducts = products.filter(p => p.enabled);
  const enabledExperiences = experiences.filter(e => e.enabled);

  const starLabels: Record<number, string> = {
    5: 'Excellent · Best in town',
    4: 'Good · Very satisfied',
    3: 'Average · Fair experience',
    2: 'Below Average · Could improve',
    1: 'Poor · Unsatisfied',
  };

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    setErrorMsg('');
  };

  const toggleExperience = (id: string) => {
    setSelectedExperiences(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      setErrorMsg('Please select at least one product or appliance');
      return;
    }
    if (selectedProducts.includes('other') && !otherProductText.trim()) {
      setErrorMsg('Please specify what other product you purchased');
      return;
    }
    if (selectedExperiences.includes('other') && !otherExperienceText.trim()) {
      setErrorMsg('Please specify what else stood out in your visit');
      return;
    }

    onGenerate({
      starRating,
      selectedProducts,
      otherProductText: otherProductText.trim(),
      selectedExperiences,
      otherExperienceText: otherExperienceText.trim(),
    });
  };

  const submitBlock = (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2 text-xs font-medium rounded-lg"
            style={{
              padding: 'var(--space-sm)',
              background: 'var(--color-error-soft)',
              color: 'var(--color-error)',
            }}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        className="btn-primary w-full"
        style={{ padding: '14px var(--space-lg)', fontSize: 'var(--text-base)' }}
      >
        <Sparkles className="w-4 h-4" style={{ color: 'var(--color-star)' }} />
        <span>Generate Review Draft</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <header className="sticky top-0 z-20 glass-header">
        <div className="max-w-[var(--container)] mx-auto px-[var(--gutter)] py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shrink-0"
              style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }}
            >
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.businessName}
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Building2 className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              )}
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-sm leading-tight truncate" style={{ color: 'var(--color-text-primary)' }}>
                {settings.businessName}
              </h1>
              <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{settings.businessAddress}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <span className="badge hidden sm:inline-flex">Review Form</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[var(--container)] mx-auto px-[var(--gutter)] py-6 lg:py-10 pb-24">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">

          {/* Left Column (Desktop sticky): Rating + Desktop CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 flex flex-col gap-5">
            <section className="card flex flex-col items-center gap-3.5" style={{ padding: 'var(--space-lg)' }}>
              <div className="text-center flex flex-col items-center gap-2">
                <span className="badge">Step 1 of 3</span>
                <h2 className="font-semibold" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}>
                  Rate your overall experience
                </h2>
                <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  Tap the stars to give your rating
                </p>
              </div>

              <div className="flex gap-1.5 justify-center py-1" role="radiogroup" aria-label="Star rating">
                {[1, 2, 3, 4, 5].map(star => {
                  const active = star <= (hoveredStar || starRating);
                  return (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={star === starRating}
                      onClick={() => setStarRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-1.5 rounded-lg transition-transform active:scale-90 motion-reduce:transition-none hover:-translate-y-0.5"
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        className="w-9 h-9 transition-colors motion-reduce:transition-none"
                        style={{
                          color: active ? 'var(--color-star)' : 'var(--color-star-inactive)',
                          fill: active ? 'var(--color-star)' : 'transparent',
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              <span
                className="text-xs font-medium px-3.5 py-1.5 rounded-full"
                style={{
                  background: 'var(--color-surface-elevated)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                {starLabels[starRating] || 'Select your stars'}
              </span>
            </section>

            <div className="hidden lg:block">{submitBlock}</div>
          </div>

          {/* Right Column: Products + Experience */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Step 2: Products */}
            <section className="card flex flex-col gap-3.5" style={{ padding: 'var(--space-lg)' }}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-accent-soft)' }}
                  >
                    <ShoppingBag className="w-4 h-4" style={{ color: 'var(--color-accent-text)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      What did you purchase?
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                      Select all that apply
                    </p>
                  </div>
                </div>
                <span className="badge">Step 2 of 3</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {enabledProducts.map(p => {
                  const active = selectedProducts.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => toggleProduct(p.id)}
                      className="chip text-left"
                      data-selected={active}
                      style={{ padding: '10px 12px' }}
                    >
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          background: active ? 'var(--color-accent)' : 'transparent',
                          border: active ? 'none' : '1.5px solid var(--color-border)',
                        }}
                      >
                        {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <ProductIcon
                        iconName={p.icon || p.id}
                        className="w-4 h-4 shrink-0"
                      />
                      <span className="truncate text-xs">{p.name}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedProducts.includes('other') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      Specify the other product / appliance:
                    </label>
                    <input
                      type="text"
                      value={otherProductText}
                      onChange={e => setOtherProductText(e.target.value)}
                      placeholder="e.g. Inverter battery, Induction cooktop..."
                      className="input"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Step 3: Experience */}
            <section className="card flex flex-col gap-3.5" style={{ padding: 'var(--space-lg)' }}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-accent-soft)' }}
                  >
                    <ThumbsUp className="w-4 h-4" style={{ color: 'var(--color-accent-text)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      What did you like about your visit?
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                      Select any that you experienced
                    </p>
                  </div>
                </div>
                <span className="badge">Step 3 of 3</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {enabledExperiences.map(e => {
                  const active = selectedExperiences.includes(e.id);
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => toggleExperience(e.id)}
                      className="chip"
                      data-selected={active}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          background: active ? 'var(--color-accent)' : 'transparent',
                          border: active ? 'none' : '1.5px solid var(--color-border)',
                        }}
                      >
                        {active && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-xs">{e.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedExperiences.includes('other') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      Specify what else stood out:
                    </label>
                    <input
                      type="text"
                      value={otherExperienceText}
                      onChange={e => setOtherExperienceText(e.target.value)}
                      placeholder="e.g. Quick billing, ample parking..."
                      className="input"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Mobile Submit */}
            <div className="lg:hidden">{submitBlock}</div>
          </div>
        </form>
      </main>
    </div>
  );
}
