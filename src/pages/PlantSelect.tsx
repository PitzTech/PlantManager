import React, { useEffect, useState } from "react"
import { StyleSheet, SafeAreaView, Text, View, FlatList } from "react-native"

import colors from "../../styles/colors"
import fonts from "../../styles/fonts"

import { EnvironmentButton } from "../components/EnvironmentButton"
import { Header } from "../components/Header"
import { PlantCardPrimary } from "../components/PlantCardPrimary"

import api from "../services/api"

interface EnvironmentProps {
	key: string
	title: string
}
interface PlantProps {
	id: number
	name: string
	about: string
	water_tips: string
	photo: string
	environments: string[]
	frequency: {
		times: number
		repeat_every: string
	}
}

export const PlantSelect: React.FC = () => {
	const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
	const [plants, setPlants] = useState<PlantProps[]>([])
	const [filteredPlants, setFilteredPlants] = useState([])
	const [environmentSelected, setEnvironmentSelected] = useState("all")

	function handleEnvironmentSelected(environment: string): void {
		setEnvironmentSelected(environment)

		if (environment == "all") return setEnvironmentSelected(filteredPlants)
	}

	useEffect(() => {
		api.get("/plants_environments?_sort=title&_order=asc").then(response => {
			setEnvironments([
				{
					key: "all",
					title: "Todos"
				},
				...response.data
			])
		})

		api.get("/plants?_sort=name&_order=asc").then(response => {
			setPlants(response.data)
		})

		// async function fetchEnvironment(): void {
		// 	const { data } = await api.get("plants_environments")
		// 	setEnvironments(data)
		// }
		// fetchEnvironment()
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Header />

				<Text style={styles.title}>Em qual ambiente</Text>
				<Text style={styles.subtitle}>você quer colocar sua planta?</Text>
			</View>
			<View>
				<FlatList
					data={environments}
					renderItem={({ item }) => (
						<EnvironmentButton
							title={item.title}
							active={item.key === environmentSelected}
							onPress={() => handleEnvironmentSelected(item.key)}
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.environmentList}
				/>
			</View>

			<View style={styles.plants}>
				<FlatList
					data={plants}
					renderItem={({ item }) => <PlantCardPrimary data={item} />}
					showsVerticalScrollIndicator={false}
					numColumns={2}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	header: {
		paddingHorizontal: 30
	},
	title: {
		fontSize: 17,
		color: colors.heading,
		fontFamily: fonts.heading,
		lineHeight: 20,
		marginTop: 15
	},
	subtitle: {
		fontFamily: fonts.text,
		fontSize: 17,
		lineHeight: 20,
		color: colors.heading
	},
	environmentList: {
		height: 40,
		justifyContent: "center",
		paddingBottom: 5,
		marginLeft: 32,
		marginVertical: 32
	},
	plants: {
		flex: 1,
		paddingHorizontal: 32,
		justifyContent: "center"
	}
})
