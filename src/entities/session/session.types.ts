import { z } from 'zod';
import { sessionContracts } from './session.contracts';

export type LoginUserRequest = z.infer<typeof sessionContracts.LoginUserRequestSchema>;
export type SessionResponse = z.infer<typeof sessionContracts.SessionResponseSchema>;

export type Session = z.infer<typeof sessionContracts.SessionSchema>;
