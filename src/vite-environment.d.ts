/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

import { GenericError } from '@/shared/lib/fetch';
import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: GenericError<never>;
  }
}
