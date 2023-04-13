import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpenseStart } from '../redux/actions';

class Table extends Component {
  removeExpense = (id) => {
    const { dispatch, expenses } = this.props;
    const newExpense = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpense(newExpense));
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpenseStart(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    { Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>
                    { Number(expense.value * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editExpense(expense.id) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.removeExpense(expense.id) }
                    >
                      Excluir
                    </button>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.shape({}),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
