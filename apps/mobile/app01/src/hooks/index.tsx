import {useGetDish} from '@/hooks/useGetDish';
import {useGetDishes} from '@/hooks/useGetDishes';
import {useGetReviews} from '@/hooks/useGetReviews';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useGetPromocodes} from '@/hooks/useGetPromocodes';
import {useAppNavigation} from '@/hooks/useAppNavigation';

import { useGetSweets } from '@/hooks/useGetSweets';
import { useGetSweetsDetail } from './useGetSweetsDtail';
import { useGetCategories } from './useGetCategories';
import { useGetAnnouncements } from '@/hooks/useGetAnnouncements';
import { useGetAnnouncement } from '@/hooks/useGetAnnouncement';

export const hooks = {
  useGetDish,
  useGetDishes,
  useGetReviews,
  useAppDispatch,
  useAppSelector,
  useAppNavigation,
  useGetPromocodes,

  useGetSweets,
  useGetSweetsDetail,
  useGetCategories,
  useGetAnnouncements,
  useGetAnnouncement,
};
