'use server';

import { prisma } from "@/lib/prisma";
import { currentUser } from '@clerk/nextjs/server'
import webpush, { PushSubscription } from 'web-push';

interface I_SubscribeUser {
	sub: PushSubscription;
	deviceId: string;
}

export async function subscribeUser(props: I_SubscribeUser) {
	const user = await currentUser()
	const { sub, deviceId } = props;

	if (!user?.id) return;

	try {
		const subscribe = await prisma.pushSubscription.create({
			data: {
				device_id: deviceId,
				user_id: user?.id,
				value: JSON.stringify(sub),
			}
		})

		if (subscribe) {
			return { success: true };
		}
		
	} catch (err) {
		console.error(err);
		return { success: false, message: 'Failed to subscribe user' };
	}
}

interface I_UnsubscribeUser {
	deviceId: string;
}

export async function unsubscribeUser(props: I_UnsubscribeUser) {
	const { deviceId } = props;

	try {
		const unsubscribe = await prisma.pushSubscription.deleteMany({
			where: {
				device_id: deviceId
			}
		})

		if (unsubscribe) return { success: true };
	} catch (err) {
		console.error(err);
		return { success: false, message: 'Failed to unsubscribe user' };
	}
}

interface I_CheckSubscription {
	deviceId: string;
}

export async function checkSubscription(props: I_CheckSubscription) {
	const { deviceId } = props;

	try {
		const sub = await prisma.pushSubscription.findUnique({
			where: { device_id: deviceId }
		});

		if (sub) {
			return { success: true };
		}

		return { success: false, message: 'Subscription does not exist' };
	} catch (err) {
		console.error(err);
		return { success: false, message: 'Failed to check subscription' };
	}
}

export interface I_SendPushNotification {
	deviceId: string;
	title: string;
	body: string;
	url: string;
	badge?: string;
}

export async function sendPushNotification(props: I_SendPushNotification) {
	const { deviceId, title, body, url, badge } = props;
 
	try {
	 if (!deviceId || !title || !body || !url) {
		throw new Error('Invalid parameters');
	 }
 
	 const subs = await prisma.pushSubscription.findMany();

	 if (!subs) {
		throw new Error('Failed to send push notification');
	}
	 
	 webpush.setVapidDetails(
		process.env.NEXT_PUBLIC_VAPID_SUBJECT!,
		process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
		process.env.VAPID_PRIVATE_KEY!,
	 );
 
	 const payload = JSON.stringify({
		title,
		body,
		url,
		badge,
	 });
 
	 await Promise.all(
		subs.map(async (data) => {
			const jsonString = typeof data.value === "string" ? data.value : JSON.stringify(data.value);
			const sub = JSON.parse(jsonString) as PushSubscription;
		
			if (!sub || !sub.endpoint) {
				console.error("Invalid push subscription:", sub);
				return;
			}
		
			const safePayload = payload ?? "{}";
			await webpush.sendNotification(sub, safePayload);
		})
	);
 
	 return { success: true };
	} catch (err) {
	 console.error(err);
	 return { success: false, message: 'Failed to send push notification' };
	}
 }