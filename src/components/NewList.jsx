import React, { useMemo, useState } from "react"
import Input from "./Input";
import NewItem from "./NewItem";


const NewList = (props) => {


    const [value, setvalue] = useState([])



    const getvalue = (item) => {
        setvalue([...value, item.title])
        props.getvalue(item)
    }

    const removevalue = (item) => {
        setvalue(value.filter(i => i !== item.title))
        props.removevalue(item)
    }
    
    if (props.clear=== true) value.splice(0)

    const [filter, setFilter] = useState({ query: '' })

    const SearchTable = useMemo(() => {
        return [...props.table].filter(dis => (value.includes(dis.title) === true) ? dis : dis.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, props.table])

    return (
        <div>
            <div>
                <Input className="item"
                    value={filter.query}
                    onChange={e => setFilter({ ...filter, query: e.target.value })}
                    placeholder="Поиск..."
                />
            </div>
            <div>
                {SearchTable.map((item) =>
                    <NewItem item={item} refund={getvalue} remove={removevalue} clear={props.clear}/>
                )}
            </div>
        </div>
    )
}

export default NewList;