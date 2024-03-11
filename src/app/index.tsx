import ReactDOM from 'react-dom/client';
import { Provider } from './providers';

/**
 * В режиме разработки подключает "mocks"
 * @returns worker с подключенными энд-поинтами для локальной разработки
 */
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const { worker } = await import('../mocks/browser');
  return worker.start({
    onUnhandledRequest(request, print) {
      // Игнорирует выбранные запросы.
      if (request.url.includes('/src/') || request.url.includes('/node_modules/')) {
        return;
      }

      // Остальные предупреждение о любом необработанном запросе.
      print.warning();
    },
  });
}

//eslint-disable-next-line unicorn/prefer-top-level-await
enableMocking().then(() => {
  ReactDOM.createRoot(document.querySelector('#root')!).render(<Provider />);
});
