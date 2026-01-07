'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { graphqlClient, setAuthToken } from '@/lib/graphql-client';
import { MANAGER_LOGIN } from '@/lib/mutations';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginMutation = useMutation({
    mutationFn: async (variables: { email: string; password: string }) => {
      return graphqlClient.request(MANAGER_LOGIN, variables);
    },
    onSuccess: (data: any) => {
      // Store the token
      setAuthToken(data.managerLogin.accessToken);

      // Store user info
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.managerLogin.user));
      }

      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      setError(error.response?.errors?.[0]?.message || 'Invalid email or password');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Manager Login</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="manager@example.com"
              disabled={loginMutation.isPending}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="••••••••"
              disabled={loginMutation.isPending}
            />
          </div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>Test accounts:</p>
          <p className="mt-1">admin@example.com / password123</p>
          <p>manager@test.com / mypassword</p>
        </div>
      </div>
    </div>
  );
}
