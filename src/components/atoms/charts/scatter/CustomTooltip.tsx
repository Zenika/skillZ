const CustomTooltip = (value) => {
    if (value.active && value.payload && value.payload.length) {
        return (
            <div
                className={`max-w-md p-2 outline-none focus:outline-none rounded border border-light-dark`}
                style={{ backgroundColor: value.contentStyle.color }}
            >
                <p
                    className={'text-light-ultrawhite'}
                >{`Skills : ${value.payload[0].payload.skills.join(', ')}`}</p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
