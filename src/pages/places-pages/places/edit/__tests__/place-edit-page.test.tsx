import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, userEvent, waitFor, within } from '@test-utils';
import { BrowserRouter, useParams } from 'react-router-dom';
import { describe } from 'vitest';
import PlaceEditPage from '../place-edit-page';

vi.mock('react-router-dom');
const queryClient = new QueryClient();

/**
 * Для теста заготовлена фейковая запись в mswjs/data
 * Все поля и значения одноименные с дополнением "-test"
 * Отдельные тесты для каждого поля не стал делать (нет смысла)
 * По сути вообще хватило бы и снап-шота
 * Тест с ошибкой не делал, слишком длинный таймаут у react-query
 */

describe('Страница редактирования витрин', () => {
  vi.mocked(useParams).mockReturnValue({ placeId: '1' });
  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PlaceEditPage />
        </BrowserRouter>
      </QueryClientProvider>,
    );

  it('Проверка полей ввода на первой странице', async () => {
    renderComponent();

    const overlay = screen.queryAllByTestId('overlay');
    await waitFor(() => expect(overlay[0]).not.toBeInTheDocument());

    //--
    const title = screen.getByRole('heading', {
      name: /name-test/i,
    });
    expect(title).toBeInTheDocument();

    const arrayForm = [
      { role: 'combobox', name: 'Блок спасибо', value: 'page' },
      { role: 'textbox', name: 'Название', value: 'name-test' },
      { role: 'textbox', name: 'Шаблон', value: 'template-test' },
    ];

    for (const element of arrayForm) {
      const thank = screen.getByRole(element.role, {
        name: element.name,
      });
      expect(thank).toHaveValue(element.value);
    }
  });

  it('Выбор цвета темы шаблона', () => {
    const { container } = renderComponent();
    // eslint-disable-next-line testing-library/no-container
    const element = container.querySelector(
      'div:nth-child(1) > div > form > fieldset > div > div:nth-child(2) > span:nth-child(4) > svg',
    );
    expect(element).toBeInTheDocument();
  });

  it('Проверка полей ввода на второй странице', async () => {
    const user = userEvent.setup();
    renderComponent();

    // const overlay = screen.queryAllByTestId('overlay');
    // await waitFor(() => expect(overlay[0]).not.toBeInTheDocument());

    await user.click(screen.getByText(/картинки/i));

    const arrayForm = [
      { role: 'Favicon', patch: '/patch/favicon' },
      { role: 'OG Постер', patch: '/patch/og_img' },
      { role: 'Лого для темной темы', patch: '/patch/logo_light' },
      { role: 'Лого для светлой темы', patch: '/patch/logo_dark' },
    ];

    for (const element of arrayForm) {
      const group = screen.getByRole('group', {
        name: element.role,
      });
      const img = within(group).getByRole('img');
      expect(img).toHaveAttribute('src', element.patch);
    }
  });

  it('Проверка полей ввода на третьей странице', async () => {
    const user = userEvent.setup();
    renderComponent();

    // const overlay = screen.queryAllByTestId('overlay');
    // await waitFor(() => expect(overlay[0]).not.toBeInTheDocument());

    await user.click(screen.getByText(/счетчики/i));

    const arrayForm = [
      { role: 'textbox', name: 'Код счетчиков : < HEAD >', value: 'counter_head-test' },
      { role: 'textbox', name: 'Код счетчиков : < BODY >', value: 'counter_body-test' },
    ];

    for (const element of arrayForm) {
      const thank = screen.getByRole(element.role, {
        name: element.name,
      });
      expect(thank).toHaveValue(element.value);
    }
  });
});
