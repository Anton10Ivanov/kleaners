
export interface ServiceArea {
  id: string;
  provider_id: string;
  postal_code: string;
  travel_distance: number;
  created_at: string;
  city?: string; // Make city optional as it might not always be available
}

export interface ServiceAreaFormValues {
  postal_code: string;
  travel_distance: number;
}
