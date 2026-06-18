export type PatientStatus = 'Bekliyor' | 'Muayenede' | 'Tamamlandı' | 'İptal';
export type PriorityLevel = 'acil' | 'normal';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | '0+' | '0-';

export interface PatientRecord {
  id: string;
  fullName: string;
  birthDate: string;
  appointmentDate: string;
  createdAt: string;
  department: string;
  status: PatientStatus;
  priority: PriorityLevel;
  bloodType: BloodType;
  score: number;
  note_tr: string;
  note_en: string;
  diagnosis_tr: string;
  diagnosis_en: string;
  isInsured: boolean;
  isFollowUp: boolean;
  isVaccinated: boolean;
  tags: string[];
  notes?: string; // Opsiyonel alan
}

export type Language = 'TR' | 'EN';