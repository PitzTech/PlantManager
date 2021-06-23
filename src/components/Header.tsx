import React, { useEffect, useState } from "react"
import {
	StyleSheet,
	Text,
	Image,
	View,
	Platform,
	StatusBar
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import userImg from "../assets/user.png"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"

export function Header(): JSX.Element {
	const [userName, setUserName] = useState("Verde")

	useEffect(() => {
		async function loadStorageUserName(): Promise<void> {
			const user = await AsyncStorage.getItem("@plantmanager:user")
			setUserName(oldValue => user || oldValue)
		}
		loadStorageUserName()
	}, [])

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>Olá,</Text>
				<Text style={styles.userName}>{userName}</Text>
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
