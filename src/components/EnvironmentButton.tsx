import React from "react"
import { StyleSheet, Text } from "react-native"
import { RectButton, RectButtonProps } from "react-native-gesture-handler"

import colors from "../../styles/colors"
import fonts from "../../styles/fonts"

interface EnvironmentButtonProps extends RectButtonProps {
	title: string
	active?: boolean
}

export function EnvironmentButton({
	title,
	active = false,
	...props
}: EnvironmentButtonProps): JSX.Element {
	return (
		<RectButton
			style={[styles.container, active && styles.containerActive]}
			{...props}
		>
			<Text style={[styles.texto, active && styles.textoActive]}>
				{title}
			</Text>
		</RectButton>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.shape,
		width: 76,
		height: 40,
		borderRadius: 12,
		marginHorizontal: 5,

		justifyContent: "center",
		alignItems: "center"
	},
	containerActive: {
		backgroundColor: colors.green_light
	},
	texto: {
		color: colors.heading,
		fontFamily: fonts.text
	},
	textoActive: {
		fontFamily: fonts.heading,
		color: colors.green_dark
	}
})
