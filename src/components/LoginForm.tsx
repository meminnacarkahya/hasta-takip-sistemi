import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { Translation } from '../i18n/translations';

interface LoginFormProps {
  translations: Pick<Translation, 'loginTitle' | 'loginSubtitle' | 'loginNote' | 'username' | 'password' | 'loginButton' | 'invalidCredentials'>;
  onSubmit: (username: string, password: string) => Promise<void>;
  error: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ translations, onSubmit, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(username.trim(), password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3, mt: 8, boxShadow: 3 }}>
      <Stack spacing={2} alignItems="center">
        <Box
          sx={{
            width: 300,
            height: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" fontWeight={400} sx={{ letterSpacing: 1, width: '100%' }}>
            Hasta Randevu ve Takip Paneli
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight={700}>{translations.loginTitle}</Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {translations.loginSubtitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ bgcolor: 'background.paper', px: 2, py: 1, borderRadius: 1, boxShadow: 1 }}>
          {translations.loginNote}
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack spacing={2}>
            <TextField
              label={translations.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              size="small"
              autoComplete="username"
              required
            />
            <TextField
              label={translations.password}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              size="small"
              autoComplete="current-password"
              required
            />
            {error && (
              <Typography variant="body2" color="error">
                {translations.invalidCredentials}
              </Typography>
            )}
            <Button type="submit" variant="contained" size="large" disabled={submitting}>
              {translations.loginButton}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};
