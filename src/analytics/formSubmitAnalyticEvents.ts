import { analytics } from '@/utils/firebase';
import { logEvent } from 'firebase/analytics';
import { HandleFormSubmitAnalyticsParams } from '@/utils/types';

export const handleFormSubmitAnalytics = ({
  formName,
  pagePath,
  success
}: HandleFormSubmitAnalyticsParams) => {
  console.log({ formName, pagePath, success });
  if (analytics) {
    logEvent(analytics, 'form_submission', {
      form_name: formName,
      page_path: pagePath,
      success: true,
    });
  };
};
