import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editFinish, fetchCurrencies,
  fetchExchanges } from '../redux/actions/walletAction';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch, currencies } = this.props;
    dispatch(fetchCurrencies(currencies));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    this.setState({ id: id + 1 });
    dispatch(fetchExchanges(this.state));
    this.setState(INITIAL_STATE);
  };

  handleEdit = () => {
    const { idToEdit, expenses, dispatch } = this.props;
    const { value, currency, description, method, tag } = this.state;
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
    dispatch(editFinish(payload));
    this.setState(INITIAL_STATE);
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <input
          onChange={ this.handleChange }
          data-testid="value-input"
          type="number"
          name="value"
          value={ value }
        />
        <input
          onChange={ this.handleChange }
          data-testid="description-input"
          type="text"
          name="description"
          value={ description }
        />
        <select
          onChange={ this.handleChange }
          data-testid="currency-input"
          name="currency"
        >
          {
            currencies.map((coin, index) => (
              <option key={ index } value={ coin }>{ coin }</option>
            ))
          }
        </select>

        <select
          onChange={ this.handleChange }
          data-testid="method-input"
          name="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          onChange={ this.handleChange }
          data-testid="tag-input"
          name="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        {
          !editor ? (
            <button onClick={ this.handleSubmit } type="button">Adicionar despesa</button>
          )
            : (
              <button onClick={ this.handleEdit } type="button">Editar despesa</button>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ),
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
