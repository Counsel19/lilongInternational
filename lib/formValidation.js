export function loginValidator(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 7 || values.password.length > 20) {
    errors.password = "Muust be greater than 7 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function forgotPasswordValidator(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }

  return errors;
}
export function changePasswordValidator(values) {
  const errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Required";
  } else if (
    values.currentPassword.length < 7 ||
    values.currentPassword.length > 20
  ) {
    errors.currentPassword =
      "Muust be greater than 7 and less than 20 characters";
  } else if (values.currentPassword.includes(" ")) {
    errors.currentPassword = "Invalid Password";
  }
  if (!values.newPassword) {
    errors.newPassword = "Required";
  } else if (values.newPassword.length < 7 || values.newPassword.length > 20) {
    errors.newPassword = "Muust be greater than 7 and less than 20 characters";
  } else if (values.newPassword.includes(" ")) {
    errors.newPassword = "Invalid Password";
  }

  if (!values.comfirmNewPassword) {
    errors.comfirmNewPassword = "Required";
  } else if (values.newPassword !== values.comfirmNewPassword) {
    errors.comfirmNewPassword = "Password do not match";
  }

  return errors;
}

export function resetPasswordValidator(values) {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 7 || values.password.length > 20) {
    errors.password = "Muust be greater than 7 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password do not match";
  }

  return errors;
}
export function videoLinksValidator(values) {
  const errors = {};

  if (!values.title) {
    errors.password = "Required*";
  }
  if (!values.author) {
    errors.author = "Required*";
  }
  if (!values.link) {
    errors.link = "Required*";
  }

  return errors;
}

export function registerValidator(values) {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "Required";
  }
  if (!values.lastname) {
    errors.lastname = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  if (!values.state) {
    errors.state = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.deliveryAddress) {
    errors.deliveryAddress = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 7 || values.password.length > 20) {
    errors.password = "Muust be greater than 7 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password do not match";
  }

  return errors;
}
export function updateUserValidator(values) {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "Required";
  }
  if (!values.lastname) {
    errors.lastname = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  if (!values.state) {
    errors.state = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.deliveryAddress) {
    errors.deliveryAddress = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }

  return errors;
}

export function applyValidator(values) {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "Required";
  }
  if (!values.lastname) {
    errors.lastname = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  if (!values.state) {
    errors.state = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.accountNumber) {
    errors.accountNumber = "Required*";
  }
  if (!values.bankName) {
    errors.bank = "Required*";
  }
  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Required*";
  }
  if (!values.gender) {
    errors.gender = "Required*";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }

  return errors;
}
