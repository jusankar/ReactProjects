import React, { useEffect, useRef, useState } from "react";
import s from "./style.module.css";
import {
  XCircleFill as CloseIcon,
  Search as SearchIcon,
} from "react-bootstrap-icons";

export default function LocationDropDown({
  locData,
  onChange,
  placeholder,
  selectedId,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const inputref = useRef();
  const clearText = () => {
    setInputValue("");
    inputref.current.value = "";
    inputref.current.focus();
  };

  useEffect(() => {
    const item = locData.find((itm) => itm.id === selectedId);
    if (item) setSelectedItem(item);
  }, [locData, selectedId]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onItemSelected = (option) => {
    onChange !== undefined && onChange(option);
    onChange !== undefined && setInputValue(option.name);
    setSelectedItem(option);
    setOpen(false);
  };
  const onInputClick = () => {
    setOpen((prevValue) => !prevValue);
  };

  const clearSelection = () => {
    onChange !== undefined &&
      onChange({
        id: 0,
        code: "",
        type: "state",
        name: "",
      });
    setSelectedItem(null);
    setInputValue("");
  };
  return (
    <div>
      {(selectedItem === null || selectedItem.id === 0) && (
        <div>
          {inputValue && <CloseIcon className={s.close} onClick={clearText} />}
          {!inputValue && <SearchIcon className={s.search} />}
          <input
            ref={inputref}
            type="text"
            placeholder={placeholder}
            className={s.searchInput}
            value={inputValue ?? ""}
            onChange={onInputChange}
            onClick={onInputClick}
          />
          <div className={`${s.options} ${open ? s.optionVisibility : ""}`}>
            {locData
              .filter((item) => {
                const searchItem = inputValue?.toLowerCase();
                const v = item.name?.toLowerCase();
                if (!searchItem) return true;
                return v?.startsWith(searchItem);
              })
              .map((opt) => (
                <div
                  id={opt.id}
                  key={opt.id}
                  onClick={() => onItemSelected(opt)}
                  className={s.optionItems}
                >
                  {opt.name}
                </div>
              ))}
          </div>
        </div>
      )}
      {selectedItem && selectedItem.name !== "" && (
        <div className={s.selectedContainer}>
          Selected: {selectedItem.name}
          <span className={s.selectClose} onClick={clearSelection}>
            X
          </span>
        </div>
      )}
    </div>
  );
}
