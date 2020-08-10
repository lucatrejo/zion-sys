import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// core components
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    onChange,
    value,
    error,
    success,
    items,
    readOnly,
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      { error ? (
        <InputLabel
          className={classes.labelRootError + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
        {error}
      </InputLabel>
      ) : labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
          labelId="demo-simple-select-label"
          id={id}
          onChange={onChange}
          value={value}
          readOnly={readOnly}
        >
          {items.map((prop, key) => {
                return (
                  <MenuItem value={prop[0]}>
                    {prop[1]}
                  </MenuItem>
                );
          })}
        </Select>
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
  success: PropTypes.bool,
  readOnly: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(customInputStyle)(CustomInput);
