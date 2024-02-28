import { usePlaceTypeList } from '@/entities/places-types/hooks/use-place-types-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

const queryClient = new QueryClient();

describe('Testing our React application', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('Fetch posts', async () => {
    // render(
    //   <MantineProvider theme={theme}>
    //     <SelectPlaceTypes getInputProps={{ onChange: () => {} }} />
    //   </MantineProvider>,
    // );

    // const response = await fetch('https://api.example.com/user');

    // expect(response.status).toBe(200);
    // expect(response.statusText).toBe('OK');
    // expect(await response.json()).toEqual({
    //   firstName: 'John',
    //   lastName: 'Maverick',
    // });

    const { result } = renderHook(() => usePlaceTypeList(), { wrapper });

    await waitFor(() => expect(result.current.status).toEqual('success'));
    // expect(result.current.status).toEqual('success');
    result.current.data?.places_type_list &&
      expect(result.current.data?.places_type_list[0].name).toEqual('site');

    // await waitFor(() => screen.debug());
    // screen.debug();
    // await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    // const headline = screen.getByText(/and save to test hmr/i);
    // expect(headline).toBeInTheDocument();
  });
});
