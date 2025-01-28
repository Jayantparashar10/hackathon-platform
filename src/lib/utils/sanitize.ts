// lib/utils/sanitize.ts
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

export const sanitizeInput = (dirty: string) => ({
  clean: purify.sanitize(dirty.trim()),
  isValid: !purify.removed.length,
});

export const validateTeamName = (name: string) => {
  const { clean, isValid } = sanitizeInput(name);
  return {
    clean,
    isValid: isValid && clean.length >= 3 && clean.length <= 30
  };
};