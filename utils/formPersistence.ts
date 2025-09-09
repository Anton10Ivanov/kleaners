
import { BookingFormData } from '@/schemas/booking';
import { logWarning } from './console-cleanup';

const STORAGE_KEY = 'booking-form-data';
const TIMESTAMP_KEY = 'booking-form-timestamp';
const EXPIRY_HOURS = 24;

/**
 * Enhanced form persistence with auto-save and expiration
 */
export const formPersistence = {
  /**
   * Save form data to localStorage with timestamp
   */
  save: (data: Partial<BookingFormData>): boolean => {
    try {
      const timestamp = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(TIMESTAMP_KEY, timestamp.toString());
      return true;
    } catch (error) {
      logWarning('Failed to save form data', { error }, 'formPersistence');
      return false;
    }
  },

  /**
   * Load form data from localStorage if not expired
   */
  load: (): Partial<BookingFormData> | null => {
    try {
      const timestampStr = localStorage.getItem(TIMESTAMP_KEY);
      if (!timestampStr) return null;

      const timestamp = parseInt(timestampStr, 10);
      const now = Date.now();
      const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);

      // Check if data has expired
      if (hoursElapsed > EXPIRY_HOURS) {
        formPersistence.clear();
        return null;
      }

      const dataStr = localStorage.getItem(STORAGE_KEY);
      if (!dataStr) return null;

      return JSON.parse(dataStr);
    } catch (error) {
      logWarning('Failed to load form data', { error }, 'formPersistence');
      return null;
    }
  },

  /**
   * Clear stored form data
   */
  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
    } catch (error) {
      logWarning('Failed to clear form data', { error }, 'formPersistence');
    }
  },

  /**
   * Check if stored data exists and is not expired
   */
  hasValidData: (): boolean => {
    const data = formPersistence.load();
    return data !== null;
  },

  /**
   * Get age of stored data in hours
   */
  getDataAge: (): number | null => {
    try {
      const timestampStr = localStorage.getItem(TIMESTAMP_KEY);
      if (!timestampStr) return null;

      const timestamp = parseInt(timestampStr, 10);
      const now = Date.now();
      return (now - timestamp) / (1000 * 60 * 60);
    } catch {
      return null;
    }
  }
};

/**
 * Auto-save functionality for forms
 */
export class FormAutoSave {
  private saveInterval: NodeJS.Timeout | null = null;
  private lastSaveData: string | null = null;

  constructor(
    private getData: () => Partial<BookingFormData>,
    private intervalMs: number = 30000 // 30 seconds
  ) {}

  start(): void {
    if (this.saveInterval) return;

    this.saveInterval = setInterval(() => {
      const currentData = this.getData();
      const dataStr = JSON.stringify(currentData);

      // Only save if data has changed
      if (dataStr !== this.lastSaveData) {
        formPersistence.save(currentData);
        this.lastSaveData = dataStr;
      }
    }, this.intervalMs);
  }

  stop(): void {
    if (this.saveInterval) {
      clearInterval(this.saveInterval);
      this.saveInterval = null;
    }
  }

  saveNow(): void {
    const currentData = this.getData();
    formPersistence.save(currentData);
    this.lastSaveData = JSON.stringify(currentData);
  }
}
