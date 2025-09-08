import { BookingFormData, ServiceType } from '@/schemas/bookingSchemas';

// Enhanced duration calculation based on service type and comprehensive factors
export const calculateDuration = (data: any): number => {
  const { serviceType } = data;
  
  switch (serviceType) {
    case 'home':
      return calculateHomeDuration(data);
    case 'office':
      return calculateOfficeDuration(data);
    case 'deep-cleaning':
      return calculateDeepCleaningDuration(data);
    case 'move-in-out':
      return calculateMoveInOutDuration(data);
    case 'post-construction':
      return calculatePostConstructionDuration(data);
    default:
      return 2; // fallback
  }
};

// Home cleaning duration calculation
const calculateHomeDuration = (data: any): number => {
  let baseTime = 2; // minimum 2 hours
  
  // Size factor
  const sizeInM2 = data.propertySize || 50;
  baseTime += Math.max(0, (sizeInM2 - 50) / 30); // +1 hour per 30m² over 50m²
  
  // Room complexity
  baseTime += (data.bedrooms || 0) * 0.5;
  baseTime += (data.bathrooms || 1) * 0.5;
  
  // Dirtiness multiplier
  const dirtinessMultiplier = {
    1: 0.8,  // Very clean
    2: 0.9,  // Lightly dirty
    3: 1.0,  // Moderately dirty
    4: 1.3,  // Very dirty
    5: 1.6   // Extremely dirty
  }[data.dirtinessLevel || 3] || 1.0;
  
  baseTime *= dirtinessMultiplier;
  
  // Pets impact (more cleaning needed)
  const pets = data.pets || 'none';
  const petsMultiplier = {
    'none': 1.0,
    'cats': 1.1,
    'dogs': 1.2,
    'both': 1.3,
    'other': 1.15
  }[pets] || 1.0;
  baseTime *= petsMultiplier;
  
  // Cleaning pace adjustment
  if (data.cleaningPace === 'quick') {
    baseTime *= 0.8;
  }
  
  // Supplies provided bonus (familiar with own supplies)
  if (data.suppliesProvided) {
    baseTime *= 0.95;
  }
  
  // Extras time
  const extrasTime = calculateExtrasTime(data.extras || []);
  baseTime += extrasTime;
  
  return Math.max(2, Math.round(baseTime * 2) / 2);
};

// Office cleaning duration calculation
const calculateOfficeDuration = (data: any): number => {
  let baseTime = 1.5;
  
  const sizeInM2 = data.squareMeters || 50;
  baseTime += sizeInM2 / 40; // +1 hour per 40m²
  
  // Employee count impact
  const employeeMultiplier = Math.min(2, 1 + ((data.numEmployees || 1) - 1) * 0.05);
  baseTime *= employeeMultiplier;
  
  // Visitor traffic impact
  const visitorMultiplier = Math.min(1.4, 1 + ((data.avgVisitorsPerWeek || 0) / 100) * 0.4);
  baseTime *= visitorMultiplier;
  
  // During work hours complexity
  if (data.cleaningDuringWorkHours) {
    baseTime *= 1.2;
  }
  
  // Security clearance complexity
  if (data.securityClearanceRequired) {
    baseTime *= 1.1;
  }
  
  const extrasTime = calculateExtrasTime(data.extras || []);
  baseTime += extrasTime;
  
  return Math.max(1.5, Math.round(baseTime * 2) / 2);
};

// Deep cleaning duration calculation
const calculateDeepCleaningDuration = (data: any): number => {
  let baseTime = 3; // Deep cleaning takes longer
  
  const sizeInM2 = data.squareMeters || 50;
  baseTime += sizeInM2 / 25; // +1 hour per 25m²
  
  baseTime += (data.bedrooms || 0) * 0.7;
  baseTime += (data.bathrooms || 1) * 0.8;
  
  // Dirtiness impact is more significant for deep cleaning
  const dirtinessMultiplier = {
    1: 0.9,
    2: 1.0,
    3: 1.2,
    4: 1.5,
    5: 1.8
  }[data.dirtinessLevel || 3] || 1.0;
  
  baseTime *= dirtinessMultiplier;
  
  // Walls and ceilings add significant time
  if (data.includeWallsAndCeilings) {
    baseTime *= 1.4;
  }
  
  // Mold/pest presence complexity
  if (data.moldOrPestPresence) {
    baseTime *= 1.3;
  }
  
  // Target areas impact
  const targetAreas = data.targetAreas || [];
  if (targetAreas.includes('whole-place')) {
    baseTime *= 1.2;
  }
  
  const extrasTime = calculateExtrasTime(data.extras || []);
  baseTime += extrasTime;
  
  return Math.max(3, Math.round(baseTime * 2) / 2);
};

// Move in/out duration calculation
const calculateMoveInOutDuration = (data: any): number => {
  let baseTime = 2.5;
  
  const sizeInM2 = data.squareMeters || 50;
  baseTime += sizeInM2 / 30;
  
  baseTime += (data.bedrooms || 0) * 0.6;
  baseTime += (data.bathrooms || 1) * 0.7;
  
  // Furnished properties take longer
  if (data.isFurnished) {
    baseTime *= 1.3;
  }
  
  // Trash removal adds time
  if (data.trashRemovalNeeded) {
    baseTime += 1;
  }
  
  // Pre-inspection adds time
  if (data.preInspectionRequired) {
    baseTime += 0.5;
  }
  
  // Dirtiness impact
  const dirtinessMultiplier = {
    1: 0.8,
    2: 0.9,
    3: 1.0,
    4: 1.4,
    5: 1.7
  }[data.dirtinessLevel || 3] || 1.0;
  
  baseTime *= dirtinessMultiplier;
  
  // Disinfection adds time
  if (data.disinfectionRequired) {
    baseTime += 1;
  }
  
  const extrasTime = calculateExtrasTime(data.extras || []);
  baseTime += extrasTime;
  
  return Math.max(2.5, Math.round(baseTime * 2) / 2);
};

