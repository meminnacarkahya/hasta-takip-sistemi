import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { PatientStatus } from '../types/patient';
import type { Translation } from '../i18n/translations';

interface FilterPanelProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  sortBy: 'fullName' | 'appointmentDate' | 'score' | '';
  setSortBy: (value: 'fullName' | 'appointmentDate' | 'score' | '') => void;
  onAdd: () => void;
  translations: Pick<Translation, 'all' | 'sortBy' | 'filterStatus' | 'addNew' | 'statusOptions' | 'sortOptions'>;
}

const statusOptions: PatientStatus[] = ['Bekliyor', 'Muayenede', 'Tamamlandı', 'İptal'];

export const FilterPanel: React.FC<FilterPanelProps> = ({ statusFilter, setStatusFilter, sortBy, setSortBy, onAdd, translations }) => (
  <Box sx={{ width: '100%' }}>
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      alignItems="flex-start"
      sx={{
        width: '100%',
        flexWrap: 'wrap',
      }}
    >
      <TextField
        select
        size="small"
        fullWidth
        value={statusFilter}
        label={translations.filterStatus}
        onChange={(e) => setStatusFilter(e.target.value)}
        sx={{ minWidth: { md: 220 }, flex: 1, width: { xs: '100%', md: 'auto' } }}
      >
        <MenuItem value="All">{translations.all}</MenuItem>
        {statusOptions.map((s) => (
          <MenuItem key={s} value={s}>{translations.statusOptions[s]}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        fullWidth
        value={sortBy}
        label={translations.sortBy}
        onChange={(e) => setSortBy(e.target.value as any)}
        sx={{ minWidth: { md: 220 }, flex: 1, width: { xs: '100%', md: 'auto' } }}
      >
        {translations.sortOptions.map((o) => (
          <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
        ))}
      </TextField>

      <Box sx={{ width: { xs: '100%', md: 'auto' }, display: 'flex', justifyContent: { xs: 'stretch', md: 'flex-end' } }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { md: 180 } }}
          onClick={onAdd}
        >
          + {translations.addNew}
        </Button>
      </Box>
    </Stack>
  </Box>
);
