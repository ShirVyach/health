import React from 'react';

const Select = ({ table, defaultValue, value, onChange }) => {

  const options = table.map(tab => {
    return <option key={tab.id} value={tab.id}>{tab.title}</option>
  })

  return (
    <div className="select">
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
      >
        <option disabled value="">{defaultValue}</option>
        {options}
      </select>
    </div>
  )

}
export default Select;