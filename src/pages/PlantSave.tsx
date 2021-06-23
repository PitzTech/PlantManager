import React, { useState } from "react"
import {
	Alert,
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	Platform,
	TouchableOpacity
} from "react-native"
import { SvgFromUri } from "react-native-svg"
import { getBottomSpace } from "react-native-iphone-x-helper"

import { useRoute } from "@react-navigation/core"
import { useNavigation } from "@react-navigation/native"

import DateTimePicker, { Event } from "@react-native-community/datetimepicker"
import { isBefore, format } from "date-fns"

import fonts from "../../styles/fonts"
import colors from "../../styles/colors"
import waterDropImg from "../assets/waterdrop.png"

import { Button } from "../components/Button"
import { savePlant } from "../libs/storage"

// Types

import { PlantProps } from "../types/plants"
import { ConfirmationScreenParams } from "../types/screens"

interface Params {
	plant: PlantProps
}

export function PlantSave(): JSX.Element {
	const [selectedDateTime, setselectedDateTime] = useState(new Date())
	const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios")

	const navigation = useNavigation()
	const route = useRoute()
	const { plant } = route.params as Params

	function handleChangeTime(event: Event, dateTime: Date | undefined): void {
		if (Platform.OS === "android") setShowDatePicker(oldState => !oldState)

		// Case 1 : Choose a time in the past
		if (dateTime && isBefore(dateTime, new Date())) {
			setselectedDateTime(new Date())
			return Alert.alert("Escolha um horário futuro ⏰")
		}
		// Case 2 : Choose a time in the future
		if (dateTime) setselectedDateTime(dateTime)
	}

	function handleOpenDateTimePickerAndroid(): void {
		setShowDatePicker(oldState => !oldState)
	}

	async function handleSave(): Promise<void> {
		try {
			await savePlant({
				...plant,
				dateTimeNotification: selectedDateTime
			})
			const nextScreen: ConfirmationScreenParams = {
				title: "Tudo certo",
				subtitle:
					"Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.",
				buttonTitle: "Muito Obrigado 😁",
				icon: "hug",
				nextScreen: "MyPlants"
			}

			navigation.navigate("Confirmation", nextScreen)
		} catch {
			Alert.alert("Não foi possível salvar.")
		}
	}

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.scrollListContainer}
		>
			<View style={styles.container}>
				<View style={styles.plantInfo}>
					<SvgFromUri uri={plant.photo} height={150} width={150} />

					<Text style={styles.plantName}>{plant.name}</Text>
					<Text style={styles.plantAbout}>{plant.about}</Text>
				</View>
				<View style={styles.controller}>
					<View style={styles.waterDropContainer}>
						<Image source={waterDropImg} style={styles.waterDropImage} />
						<Text style={styles.waterDropText}>{plant.water_tips}</Text>
					</View>

					<Text style={styles.alertLabel}>
						Escolha o melhor horário para ser lembrado:
					</Text>

					{showDatePicker && (
						<DateTimePicker
							value={selectedDateTime}
							mode="time"
							display="spinner"
							onChange={handleChangeTime}
						/>
					)}

					{Platform.OS === "android" && (
						<TouchableOpacity
							style={styles.dateTimePickerButton}
							onPress={handleOpenDateTimePickerAndroid}
						>
							<Text style={styles.dateTimePickerText}>
								{`Horário: ${format(selectedDateTime, "HH:mm")}`}
							</Text>
						</TouchableOpacity>
					)}

					<Button title="Cadastrar planta" onPress={handleSave} />
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: colors.shape
	},
	scrollListContainer: {
		flexGrow: 1,
		justifyContent: "space-between",
		backgroundColor: colors.shape
	},
	plantInfo: {
		flex: 1,
		paddingHorizontal: 30,
		paddingVertical: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.shape
	},
	controller: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: getBottomSpace() || 20
	},
	plantName: {
		fontFamily: fonts.heading,
		fontSize: 24,
		color: colors.heading,
		marginTop: 15
	},
	plantAbout: {
		textAlign: "center",
		fontFamily: fonts.text,
		color: colors.heading,
		fontSize: 17,
		marginTop: 10
	},
	waterDropContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: colors.blue_light,
		padding: 20,
		borderRadius: 20,
		position: "relative",
		bottom: 60
	},
	waterDropImage: {
		width: 56,
		height: 56
	},
	waterDropText: {
		flex: 1,
		marginLeft: 20,
		fontFamily: fonts.text,
		color: colors.blue,
		fontSize: 17,
		textAlign: "justify"
	},
	alertLabel: {
		textAlign: "center",
		fontFamily: fonts.complement,
		color: colors.heading,
		fontSize: 12,
		marginBottom: 5
	},
	dateTimePickerButton: {
		width: "100%",
		alignItems: "center",
		paddingBottom: 40,
		paddingTop: 15
	},
	dateTimePickerText: {
		color: colors.heading,
		fontSize: 24,
		fontFamily: fonts.text
	}
})
