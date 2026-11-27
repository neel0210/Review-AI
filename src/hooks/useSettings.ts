import { useState, useCallback } from 'react';
import { storageService } from '../services/storageService';
import type { AdminSettings, Product, ExperienceOption } from '../types';

export function useSettings() {
  const [settings, setSettingsState] = useState<AdminSettings>(() => storageService.getSettings());
  const [products, setProductsState] = useState<Product[]>(() => storageService.getProducts());
  const [experiences, setExperiencesState] = useState<ExperienceOption[]>(() => storageService.getExperiences());

  const saveSettings = useCallback((s: AdminSettings) => {
    storageService.saveSettings(s);
    setSettingsState(s);
  }, []);

  const saveProducts = useCallback((p: Product[]) => {
    storageService.saveProducts(p);
    setProductsState(p);
  }, []);

  const saveExperiences = useCallback((e: ExperienceOption[]) => {
    storageService.saveExperiences(e);
    setExperiencesState(e);
  }, []);

  return { settings, products, experiences, saveSettings, saveProducts, saveExperiences };
}
