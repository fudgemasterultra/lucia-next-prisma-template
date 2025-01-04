import { hashPassword, validatePassword } from "../auth/entry";

const randomStringGeneration = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const testHashPassword = () => {
  const testCases = Array.from({ length: 10 }, () => randomStringGeneration());
  for (const password of testCases) {
    const { salt, hash } = hashPassword(password);
    const isValid = validatePassword(password, salt, hash);
    if (!isValid) {
      console.log(
        "Password hashing test failed for password: ",
        password,
        " salt: ",
        salt,
        " hash: ",
        hash
      );
      return false;
    }
  }
  return true;
};
