import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExchangeThunk, fetchCurrenciesThunk } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  description: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    currency: 'USD',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    this.setState({ id: id + 1 });
    dispatch(fetchExchangeThunk(this.state));
    this.setState(INITIAL_STATE);
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, description, method, tag } = this.state;
    return (
      <div>
        <label htmlFor="">
          Valor
          <input
            onChange={ this.onInputChange }
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
          />
        </label>

        <label htmlFor="">
          Moeda
          <select
            onChange={ this.onInputChange }
            data-testid="currency-input"
            name="currency"
            value={ currency }
          >
            {
              currencies.map((coin, index) => (
                <option key={ index } value={ coin }>{ coin }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="">
          Descrição
          <input
            onChange={ this.onInputChange }
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
          />
        </label>

        <label htmlFor="">
          Método de pagamento
          <select
            onChange={ this.onInputChange }
            data-testid="method-input"
            name="method"
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="">
          Tipo de despesas
          <select
            onChange={ this.onInputChange }
            data-testid="tag-input"
            name="tag"
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa

        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
