import React from "react"
import {
	SafeAreaView,
	Text,
	Image,
	StyleSheet,
	Platform,
	StatusBar,
	TouchableOpacity,
	Dimensions
} from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Feather } from "@expo/vector-icons"

import wateringImg from "../assets/watering.png"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"

export const Welcome: React.FC = () => {
	const navigation = useNavigation()

	function handleStart(): void {
		navigation.navigate("UserIdentification")
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>
				Gerencie{"\n"}
				suas plantas de{"\n"}
				forma fácil
			</Text>

			<Image
				source={wateringImg}
				style={styles.image}
				resizeMode="contain"
			/>

			<Text style={styles.subtitle}>
				Não esqueça mais de regar suas plantas. {"\n"}
				Nós cuidamos de lembrar você sempre que precisar.
			</Text>

			<TouchableOpacity
				style={styles.button}
				activeOpacity={0.7}
				onPress={handleStart}
			>
				<Feather name="chevron-right" style={styles.buttonIcon} />
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",

		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		paddingHorizontal: 20
	},
	title: {
		fontSize: 28,
		lineHeight: 34,
		marginTop: 38,

		textAlign: "center",
		color: colors.heading,
		fontFamily: fonts.heading
	},
	subtitle: {
		textAlign: "center",
		fontSize: 18,
		paddingHorizontal: 20,
		color: colors.heading,
		fontFamily: fonts.text
	},
	image: {
		height: Dimensions.get("window").width * 0.7
	},
	button: {
		backgroundColor: colors.green,

		justifyContent: "center",
		alignItems: "center",

		borderRadius: 16,
		marginBottom: 10,

		height: 56,
		width: 56
	},
	buttonIcon: {
		fontSize: 32,
		color: colors.white
	}
})
