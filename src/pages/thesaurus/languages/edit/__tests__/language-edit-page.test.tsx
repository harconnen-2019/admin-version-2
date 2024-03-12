import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@test-utils';
import { BrowserRouter, useParams } from 'react-router-dom';
import { describe } from 'vitest';
import LanguageEditPage from '../language-edit-page';

vi.mock('react-router-dom');
const queryClient = new QueryClient();

/**
 * Для теста заготовлена фейковая запись в mswjs/data
 * Поля для теста name: 'Русский', slug;'ru'
 * Отдельные тесты для каждого поля не стал делать (нет смысла)
 * Тест с ошибкой не делал, слишком длинный таймаут у react-query
 */

describe('Страница редактирования языка', () => {
  vi.mocked(useParams).mockReturnValue({ langId: '1' });
  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageEditPage />
        </BrowserRouter>
      </QueryClientProvider>,
    );

  it('Проверка полей ввода', async () => {
    renderComponent();

    const overlay = screen.queryAllByTestId('overlay');
    await waitFor(() => expect(overlay[0]).not.toBeInTheDocument());

    //-- Заголовок
    const title = screen.getByRole('heading', {
      name: /русский/i,
    });
    expect(title).toBeInTheDocument();

    const arrayForm = [
      { role: 'textbox', name: 'Язык', value: 'Русский' },
      { role: 'textbox', name: 'Slug', value: 'ru' },
    ];

    for (const element of arrayForm) {
      const thank = screen.getByRole(element.role, {
        name: element.name,
      });
      expect(thank).toHaveValue(element.value);
    }
  });
});
