import { describe, it, expect } from 'vitest';
import { login, register, logout, getMe } from '@/features/auth/api/authApi';

describe('authApi', () => {
  it('should login successfully with correct credentials', async () => {
    const credentials = { email: 'test@example.com', password: 'password' };
    const data = await login(credentials);
    
    expect(data.token).toBe('fake-jwt-token');
    expect(data.user.email).toBe('test@example.com');
  });

  it('should fail login with incorrect credentials', async () => {
    const credentials = { email: 'wrong@example.com', password: 'wrong' };
    await expect(login(credentials)).rejects.toThrow();
  });

  it('should register successfully', async () => {
    const formData = { first_name: 'New', last_name: 'User', email: 'new@example.com', password: 'password' };
    const data = await register(formData);
    
    expect(data.user.first_name).toBe('New');
    expect(data.token).toBe('fake-jwt-token');
  });

  it('should logout successfully', async () => {
    const data = await logout();
    expect(data.message).toBe('Logged out successfully');
  });

  it('should fetch current user with getMe', async () => {
    const data = await getMe();
    expect(data.user.first_name).toBe('Test');
  });
});
