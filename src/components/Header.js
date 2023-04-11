import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
        <h3 data-testid="total-field">0</h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.user,
});

export default connect(mapStateToProps)(Header);
