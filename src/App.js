import React, { useState, useEffect } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  const [valute, setValute] = useState({});

  useEffect(() => {
    let ignore = false;
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((val) => val.json())
      .then((json) => {
        if (!ignore) setValute(json.Valute);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию')
      });
    return () => { ignore = true }
  }, []);


  
  const onChangeFromPrice = (value) => {
    if (value < 0) return
    const price = value / valute[toCurrency].Value;
    const result = price * valute[fromCurrency].Value;
    setToPrice(result.toFixed(3))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    if (value < 0) return
    const result = (valute[toCurrency].Value / valute[fromCurrency].Value) * value;
    setFromPrice(result.toFixed(3))
    setToPrice(value)
  }


useEffect(() => {
  if (!Object.keys(valute).length) return
 onChangeFromPrice(fromPrice);
}, [fromCurrency]);

 useEffect(() => {
  if (!Object.keys(valute).length) return
onChangeToPrice(toPrice);
 }, [toCurrency]);





  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}

      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
