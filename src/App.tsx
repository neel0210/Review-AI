import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SinglePageReviewApp from './pages/SinglePageReviewApp';
import GeneratedReviewPage from './pages/GeneratedReviewPage';
import AdminPage from './pages/AdminPage';
import { useSettings } from './hooks/useSettings';
import { useTheme } from './hooks/useTheme';
import type { QuestionnaireData } from './types';
import { Settings, Lock, X } from 'lucide-react';

type Screen = 'questionnaire' | 'review' | 'admin';

const ADMIN_PIN = '1234';

export default function App() {
  const [screen, setScreen] = useState<Screen>('questionnaire');
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [adminTapCount, setAdminTapCount] = useState(0);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const { settings, products, experiences, saveSettings, saveProducts, saveExperiences } = useSettings();
  const { theme, toggleTheme } = useTheme();

  const handleAdminTap = () => {
    const next = adminTapCount + 1;
    setAdminTapCount(next);
    if (next >= 5) {
      setShowPinModal(true);
      setAdminTapCount(0);
      setPinInput('');
      setPinError('');
    }
    setTimeout(() => setAdminTapCount(0), 3000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setShowPinModal(false);
      setScreen('admin');
      setPinInput('');
      setPinError('');
    } else {
      setPinError('Incorrect PIN code');
    }
  };

  return (
    <div
      className="font-sans antialiased min-h-screen relative"
      style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)' }}
    >
      {/* Admin trigger — discreet settings gear */}
      {screen !== 'admin' && (
        <button
          onClick={handleAdminTap}
          className="fixed bottom-4 right-4 z-50 w-9 h-9 rounded-full
                     flex items-center justify-center opacity-15 hover:opacity-50
                     transition-opacity duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-border)',
          }}
          aria-label="Admin Settings"
          title="Tap 5 times to open Admin Settings"
        >
          <Settings className="w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />
        </button>
      )}

      {/* PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'var(--color-overlay)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="card max-w-xs w-full flex flex-col gap-4"
              style={{ padding: 'var(--space-lg)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--color-accent-soft)' }}
                  >
                    <Lock className="w-4 h-4" style={{ color: 'var(--color-accent-text)' }} />
                  </div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    Admin Access
                  </span>
                </div>
                <button
                  onClick={() => setShowPinModal(false)}
                  className="p-1 rounded-md hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Enter your Admin PIN to manage store configuration and AI settings.
              </p>

              <form onSubmit={handlePinSubmit} className="flex flex-col gap-3">
                <input
                  type="password"
                  autoFocus
                  maxLength={6}
                  value={pinInput}
                  onChange={e => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="Enter PIN (Default: 1234)"
                  className="input text-center tracking-widest font-semibold"
                  style={{ fontSize: 'var(--text-md)' }}
                />

                {pinError && (
                  <p className="text-xs font-medium text-center" style={{ color: 'var(--color-error)' }}>
                    {pinError}
                  </p>
                )}

                <button type="submit" className="btn-primary w-full" style={{ padding: '10px' }}>
                  Open Settings
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Screens */}
      <AnimatePresence mode="wait">
        {screen === 'questionnaire' && (
          <SinglePageReviewApp
            key="questionnaire-page"
            products={products}
            experiences={experiences}
            settings={settings}
            initialData={questionnaireData}
            theme={theme}
            onToggleTheme={toggleTheme}
            onGenerate={(data: QuestionnaireData) => {
              setQuestionnaireData(data);
              setScreen('review');
            }}
          />
        )}

        {screen === 'review' && questionnaireData && (
          <GeneratedReviewPage
            key="review-page"
            data={questionnaireData}
            settings={settings}
            theme={theme}
            onToggleTheme={toggleTheme}
            onBack={() => setScreen('questionnaire')}
          />
        )}

        {screen === 'admin' && (
          <AdminPage
            key="admin-page"
            settings={settings}
            products={products}
            experiences={experiences}
            theme={theme}
            onToggleTheme={toggleTheme}
            onSaveSettings={saveSettings}
            onSaveProducts={saveProducts}
            onSaveExperiences={saveExperiences}
            onBack={() => setScreen('questionnaire')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
