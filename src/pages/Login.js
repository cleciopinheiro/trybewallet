import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAcess } from '../redux/actions/userAction';

class Login extends React.Component {
  state = {
    isDisable: true,
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  validateForm = () => {
    const { email, password } = this.state;
    const MIN = 6;
    const validate = /^\S+@\S+\.\S+$/;

    if (email.match(validate) && password.length >= MIN) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(loginAcess(email));
    history.push('/carteira');
  };

  render() {
    const { isDisable } = this.state;
    return (
      <main>
        <form>
          <h1>TRYBEWALLET</h1>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Seu email"
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Sua senha"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ isDisable }
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
