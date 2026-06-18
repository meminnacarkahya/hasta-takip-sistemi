import type { PatientRecord } from '../types/patient';

const BASE = 'https://v0-json-api-three.vercel.app/api';

export async function getPatients(): Promise<PatientRecord[]> {
  const res = await fetch(`${BASE}/data`);
  if (!res.ok) throw new Error('API: patients fetch failed');
  const data = await res.json();
  return data as PatientRecord[];
}

export async function createPatient(payload: Omit<PatientRecord, 'id' | 'createdAt'>): Promise<PatientRecord> {
  const created: PatientRecord = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  return created;
}

export async function updatePatient(id: string, fields: Partial<PatientRecord>): Promise<PatientRecord> {
  return {
    ...fields,
    id,
    fullName: (fields as any).fullName || 'Unknown',
    birthDate: (fields as any).birthDate || new Date().toISOString().split('T')[0],
    appointmentDate: (fields as any).appointmentDate || new Date().toISOString().split('T')[0],
    department: (fields as any).department || 'Genel',
    status: (fields as any).status || 'Bekliyor',
    priority: (fields as any).priority || 'normal',
    bloodType: (fields as any).bloodType || 'ARh+',
    score: (fields as any).score ?? 0,
    note_tr: (fields as any).note_tr || '',
    note_en: (fields as any).note_en || '',
    diagnosis_tr: (fields as any).diagnosis_tr || '',
    diagnosis_en: (fields as any).diagnosis_en || '',
    isInsured: (fields as any).isInsured ?? false,
    isFollowUp: (fields as any).isFollowUp ?? false,
    isVaccinated: (fields as any).isVaccinated ?? false,
    tags: (fields as any).tags || [],
    createdAt: new Date().toISOString(),
  } as PatientRecord;
}

export async function deletePatient(id: string): Promise<void> {
  console.debug('api.deletePatient (simulated) id=', id);
  return;
}

export default { getPatients, createPatient, updatePatient, deletePatient };
