import { useRef, useState } from "react";
import s from "./style.module.css";
import {
  XCircleFill as CloseIcon,
  Search as SearchIcon,
} from "react-bootstrap-icons";

export default function LocationDropDown({
  options,
  onChange,
  textPlaceHolder,
  selectedLocation="",
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(selectedLocation);
  const [open, setOpen] = useState(false);
  const inputref = useRef();
  const clearText = () => {
    setInputValue("");
    inputref.current.value = "";
    inputref.current.focus();
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onItemSelected = (option) => {
    onChange !== undefined && onChange(option.key);
    onChange !== undefined && setInputValue(option.name);
    setSelectedItem(option.name);
    setOpen(false);
  };
  const onInputClick = () => {
    setOpen((prevValue) => !prevValue);
  };
  const clearSelection = () => {
    setSelectedItem("");
    setInputValue("");
  };
  return (
    <div>
      {selectedItem === "" && (
        <div>
          {inputValue && <CloseIcon className={s.close} onClick={clearText} />}
          {!inputValue && <SearchIcon className={s.search} />}
          <input
            ref={inputref}
            type="text"
            placeholder={textPlaceHolder}
            className={s.searchInput}
            value={inputValue ?? ""}
            onChange={onInputChange}
            onClick={onInputClick}
          />
          <div className={`${s.options} ${open ? s.optionVisibility : ""}`}>
            {options
              .filter((item) => {
                const searchItem = inputValue?.toLowerCase();
                const v = item.name?.toLowerCase();
                if (!searchItem) return true;
                return v?.startsWith(searchItem);
              })
              .map((opt) => (
                <div
                  id={opt.code}
                  key={opt.code}
                  onClick={() => onItemSelected(opt)}
                  className={s.optionItems}
                >
                  {opt.name}
                </div>
              ))}
          </div>
        </div>
      )}
      {selectedItem !== "" && (
        <div className={s.selectedContainer}>
          Selected: {selectedItem}
          <span className={s.selectClose} onClick={clearSelection}>X</span>
        </div>
      )}
    </div>
  );
}
