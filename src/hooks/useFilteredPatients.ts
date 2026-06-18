import { useState, useMemo } from 'react';
import type { PatientRecord } from '../types/patient';

export const useFilteredPatients = (patients: PatientRecord[]) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'fullName' | 'appointmentDate' | 'score' | ''>('');

  const filteredAndSortedPatients = useMemo(() => {
    let result = [...patients];

    // Arama 
    if (search) {
      result = result.filter((p) =>
        p.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtreleme
    if (statusFilter !== 'All') {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Sıralama
    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === 'score') return b.score - a.score; // Skor azalan
        return String(a[sortBy]).localeCompare(String(b[sortBy]));
      });
    }

    return result;
  }, [patients, search, statusFilter, sortBy]);

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filteredPatients: filteredAndSortedPatients,
  };
};