import React, { useState } from "react";

import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";

import "../Assets/Styles/Inputs/SearchInputField.scss";

const SettingsInputField = (props) => {
  const {
    title,
    placeholder,
    multiline,
    rows,
    maxLength,
    readOnly,
    text,
    type,
    errorMessage,
  } = props;

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className="input-field-container">
      {title && <p className="title">{title}</p>}

      <FormControl className="form-control-input-base">
        <InputBase
          // readOnly={readonly}
          // sx={
          //   disabled && {
          //     pointerEvents: 'none',
          //     direction: 'rtl',
          //     // overflow: 'auto',
          //   }
          // }
          className={errorMessage ? "error" : ""}
          onChange={(e) => props.onChange(e.target.value)}
          multiline={multiline ? multiline : false}
          rows={rows ? rows : 1}
          type={type && !passwordVisibility ? type : "text"}
          value={props.value}
          inputProps={{ maxLength: maxLength ? maxLength : undefined }}
          placeholder={placeholder !== undefined ? placeholder : ""}
        />
      </FormControl>
    </div>
  );
};

export default SettingsInputField;
