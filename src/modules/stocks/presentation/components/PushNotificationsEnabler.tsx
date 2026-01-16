"use client";

import { Button } from "@/modules/shared/ui/button";
import { usePushNotifications } from "@/modules/stocks/presentation/hooks/usePushNotifications";
import { strings } from "@/modules/stocks/presentation/localization";

export function PushNotificationsEnabler() {
  const { isSupported, subscription, subscribeToPush, unsubscribeFromPush } =
    usePushNotifications();

  if (!isSupported) {
    return null;
  }

  const buttonClass = subscription
    ? "border-green-300 dark:border-green-900/60"
    : "border-red-300 dark:border-red-900/60";

  return (
    <Button
      onClick={subscription ? unsubscribeFromPush : subscribeToPush}
      variant='outline'
      className={buttonClass}
    >
      {subscription
        ? strings.notifications.notificationsEnabled
        : strings.notifications.notificationsDisabled}
    </Button>
  );
}
