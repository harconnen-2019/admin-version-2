import { httpAuth } from './api/auth';
import { httpPlaces } from './api/places';
import { httpPlacesType } from './api/places-types';
import { initDataBase } from './database/database';

initDataBase();

export const handlers = [...httpAuth, ...httpPlacesType, ...httpPlaces];
