import React from "react";
import { useState } from "react";

export default function Form({ children, handleSubmit, data, validater }) {
  const [validateMsg, setValidateMsg] = useState({});

  const checkValidate = () => {
    const msgObject = {};
    validater.forEach((item) => {
      msgObject[item.field] = item.validate(data[item.field]);
    });
    setValidateMsg(msgObject);
    return Object.values(msgObject).every((msg) => !msg);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const isValid = checkValidate();
    if (isValid) {
      handleSubmit();
    }
  };

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { validateMsg });
    }
    return child;
  });

  return (
    <>
      <form onSubmit={submitForm}>{enhancedChildren}</form>
    </>
  );
}
