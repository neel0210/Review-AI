import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Save, Eye, EyeOff, Wifi, WifiOff, Trash2,
  Plus, GripVertical, ToggleLeft, ToggleRight, ExternalLink,
  Building2, Link2, Bot, Package, HelpCircle, AlertCircle,
} from 'lucide-react';
import ProductIcon from '../components/ProductIcon';
import ThemeToggle from '../components/ThemeToggle';
import { testApiConnection } from '../services/aiService';
import type { AdminSettings, Product, ExperienceOption } from '../types';
import { DEFAULT_PRODUCTS, DEFAULT_EXPERIENCES } from '../types';

interface Props {
  settings: AdminSettings;
  products: Product[];
  experiences: ExperienceOption[];
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSaveSettings: (s: AdminSettings) => void;
  onSaveProducts: (p: Product[]) => void;
  onSaveExperiences: (e: ExperienceOption[]) => void;
  onBack: () => void;
}

type Tab = 'business' | 'google' | 'ai' | 'products' | 'questionnaire';

export default function AdminPage({
  settings, products, experiences, theme, onToggleTheme,
  onSaveSettings, onSaveProducts, onSaveExperiences, onBack,
}: Props) {
  const [localSettings, setLocalSettings] = useState<AdminSettings>({ ...settings });
  const [localProducts, setLocalProducts] = useState<Product[]>([...products]);
  const [localExperiences, setLocalExperiences] = useState<ExperienceOption[]>([...experiences]);
  const [tab, setTab] = useState<Tab>('business');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [apiStatus, setApiStatus] = useState<{ ok?: boolean; message?: string } | null>(null);
  const [testingApi, setTestingApi] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newExpLabel, setNewExpLabel] = useState('');

  const handleSave = () => {
    onSaveSettings(localSettings);
    onSaveProducts(localProducts);
    onSaveExperiences(localExperiences);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTestApi = async () => {
    setTestingApi(true);
    setApiStatus(null);
    const result = await testApiConnection(localSettings);
    setApiStatus(result);
    setTestingApi(false);
  };

  const toggleProduct = (id: string) => {
    setLocalProducts(p => p.map(x => x.id === id ? { ...x, enabled: !x.enabled } : x));
  };
  const deleteProduct = (id: string) => {
    setLocalProducts(p => p.filter(x => x.id !== id));
  };
  const addProduct = () => {
    if (!newProductName.trim()) return;
    const id = newProductName.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
    setLocalProducts(p => [...p, { id, name: newProductName.trim(), icon: 'Package', enabled: true, order: p.length }]);
    setNewProductName('');
  };
  const resetProducts = () => setLocalProducts([...DEFAULT_PRODUCTS]);

  const toggleExp = (id: string) => {
    setLocalExperiences(e => e.map(x => x.id === id ? { ...x, enabled: !x.enabled } : x));
  };
  const deleteExp = (id: string) => {
    setLocalExperiences(e => e.filter(x => x.id !== id));
  };
  const addExp = () => {
    if (!newExpLabel.trim()) return;
    const id = newExpLabel.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
    setLocalExperiences(e => [...e, { id, label: newExpLabel.trim(), enabled: true, order: e.length }]);
    setNewExpLabel('');
  };
  const resetExperiences = () => setLocalExperiences([...DEFAULT_EXPERIENCES]);

  const up = localSettings;
  const set = (key: keyof AdminSettings, val: any) => setLocalSettings(s => ({ ...s, [key]: val }));

  const TABS: { id: Tab; label: string; icon: any }[] = [
    { id: 'business', label: 'Business', icon: Building2 },
    { id: 'google', label: 'Google', icon: Link2 },
    { id: 'ai', label: 'AI Provider', icon: Bot },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'questionnaire', label: 'Questions', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 glass-header">
        <div className="max-w-[var(--container)] mx-auto px-[var(--gutter)] py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <h1 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Admin Settings
          </h1>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        {/* Mobile Tab bar */}
        <div
          className="flex lg:hidden overflow-x-auto"
          style={{ borderTop: '1px solid var(--color-border-subtle)' }}
          role="tablist"
        >
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className="flex-1 min-w-0 flex flex-col items-center gap-0.5 py-2.5 px-2 text-xs font-medium transition-colors"
                style={{
                  color: active ? 'var(--color-accent-text)' : 'var(--color-text-tertiary)',
                  borderBottom: `2px solid ${active ? 'var(--color-accent)' : 'transparent'}`,
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[var(--container)] mx-auto w-full px-[var(--gutter)] py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-20 flex-col gap-1 card p-2">
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
                style={{
                  background: active ? 'var(--color-accent-soft)' : 'transparent',
                  color: active ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
                }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Tab Content */}
        <div className="lg:col-span-9 flex flex-col gap-5 pb-20 lg:pb-8">
          {tab === 'business' && (
            <div className="card flex flex-col gap-4" style={{ padding: 'var(--space-lg)' }}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Business Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                    Business Name
                  </label>
                  <input className="input" value={up.businessName} onChange={e => set('businessName', e.target.value)} placeholder="Modern Electronics" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                    Address
                  </label>
                  <input className="input" value={up.businessAddress} onChange={e => set('businessAddress', e.target.value)} placeholder="Mukerian, Punjab, India" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                  Description
                </label>
                <textarea className="input" rows={2} value={up.businessDescription} onChange={e => set('businessDescription', e.target.value)} style={{ resize: 'vertical' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                    Contact Info
                  </label>
                  <input className="input" value={up.contactInfo} onChange={e => set('contactInfo', e.target.value)} placeholder="Phone, email..." />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                    Logo URL
                  </label>
                  <input className="input" value={up.logoUrl} onChange={e => set('logoUrl', e.target.value)} placeholder="https://..." />
                </div>
              </div>
              {up.logoUrl && (
                <img
                  src={up.logoUrl}
                  alt="logo"
                  className="w-14 h-14 rounded-lg object-cover"
                  style={{ border: '1px solid var(--color-border)' }}
                />
              )}
            </div>
          )}

          {tab === 'google' && (
            <div className="card flex flex-col gap-4" style={{ padding: 'var(--space-lg)' }}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Google Review Settings
              </h3>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                  Google Review URL
                </label>
                <input
                  className="input"
                  value={up.googleReviewUrl}
                  onChange={e => set('googleReviewUrl', e.target.value)}
                  placeholder="https://g.page/r/YOUR_BUSINESS_ID/review"
                />
              </div>
              {up.googleReviewUrl && (
                <button
                  onClick={() => window.open(up.googleReviewUrl, '_blank', 'noopener')}
                  className="flex items-center gap-2 text-sm font-medium hover:underline w-fit"
                  style={{ color: 'var(--color-accent-text)' }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Test Review Link
                </button>
              )}
              <div
                className="rounded-lg p-3.5 text-xs leading-relaxed"
                style={{ background: 'var(--color-info-soft)', color: 'var(--color-info-text)' }}
              >
                <p className="font-semibold mb-1">How to get your Google Review link:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Search for your business on Google Maps</li>
                  <li>Click on your business listing</li>
                  <li>Click "Reviews" then "Write a review"</li>
                  <li>Copy the URL from the address bar</li>
                  <li>Paste it above</li>
                </ol>
              </div>
            </div>
          )}

          {tab === 'ai' && (
            <div className="card flex flex-col gap-4" style={{ padding: 'var(--space-lg)' }}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                AI Provider Settings
              </h3>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                  Quick Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'AgentRouter', base: 'https://agentrouter.org/v1', model: 'gpt-4o-mini' },
                    { label: 'OpenRouter', base: 'https://openrouter.ai/api/v1', model: 'openai/gpt-4o-mini' },
                    { label: 'OpenAI Direct', base: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
                    { label: 'Groq Cloud', base: 'https://api.groq.com/openai/v1', model: 'llama-3.3-70b-versatile' },
                  ].map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        set('aiBaseUrl', p.base);
                        set('aiModel', p.model);
                      }}
                      className="chip text-left"
                      data-selected={up.aiBaseUrl === p.base}
                      style={{ padding: '8px 10px', fontSize: 'var(--text-xs)' }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                    API Base URL
                  </label>
                  <input className="input" value={up.aiBaseUrl} onChange={e => set('aiBaseUrl', e.target.value)} placeholder="https://agentrouter.org/v1" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                    Model
                  </label>
                  <input className="input" value={up.aiModel} onChange={e => set('aiModel', e.target.value)} placeholder="gpt-4o-mini" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                  API Key
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    className="input"
                    style={{ paddingRight: '40px' }}
                    value={up.aiApiKey}
                    onChange={e => set('aiApiKey', e.target.value)}
                    placeholder="sk-..."
                  />
                  <button
                    onClick={() => setShowKey(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                    Max Tokens
                  </label>
                  <input type="number" className="input" value={up.maxTokens} onChange={e => set('maxTokens', Number(e.target.value))} min={50} max={1000} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
                    Temperature
                  </label>
                  <input type="number" className="input" value={up.temperature} onChange={e => set('temperature', Number(e.target.value))} min={0} max={2} step={0.1} />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleTestApi}
                  disabled={testingApi}
                  className="btn-primary flex-1"
                  style={{ padding: '10px', fontSize: 'var(--text-sm)' }}
                >
                  {testingApi ? 'Testing...' : <><Wifi className="w-4 h-4" />Test Connection</>}
                </button>
                <button
                  onClick={() => { set('aiApiKey', ''); setApiStatus(null); }}
                  className="btn-secondary"
                  style={{ padding: '10px 14px', fontSize: 'var(--text-sm)' }}
                >
                  <Trash2 className="w-4 h-4" />Clear
                </button>
              </div>
              {apiStatus && (
                <div
                  className="flex items-start gap-2 rounded-lg p-3 text-sm"
                  style={{
                    background: apiStatus.ok ? 'var(--color-success-soft)' : 'var(--color-error-soft)',
                    color: apiStatus.ok ? 'var(--color-success)' : 'var(--color-error)',
                  }}
                >
                  {apiStatus.ok ? <Wifi className="w-4 h-4 mt-0.5 shrink-0" /> : <WifiOff className="w-4 h-4 mt-0.5 shrink-0" />}
                  <span>{apiStatus.message}</span>
                </div>
              )}
              <div
                className="rounded-lg p-3 text-xs flex items-start gap-2"
                style={{ background: 'var(--color-warning-soft)', color: 'var(--color-warning-text)' }}
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Your API key is stored in your browser local storage. Never share this device or its browser storage with untrusted users.</span>
              </div>
            </div>
          )}

          {tab === 'products' && (
            <div className="card flex flex-col gap-4" style={{ padding: 'var(--space-lg)' }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Product Categories
                </h3>
                <button
                  onClick={resetProducts}
                  className="text-xs font-medium hover:underline"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Reset defaults
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  className="input"
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addProduct()}
                  placeholder="New category name..."
                />
                <button onClick={addProduct} className="btn-primary shrink-0" style={{ padding: '8px 14px' }}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {localProducts.sort((a, b) => a.order - b.order).map(p => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                    style={{ background: 'var(--color-surface-elevated)' }}
                  >
                    <GripVertical className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-tertiary)' }} />
                    <ProductIcon iconName={p.icon || p.id} className="w-4 h-4 shrink-0" />
                    <span className="flex-1 text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>{p.name}</span>
                    <button
                      onClick={() => toggleProduct(p.id)}
                      style={{ color: p.enabled ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
                    >
                      {p.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'questionnaire' && (
            <div className="card flex flex-col gap-4" style={{ padding: 'var(--space-lg)' }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Experience Options
                </h3>
                <button
                  onClick={resetExperiences}
                  className="text-xs font-medium hover:underline"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Reset defaults
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  className="input"
                  value={newExpLabel}
                  onChange={e => setNewExpLabel(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addExp()}
                  placeholder="New option label..."
                />
                <button onClick={addExp} className="btn-primary shrink-0" style={{ padding: '8px 14px' }}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {localExperiences.sort((a, b) => a.order - b.order).map(e => (
                  <div
                    key={e.id}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                    style={{ background: 'var(--color-surface-elevated)' }}
                  >
                    <GripVertical className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-tertiary)' }} />
                    <span className="flex-1 text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>{e.label}</span>
                    <button
                      onClick={() => toggleExp(e.id)}
                      style={{ color: e.enabled ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
                    >
                      {e.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => deleteExp(e.id)}
                      className="hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Save button */}
          <div className="hidden lg:flex justify-end">
            <motion.button
              onClick={handleSave}
              className="btn-primary"
              style={{
                padding: '12px var(--space-xl)',
                background: saved ? 'var(--color-success)' : undefined,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-4 h-4" />
              {saved ? 'Settings Saved!' : 'Save Settings'}
            </motion.button>
          </div>
        </div>
      </main>

      {/* Mobile sticky Save button */}
      <div
        className="lg:hidden sticky bottom-0 p-4 glass-header"
        style={{ borderTop: '1px solid var(--color-border-subtle)', borderBottom: 'none' }}
      >
        <motion.button
          onClick={handleSave}
          className="btn-primary w-full"
          style={{
            padding: '14px var(--space-lg)',
            background: saved ? 'var(--color-success)' : undefined,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Settings Saved!' : 'Save Settings'}
        </motion.button>
      </div>
    </div>
  );
}
