import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

import {URLS} from '@/config';

export const useGetAnnouncements = () => {
  const getAnnouncements = async () => {
    const response = await fetch(URLS.GET_ANNOUNCEMENTS, {
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
    queryKey: ['announcements'],
    queryFn: getAnnouncements,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // Add this for debugging
  console.log('useGetAnnouncements URL', URLS.GET_ANNOUNCEMENTS);
  console.log('useGetAnnouncements', queryResult);


  return queryResult;
};
