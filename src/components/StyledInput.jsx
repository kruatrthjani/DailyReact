export default function StyledInput({ placeholder, type, onChange, value }) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-blue-300 rounded-md text-sm p-2 focus:outline-blue-500 "
        onChange={onChange}
        value={value}
      />
    </>
  );
}
