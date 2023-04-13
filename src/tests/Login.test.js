import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Crie uma página inicial de login com os seguintes campos e características', () => {
  test('A rota para esta página é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('É renderizado um elemento para que o usuário insira seu email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByRole('textbox');
    const password = screen.getByRole('textbox');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('É renderizado um botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(button).toBeInTheDocument();
  });

  test('Foram realizadas as verificações nos campos de email, senha e botão', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByRole('textbox');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '123456');

    expect(button.disabled).toBe(false);
  });

  test('Salva o email no estado da aplicação, com a chave email, assim que o usuário logar', () => {
    const { store } = renderWithRouterAndRedux(<App />);

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
    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(screen.getByTestId('email-input'), 'teste@teste.com');
    userEvent.type(screen.getByTestId('password-input'), '123456');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
