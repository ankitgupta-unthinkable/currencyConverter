import React from 'react';
import DropDown from '../dropdown/dropdown';
import './inputBox.css';

export default function InputBox({ currencyName, currencyValue, onCurrencyChange, onInputChange, currencies }) {

    function onChangeHandler(event) {
        onCurrencyChange(event.target.value);
    }


    return <>
        <div className='input-div'>
            <input className='input' name={currencyName} onChange={onInputChange} value={currencyValue}/>
            {
                currencies && <DropDown currencies={Object.keys(currencies)} onChange={onChangeHandler} currentCurrency={currencyName}/>
            }
        </div>
    </>;
}