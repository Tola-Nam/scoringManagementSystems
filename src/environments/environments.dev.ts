import { TokenStoragesService } from '../app/api/tokens/token-storages.service';
const tokenStorage = new TokenStoragesService();
export const environments = {
  api_url: 'http://localhost:8080/api',
  token: tokenStorage.getToken(),
  image_url: 'https://192.168.1',
};
