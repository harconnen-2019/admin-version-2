import { z } from 'zod';
import { languageContracts } from './language.contracts';

export type CreateLanguage = z.infer<typeof languageContracts.LanguageRequestPostSchema>;
export type UpdateLanguage = z.infer<typeof languageContracts.LanguageRequestPutSchema>;

export type LanguageResponse = z.infer<typeof languageContracts.LanguageResponseSchema>;
export type LanguageQuery = z.infer<typeof languageContracts.LanguageQueryDtoSchema>;
export type LanguageParameters = z.infer<typeof languageContracts.LanguageParametersDtoSchema>;
export type LanguageListResponse = z.infer<typeof languageContracts.LanguageListResponseSchema>;

export type Language = z.infer<typeof languageContracts.LanguageSchema>;
export type LanguageList = z.infer<typeof languageContracts.LanguageListSchema>;
