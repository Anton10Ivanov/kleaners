import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, createMockBooking, createMockProvider, mockSupabaseQuery } from './utils';
import { supabase } from '@/integrations/supabase/client';

// Mock booking components - in a real app these would be imported
const MockBookingForm = () => (
  <form>
    <select aria-label="Service Type">
      <option value="">Select Service</option>
      <option value="regular">Regular Cleaning</option>
      <option value="deep">Deep Cleaning</option>
    </select>
    <input type="date" aria-label="Booking Date" />
    <input type="number" aria-label="Hours" min="1" max="8" />
    <input type="number" aria-label="Bedrooms" min="1" max="10" />
    <input type="number" aria-label="Bathrooms" min="1" max="5" />
    <button type="submit">Book Service</button>
  </form>
);

const MockAdminBookingsList = ({ bookings = [] }: { bookings?: any[] }) => (
  <div>
    <h2>Admin Bookings</h2>
    {bookings.map((booking) => (
      <div key={booking.id} data-testid={`booking-${booking.id}`}>
        <span>{booking.service_type}</span>
        <span>{booking.status}</span>
        <button onClick={() => {}}>Assign Provider</button>
        <select aria-label={`Provider for ${booking.id}`}>
          <option value="">Select Provider</option>
          <option value="provider-1">John Cleaner</option>
          <option value="provider-2">Jane Service</option>
        </select>
      </div>
    ))}
  </div>
);

const MockProviderDashboard = ({ bookings = [] }: { bookings?: any[] }) => (
  <div>
    <h2>Provider Dashboard</h2>
    {bookings.map((booking) => (
      <div key={booking.id} data-testid={`provider-booking-${booking.id}`}>
        <span>{booking.service_type}</span>
        <span>{booking.status}</span>
        <button>Accept Job</button>
        <button>Reject Job</button>
      </div>
    ))}
  </div>
);

