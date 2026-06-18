import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import type { PatientRecord, PatientStatus, PriorityLevel, BloodType } from '../types/patient';
import type { Translation } from '../i18n/translations';

interface PatientFormProps {
  initial?: Omit<PatientRecord, 'id' | 'createdAt'>;
  onSave: (patient: Omit<PatientRecord, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  translations: Pick<Translation,
    | 'fullName'
    | 'birthDate'
    | 'appointmentDate'
    | 'department'
    | 'status'
    | 'priority'
    | 'bloodType'
    | 'score'
    | 'noteTR'
    | 'noteEN'
    | 'diagnosisTR'
    | 'diagnosisEN'
    | 'tags'
    | 'save'
    | 'cancel'
    | 'statusOptions'
    | 'priorityOptions'
  >;
}

const statusOptions: PatientStatus[] = ['Bekliyor', 'Muayenede', 'Tamamlandı', 'İptal'];
const priorityOptions: PriorityLevel[] = ['acil', 'normal'];
const bloodTypeOptions: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];

const today = new Date().toISOString().split('T')[0];

export const PatientForm: React.FC<PatientFormProps> = ({ initial, onSave, onCancel, translations }) => {
  const [form, setForm] = useState<Omit<PatientRecord, 'id' | 'createdAt'>>(() => ({
    fullName: initial?.fullName ?? '',
    birthDate: initial?.birthDate ?? '1990-01-01',
    appointmentDate: initial?.appointmentDate ?? today,
    department: initial?.department ?? 'Kardiyoloji',
    status: initial?.status ?? 'Bekliyor',
    priority: initial?.priority ?? 'normal',
    bloodType: initial?.bloodType ?? 'A+',
    score: initial?.score ?? 0,
    note_tr: initial?.note_tr ?? '',
    note_en: initial?.note_en ?? '',
    diagnosis_tr: initial?.diagnosis_tr ?? '',
    diagnosis_en: initial?.diagnosis_en ?? '',
    isInsured: initial?.isInsured ?? true,
    isFollowUp: initial?.isFollowUp ?? false,
    isVaccinated: initial?.isVaccinated ?? true,
    tags: initial?.tags ?? ['Genel'],
  }));

  const updateField = <K extends keyof Omit<PatientRecord, 'id' | 'createdAt'>>(key: K, value: Omit<PatientRecord, 'id' | 'createdAt'>[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...form,
      tags: form.tags.map((tag) => tag.trim()).filter(Boolean),
    });
  };

  return (
    <Paper sx={{ p: { xs: 1.5, sm: 2, md: 3 }, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label={translations.fullName} required fullWidth size="small" value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField label={translations.birthDate} type="date" fullWidth size="small" value={form.birthDate} onChange={(e) => updateField('birthDate', e.target.value)} InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField label={translations.appointmentDate} type="date" fullWidth size="small" value={form.appointmentDate} onChange={(e) => updateField('appointmentDate', e.target.value)} InputLabelProps={{ shrink: true }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField label={translations.department} fullWidth size="small" value={form.department} onChange={(e) => updateField('department', e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField select label={translations.status} fullWidth size="small" value={form.status} onChange={(e) => updateField('status', e.target.value as PatientStatus)}>
              {statusOptions.map((s) => <MenuItem key={s} value={s}>{translations.statusOptions[s]}</MenuItem>)}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField select label={translations.priority} fullWidth size="small" value={form.priority} onChange={(e) => updateField('priority', e.target.value as PriorityLevel)}>
              {priorityOptions.map((p) => <MenuItem key={p} value={p}>{translations.priorityOptions[p]}</MenuItem>)}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label={translations.bloodType}
              fullWidth
              size="small"
              value={form.bloodType}
              onChange={(e) => updateField('bloodType', e.target.value as BloodType)}
            >
              {bloodTypeOptions.map((bloodType) => (
                <MenuItem key={bloodType} value={bloodType}>
                  {bloodType}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label={translations.score}
              type="number"
              inputProps={{ min: 0, max: 5, step: 1 }}
              fullWidth
              size="small"
              value={form.score}
              onChange={(e) => updateField('score', Math.max(0, Math.min(5, Number(e.target.value))))}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField label={translations.noteTR} fullWidth size="small" value={form.note_tr} onChange={(e) => updateField('note_tr', e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField label={translations.noteEN} fullWidth size="small" value={form.note_en} onChange={(e) => updateField('note_en', e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField label={translations.diagnosisTR} fullWidth size="small" value={form.diagnosis_tr} onChange={(e) => updateField('diagnosis_tr', e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField label={translations.diagnosisEN} fullWidth size="small" value={form.diagnosis_en} onChange={(e) => updateField('diagnosis_en', e.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <TextField label={translations.tags} fullWidth size="small" value={form.tags.join(', ')} onChange={(e) => updateField('tags', e.target.value.split(',').map((tag) => tag.trim()))} />
          </Grid>

          <Grid item xs={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button type="submit" variant="contained" color="success" sx={{ flex: 1 }}>{translations.save}</Button>
              <Button variant="outlined" color="inherit" onClick={onCancel} sx={{ flex: 1 }}>{translations.cancel}</Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
