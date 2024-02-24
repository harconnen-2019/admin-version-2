import ReactDOM from 'react-dom/client';

import App from './app';

/**
 * В режиме разработки подключает "mocks"
 * @returns worker с подключенными энд-поинтами для локальной разработки
 */
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

//eslint-disable-next-line unicorn/prefer-top-level-await
enableMocking().then(() => {
  ReactDOM.createRoot(document.querySelector('#root')!).render(<App />);
});
