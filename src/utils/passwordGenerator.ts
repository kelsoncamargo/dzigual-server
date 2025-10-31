import { faker } from "@faker-js/faker";

export const generatePassword = () => faker.string.alpha({ length: 10 });
