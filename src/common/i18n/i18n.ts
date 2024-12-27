/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* istanbul ignore file */
import { I18n } from "i18n-js";
import { en, ja } from "./locale";

// Add the json translation files here
const i18n = new I18n({
  ...ja,
  ...en,
  "en": { ...en },
});
 
i18n.fallbacks = true;
i18n.enableFallback = true;
i18n.locale = navigator.language || "en";

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en;
type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & string];

export { i18n, TxKeyPath };
