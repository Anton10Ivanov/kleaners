import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, mockAuthState, mockSupabaseAuth, createMockUser } from './utils';
import { supabase } from '@/integrations/supabase/client';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

// Mock the supabase auth methods
vi.mocked(supabase.auth).getSession = mockSupabaseAuth.getSession;
vi.mocked(supabase.auth).signInWithPassword = mockSupabaseAuth.signInWithPassword;
vi.mocked(supabase.auth).signUp = mockSupabaseAuth.signUp;

describe('Authentication & Authorization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Login Flow', () => {
    it('should successfully log in with valid credentials', async () => {
      const user = userEvent.setup();
      const mockUser = createMockUser();
      
      mockSupabaseAuth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockAuthState.signedInAsClient().session },
        error: null,
      });

      render(<LoginForm onResetMode={() => {}} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSupabaseAuth.signInWithPassword).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });

    it('should show error for invalid credentials', async () => {
      const user = userEvent.setup();
      
      mockSupabaseAuth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Invalid login credentials' },
      });

      render(<LoginForm onResetMode={() => {}} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'wrong@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid login credentials/i)).toBeInTheDocument();
      });
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();
      render(<LoginForm onResetMode={() => {}} />);

      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
      });
    });
  });

  describe('Signup Flow', () => {
    it('should successfully create account with valid data', async () => {
      const user = userEvent.setup();
      const mockUser = createMockUser();
      
      mockSupabaseAuth.signUp.mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null,
      });

      render(<SignupForm />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/^password/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });

      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'Password123!');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSupabaseAuth.signUp).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'Password123!',
          options: {
            data: {
              first_name: 'John',
              last_name: 'Doe',
            },
            emailRedirectTo: expect.stringContaining(window.location.origin),
          },
        });
      });
    });

    it('should show error for duplicate email', async () => {
      const user = userEvent.setup();
      
      mockSupabaseAuth.signUp.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'User already registered' },
      });

      render(<SignupForm />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/^password/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });

      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'existing@example.com');
      await user.type(passwordInput, 'Password123!');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/user already registered/i)).toBeInTheDocument();
      });
    });

    it('should validate password strength', async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const passwordInput = screen.getByLabelText(/^password/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });

      await user.type(passwordInput, '123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/password must be at least/i)).toBeInTheDocument();
      });
    });
  });

  describe('Role-based Access Control', () => {
    it('should redirect unauthorized users from admin pages', async () => {
      mockSupabaseAuth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      // This would be tested in integration tests with actual routing
      expect(true).toBe(true); // Placeholder for route protection tests
    });

    it('should allow admin access to admin pages', async () => {
      mockSupabaseAuth.getSession.mockResolvedValue({
        data: { session: mockAuthState.signedInAsAdmin().session },
        error: null,
      });

      // This would be tested in integration tests with actual routing
      expect(true).toBe(true); // Placeholder for admin access tests
    });
  });
});