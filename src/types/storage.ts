import { PlantProps } from "./plants"

export interface StoragePlantProps {
	[id: string]: {
		data: PlantProps
		notificationId: string
	}
}
