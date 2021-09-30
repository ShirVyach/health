import React from "react";

const Item = (props) => {
    return (
        <div className="item">
            <div>
                <strong>{props.item.title}</strong>
            </div>
            <div>
                <button className="button" onClick={() => props.refund(props.item)} >Выбрать</button>
            </div>
        </div>
    )
}
export default Item;