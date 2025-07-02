import funName from "@/constants/funNames.json";

export function chooseRandomName() {
  const randomFirstNameIndex = Math.floor(
    Math.random() * funName.firstName.length
  );
  const firstName = funName.firstName[randomFirstNameIndex];

  const randomLastNameIndex = Math.floor(
    Math.random() * funName.lastName.length
  );
  const lastName = funName.lastName[randomLastNameIndex];

  return { firstName, lastName };
}
