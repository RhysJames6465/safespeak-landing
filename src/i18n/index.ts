import { headers } from 'next/headers';
import en from './locales/en.json';

export type Locale = 'en' | 'ar' | 'zh' | 'yue' | 'vi' | 'pa' | 'hi' | 'ne' | 'el';
export const locales: Locale[] = ['en', 'ar', 'zh', 'yue', 'vi', 'pa', 'hi', 'ne', 'el'];
export type Dict = typeof en;

const cache: Partial<Record<Locale, Dict>> = { en };

export async function getDict(locale: Locale): Promise<Dict> {
  if (cache[locale]) return cache[locale]!;
  const mod = await import(`./locales/${locale}.json`);
  cache[locale] = mod.default;
  return mod.default;
}

export function dir(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function langTag(locale: Locale) {
  return ({ en: 'en-AU', ar: 'ar-AU', zh: 'zh-Hans-AU', yue: 'yue-Hant-AU', vi: 'vi-AU', pa: 'pa-Guru-AU', hi: 'hi-AU', ne: 'ne-AU', el: 'el-AU' } as const)[locale];
}
