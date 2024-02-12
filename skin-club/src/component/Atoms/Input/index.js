export const Input = ({
        type = 'text',
        className = '',
        value,
        name,
        onChange,
        placeholder,

   }) => {
    return(
        <input
            type={type}
            onChange={(e) => {onChange(name, e.target.value)}}
            value={value}
            className={`${className} w-full py-2 border-b border-gray-900`}
            placeholder={placeholder} />
    )
}