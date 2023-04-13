import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExchangeThunk, fetchCurrenciesThunk,
  editExpenseFinish } from '../redux/actions';

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

  componentDidUpdate(prevProps) {
    const { isEditing, idToEdit, expenses } = this.props;
    if (prevProps.isEditing !== isEditing && isEditing === true) {
      this.setState({
        value: expenses[idToEdit].value,
        descriptiont: expenses[idToEdit].description,
        currency: expenses[idToEdit].currency,
        method: expenses[idToEdit].method,
        tag: expenses[idToEdit].tag,
      });
    }
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

  editExpense = () => {
    const { idToEdit, expenses, dispatch } = this.props;
    const { value, currency, description, method,
      tag } = this.state;

    const payload = [
      ...expenses,
    ];

    payload[idToEdit] = {
      ...expenses[idToEdit],
      value,
      currency,
      description,
      method,
      tag,
    };

    dispatch(editExpenseFinish(payload));
    this.setState(INITIAL_STATE);
  };

  render() {
    const { currencies, editor } = this.props;
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

        {!editor
          ? (
            <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
          )
          : (
            <button type="button" onClick={ this.editExpense }>Editar despesa</button>
          )}
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ),
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
