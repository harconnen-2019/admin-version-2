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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initDataBase = () => {
  const user = database.user.create({ id: 1 });
  const databaseType = database.type.create({ id: 1 });
  database.type.create({ id: 2 });
  const databasePlace = database.place.create({ id: 1, type: databaseType });

  for (let index = 2; index < 6; index++) {
    database.place.create({ id: index, type: databaseType });
  }

  database.session.create({
    id: 'session-id',
    place: databasePlace,
    user: user,
  });
};
