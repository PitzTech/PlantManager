import React from "react"
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	TouchableOpacityProps
} from "react-native"

import colors from "../../styles/colors"
import fonts from "../../styles/fonts"

interface ButtonProps extends TouchableOpacityProps {
	title: string
}

export function Button({ title, ...props }: ButtonProps): JSX.Element {
	return (
		<TouchableOpacity style={styles.container} {...props}>
			<Text style={styles.texto}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.green,
		justifyContent: "center",
		alignItems: "center",

		height: 56,
		borderRadius: 16
	},
	texto: {
		fontSize: 16,
		color: colors.white,
		fontFamily: fonts.heading
	}
})
