import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import type { PatientRecord } from '../types/patient';
import type { Translation } from '../i18n/translations';

interface PatientDetailProps {
  patient: PatientRecord;
  language: 'TR' | 'EN';
  onClose: () => void;
  translations: Pick<Translation,
    | 'patientDetailTitle'
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
    | 'followUp'
    | 'vaccinated'
    | 'tags'
    | 'close'
    | 'statusOptions'
    | 'priorityOptions'
    | 'yes'
    | 'no'
  >;
}

export const PatientDetail: React.FC<PatientDetailProps> = ({ patient, language, onClose, translations }) => {
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md" 
      PaperProps={{
        sx: {
          margin: 1,
          '@media (max-width: 640px)': {
            maxWidth: 'calc(100% - 16px)',
            margin: '8px auto'
          }
        }
      }}
    >
      <DialogTitle>{patient.fullName} — {translations.patientDetailTitle}</DialogTitle>
      <DialogContent dividers>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head">{translations.fullName}</TableCell>
              <TableCell>{patient.fullName}</TableCell>
              <TableCell variant="head">{translations.birthDate}</TableCell>
              <TableCell>{patient.birthDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">{translations.appointmentDate}</TableCell>
              <TableCell>{new Date(patient.appointmentDate).toLocaleString()}</TableCell>
              <TableCell variant="head">{translations.department}</TableCell>
              <TableCell>{patient.department}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">{translations.status}</TableCell>
              <TableCell>{translations.statusOptions[patient.status] ?? patient.status}</TableCell>
              <TableCell variant="head">{translations.priority}</TableCell>
              <TableCell>{translations.priorityOptions[patient.priority] ?? patient.priority}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">{translations.bloodType}</TableCell>
              <TableCell>{patient.bloodType}</TableCell>
              <TableCell variant="head">{translations.score}</TableCell>
              <TableCell>{patient.score}</TableCell>
            </TableRow>
            {language === 'TR' ? (
              <>
                <TableRow>
                  <TableCell variant="head">{translations.noteTR}</TableCell>
                  <TableCell>{patient.note_tr || '-'}</TableCell>
                  <TableCell variant="head">{translations.diagnosisTR}</TableCell>
                  <TableCell>{patient.diagnosis_tr || '-'}</TableCell>
                </TableRow>
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell variant="head">{translations.noteEN}</TableCell>
                  <TableCell>{patient.note_en || '-'}</TableCell>
                  <TableCell variant="head">{translations.diagnosisEN}</TableCell>
                  <TableCell>{patient.diagnosis_en || '-'}</TableCell>
                </TableRow>
              </>
            )}
            <TableRow>
              <TableCell variant="head">{translations.followUp}</TableCell>
              <TableCell>{patient.isFollowUp ? translations.yes : translations.no}</TableCell>
              <TableCell variant="head">{translations.vaccinated}</TableCell>
              <TableCell>{patient.isVaccinated ? translations.yes : translations.no}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">{translations.vaccinated}</TableCell>
              <TableCell>{patient.isVaccinated ? translations.yes : translations.no}</TableCell>
              <TableCell variant="head">{translations.tags}</TableCell>
              <TableCell>{(patient.tags || []).join(', ')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{translations.close}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientDetail;
