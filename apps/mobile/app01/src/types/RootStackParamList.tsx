export type RootStackParamList = {
  Dish: {dishId: number};
  SignIn: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  Shop: {category?: string};
  CommentReply: undefined;
  OrderHistory: undefined;
  MyPromocodes: undefined;
  Faq: undefined;
  LeaveAReview: undefined;
  Notifications: undefined;
  ForgotPassword: undefined;
  RootLayout: {screen: string};
  VerifyUser: { email: string };
  ShopCategory: {category: string};
  OrderSuccessful: undefined;
  ConfirmationCode: undefined;
  Reviews: undefined;
  MyPromocodesEmpty: undefined;
  ForgotPasswordSentEmail: undefined;
  NewPassword: undefined;
  MyWishlist: undefined;
  Checkout: undefined;
  AccountCreated: undefined;


  Products: undefined;
  SweetsDetail: {sweetId: number};
  AnnouncementDetail: {announcementId: number};
  AccountDetail: undefined;

};
