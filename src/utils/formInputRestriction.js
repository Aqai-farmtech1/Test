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

export const formEmailInputRestriction = (e) => {
  const value = e.target.value;
  const pressedKey = e.key;
  const emailPattern = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
  const isEmail = emailPattern.test(value);
  console.log(isEmail);
  if (!(pressedKey === "Backspace") && !isEmail) {
    e.preventDefault();
  }
};
