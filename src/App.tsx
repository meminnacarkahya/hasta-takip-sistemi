import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { useFilteredPatients } from './hooks/useFilteredPatients';
import { translations } from './i18n/translations';
import type { PatientRecord } from './types/patient';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { PatientForm } from './components/PatientForm';
import { PatientTable } from './components/PatientTable';
import { PatientDetail } from './components/PatientDetail';
import { LoginForm } from './components/LoginForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const getInitialFormData = (patient: PatientRecord) => ({
  fullName: patient.fullName,
  birthDate: patient.birthDate,
  appointmentDate: patient.appointmentDate,
  department: patient.department,
  status: patient.status,
  priority: patient.priority,
  bloodType: patient.bloodType,
  score: patient.score,
  note_tr: patient.note_tr,
  note_en: patient.note_en,
  diagnosis_tr: patient.diagnosis_tr,
  diagnosis_en: patient.diagnosis_en,
  isInsured: patient.isInsured,
  isFollowUp: patient.isFollowUp,
  isVaccinated: patient.isVaccinated,
  tags: patient.tags,
});

export const App: React.FC = () => {
  const { patients, language, loading, error, setLanguage, deletePatient, addPatient, updatePatient, isAuthenticated, login, logout, loginError } = useApp();
  const t = translations[language];

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filteredPatients,
  } = useFilteredPatients(patients);

  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<PatientRecord | null>(null);
  const [detailPatient, setDetailPatient] = useState<PatientRecord | null>(null);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenAdd = () => {
    setEditingPatient(null);
    setShowForm(true);
  };

  const handleOpenEdit = (patient: PatientRecord) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleSave = (patientData: Omit<PatientRecord, 'id' | 'createdAt'>) => {
    if (editingPatient) {
      updatePatient(editingPatient.id, patientData);
    } else {
      addPatient(patientData);
    }
    setShowForm(false);
    setEditingPatient(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      deletePatient(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
        <LoginForm
          translations={t}
          error={loginError}
          onSubmit={login}
        />
      </Box>
    );
  }

  if (loading) return <div className="loading">{t.loading}</div>;
  if (error) return <div className="error">{t.error}: {error}</div>;

  return (
    <Box sx={{ fontFamily: 'sans-serif', minHeight: '100vh', bgcolor: '#f7f9fc' }}>
      <AppBar position="fixed" color="primary" elevation={2} sx={{ top: 0, left: 0, right: 0, zIndex: theme.zIndex.appBar }}>
        <Toolbar disableGutters sx={{ flexWrap: 'wrap', gap: { xs: 0.5, sm: 1 }, px: { xs: 1, sm: 2, md: 3 }, py: { xs: 0.75, sm: 1 } }}>
          <Box sx={{ flexGrow: 1, minWidth: 0, mr: { xs: 0, sm: 2 } }}>
            <Typography 
              variant={isSm ? 'h6' : 'h5'} 
              component="div" 
              noWrap
              sx={{
                '@media (max-width: 640px)': {
                  fontSize: '1.1rem'
                }
              }}
            >
              {t.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.85,
                mt: 0.5,
                display: { xs: 'none', sm: 'block' },
                maxWidth: 500,
                '@media (max-width: 768px)': {
                  fontSize: '0.8rem',
                  maxWidth: 300
                }
              }}
            >
              {t.subtitle}
            </Typography>
          </Box>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <Button 
              color={language === 'TR' ? 'inherit' : 'secondary'} 
              onClick={() => setLanguage('TR')} 
              size="small"
              sx={{
                '@media (max-width: 640px)': {
                  fontSize: '0.75rem',
                  minWidth: '24px',
                  padding: '4px'
                }
              }}
            >
              TR
            </Button>
            <Button 
              color={language === 'EN' ? 'inherit' : 'secondary'} 
              onClick={() => setLanguage('EN')} 
              size="small"
              sx={{
                '@media (max-width: 640px)': {
                  fontSize: '0.75rem',
                  minWidth: '24px',
                  padding: '4px'
                }
              }}
            >
              EN
            </Button>
            <Button
              color="inherit"
              onClick={logout}
              size="small"
              sx={{
                '@media (max-width: 640px)': {
                  fontSize: '0.75rem',
                  minWidth: 'auto',
                  padding: '4px 8px'
                }
              }}
            >
              {t.logout}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ pt: { xs: 11, sm: 12 }, pb: { xs: 2, sm: 3 }, px: { xs: 1, sm: 2 } }}>
        <Stack spacing={3} sx={{ width: '100%' }}>
          <Stack 
            direction={{ xs: 'column', lg: 'row' }} 
            spacing={2} 
            alignItems={{ xs: 'stretch', lg: 'center' }}
            sx={{ width: '100%' }}
          >
            <SearchBar value={search} onChange={setSearch} placeholder={t.search} />
            <FilterPanel
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onAdd={handleOpenAdd}
              translations={t}
            />
          </Stack>

          <Dialog open={showForm} onClose={handleCancel} fullWidth maxWidth="lg" PaperProps={{ sx: { p: { xs: 1, sm: 2 }, mx: { xs: 1, sm: 2 }, my: { xs: 1.5, sm: 2 } } }}>
            <DialogTitle sx={{ pb: 0, fontSize: { xs: '1rem', sm: '1.25rem' } }}>{editingPatient ? t.formTitleEdit : t.formTitleNew}</DialogTitle>
            <DialogContent>
              <PatientForm
                initial={editingPatient ? getInitialFormData(editingPatient) : undefined}
                onSave={handleSave}
                onCancel={handleCancel}
                translations={t}
              />
            </DialogContent>
          </Dialog>

          {detailPatient && (
            <PatientDetail patient={detailPatient} language={language} onClose={() => setDetailPatient(null)} translations={t} />
          )}

          <PatientTable
            patients={filteredPatients}
            translations={t}
            language={language}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onView={(p) => setDetailPatient(p)}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default App;