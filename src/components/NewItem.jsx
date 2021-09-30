import React, { useState } from "react";

const NewItem = (props) => {

    const [checked, setChecked] = useState(false)

    const handleChange = (event) => {
        setChecked(event.target.checked)
        if (checked === false) { props.refund(props.item) } else props.remove(props.item)
    };
    
    if (props.clear === true && checked === true) setChecked(false)

    return (
        <div className="item">
            <div>
                <strong>{props.item.title}</strong>
            </div>
            <div>
                <input type="checkbox" onChange={handleChange} checked={checked} />
            </div>
        </div>
    )
}

export default NewItem;