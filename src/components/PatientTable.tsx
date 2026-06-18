import React, { useEffect, useState } from 'react';
import type { PatientRecord } from '../types/patient';
import type { Translation } from '../i18n/translations';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

interface PatientTableProps {
  patients: PatientRecord[];
  translations: Pick<Translation,
    | 'fullName'
    | 'department'
    | 'appointmentDate'
    | 'status'
    | 'priority'
    | 'actions'
    | 'edit'
    | 'delete'
    | 'view'
    | 'scoreAndNote'
    | 'statusOptions'
    | 'priorityOptions'
  >;
  language: 'TR' | 'EN';
  onEdit: (patient: PatientRecord) => void;
  onDelete: (id: string) => void;
  onView?: (patient: PatientRecord) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({ patients, translations, language, onEdit, onDelete, onView }) => {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const pageCount = Math.max(1, Math.ceil(patients.length / pageSize));
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const pagePatients = patients.slice((page - 1) * pageSize, page * pageSize);

  if (isXs) {
    return (
      <Paper>
        <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Stack spacing={{ xs: 1.5, sm: 2 }}>
            {pagePatients.map((patient) => (
              <Card key={patient.id} variant="outlined">
                <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>{patient.fullName}</Typography>
                    <Typography variant="body2" color="text.secondary">{patient.department}</Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      <strong>{translations.appointmentDate}:</strong> {new Date(patient.appointmentDate).toLocaleDateString()}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip label={`${translations.status}: ${translations.statusOptions[patient.status] ?? patient.status}`} size="small" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }} />
                      <Chip label={`${translations.priority}: ${translations.priorityOptions[patient.priority] ?? patient.priority}`} size="small" color="info" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }} />
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#555', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      {language === 'TR' ? patient.note_tr || '-' : patient.note_en || '-'}
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ pt: 1 }}>
                      <Button size="small" variant="outlined" onClick={() => onEdit(patient)} sx={{ flex: { xs: 1, sm: 0 } }}>{translations.edit}</Button>
                      {onView && <Button size="small" variant="contained" onClick={() => onView(patient)} sx={{ flex: { xs: 1, sm: 0 } }}>{translations.view}</Button>}
                      <Button size="small" color="error" variant="text" onClick={() => onDelete(patient.id)} sx={{ flex: { xs: 1, sm: 0 } }}>{translations.delete}</Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
        <Box sx={{ p: { xs: 1.5, sm: 2 }, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="small"
            showFirstButton
            showLastButton
          />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper>
      <TableContainer sx={{ 
        overflowX: 'auto',
        '@media (max-width: 640px)': {
          fontSize: '0.875rem'
        }
      }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px' } }}>{translations.fullName}</TableCell>
              <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px' } }}>{translations.department}</TableCell>
              <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px' } }}>{translations.appointmentDate}</TableCell>
              <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px' } }}>{translations.status}</TableCell>
              <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px' } }}>{translations.priority}</TableCell>
              <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px' }, display: { xs: 'none', sm: 'table-cell' } }}>{translations.scoreAndNote}</TableCell>
              <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px' } }}>{translations.actions}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagePatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px', fontSize: '0.875rem' } }}>
                  {patient.fullName}
                </TableCell>
                <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px', fontSize: '0.875rem' } }}>{patient.department}</TableCell>
                <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px', fontSize: '0.875rem' } }}>{new Date(patient.appointmentDate).toLocaleDateString()}</TableCell>
                <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px', fontSize: '0.875rem' } }}>{translations.statusOptions[patient.status] ?? patient.status}</TableCell>
                <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px', fontSize: '0.875rem' } }}>{translations.priorityOptions[patient.priority] ?? patient.priority}</TableCell>
                <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px', display: 'none' } }}>
                  <strong>{translations.scoreAndNote}:</strong> {patient.score}
                  <br />
                  <small style={{ color: '#666' }}>{language === 'TR' ? patient.note_tr || '-' : patient.note_en || '-'}</small>
                </TableCell>
                <TableCell sx={{ '@media (max-width: 640px)': { padding: '8px 4px' } }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.5}>
                    <Button size="small" variant="outlined" onClick={() => onEdit(patient)} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>{translations.edit}</Button>
                    {onView && <Button size="small" variant="contained" onClick={() => onView(patient)} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>{translations.view}</Button>}
                    <Button size="small" color="error" variant="text" onClick={() => onDelete(patient.id)} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>{translations.delete}</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          size="small"
          showFirstButton
          showLastButton
        />
      </Box>
    </Paper>
  );
};
