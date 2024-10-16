import { faker } from '@faker-js/faker';
import { drop, factory, oneOf, primaryKey } from '@mswjs/data';

export const database = factory({
  place: {
    id: primaryKey(() => faker.number.int(9999)),
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
    id: primaryKey(() => faker.number.int()),
    created: () => faker.date.birthdate(),
    modified: () => faker.date.birthdate(),
    name: () => faker.commerce.department(),
  },
  language: {
    id: primaryKey(() => faker.number.int()),
    created: () => faker.date.birthdate(),
    modified: () => faker.date.birthdate(),
    name: () => faker.location.country(),
    slug: () => faker.location.countryCode(),
  },
  session: {
    id: primaryKey(String),
    place: oneOf('place'),
    user: oneOf('user'),
  },
  user: { id: primaryKey(() => faker.number.int()), username: () => faker.person.firstName() },
});

export const initDataBase = () => {
  drop(database);

  const databaseUser = database.user.create({ id: 1 });

  const databaseType = database.type.create({ id: 1, name: 'name-type-test' });
  database.type.create({ id: 2 });

  database.language.create({
    id: 1,
    name: 'Русский',
    slug: 'ru',
    created: new Date('1946-10-04T18:12:23.671Z'),
  });
  database.language.create({ id: 2, name: 'English', slug: 'en' });

  /**
   * Первое заполнение всегда для тестов
   */
  const databasePlace = database.place.create({
    id: 1,
    created: new Date('1946-10-04T18:12:23.671Z'),
    modified: faker.date.birthdate(),
    name: 'name-test',
    domain: 'domain-test',
    template: 'template-test',
    type: databaseType,
    favicon: '/patch/favicon',
    og_img: '/patch/og_img',
    logo_dark: '/patch/logo_dark',
    logo_light: '/patch/logo_light',
    color_scheme: 'green',
    counter_head: 'counter_head-test',
    counter_body: 'counter_body-test',
    thankyou_type: 'page',
  });

  for (let index = 2; index < 5; index++) {
    database.place.create({ id: index, type: databaseType });
  }

  database.session.create({
    id: 'session-id',
    place: databasePlace,
    user: databaseUser,
  });
};
