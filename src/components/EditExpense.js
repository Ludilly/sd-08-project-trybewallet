import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { finishEditAction } from '../actions/index';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class AddExpense extends React.Component {
  constructor(props) {
    super(props);

    this.onFieldChange = this.onFieldChange.bind(this);
    this.addExpense = this.addExpense.bind(this);

    const { expenseID, expenses } = this.props;
    const expense = expenses.find((item) => item.id === expenseID);
    const { value, description, currency, method, tag, id } = expense;

    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      id,
    };
  }

  onFieldChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="expense-input">
        Valor da Despesa:
        <input
          id="expense-input"
          type="number"
          name="value"
          value={ value }
          onChange={ this.onFieldChange }
          data-testid="value-input"
        />
      </label>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição da Despesa:
        <textarea
          id="description-input"
          name="description"
          value={ description }
          onChange={ this.onFieldChange }
          data-testid="description-input"
        />
      </label>
    );
  }

  currencyInput() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda usada:
        <select
          id="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.onFieldChange }
          data-testid="currency-input"
        >
          {currencies.map((item) => (
            <option key={ item } data-testid={ item }>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  methodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          id="method-input"
          name="method"
          value={ method }
          onChange={ this.onFieldChange }
          data-testid="method-input"
        >
          {methods.map((item) => (
            <option key={ item }>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  tagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="currency-input">
        Categoria:
        <select
          id="currency-input"
          name="tag"
          value={ tag }
          onChange={ this.onFieldChange }
          data-testid="tag-input"
        >
          {tags.map((item) => (
            <option key={ item } className="tags">
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  addExpense() {
    const { value, description, currency, method, tag, id } = this.state;
    const { finishEdit } = this.props;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    finishEdit(expense);
  }

  render() {
    return (
      <div>
        {this.valueInput()}
        {this.descriptionInput()}
        {this.currencyInput()}
        {this.methodInput()}
        {this.tagInput()}
        <button type="button" onClick={ this.addExpense }>Editar despesa</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseID: state.wallet.expenseID,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  finishEdit: (expense) => dispatch(finishEditAction(expense)),
});

AddExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  expenseID: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  finishEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
