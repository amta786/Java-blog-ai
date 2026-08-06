import { User } from '../types';

const USERS_STORAGE_KEY = 'jcp_registered_users_db';
const SESSION_STORAGE_KEY = 'jcp_active_user_session';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Securely hash password using SHA-256 Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_jcp_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface StoredUserAccount {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  joinedAt: number;
  avatarUrl?: string;
  role?: string;
}

function getStoredUsers(): StoredUserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUserAccount[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export async function registerUser(email: string, password: string, fullName: string): Promise<User> {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some(u => u.email === normalizedEmail)) {
    throw new Error('An account with this email address already exists.');
  }

  const passwordHash = await hashPassword(password);
  const newUser: StoredUserAccount = {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    email: normalizedEmail,
    passwordHash,
    fullName: fullName.trim() || normalizedEmail.split('@')[0],
    joinedAt: Date.now(),
    role: 'Developer',
    avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(normalizedEmail)}`
  };

  users.push(newUser);
  saveStoredUsers(users);

  const sessionUser: User = {
    id: newUser.id,
    email: newUser.email,
    fullName: newUser.fullName,
    joinedAt: newUser.joinedAt,
    role: newUser.role,
    avatarUrl: newUser.avatarUrl
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
  return sessionUser;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(u => u.email === normalizedEmail);

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const passwordHash = await hashPassword(password);
  if (user.passwordHash !== passwordHash) {
    throw new Error('Invalid email or password.');
  }

  const sessionUser: User = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    joinedAt: user.joinedAt,
    role: user.role,
    avatarUrl: user.avatarUrl
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
  return sessionUser;
}

export function getCurrentSessionUser(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logoutUser(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
