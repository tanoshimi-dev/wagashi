import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

import {URLS} from '@/config';

export const useGetCategories = () => {
  const getCategories = async () => {
    const response = await fetch(URLS.GET_CATEGORIES, {
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
    queryKey: ['categories'],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // Add this for debugging
  console.log('useGetCategories URL', URLS.GET_CATEGORIES);
  console.log('useGetCategories', queryResult);


  return queryResult;
};
