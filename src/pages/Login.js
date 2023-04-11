import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [target.name]: value,
    }, this.validateForms);
  };

  validateForms = () => {
    const { password, email } = this.state;
    const emailValidate = /^\S+@\S+\.\S+$/;
    const MIN = 6;
    if (email.match(emailValidate) && password.length >= MIN) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(userEmail(email));
    history.push('./carteira');
  };

  render() {
    const { isDisabled, password, email } = this.state;
    return (
      <main>
        <h1>TRYBEWALLET</h1>
        <form action="">
          <input
            onChange={ this.onInputChange }
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            id="email"
            placeholder="Digite seu e-mail"
          />
          <input
            onChange={ this.onInputChange }
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            id="password"
            placeholder="Digite sua senha"
          />
          <button
            disabled={ isDisabled }
            type="button"
            onClick={ this.handleSubmit }
          >
            Entrar

          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
