export default function ItemSelect ({ items, className, onItemChange }) {

    const handleSelectItem = e => {
        onItemChange(e.target.value)
    }

    return (
        <select 
            className={className}
            onChange={handleSelectItem}
        >
            <option>-- Select Item --</option>
            {
                items.map((item,id)=>{
                    return (
                        <option key={id} value={item?._id}>{item?.item_name}</option>
                    )
                })
            }
        </select>
    )
}