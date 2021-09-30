import React from 'react';
import Input from "./Input";

const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            <Input
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                placeholder="Поиск..."
            />
        </div>
    );
};

export default Filter;
