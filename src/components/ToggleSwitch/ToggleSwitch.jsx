import { useState } from "react";
import "./ToggleSwitch.css";
function ToggleSwitch() {
  const checkboxes = ["F", "C"];
  function destructurePropertyKeyValuePair(obj1, obj2, obj3) {
    return { ...obj1, [obj2]: obj3 };
  }
  const [checked, setCheck] = useState(
    checkboxes.reduce(
      (acc, type) => destructurePropertyKeyValuePair(acc, type, type === "F"),
      {},
    ),
  );
  const handleChange = (box) => {
    setCheck(
      checkboxes.reduce(
        (acc, type) => destructurePropertyKeyValuePair(acc, type, type === box),
        {},
      ),
    );
    console.log(checked);
  };
  function createCheckBox(text) {
    return (
      <label
        key={text}
        className={`toggle-label ${checked[text] ? "toggle-active" : ""}`}
        htmlFor={`temp-${text}`}
      >
        {text}
        <input
          checked={checked[text]}
          onChange={() => handleChange(text)}
          type="checkbox"
          name={`${text.toUpperCase()}`}
          id={`temp-${text}`}
          className="toggle-btn"
        />
      </label>
    );
  }
  return (
    <div className="toggle-container">
      <div className={`toggle-slider ${checked.C ? "slider-right" : ""}`}></div>
      {checkboxes.map((box) => {
        return createCheckBox(box);
      })}
    </div>
  );
}

export default ToggleSwitch;
