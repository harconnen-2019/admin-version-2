import { render, screen, within } from '@test-utils';
import { describe, it } from 'vitest';

import { BrowserRouter } from 'react-router-dom';
import { TablePlaces } from '../places-table';

describe('Таблица со списком витрин', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <TablePlaces />
      </BrowserRouter>,
      true,
    );

  it('Данные появятся только если статус "success', async () => {
    renderComponent();
    const result = await screen.findByText(/name-test/i);
    expect(result).toBeInTheDocument();
  });

  it('Статус активная включен у нужной витрины', async () => {
    renderComponent();
    // Выбираем вторую строку
    const row2 = await screen.findByRole('row', {
      name: /name-test/i,
    });
    const active = within(row2).getByRole('checkbox', {
      name: /select row/i,
    });

    expect(active).toHaveAttribute('checked', '');
  });

  // it('Если не приходит Id витрины из сессии статус "активная" отключен', () => {
  //   render(<TablePlaces />, true);
  //   const active = screen.queryByText(/активная/i);
  //   expect(active).not.toBeInTheDocument();
  // });

  it('Кнопка выбора витрины активна', async () => {
    renderComponent();
    // Выбираем первую строку
    const row1 = await screen.findByRole('row', {
      name: /name-test/i,
    });
    const buttonEnabled = within(row1).getByRole('checkbox', {
      name: /select row/i,
    });

    expect(buttonEnabled).not.toHaveAttribute('disabled');
  });

  it('Дата переводится в удобный формат', async () => {
    renderComponent();
    const parseDate = await screen.findByText(/4 октября 46 г/i);
    expect(parseDate).toBeInTheDocument();
  });

  it('Адаптивная ширина у колонки с названием', async () => {
    renderComponent();
    const cellHeadName = await screen.findByRole('columnheader', {
      name: /витрина/i,
    });
    expect(cellHeadName).toHaveAttribute('style', 'width: auto;');
  });
});
