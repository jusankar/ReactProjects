import { useEffect, useState } from "react";
import s from "./style.module.css";

export default function ColumnDropDown({
  columnData,
  placeholder = "",
  onChange,
  selectedId,
  readOnly = true,
}) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let foundObject = null;

    for (const column of columnData) {
      for (const key of Object.keys(column)) {
        const objects = column[key];
        foundObject = objects.find((obj) => obj.id === selectedId);
        if (foundObject) {
          setInputValue(foundObject.title);
          break;
        }
      }
      if (foundObject) {
        setInputValue(foundObject.title);
        break;
      }
    }
  }, [selectedId, columnData]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onItemSelected = (option) => {
    onChange !== undefined && onChange(option);
    onChange !== undefined && setInputValue(option.title);
    setOpen(false);
  };

  const onInputClick = () => {
    setOpen((prevValue) => !prevValue);
  };

  return (
    <div>
      <div className={s.container}>
        <div className={s.input} onClick={onInputClick}>
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={onInputChange}
            readOnly={readOnly}
          />
        </div>
        <div className={s.arrow_container} onClick={onInputClick}>
          <i className={`${open ? s.arrowUp : s.arrowDown}`} />
        </div>
      </div>
      <div>
        {columnData && columnData.map((column, columnIndex) => (
          <div
            className={`${s.options} ${open ? s.optionVisibility : ""}`}
            key={`column-${columnIndex}`}
          >
            <div className={s.optionContainer}>
              {Object.values(column).map((columnItems) => (
                <div
                  className={s.column}
                  key={`column-${columnIndex}-${columnItems[0].id}`}
                >
                  {columnItems.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => onItemSelected(opt)}
                      className={s.optionItems}
                    >
                      {opt.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
