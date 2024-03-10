const Inputbox = ({ label, isRequired, onChange, value, type }) => {
    return (
      <div className="text-left mb-3">
        <label className="block pb-0.5 font-medium">
          {label} {isRequired && <span className="text-text-red">*</span>}
        </label>
        <input
          className="w-full h-9 rounded pl-2 border border-gray-400 focus:outline-none"
          onChange={(e) => {onChange(e.target.value);}}
          placeholder={`Enter your ${label.toLowerCase()}`}
          type={type}
          value={value}
          required={isRequired}
        ></input>
      </div>
    );
  };
  
  export default Inputbox;
  