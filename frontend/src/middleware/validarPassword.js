export default function validatePassword(value) {
  const regexPassword = /^[0-9a-zA-ZÁ-ÿ/._-\s]{8,20}$/;
  if (!regexPassword.exec(value)) {
    return true;
  } else {
    return false;
  }
}
