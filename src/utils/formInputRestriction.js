export const formNameInputRestriction = (e) => {
  const charCode = e.key.trim();
  const currentValueLength = e.target.value?.length;
  if (!charCode && !currentValueLength) {
    e.preventDefault();
  }
};

export const formPincodeInputRestriction = (e) => {
  const pressedKey = e.key;
  const curValueLength = e?.target?.value?.length;
  if (!(pressedKey === "Backspace") && curValueLength > 5) {
    e.preventDefault();
  }
};

export const formPhoneInputRestriction = (e) => {
  const pressedKey = e.key;
  const curValueLength = e?.target?.value?.length;
  if (!(pressedKey === "Backspace") && curValueLength > 9) {
    e.preventDefault();
  }
};
