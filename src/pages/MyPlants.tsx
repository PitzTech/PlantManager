import React, { useState, useEffect } from "react"
import {
	StyleSheet,
	SafeAreaView,
	View,
	Text,
	Image,
	FlatList,
	Alert
} from "react-native"
import { formatDistance } from "date-fns"
import { pt } from "date-fns/locale"

import fonts from "../../styles/fonts"
import colors from "../../styles/colors"
import waterDropImg from "../assets/waterdrop.png"

import { Header } from "../components/Header"
import { PlantCardSecondary } from "../components/PlantCardSecondary"

import { PlantProps } from "../types/plants"
import { loadPlant } from "../libs/storage"

export function MyPlants(): JSX.Element {
	const [myPlants, setMyPlants] = useState<PlantProps[]>([])
	const [loading, setLoading] = useState(true)
	const [nextWatered, setNextWatered] = useState<string>()

	useEffect(() => {
		async function loadStoragedData(): Promise<void> {
			try {
				const plantsStoraged = await loadPlant()
				//console.log(plantsStoraged)
				const nextTime = formatDistance(
					new Date(plantsStoraged[0].dateTimeNotification).getTime(),
					new Date().getTime(),
					{ locale: pt }
				)

				setNextWatered(
					`Não esqueça de regar a ${plantsStoraged[0].name} daqui à ${nextTime}.`
				)
				setMyPlants(plantsStoraged)
				setLoading(false)
			} catch {
				Alert.alert("Não foi possível carregar a planta.")
			}
		}
		loadStoragedData()
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<Header />

			<View style={styles.spotlight}>
				<Image source={waterDropImg} style={styles.spotlightImage} />
				<Text style={styles.spotlightText}>{nextWatered}</Text>
			</View>
			<View style={styles.plants}>
				<Text style={styles.plantsTitle}>Próximas regadas</Text>

				<FlatList
					data={myPlants}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => <PlantCardSecondary data={item} />}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flex: 1 }}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 30,
		//paddingTop: 50,
		backgroundColor: colors.background
	},
	spotlight: {
		backgroundColor: colors.blue_light,
		paddingHorizontal: 20,
		borderRadius: 20,
		height: 110,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	spotlightImage: {
		width: 60,
		height: 60
	},
	spotlightText: {
		flex: 1,
		color: colors.blue,
		paddingHorizontal: 20
	},
	plants: {
		flex: 1,
		width: "100%"
	},
	plantsTitle: {
		fontSize: 24,
		fontFamily: fonts.heading,
		color: colors.heading,
		marginVertical: 20
	}
})
