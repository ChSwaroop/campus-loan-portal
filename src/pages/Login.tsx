
import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading, user } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // If already logged in, navigate to the appropriate dashboard
  React.useEffect(() => {
    if (user) {
      const redirectPath = user.isFirstLogin 
        ? '/change-password'
        : user.role === 'admin' 
          ? '/admin' 
          : user.role === 'counselor' 
            ? '/counselor' 
            : '/approver';
      
      navigate({ to: redirectPath });
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      
      // After login, the useEffect will handle redirection
    } catch (err) {
      setError('Invalid email or password. Try with admin@example.com / password');
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/15 p-3 rounded-md flex items-center text-sm text-destructive">
                <AlertCircle size={16} className="mr-2" />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <div className="w-full text-muted-foreground">
            Demo credentials:
            <ul className="mt-1 space-y-1">
              <li>Admin: admin@example.com</li>
              <li>Counselor: counselor@example.com</li>
              <li>Approver: approver@example.com</li>
              <li>Password: password</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