// Post-construction duration calculation
const calculatePostConstructionDuration = (data: any): number => {
  let baseTime = 4; // Post-construction is intensive
  
  const sizeInM2 = data.squareMeters || 50;
  baseTime += sizeInM2 / 20; // +1 hour per 20m²
  
  // Construction type complexity
  const constructionMultiplier = {
    'renovation': 1.0,
    'new-build': 0.8,
    'demolition': 1.5
  }[data.constructionType || 'renovation'] || 1.0;
  
  baseTime *= constructionMultiplier;
  
  // Dust level impact
  const dustMultiplier = {
    1: 0.8,
    2: 0.9,
    3: 1.0,
    4: 1.3,
    5: 1.6
  }[data.dustLevel || 3] || 1.0;
  
  baseTime *= dustMultiplier;
  
  // Hazardous materials complexity
  if (data.hazardousMaterials) {
    baseTime *= 1.4;
  }
  
  // Special equipment needed
  if (data.specialEquipmentNeeded) {
    baseTime *= 1.2;
  }
  
  const extrasTime = calculateExtrasTime(data.extras || []);
  baseTime += extrasTime;
  
  return Math.max(4, Math.round(baseTime * 2) / 2);
};

// Calculate time for extras
const calculateExtrasTime = (extras: any[]): number => {
  if (!Array.isArray(extras)) return 0;
  
  return extras.reduce((total, extra) => {
    return total + (extra.estimatedTime || 0);
  }, 0);
};

// Calculate recommended cleaner count
export const calculateCleanerCount = (data: any): number => {
  const duration = calculateDuration(data);
  const { serviceType } = data;
  
  // Base cleaner count logic
  let baseCleaners = 1;
  
  if (serviceType === 'home') {
    const sizeInM2 = (data as any).propertySize || 50;
    if (sizeInM2 > 150) baseCleaners = 2;
    if (sizeInM2 > 300) baseCleaners = 3;
  } else if (serviceType === 'office') {
    const sizeInM2 = (data as any).squareMeters || 50;
    if (sizeInM2 > 200) baseCleaners = 2;
    if (sizeInM2 > 500) baseCleaners = 3;
  } else if (serviceType === 'deep-cleaning' || serviceType === 'post-construction') {
    const sizeInM2 = (data as any).squareMeters || 50;
    if (sizeInM2 > 100) baseCleaners = 2;
    if (sizeInM2 > 250) baseCleaners = 3;
  } else if (serviceType === 'move-in-out') {
    const sizeInM2 = (data as any).squareMeters || 50;
    if (sizeInM2 > 120) baseCleaners = 2;
    if (sizeInM2 > 300) baseCleaners = 3;
  }
  
  // Adjust for duration
  if (duration > 6) baseCleaners = Math.min(baseCleaners + 1, 4);
  
  return Math.min(baseCleaners, 4); // Max 4 cleaners
};

// Calculate complexity score (1-10)
export const calculateComplexityScore = (data: any): number => {
  const { serviceType } = data;
  let score = 1;
  
  // Base complexity by service type
  const baseComplexity = {
    'home': 2,
    'office': 3,
    'deep-cleaning': 6,
    'move-in-out': 7,
    'post-construction': 9
  }[serviceType] || 2;
  
  score = baseComplexity;
  
  // Size impact
  const sizeInM2 = (data as any).propertySize || (data as any).squareMeters || 50;
  if (sizeInM2 > 200) score += 1;
  if (sizeInM2 > 400) score += 1;
  
  // Service-specific complexity factors
  if (serviceType === 'home') {
    const homeData = data as any;
    if (homeData.dirtinessLevel >= 4) score += 1;
    if (homeData.pets === 'both' || homeData.pets === 'dogs') score += 1;
  } else if (serviceType === 'office') {
    const officeData = data as any;
    if (officeData.cleaningDuringWorkHours) score += 1;
    if (officeData.securityClearanceRequired) score += 1;
  } else if (serviceType === 'deep-cleaning') {
    const deepData = data as any;
    if (deepData.includeWallsAndCeilings) score += 1;
    if (deepData.moldOrPestPresence) score += 2;
  } else if (serviceType === 'move-in-out') {
    const moveData = data as any;
    if (moveData.isFurnished) score += 1;
    if (moveData.trashRemovalNeeded) score += 1;
    if (moveData.disinfectionRequired) score += 1;
  } else if (serviceType === 'post-construction') {
    const postData = data as any;
    if (postData.hazardousMaterials) score += 2;
    if (postData.specialEquipmentNeeded) score += 1;
    if (postData.dustLevel >= 4) score += 1;
  }
  
  // Extras complexity
  const extrasCount = (data.extras || []).length;
  score += Math.min(extrasCount * 0.5, 2);
  
  return Math.min(Math.max(score, 1), 10);
};

// Legacy function for backward compatibility
export const calculateRecommendedTime = (bedrooms: number, bathrooms: number, cleaningPace: string = 'standard'): number => {
  let baseTime = 2;
  baseTime += bedrooms * 0.5;
  baseTime += bathrooms * 0.5;
  
  if (cleaningPace === 'quick') {
    baseTime *= 0.8;
  }
  
  return Math.max(2, Math.round(baseTime * 2) / 2);
};
