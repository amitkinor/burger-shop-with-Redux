import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kinors-burger-shop.firebaseio.com',
});

export default instance;
