export const Button = ({
    children,
    handleClick,
    className = '',
  }) => {
    return(
        <button
            onClick={handleClick}
            className={`${className} text-[12px] w-full py-2 text-white rounded-full bg-black`}>
            {children}
        </button>
    )
}