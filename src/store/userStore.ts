
import { create } from 'zustand';
import { User, UserRole } from './authStore';

export interface UserWithoutAuth {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isFirstLogin: boolean;
  createdAt: string;
}

interface UserState {
  users: UserWithoutAuth[];
  isLoading: boolean;
  createUser: (data: { name: string; email: string; role: UserRole }) => Promise<void>;
  updateUser: (id: string, data: Partial<UserWithoutAuth>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      isFirstLogin: false,
      createdAt: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
    },
    {
      id: '2',
      name: 'Counselor User',
      email: 'counselor@example.com',
      role: 'counselor',
      isFirstLogin: false,
      createdAt: new Date(Date.now() - 1728000000).toISOString(), // 20 days ago
    },
    {
      id: '3',
      name: 'Approver User',
      email: 'approver@example.com',
      role: 'approver',
      isFirstLogin: false,
      createdAt: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    },
    {
      id: '4',
      name: 'New User',
      email: 'new@example.com',
      role: 'counselor',
      isFirstLogin: true,
      createdAt: new Date().toISOString(),
    },
  ],
  isLoading: false,
  
  createUser: async (data) => {
    set({ isLoading: true });
    try {
      // This is a mock implementation - in a real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: UserWithoutAuth = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        isFirstLogin: true,
        createdAt: new Date().toISOString(),
      };
      
      set(state => ({
        users: [...state.users, newUser],
        isLoading: false
      }));
    } catch (error) {
      console.error('Creating user failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  updateUser: async (id, data) => {
    set({ isLoading: true });
    try {
      // This is a mock implementation - in a real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        users: state.users.map(user => 
          user.id === id ? { ...user, ...data } : user
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Updating user failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  deleteUser: async (id) => {
    set({ isLoading: true });
    try {
      // This is a mock implementation - in a real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        users: state.users.filter(user => user.id !== id),
        isLoading: false
      }));
    } catch (error) {
      console.error('Deleting user failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
