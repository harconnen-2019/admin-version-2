import { faker } from '@faker-js/faker';
import { factory, oneOf, primaryKey } from '@mswjs/data';

export const database = factory({
  place: {
    id: primaryKey(Number),
    created: () => faker.date.birthdate(),
    modified: () => faker.date.birthdate(),
    name: () => faker.commerce.department(),
    domain: () => faker.internet.domainName(),
    template: () => faker.internet.domainWord(),
    type: oneOf('type'),
    favicon: () => faker.image.avatar(),
    og_img: () => faker.image.avatar(),
    logo_dark: () => faker.image.avatar(),
    logo_light: () => faker.image.avatar(),
    color_scheme: () => faker.helpers.arrayElement(['default', 'green', 'pink']),
    counter_head: () => faker.lorem.lines(),
    counter_body: () => faker.lorem.lines(),
    thankyou_type: () => faker.helpers.arrayElement(['pop', 'page', 'off']),
  },
  type: {
    id: primaryKey(Number),
    created: () => faker.date.birthdate(),
    modified: () => faker.date.birthdate(),
    name: () => faker.commerce.department(),
  },
  session: {
    id: primaryKey(String),
    place: oneOf('place'),
    user: oneOf('user'),
  },
  user: { id: primaryKey(Number), username: () => faker.person.firstName() },
});
