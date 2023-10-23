import { default as _axios } from 'axios';
import { BASE_URL } from '../constants/constants';

export const axios = _axios.create({ baseURL: BASE_URL });
