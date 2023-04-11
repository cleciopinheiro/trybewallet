import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    currencie: '',
    description: '',
    methodPay: '',
    typeExpense: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCurrencies());
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currencie, description, methodPay, typeExpense } = this.state;
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
            name="currencie"
            value={ currencie }
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
            name="methodPay"
            value={ methodPay }
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
            name="typeExpense"
            value={ typeExpense }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
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
