/* istanbul ignore file */

import i18nJs from "i18n-js";
import { TxKeyPath, i18n } from "./i18n";

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: TxKeyPath, options?: i18nJs.TranslateOptions) {
  return key ? i18n.t(key, options) : "";
}
