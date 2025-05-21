
import { create } from 'zustand';

export interface StudentData {
  id: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  aadharNumber: string;
  panCard: string;
  cibilScore: number;
  status: 'pending' | 'approved' | 'rejected';
  counselorId: string;
  createdAt: string;
  rejectionReason?: string;
}

interface LoanState {
  applications: StudentData[];
  isLoading: boolean;
  createApplication: (data: Omit<StudentData, 'id' | 'status' | 'createdAt' | 'rejectionReason'>) => Promise<void>;
  updateApplication: (id: string, data: Partial<StudentData>) => Promise<void>;
  approveApplication: (id: string) => Promise<void>;
  rejectApplication: (id: string, reason: string) => Promise<void>;
}

export const useLoanStore = create<LoanState>((set) => ({
  applications: [
    {
      id: '1',
      studentName: 'John Doe',
      fatherName: 'Robert Doe',
      motherName: 'Jane Doe',
      dateOfBirth: '1999-05-15',
      aadharNumber: '1234-5678-9012',
      panCard: 'ABCDE1234F',
      cibilScore: 750,
      status: 'pending',
      counselorId: '2',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      studentName: 'Alice Smith',
      fatherName: 'Michael Smith',
      motherName: 'Susan Smith',
      dateOfBirth: '2000-08-22',
      aadharNumber: '9876-5432-1098',
      panCard: 'FGHIJ5678K',
      cibilScore: 820,
      status: 'approved',
      counselorId: '2',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      studentName: 'David Wilson',
      fatherName: 'Thomas Wilson',
      motherName: 'Mary Wilson',
      dateOfBirth: '1998-12-10',
      aadharNumber: '4567-8901-2345',
      panCard: 'LMNOP9012Q',
      cibilScore: 680,
      status: 'rejected',
      counselorId: '2',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      rejectionReason: 'CIBIL score below threshold',
    },
  ],
  isLoading: false,
  
  createApplication: async (data) => {
    set({ isLoading: true });
    try {
      // This is a mock implementation - in a real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newApplication: StudentData = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      set(state => ({
        applications: [...state.applications, newApplication],
        isLoading: false
      }));
    } catch (error) {
      console.error('Creating application failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  updateApplication: async (id, data) => {
    set({ isLoading: true });
    try {
      // This is a mock implementation - in a real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If status is set to pending, also update the createdAt to show it's been resubmitted
      const updateData = data.status === 'pending' ? 
        { ...data, createdAt: new Date().toISOString() } : data;
      
      set(state => ({
        applications: state.applications.map(app => 
          app.id === id ? { ...app, ...updateData } : app
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Updating application failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  approveApplication: async (id) => {
    set({ isLoading: true });
    try {
      // This is a mock implementation - in a real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        applications: state.applications.map(app => 
          app.id === id ? { ...app, status: 'approved', rejectionReason: undefined } : app
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Approving application failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  rejectApplication: async (id, reason) => {
    set({ isLoading: true });
    try {
      // This is a mock implementation - in a real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        applications: state.applications.map(app => 
          app.id === id ? { ...app, status: 'rejected', rejectionReason: reason } : app
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Rejecting application failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
