import React from "react"
import { StyleSheet, TouchableOpacity, Text } from "react-native"

import colors from "../../styles/colors"

interface ButtonProps {
	title: string
}

export function Button({ title }: ButtonProps): JSX.Element {
	return (
		<TouchableOpacity style={styles.button} activeOpacity={0.7}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.green,

		justifyContent: "center",
		alignItems: "center",

		borderRadius: 16,
		marginBottom: 10,
		paddingHorizontal: 10,

		height: 56,
		width: 56
	},
	buttonText: {
		color: colors.white,
		fontSize: 24
	}
})
