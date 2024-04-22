import React, { useId } from 'react';

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId();

    if (!label) {
        throw new Error('Select component requires a label.');
    }

    return (
        <div className='w-full'>
            <label htmlFor={id} className=''>
                {label}
            </label>
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);
