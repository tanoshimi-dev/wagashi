import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

import {URLS} from '@/config';

export const useGetDishes = () => {
  const getDishes = async () => {
    try {
      const response = await axios.get(URLS.GET_DISHES);

      if (!response.data) {
        throw new Error('No data in response');
      }

      const dishes = response.data.dishes || response.data || [];

      return dishes;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  const queryResult = useQuery({
    queryKey: ['dishes'],
    queryFn: getDishes,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return queryResult;
};
