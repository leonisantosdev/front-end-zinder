import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from '../locale/pt-br.json';
import en from '../locale/en-us.json';

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: 'pt',
  // fallbackLng: 'pt-br',
  // interpolation: { escapeValue: false },
});

export default i18n;