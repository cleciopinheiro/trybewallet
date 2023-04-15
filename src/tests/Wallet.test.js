import { screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';
import App from '../App';

describe('Página Login', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        mockData,
      ),
    });
  });

  test('Verifica se é renderizado o email salvo no estado global', () => {
    const { store, history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByText(/teste@teste\.com/i);

    expect(history.location.pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe('teste2@teste.com');
    expect(email).toBeInTheDocument();
  });

  test('Verifica se é renderizado um elemento com o data-testid="total-field"', () => {
    renderWithRouterAndRedux(<Wallet />);

    const total = screen.getByTestId('total-field');

    expect(total).toBeInTheDocument();
  });

  test('Verifica se é renderizado os inputs de valor, descrição, moeda, método de pagamento e categoria e botão de Adicionar despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByRole('spinbutton');
    expect(value).toBeInTheDocument();
    userEvent.type(value.value, '10');

    const tag = screen.getByRole('combobox');
    expect(tag).toBeInTheDocument();

    const description = screen.getByRole('textbox');
    expect(description).toBeInTheDocument();
    userEvent.type(description.value, 'teste');

    const method = screen.getByRole('combobox');
    expect(method).toBeInTheDocument();

    waitFor(async () => {
      const currency = await screen.getByRole('combobox');
      expect(currency).toBeInTheDocument();
      expect(currency.value).toBe('USD');
    });

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(button).toBeInTheDocument();
  });

  test('Verifique se adiciona uma nova despesa no "expenses" ao apertar o botão Adicionar despesa', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);
    expect(store.getState().wallet.expenses).toHaveLength(0);

    const value = screen.getByRole('spinbutton');
    userEvent.type(value, '10');

    const description = screen.getByRole('textbox');
    userEvent.type(description, 'teste');

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(button);
    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
    });
  });

  test('Verifique se uma nova despesa é renderizada ao clicar no botão Adicionar despesa', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);
    expect(store.getState().wallet.expenses).toHaveLength(0);

    const value = screen.getByRole('spinbutton');
    userEvent.type(value, '10');

    const description = screen.getByRole('textbox');
    userEvent.type(description, 'teste');

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(button);

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
      expect(screen.getByRole('cell', { name: /teste/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /10\.00/i })).toBeInTheDocument();
    });
  });

  test('Verifique se deleta a despesa ao clicar no botão Excluir', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);
    expect(store.getState().wallet.expenses).toHaveLength(0);

    const value = screen.getByRole('spinbutton');
    userEvent.type(value, '10');

    const description = screen.getByRole('textbox');
    userEvent.type(description, 'teste');

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAdd);

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
    });

    const buttonDelete = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(buttonDelete);

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(0);
    });
  });

  test('Verifique se os valores da despesa são alterados com o novo valor ao apertar o botão de Editar', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByRole('spinbutton');
    userEvent.type(value, '1');
    const description = screen.getByRole('textbox');
    userEvent.type(description, 'teste');
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAdd);

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /1\.00/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /teste/i })).toBeInTheDocument();
    });

    const buttonEdit = screen.getByRole('button', { name: /editar/i });
    userEvent.click(buttonEdit);
    userEvent.type(value, '100');
    userEvent.type(description, 'new expense');

    await waitFor(() => {
      const buttonEditExpense = screen.getByRole('button', { name: /editar despesa/i });
      userEvent.click(buttonEditExpense);
      expect(screen.getByRole('cell', { name: /100\.00/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /new expense/i })).toBeInTheDocument();
    });
  });
});
