import React from 'react';
import TextField from '@mui/material/TextField';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => (
  <TextField
    size="small"
    variant="outlined"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    sx={{ 
      minWidth: 220, 
      flex: '1 1 220px',
      '@media (max-width: 640px)': {
        minWidth: '100%',
        flex: '1 1 100%',
        maxWidth: '100%'
      }
    }}
  />
);
