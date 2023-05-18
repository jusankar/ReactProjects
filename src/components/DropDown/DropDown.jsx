import { useEffect, useState } from "react";
import s from "./style.module.css";

export default function DropDown({
  options,
  placeholder = "",
  onChange,
  selectedKey,
  readOnly = true
}) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedKey) {
      setInputValue(options.find((o) => o.key === selectedKey).value);
    }
  }, [selectedKey, options]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onItemSelected = (option) => {
    onChange !== undefined && onChange(option.key);
    onChange !== undefined && setInputValue(option.value);
    setOpen(false);
  };

  const onInputClick = () => {
    setOpen((prevValue) => !prevValue);
  };

  return (
    <div className={s.container}>
      <div className={s.input} onClick={onInputClick}>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={onInputChange}
          readOnly = {readOnly}
        />
      </div>
      <div className={s.arrow_container} onClick={onInputClick}>
        <i className={`${open?s.arrowUp: s.arrowDown}`} />
      </div>
      <div className={`${s.options} ${open ? s.optionVisibility : ""}`}>
        {options
        // .filter((item)=> {
        //   const searchItem = inputValue.toLocaleLowerCase();
        //   const v = item.value.toLocaleLowerCase();
        //   if(!searchItem) return true;
        //   return v.startsWith(searchItem);
        // })
        .map((opt) => {
          return (
            <div
              key={opt.key}
              onClick={() => onItemSelected(opt)}
              className={s.optionItems}
            >
              {opt.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
