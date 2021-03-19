import React, { Component } from 'react';

class Gastos extends Component {
  constructor() {
    super();
    this.state = { Currencys: [] };
    this.getAPI = this.getAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.inputCurrency = this.inputCurrency.bind(this);
    this.inputMethod = this.inputMethod.bind(this);
    this.inputCategory = this.inputCategory.bind(this);
  }

  componentDidMount() {
    this.getCurrency();
  }

  async getAPI() {
    const endPoint = 'https://economia.awesomeapi.com.br/json/all';
    const fetchAPI = await fetch(endPoint);
    const Data = await fetchAPI.json();
    return Data;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  inputValues() {
    return (
      <div>
        <input
          type="text"
          name="value"
          data-testid="value-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <textarea
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ (event) => this.handleChange(event) }
        />
      </div>
    );
  }

  async getCurrency() {
    const Data = await this.getAPI();
    const dataKeys = Object.keys(Data);
    const Currencys = dataKeys.filter((item) => item !== 'USDT');
    this.setState({
      Currencys,
    });
  }

  inputCurrency() {
    const { Currencys } = this.state;
    return (
      <div>
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ (event) => this.handleChange(event) }
        >
          {Currencys.map((item) => (
            <option
              value={ item }
              key={ item }
              data-test-id={ item }
            >
              {item}
            </option>))}
        </select>

      </div>
    );
  }

  inputMethod() {
    const methodArray = [
      'Dinheiro', 'Cartão de crédito', 'Cartão de débito',
    ];
    return (
      <div>
        <select
          data-testid="method-input"
          name="method"
          onChange={ (event) => this.handleChange(event) }
        >
          {methodArray.map((item) => (
            <option
              value={ item }
              key={ item }
              data-test-id={ item }
            >
              {item}
            </option>))}
        </select>
      </div>
    );
  }

  inputCategory() {
    const categoryArray = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    return (
      <div>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ (event) => this.handleChange(event) }
        >
          {categoryArray.map((item) => (
            <option
              value={ item }
              key={ item }
              data-test-id={ item }
            >
              {item}
            </option>))}
        </select>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.inputValues() }
        { this.inputCurrency() }
        { this.inputMethod() }
        { this.inputCategory() }
      </div>);
  }
}

export default Gastos;