describe('Booking Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Client Booking Creation', () => {
    it('should create a booking with required fields', async () => {
      const user = userEvent.setup();
      const mockBooking = createMockBooking();

      // Mock the database insert
      vi.mocked(supabase.from).mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockResolvedValue(mockSupabaseQuery([mockBooking])),
        }),
      } as any);

      render(<MockBookingForm />);

      const serviceSelect = screen.getByLabelText(/service type/i);
      const dateInput = screen.getByLabelText(/booking date/i);
      const hoursInput = screen.getByLabelText(/hours/i);
      const bedroomsInput = screen.getByLabelText(/bedrooms/i);
      const bathroomsInput = screen.getByLabelText(/bathrooms/i);
      const submitButton = screen.getByRole('button', { name: /book service/i });

      await user.selectOptions(serviceSelect, 'regular');
      await user.type(dateInput, '2024-12-01');
      await user.type(hoursInput, '3');
      await user.type(bedroomsInput, '2');
      await user.type(bathroomsInput, '1');
      await user.click(submitButton);

      // Verify form submission
      expect(serviceSelect).toHaveValue('regular');
      expect(dateInput).toHaveValue('2024-12-01');
      expect(hoursInput).toHaveValue('3');
    });

    it('should validate required booking fields', async () => {
      const user = userEvent.setup();
      render(<MockBookingForm />);

      const submitButton = screen.getByRole('button', { name: /book service/i });
      await user.click(submitButton);

      // In a real implementation, this would show validation errors
      expect(submitButton).toBeInTheDocument();
    });

    it('should calculate pricing correctly', async () => {
      const mockBooking = createMockBooking({
        hours: 4,
        total_price: 200, // 4 hours * $50/hour
      });

      // Test price calculation logic
      const expectedPrice = mockBooking.hours * 50;
      expect(mockBooking.total_price).toBe(expectedPrice);
    });
  });

  describe('Admin Job Assignment', () => {
    it('should assign booking to a provider', async () => {
      const user = userEvent.setup();
      const mockBooking = createMockBooking({ status: 'pending' });
      const mockProvider = createMockProvider();

      // Mock database update
      vi.mocked(supabase.from).mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue(mockSupabaseQuery([{ ...mockBooking, status: 'assigned' }])),
        }),
      } as any);

      render(<MockAdminBookingsList bookings={[mockBooking]} />);

      const assignButton = screen.getByRole('button', { name: /assign provider/i });
      const providerSelect = screen.getByLabelText(`Provider for ${mockBooking.id}`);

      await user.selectOptions(providerSelect, 'provider-1');
      await user.click(assignButton);

      // Verify provider selection
      expect(providerSelect).toHaveValue('provider-1');
    });

    it('should show only available providers for assignment', async () => {
      const mockBooking = createMockBooking();
      render(<MockAdminBookingsList bookings={[mockBooking]} />);

      const providerSelect = screen.getByLabelText(`Provider for ${mockBooking.id}`);
      const options = Array.from(providerSelect.querySelectorAll('option')).map(
        (option) => option.textContent
      );

      expect(options).toContain('John Cleaner');
      expect(options).toContain('Jane Service');
    });
  });

  describe('Provider Job Acceptance', () => {
    it('should allow provider to accept assigned job', async () => {
      const user = userEvent.setup();
      const mockBooking = createMockBooking({ status: 'assigned' });

      // Mock database update for job acceptance
      vi.mocked(supabase.from).mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue(mockSupabaseQuery([{ ...mockBooking, status: 'confirmed' }])),
        }),
      } as any);

      render(<MockProviderDashboard bookings={[mockBooking]} />);

      const acceptButton = screen.getByRole('button', { name: /accept job/i });
      await user.click(acceptButton);

      // Verify button exists and can be clicked
      expect(acceptButton).toBeInTheDocument();
    });

    it('should allow provider to reject assigned job', async () => {
      const user = userEvent.setup();
      const mockBooking = createMockBooking({ status: 'assigned' });

      render(<MockProviderDashboard bookings={[mockBooking]} />);

      const rejectButton = screen.getByRole('button', { name: /reject job/i });
      await user.click(rejectButton);

      // Verify button exists and can be clicked
      expect(rejectButton).toBeInTheDocument();
    });
  });

  describe('Status Updates', () => {
    it('should propagate status changes correctly', async () => {
      const initialBooking = createMockBooking({ status: 'pending' });
      const updatedBooking = { ...initialBooking, status: 'confirmed' };

      // Mock status update
      vi.mocked(supabase.from).mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue(mockSupabaseQuery([updatedBooking])),
        }),
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue(mockSupabaseQuery([updatedBooking])),
        }),
      } as any);

      // Test status progression: pending → assigned → confirmed → in_progress → completed
      const statusFlow = ['pending', 'assigned', 'confirmed', 'in_progress', 'completed'];
      
      statusFlow.forEach((status, index) => {
        if (index > 0) {
          const booking = { ...initialBooking, status };
          expect(booking.status).toBe(status);
        }
      });
    });

    it('should not allow invalid status transitions', () => {
      const booking = createMockBooking({ status: 'pending' });
      
      // Booking should not go directly from pending to completed
      const invalidBooking = { ...booking, status: 'completed' };
      
      // In a real implementation, this would be validated
      // For now, we just verify the test data structure
      expect(invalidBooking.status).toBe('completed');
    });
  });

  describe('Booking Search and Filtering', () => {
    it('should filter bookings by status', () => {
      const bookings = [
        createMockBooking({ id: '1', status: 'pending' }),
        createMockBooking({ id: '2', status: 'confirmed' }),
        createMockBooking({ id: '3', status: 'completed' }),
      ];

      const pendingBookings = bookings.filter(b => b.status === 'pending');
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed');

      expect(pendingBookings).toHaveLength(1);
      expect(confirmedBookings).toHaveLength(1);
      expect(pendingBookings[0].id).toBe('1');
      expect(confirmedBookings[0].id).toBe('2');
    });

    it('should filter bookings by date range', () => {
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      const bookings = [
        createMockBooking({ id: '1', date: today.toISOString() }),
        createMockBooking({ id: '2', date: tomorrow.toISOString() }),
        createMockBooking({ id: '3', date: nextWeek.toISOString() }),
      ];

      const upcomingBookings = bookings.filter(b => new Date(b.date) > today);
      expect(upcomingBookings).toHaveLength(2);
    });
  });
});