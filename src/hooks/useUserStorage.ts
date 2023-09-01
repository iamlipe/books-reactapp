import {useAsyncStorage} from './useAsyncStorage';
import {User} from '@store/slices/userSlice';
import {StorageKeys} from '@config/constants/storageKeys';

export function useUserStorage() {
  const storage = useAsyncStorage();

  async function save(key: StorageKeys, data: User) {
    await storage.save(key, JSON.stringify(data));
  }

  async function read(key: StorageKeys) {
    const data = await storage.read(key);

    return data ? JSON.parse(data) : null;
  }

  async function remove(key: StorageKeys) {
    await storage.remove(key);
  }

  return {save, read, remove};
}
