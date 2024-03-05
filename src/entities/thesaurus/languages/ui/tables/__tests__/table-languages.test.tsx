import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@test-utils';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { ILanguage } from '../../../api/types';
import { TableLanguages } from '../table-languages';

const data: ILanguage[] = [
  {
    id: 1,
    created: new Date('1946-10-04T18:12:23.671Z'),
    modified: new Date('1948-06-03T12:04:33.301Z'),
    name: 'Русский',
    slug: 'ru',
  },
  {
    id: 2,
    created: new Date('1948-10-04T18:12:23.671Z'),
    modified: new Date('1948-06-03T12:04:33.301Z'),
    name: 'English',
    slug: 'en',
  },
];

const queryClient = new QueryClient();

describe('Таблица со списком языков', () => {
  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TableLanguages data={data} error={undefined} remove={() => {}} status="success" />
        </BrowserRouter>
      </QueryClientProvider>,
    );

  it('Создаем "снап-шот" данных', () => {
    expect(data).toMatchSnapshot();
  });

  it('Данные появятся только если статус "success', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TableLanguages data={data} error={undefined} remove={() => {}} status="pending" />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const result = screen.queryByText(/clothing/i);

    expect(result).not.toBeInTheDocument();
  });

  it('Дата переводится в удобный формат', () => {
    renderComponent();
    const parseDate = screen.getByText(/4 октября 46 г/i);

    expect(parseDate).toBeInTheDocument();
  });

  it('Адаптивная ширина у колонки с названием', () => {
    renderComponent();
    const cellHeadName = screen.getByRole('columnheader', {
      name: /язык/i,
    });

    expect(cellHeadName).toHaveAttribute('style', 'width: auto;');
  });
});
