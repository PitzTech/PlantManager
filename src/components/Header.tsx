import React from "react"
import {
	StyleSheet,
	Text,
	Image,
	View,
	Platform,
	StatusBar
} from "react-native"

import userImg from "../assets/user.png"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"

export function Header(): JSX.Element {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>Olá,</Text>
				<Text style={styles.userName}>Rodrigo</Text>
			</View>
			<Image source={userImg} style={styles.image} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		paddingVertical: 20,
		width: "100%",

		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	image: {
		width: 75,
		height: 75,
		borderRadius: 40
	},
	greeting: {
		fontSize: 32,
		color: colors.heading,
		fontFamily: fonts.text
	},
	userName: {
		fontSize: 32,
		color: colors.heading,
		fontFamily: fonts.heading,
		lineHeight: 40
	}
})
