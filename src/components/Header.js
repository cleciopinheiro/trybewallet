import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
        <h3 data-testid="total-field">
          {
            expenses
              .reduce((acc, item) => acc + (Number(item
                .value) * Number(item.exchangeRates[item.currency].ask)), 0)
              .toFixed(2)
          }
        </h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.shape({}),
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
