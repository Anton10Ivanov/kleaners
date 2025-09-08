const STORAGE_KEY = 'enhanced-booking-form-data';
const TIMESTAMP_KEY = 'enhanced-booking-form-timestamp';
const EXPIRY_HOURS = 24;

/**
 * Enhanced form persistence utility extracted from unused components
 
export const enhancedFormPersistence = {
  /**
   * Save form data to localStorage with timestamp
   
  save: (data: any, formType?: string): boolean => {
    try {
      const timestamp = Date.now();
      const key = formType ? `${STORAGE_KEY}-${formType}` : STORAGE_KEY;
      const timestampKey = formType ? `${TIMESTAMP_KEY}-${formType}` : TIMESTAMP_KEY;
      
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(timestampKey, timestamp.toString());
      return true;
    } catch (error) {
      console.warn('Failed to save form data', error);
      return false;
    }
  },

  /**
   * Load form data from localStorage if not expired
   
  load: (formType?: string): any | null => {
    try {
      const key = formType ? `${STORAGE_KEY}-${formType}` : STORAGE_KEY;
      const timestampKey = formType ? `${TIMESTAMP_KEY}-${formType}` : TIMESTAMP_KEY;
      
      const timestampStr = localStorage.getItem(timestampKey);
      if (!timestampStr) return null;

      const timestamp = parseInt(timestampStr, 10);
      const now = Date.now();
      const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);

      // Check if data has expired
      if (hoursElapsed > EXPIRY_HOURS) {
        enhancedFormPersistence.clear(formType);
        return null;
      }

      const dataStr = localStorage.getItem(key);
      if (!dataStr) return null;

      return JSON.parse(dataStr);
    } catch (error) {
      console.warn('Failed to load form data', error);
      return null;
    }
  },

  /**
   * Clear stored form data
   
  clear: (formType?: string): void => {
    try {
      const key = formType ? `${STORAGE_KEY}-${formType}` : STORAGE_KEY;
      const timestampKey = formType ? `${TIMESTAMP_KEY}-${formType}` : TIMESTAMP_KEY;
      
      localStorage.removeItem(key);
      localStorage.removeItem(timestampKey);
    } catch (error) {
      console.warn('Failed to clear form data', error);
    }
  },

  /**
   * Check if stored data exists and is not expired
   
  hasValidData: (formType?: string): boolean => {
    const data = enhancedFormPersistence.load(formType);
    return data !== null;
  },

  /**
   * Create an auto-save instance for a form
   
  createAutoSave: (form: any, formType?: string, intervalMs: number = 30000): FormAutoSave => {
    return new FormAutoSave(
      () => form.getValues(),
      formType,
      intervalMs
    );
  }
};

/**
 * Auto-save hook for forms
 
export class FormAutoSave {
  private saveInterval: NodeJS.Timeout | null = null;
  private lastSaveData: string | null = null;

  constructor(
    private getData: () => any,
    private formType?: string,
    private intervalMs: number = 30000 // 30 seconds
  ) {}

  start(): void {
    if (this.saveInterval) return;

    this.saveInterval = setInterval(() => {
      const currentData = this.getData();
      const dataStr = JSON.stringify(currentData);

      // Only save if data has changed
      if (dataStr !== this.lastSaveData) {
        enhancedFormPersistence.save(currentData, this.formType);
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
    enhancedFormPersistence.save(currentData, this.formType);
    this.lastSaveData = JSON.stringify(currentData);
  }
}
