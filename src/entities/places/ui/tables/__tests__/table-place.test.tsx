import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@test-utils';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { placeType } from '@/entities/places';
import { TablePlace } from '../table-place';

const data: placeType.IPlace[] = [
  {
    id: 1,
    created: new Date('1946-10-04T18:12:23.671Z'),
    modified: new Date('1948-06-03T12:04:33.301Z'),
    name: 'Clothing',
    domain: 'elated-coalition.biz',
    template: 'grounded-butter',
    favicon: 'https://avatars.githubusercontent.com/u/55877764',
    og_img: 'https://avatars.githubusercontent.com/u/81553655',
    logo_dark: 'https://avatars.githubusercontent.com/u/44465421',
    logo_light: 'https://avatars.githubusercontent.com/u/71903166',
    color_scheme: 'green',
    counter_head: 'counter_head ',
    counter_body: 'counter_body',
    thankyou_type: 'page',
    type: {
      id: 1,
      created: new Date('1959-10-08T12:09:59.495Z'),
      modified: new Date('1985-03-31T08:07:53.847Z'),
      name: 'Tools',
    },
  },
  {
    id: 2,
    created: new Date('1964-02-08T15:12:48.833Z'),
    modified: new Date('1946-06-29T01:36:25.536Z'),
    name: 'Baby',
    domain: 'perfumed-freon.org',
    template: 'extraneous-shoe-horn',
    favicon: '',
    og_img: 'https://avatars.githubusercontent.com/u/68364384',
    logo_dark: '',
    logo_light: 'https://avatars.githubusercontent.com/u/34375761',
    color_scheme: 'pink',
    counter_head: 'counter_head',
    counter_body: 'counter_body',
    thankyou_type: 'pop',
    type: {
      id: 1,
      created: new Date('1959-10-08T12:09:59.495Z'),
      modified: new Date('1985-03-31T08:07:53.847Z'),
      name: 'Tools',
    },
  },
];

const queryClient = new QueryClient();

describe('Таблица со списком витрин', () => {
  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TablePlace
            data={data}
            error={undefined}
            placeId={2}
            remove={() => {}}
            status="success"
          />
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
          <TablePlace
            data={data}
            error={undefined}
            placeId={2}
            remove={() => {}}
            status="pending"
          />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const result = screen.queryByText(/clothing/i);

    expect(result).not.toBeInTheDocument();
  });

  it('Статус активная включен у нужной витрины', () => {
    renderComponent();
    // Выбираем вторую строку
    const row2 = screen.getByRole('row', {
      name: /2 активная/i,
    });
    const active = within(row2).getByText(/активная/i);

    expect(active).toBeInTheDocument();
  });

  it('Если не приходит Id витрины из сессии статус "активная" отключен', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TablePlace
            data={data}
            error={undefined}
            placeId={undefined}
            remove={() => {}}
            status="success"
          />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const active = screen.queryByText(/активная/i);

    expect(active).not.toBeInTheDocument();
  });

  it('Кнопка выбора витрины активна', () => {
    renderComponent();
    // Выбираем первую строку
    const row1 = screen.getByRole('row', {
      name: /1 clothing/i,
    });
    const buttonEnabled = within(row1).getByRole('button', {
      name: /выбрать/i,
    });

    expect(buttonEnabled).not.toHaveAttribute('disabled');
  });

  it('Кнопка выбора витрины выключена', () => {
    renderComponent();
    // Выбираем вторую строку
    const row2 = screen.getByRole('row', {
      name: /2 активная/i,
    });
    const buttonDisabled = within(row2).getByRole('button', {
      name: /выбрать/i,
    });

    expect(buttonDisabled).toHaveAttribute('disabled');
  });

  it('Дата переводится в удобный формат', () => {
    renderComponent();
    const parseDate = screen.getByText(/29 июня 46 г/i);

    expect(parseDate).toBeInTheDocument();
  });

  it('Адаптивная ширина у колонки с названием', () => {
    renderComponent();
    const cellHeadName = screen.getByRole('columnheader', {
      name: /витрина/i,
    });

    expect(cellHeadName).toHaveAttribute('style', 'width: auto;');
  });
});
