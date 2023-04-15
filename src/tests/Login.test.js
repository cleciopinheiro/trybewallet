import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Página Login', () => {
  test('Verifica se é renderizdo um input de email e senha', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByRole('textbox');
    const password = screen.getByRole('textbox');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Verifique se é renderizado um botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(button).toBeInTheDocument();
  });

  test('Realize as verificações nos campos de email, senha', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByRole('textbox');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '123456');
    expect(button.disabled).toBe(false);

    userEvent.type(email, 'teste');
    userEvent.type(password, '123456');
    expect(button.disabled).toBe(true);
  });

  test('Verifica se o email no estado da aplicação, com a chave email, assim que o usuário logar', () => {
    const { store } = renderWithRouterAndRedux(<Login />);

    const email = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(store.getState().user.email).toBe('');
    userEvent.type(email, 'teste2@teste.com');
    userEvent.type(password, '123456');
    userEvent.click(button);

    expect(store.getState().user.email).toBe('teste2@teste.com');
  });

  test('A rota é alterada para "/carteira" após o clique no botão', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(screen.getByTestId('email-input'), 'teste@teste.com');
    userEvent.type(screen.getByTestId('password-input'), '123456');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
