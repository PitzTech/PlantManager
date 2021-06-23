import React, { useEffect } from "react"
import AppLoading from "expo-app-loading"
import * as Notifications from "expo-notifications"

import {
	useFonts,
	Jost_400Regular,
	Jost_600SemiBold
} from "@expo-google-fonts/jost"

import Routes from "./src/routes"

import { PlantProps } from "./src/types/plants"

const App: React.FC = () => {
	const [fontsLoaded] = useFonts({
		Jost_400Regular,
		Jost_600SemiBold
	})

	useEffect(() => {
		const subscription = Notifications.addNotificationReceivedListener(
			async notification => {
				const data = notification.request.content.data.plant as PlantProps
				console.log(data)
			}
		)
		return () => subscription.remove()
		// async function notifications(): Promise<void> {
		// 	const data = await Notifications.getAllScheduledNotificationsAsync()
		// 	console.log("==========NOTIFICAÇÔES AGENDADAS==========")
		// 	console.log(data)

		// 	// await Notifications.cancelAllScheduledNotificationsAsync()
		// }
		// notifications()
	}, [])

	if (!fontsLoaded) return <AppLoading />

	return <Routes />
}

export default App
