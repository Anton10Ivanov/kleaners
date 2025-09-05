-- Phase 1: Add service-specific nullable fields to support new booking schemas
-- All fields are nullable to maintain backward compatibility

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS property_size integer,
  ADD COLUMN IF NOT EXISTS num_residents integer,
  ADD COLUMN IF NOT EXISTS supplies_provided boolean,
  ADD COLUMN IF NOT EXISTS square_meters integer,
  ADD COLUMN IF NOT EXISTS num_employees integer,
  ADD COLUMN IF NOT EXISTS avg_visitors_per_week integer,
  ADD COLUMN IF NOT EXISTS cleaning_during_work_hours boolean,
  ADD COLUMN IF NOT EXISTS security_clearance_required boolean,
  ADD COLUMN IF NOT EXISTS dirtiness_level integer,
  ADD COLUMN IF NOT EXISTS last_cleaned timestamp with time zone,
  ADD COLUMN IF NOT EXISTS include_walls_and_ceilings boolean,
  ADD COLUMN IF NOT EXISTS mold_or_pest_presence boolean,
  ADD COLUMN IF NOT EXISTS special_surfaces_to_handle text,
  ADD COLUMN IF NOT EXISTS target_areas text[],
  ADD COLUMN IF NOT EXISTS is_furnished boolean,
  ADD COLUMN IF NOT EXISTS trash_removal_needed boolean,
  ADD COLUMN IF NOT EXISTS pre_inspection_required boolean,
  ADD COLUMN IF NOT EXISTS parking_available boolean,
  ADD COLUMN IF NOT EXISTS cleaning_goal text,
  ADD COLUMN IF NOT EXISTS disinfection_required boolean;

-- Add constraints for data integrity
ALTER TABLE bookings
  ADD CONSTRAINT check_property_size CHECK (property_size IS NULL OR (property_size >= 20 AND property_size <= 500)),
  ADD CONSTRAINT check_num_residents CHECK (num_residents IS NULL OR (num_residents >= 1 AND num_residents <= 20)),
  ADD CONSTRAINT check_square_meters CHECK (square_meters IS NULL OR square_meters >= 10),
  ADD CONSTRAINT check_num_employees CHECK (num_employees IS NULL OR num_employees >= 1),
  ADD CONSTRAINT check_avg_visitors_per_week CHECK (avg_visitors_per_week IS NULL OR avg_visitors_per_week >= 0),
  ADD CONSTRAINT check_dirtiness_level CHECK (dirtiness_level IS NULL OR (dirtiness_level >= 1 AND dirtiness_level <= 5)),
  ADD CONSTRAINT check_cleaning_goal CHECK (cleaning_goal IS NULL OR cleaning_goal IN ('deposit', 'owner', 'clean-start'));

-- Create indexes for performance on frequently queried fields
CREATE INDEX IF NOT EXISTS idx_bookings_service_type ON bookings(service_type);
CREATE INDEX IF NOT EXISTS idx_bookings_property_size ON bookings(property_size) WHERE property_size IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_square_meters ON bookings(square_meters) WHERE square_meters IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_dirtiness_level ON bookings(dirtiness_level) WHERE dirtiness_level IS NOT NULL;