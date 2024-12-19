export default function Button({children,onClick,disabled}){
    return(
        <button className={`bg-pink-500 rounded-xl px-3 text-white ${disabled?'opacity-25':''}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}