import React from "react";
import './dropdown.css';

export default function DropDown({ currencies, onChange, currentCurrency }) {
    return <select className="select" name="currencyName" id='currencyName' onChange={onChange}>
        {
            currencies.map((obj) => <option key={obj} value={obj} selected={currentCurrency === obj} > {obj} </option>)
        }
    </select>;
}