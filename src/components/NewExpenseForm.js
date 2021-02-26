import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import currenciesAPI from '../services';
import { fetchCurrencies as getCurrencies, saveExpense as addExpense } from '../actions';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
};

class NewExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      ...INITIAL_STATE,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(e) {
    e.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { saveExpense } = this.props;
    const exchangeRates = await currenciesAPI();
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    saveExpense(expense);
    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
    });
  }

  renderInput(label, type, name, value) {
    return (
      <label htmlFor="value-input">
        {`${label}: `}
        <input
          type={ type }
          id={ `${name}-input` }
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          value={ value }
        />
      </label>
    );
  }

  renderSelectCurrencies(value, handleChange) {
    const { currencies } = this.props;
    const currenciesName = Object.keys(currencies[0] || {});
    return (
      <select
        id="currency-input"
        name="currency"
        data-testid="currency-input"
        onChange={ handleChange }
        value={ value }
      >
        {currenciesName.map((currency) => {
          if (currency === 'USDT') return '';
          return (
            <option key={ currency } data-testid={ currency }>
              {currency}
            </option>
          );
        })}
      </select>
    );
  }

  renderSelect(label, name, value, options) {
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <select
          id={ `${name}-input` }
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          value={ value }
        >
          {options.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <form>
        {this.renderInput('Valor', 'number', 'value', value)}
        {this.renderInput('Descrição', 'text', 'description', description)}
        <label htmlFor="currency-input">
          {'Moeda: '}
          {this.renderSelectCurrencies(currency, this.handleChange)}
        </label>
        {this.renderSelect('Método de pagamento', 'method', method, methods)}
        {this.renderSelect('Tag', 'tag', tag, tags)}
        <button type="submit" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
  saveExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewExpenseForm);

NewExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
  saveExpense: PropTypes.func.isRequired,
};

NewExpenseForm.defaultProps = {
  currencies: [],
};
