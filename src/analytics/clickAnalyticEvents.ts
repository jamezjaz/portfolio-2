import { analytics } from '@/utils/firebase';
import { logEvent } from 'firebase/analytics';
import { HandleClickAnalyticsParams } from '@/utils/types';

// a reusable function for handling click analytics
export const handleClickAnalytics = ({ buttonName, screenName }: HandleClickAnalyticsParams) => {
  if (analytics) {
    logEvent(analytics, 'button_click', {
      button_name: buttonName,
      screen_name: screenName,
    });
  };
};
