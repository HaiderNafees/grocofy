import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

type UserRecord = {
  id: string;
  name?: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
  created_at?: string;
};

type UsersFile = { users: UserRecord[] };

const DATA_FILE = join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
const dataDir = join(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  require('fs').mkdirSync(dataDir, { recursive: true });
}

export function loadUsers(): UsersFile {
  try {
    if (existsSync(DATA_FILE)) {
      const fileContent = readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed)) {
        return { users: parsed };
      }
      if (parsed && Array.isArray(parsed.users)) {
        return { users: parsed.users };
      }
      return { users: [] };
    }

    const seed: UsersFile = { users: [] };
    writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2));
    return seed;
  } catch {
    return { users: [] };
  }
}

export function saveUsers(usersFile: UsersFile): void {
  writeFileSync(DATA_FILE, JSON.stringify(usersFile, null, 2));
}

export function addUser(user: UserRecord): UserRecord {
  const usersFile = loadUsers();
  usersFile.users.push(user);
  saveUsers(usersFile);
  return user;
}

export function updateUser(id: string, updates: Partial<UserRecord>): UserRecord | null {
  const usersFile = loadUsers();
  const idx = usersFile.users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  const merged = { ...usersFile.users[idx], ...updates, id };
  usersFile.users[idx] = merged;
  saveUsers(usersFile);
  return merged;
}

export function deleteUser(id: string): boolean {
  const usersFile = loadUsers();
  const before = usersFile.users.length;
  usersFile.users = usersFile.users.filter(u => u.id !== id);
  saveUsers(usersFile);
  return usersFile.users.length !== before;
}
