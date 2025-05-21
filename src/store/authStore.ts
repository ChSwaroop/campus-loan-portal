
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'counselor' | 'approver';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isFirstLogin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // This is a mock implementation - in a real app, this would call your API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes we're hardcoding users
          const mockUsers = [
            { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' as UserRole, isFirstLogin: false },
            { id: '2', name: 'Counselor User', email: 'counselor@example.com', role: 'counselor' as UserRole, isFirstLogin: false },
            { id: '3', name: 'Approver User', email: 'approver@example.com', role: 'approver' as UserRole, isFirstLogin: false },
            { id: '4', name: 'New User', email: 'new@example.com', role: 'counselor' as UserRole, isFirstLogin: true },
          ];
          
          const user = mockUsers.find(u => u.email === email);
          
          if (user && password === 'password') { // In a real app, you'd verify the password properly
            // Set user details and immediately update state to trigger UI updates
            set({
              user,
              token: 'mock-jwt-token',
              isAuthenticated: true,
              isLoading: false
            });
            
            // Return successfully
            return;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          console.error('Login failed:', error);
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },
      
      changePassword: async (currentPassword: string, newPassword: string) => {
        set({ isLoading: true });
        try {
          // This is a mock implementation - in a real app, this would call your API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Update the user to indicate they've completed their first login
          set(state => ({
            user: state.user ? { ...state.user, isFirstLogin: false } : null,
            isLoading: false
          }));
        } catch (error) {
          console.error('Password change failed:', error);
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
