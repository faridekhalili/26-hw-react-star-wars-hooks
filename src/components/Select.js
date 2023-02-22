import React from 'react';

const Select = ({planets}) => {
    return (
        <select id="country" name="country">
            {planets.map((planet, index) => (
                <option key={index} value={planet}>{planet}</option>
            ))}
        </select>
    );
}
export default Select;