<li
    key={i}
    style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px',
        borderBottom: '1px solid #eee',
    }}
>
    <div>
        <strong>{ing.product_name}</strong>
        <span
            style={{
                marginLeft: '10px',
                color: '#666',
            }}
        >
            {ing.displayQuantity} {ing.displayUnit}
        </span>
    </div>

    <button
        onClick={() => removeIngredient(i)}
        className="btn btn-error text-white"
    >
        <MdDelete size={24} />
    </button>
</li>;
