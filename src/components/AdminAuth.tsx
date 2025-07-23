
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  // Simple hardcoded credentials (for demo purposes)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      onAuthenticated();
      toast({
        title: "Success",
        description: "Successfully logged in as admin",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to access the admin panel
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <div className="text-center text-sm text-gray-500">
            Demo credentials: admin / admin123
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
