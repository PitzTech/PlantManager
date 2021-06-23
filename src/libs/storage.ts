import AsyncStorage from "@react-native-async-storage/async-storage"
import { format } from "date-fns"

import { PlantProps } from "../types/plants"
import { StoragePlantProps } from "../types/storage"

export async function savePlant(plant: PlantProps): Promise<void> {
	try {
		const data = await AsyncStorage.getItem("@plantmanager:plants")
		const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}

		const newPlant = {
			[plant.id]: {
				data: plant
			}
		}

		await AsyncStorage.setItem(
			"@plantmanager:planta",
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
