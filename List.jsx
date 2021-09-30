import React, { useMemo, useState } from "react"
import Item from "./Item"
import Input from "./Input";



const List = (props) => {

    let arr_1 = [...props.table].map(item => item.title[0]).filter((item, index) => {
        return [...props.table].map(item => item.title[0]).indexOf(item) === index
    });

    const [selectgroup, setselectgroup] = useState ()

    const [value, setvalue] = useState([])

    const getvalue = (item) => {
        setvalue(item)
        props.getvalue(item)
    }

    const [filter, setFilter] = useState({ query: '' })

    const SearchTable = useMemo(() => {
        return [...props.table].filter(dis => dis.title.toLowerCase().includes(filter.query.toLowerCase())).filter(i => i.title[0] === selectgroup)
    }, [filter.query, selectgroup, props.table])

    return (
        <div>
            <strong className="item">{value.title}</strong>
            <div>
                <Input className="item"
                    value={filter.query}
                    onChange={e => setFilter({ ...filter, query: e.target.value })}
                    placeholder="Поиск..."
                />
            </div>
            <div>
                <select  onChange={e => setselectgroup(e.target.value)}>{arr_1.map((item) =>
                    <option value={item}>{item}</option>
                )}</select>

                {SearchTable.map((item) =>
                    <Item item={item} refund={getvalue} />
                )}
            </div>
        </div>
    )
}

export default List;