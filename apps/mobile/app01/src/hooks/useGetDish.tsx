import axios from 'axios';
import {useState, useEffect} from 'react';

import {URLS} from '@/config';
import {DishType} from '@/types';

export const useGetDish = (id: number) => {
  const [dish, setDish] = useState<DishType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDish = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(URLS.GET_DISHES);
      const dishes: DishType[] = response.data.dishes ?? response.data;
      const foundDish = dishes.find((d: DishType) => d.id === id);
      setDish(foundDish || null);
      setIsLoading(false);
      return foundDish;
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching dishes:', error);
      throw error;
    }
  };

  useEffect(() => {
    getDish();
  }, [id]);

  return {
    dish,
    isLoading,
  };
};
