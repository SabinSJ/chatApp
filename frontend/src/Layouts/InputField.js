import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import '../Assets/Styles/Inputs/InputField.scss';

const InputField = (props) => {
    const {
        title,
        placeholder,
        multiline,
        rows,
        maxLength,
        readOnly,
        text,
        type,
        errorMessage
    } = props;

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    return(
        <div className='input-field-container'>
            {/* {title && <p className="title">{title}</p>} */}

            <FormControl className='form-control'>
                <TextField 
                    label={title}
                    readOnly={readOnly}
                    className={errorMessage ? 'error' : ''}
                    onChange={(e) => props.onChange(e.target.value)}
                    multiline={multiline ? multiline : false}
                    rows={rows ? rows : 1}
                    type={type && !passwordVisibility ? type : text}
                    value={props.value}
                    inputProps={{maxLength : maxLength ? maxLength : undefined}}
                    placeholder={placeholder !== undefined ? placeholder : ''}
                />
            </FormControl>
        </div>
    );
}

export default InputField;