import AsyncStorage from "@react-native-async-storage/async-storage"
import { format } from "date-fns"
import * as Notifications from "expo-notifications"

import { PlantProps } from "../types/plants"
import { StoragePlantProps } from "../types/storage"

export async function savePlant(plant: PlantProps): Promise<void> {
	try {
		const nextTime = new Date(plant.dateTimeNotification)
		const now = new Date()

		const { times, repeat_every } = plant.frequency

		let interval: number
		if (repeat_every === "week") interval = Math.trunc(7 / times)
		else interval = 1

		nextTime.setDate(now.getDate() + interval)

		const seconds = Math.abs(
			Math.ceil(now.getTime() - nextTime.getTime()) / 1000
		)

		const notificationId = await Notifications.scheduleNotificationAsync({
			content: {
				title: "Heeey, 🌱",
				body: `Está na hora de cuidar da sua ${plant.name}`,
				sound: true,
				priority: Notifications.AndroidNotificationPriority.HIGH,
				data: {
					plant
				}
			},
			trigger: {
				seconds: seconds < 60 ? 60 : seconds,
				repeats: true
			}
		})

		const data = await AsyncStorage.getItem("@plantmanager:plants")
		const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}

		const newPlant = {
			[plant.id]: {
				data: plant,
				notificationId
			}
		}

		console.log(newPlant)
		await AsyncStorage.setItem(
			"@plantmanager:plants",
			JSON.stringify({ ...newPlant, ...oldPlants })
		)
	} catch (err) {
		throw new Error(err)
	}
}

export async function loadPlant(): Promise<PlantProps[]> {
	try {
		const data = await AsyncStorage.getItem("@plantmanager:plants")
		const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

		//prettier-ignore
		/* eslint-disable */
		const plantsSorted = Object.keys(plants)
											.map(plant => {
												return {
													...plants[plant].data,
													hour: format(
														new Date(plants[plant].data.dateTimeNotification),
														"HH:mm"
													)
												}
											})
											.sort((a, b) =>
												Math.floor(
													new Date(a.dateTimeNotification).getTime() / 1000 -
													Math.floor(new Date(b.dateTimeNotification).getTime()) / 1000
												)
											)
		/* eslint-enable */
		return plantsSorted
	} catch (err) {
		throw new Error(err)
	}
}

export async function removePlant(id: number): Promise<void> {
	const data = await AsyncStorage.getItem("@plantmanager:plants")
	const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

	await Notifications.cancelScheduledNotificationAsync(
		plants[id].notificationId
	)

	delete plants[id]

	await AsyncStorage.setItem("@plantmanager:plants", JSON.stringify(plants))
}
