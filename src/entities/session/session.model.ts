import { StateCreator, createStore } from 'zustand';
import { DevtoolsOptions, PersistOptions, devtools, persist } from 'zustand/middleware';

type Token = string;

type State = {
  token: Token | undefined;
};

type Actions = {
  updateToken: (token: Token | undefined) => void;
};

type SessionState = State & Actions;

const createSessionSlice: StateCreator<
  SessionState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SessionState
> = (set) => ({
  token: undefined,
  updateToken: (token: Token | undefined) =>
    set({ token: token ?? undefined }, false, 'updateToken'),
});

const persistOptions: PersistOptions<SessionState> = { name: 'session' };
const devtoolsOptions: DevtoolsOptions = { name: 'SessionStore' };

export const sessionStore = createStore<SessionState>()(
  devtools(persist(createSessionSlice, persistOptions), devtoolsOptions),
);

export const hasToken = () => Boolean(sessionStore.getState().token);

// export function authorizationHeader() {
//   if (hasToken()) {
//     return { Authorization: `Bearer ${sessionStore.getState().token}` };
//   }
// }
