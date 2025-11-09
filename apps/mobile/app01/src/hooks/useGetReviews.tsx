import axios from 'axios';
import {useState, useEffect} from 'react';

import {URLS} from '@/config';

export const useGetReviews = () => {
  const [reviews, setReviews] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URLS.GET_REVIEWS);

      if (!response.data) {
        throw new Error('No data in response');
      }

      const reviews = response.data.reviews || response.data || [];
      setReviews(reviews);
      setIsLoading(false);

      return reviews;
    } catch (error) {
      setIsLoading(false);
      console.error('API request failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return {
    reviews,
    isLoading,
  };
};
