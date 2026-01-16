"use server";

import webpush from "web-push";

import { strings } from "@/modules/stocks/presentation/localization";

webpush.setVapidDetails(
  `mailto:${process.env.NEXT_PUBLIC_PERSONAL_VAPID_EMAIL as string}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: any = null;

export async function subscribeUser(sub: any) {
  subscription = sub;
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  return { success: true };
}

export async function sendNotification(title: string, message: string) {
  if (!subscription) {
    throw new Error(strings.notifications.errors.noSubscriptionError);
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title,
        body: message,
        icon: "/icon.png",
      })
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: strings.notifications.errors.failedToSend };
  }
}

export async function sendStockAlertNotification(symbol: string, priceAlert: number) {
  if (!subscription) {
    throw new Error(strings.notifications.errors.noSubscriptionAvailable);
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: strings.notifications.title,
        body: `${symbol} ${strings.notifications.message} ${priceAlert}!`,
        icon: "/icon.png",
      })
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: strings.notifications.errors.failedToSend };
  }
}
