import React, { useMemo, useState } from "react"
import Item from "./Item"
import Input from "./Input";



const List = (props) => {


    const [value, setvalue] = useState([])

    const getvalue = (item) => {
        setvalue(item)
        props.getvalue(item)
    }

    const [filter, setFilter] = useState({ query: '' })

    const SearchTable = useMemo(() => {
        return [...props.table].filter(dis => dis.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, props.table])

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
                {SearchTable.map((item) =>
                    <Item item={item} refund={getvalue} />
                )}
            </div>
        </div>
    )
}

export default List;