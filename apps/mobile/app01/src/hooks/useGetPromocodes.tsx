import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

import {URLS} from '@/config';

export const useGetPromocodes = () => {
  const getPromocodes = async () => {
    const response = await axios.get(URLS.GET_PROMOCODES);
    if (!response.data) {
      throw new Error('Failed to fetch promocodes');
    }
    return response.data.promocodes || [];
  };

  return useQuery({
    queryKey: ['promocodes'],
    queryFn: getPromocodes,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
