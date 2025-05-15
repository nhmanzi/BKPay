import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import {  Mail, Lock, Loader2 } from 'lucide-react';
import BKPayLogo from '../assets/BKPAY.svg';
interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6 w-full">
          <span className=" text-primary-600 font-bold rounded-full px-3 py-1 text-2xl ">
            <img src={BKPayLogo} alt="BKPay Logo" className="h-12 w-auto" />
          </span>

        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-gray-600">Sign in to your merchant account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.email ? 'border-error-300 text-error-900 placeholder-error-300 focus:outline-none focus:ring-error-500 focus:border-error-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              } rounded-md shadow-sm focus:outline-none sm:text-sm`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-error-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.password ? 'border-error-300 text-error-900 placeholder-error-300 focus:outline-none focus:ring-error-500 focus:border-error-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              } rounded-md shadow-sm focus:outline-none sm:text-sm`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-error-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;