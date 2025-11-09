import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

import {URLS} from '@/config';

export const useGetSweets = () => {
  const getSweets = async () => {
    const response = await fetch(URLS.GET_SWEETS, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        // Add 'Authorization' header if using API tokens:
        //'Authorization': `Bearer YOUR_TOKEN`
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
 
  };

  const queryResult = useQuery({
    queryKey: ['sweets'],
    queryFn: getSweets,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // Add this for debugging
  console.log('useGetSweets URL', URLS.GET_SWEETS);
  console.log('useGetSweets', queryResult);


  return queryResult;
};
