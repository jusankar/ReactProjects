import { useEffect, useState } from "react";
import s from "./style.module.css";

export default function AutoSelect({
  options,
  textPlaceHolder,
  buttonText,
  selectedKey,
  onChange,
}) {
  const [inputValue, setInputValue] = useState("");

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
  };

  return (
    <div className={s.mainConatiner}>
      <div className={s.container}>
        <input
          className={s.inputTextBox}
          placeholder={textPlaceHolder}
          type="text"
          value={inputValue}
          onChange={onInputChange}
        />
        <button className={s.button}>{buttonText}</button>
      </div>
      <div className={s.listContainer}>
        {options
          .filter((item) => {
            const searchItem = inputValue.toLocaleLowerCase();
            const v = item.value.toLocaleLowerCase();
            if (!searchItem) return true;
            return v.startsWith(searchItem);
          })
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
