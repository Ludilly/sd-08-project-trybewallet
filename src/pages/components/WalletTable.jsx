import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
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
          {expenses.map((expense) => {
            const currency = expense.exchangeRates[expense.currency];
            const converted = Number(expense.value) * Number(currency.ask);
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{currency.name}</td>
                <td>{ (Math.round(currency.ask * 100) / 100).toFixed(2) }</td>
                <td>{ (Math.round(converted * 100) / 100).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(WalletTable);
