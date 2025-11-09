import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import {screens} from '@/screens';
import {constants} from '@/constants';
import {RootLayout} from '@/tabs/_layout';

export const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name={constants.routes.onboarding}
        component={screens.Onboarding}
        options={{headerShown: false}}
      /> */}

      {/* <Stack.Screen
        name={constants.routes.signIn}
        component={screens.SignIn}
        options={{headerShown: false}}
      /> */}


      <Stack.Screen
        name={'RootLayout'}
        component={RootLayout}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={constants.routes.myPromocodes}
        component={screens.MyPromocodes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.newPassword}
        component={screens.NewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.orderSuccessful}
        component={screens.OrderSuccessful}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.forgotPasswordSentEmail}
        component={screens.ForgotPasswordSentEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.checkout}
        component={screens.Checkout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.myPromocodesEmpty}
        component={screens.MyPromocodesEmpty}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name={constants.routes.signUp}
        component={screens.SignUp}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name={constants.routes.faq}
        component={screens.FAQ}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.shop}
        component={screens.Shop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.shopCategory}
        component={screens.ShopCategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.leaveAReview}
        component={screens.LeaveAReview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.forgotPassword}
        component={screens.ForgetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.orderHistory}
        component={screens.OrderHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.accountCreated}
        component={screens.AccountCreated}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.confirmationCode}
        component={screens.ConfirmationCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.verifyYourPhoneNumber}
        component={screens.VerifyYourPhoneNumber}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.reviews}
        component={screens.Reviews}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.commentReply}
        component={screens.CommentReply}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.notifications}
        component={screens.Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.dish}
        component={screens.Dish}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={constants.routes.sweetsDetail}
        component={screens.SweetsDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.announcementDetail}
        component={screens.AnnouncementDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={constants.routes.accountDetail}
        component={screens.AccountDetail}
        options={{headerShown: true, title: 'アカウント詳細'}}
      />
{/* 
      <Stack.Screen
        name={'RootLayout'}
        component={RootLayout}
        options={{headerShown: false}}
      /> */}

    </Stack.Navigator>
  );
};
