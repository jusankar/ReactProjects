import { useRef } from "react";
import s from "./style.module.css";
import { XCircle as CloseIcon } from "react-bootstrap-icons";
export default function Input({ onTextChange, textPlaceHolder }) {
  const inputref = useRef();
  const clearText = () => {
    inputref.current.value = "";
    inputref.current.focus();
  };

  return (
    <div className={s.container}>
      <CloseIcon
        onClick={() => {
          clearText(); // clear the input field's value
          onTextChange(""); // trigger the autocomplete with an empty string
        }}
        size={20}
        className={s.close}
      />{" "}
      <input
        ref={inputref}
        onChange={(e) => onTextChange(e.target.value)}
        type="text"
        className={s.input}
        placeholder={textPlaceHolder}
      ></input>
    </div>
  );
}
