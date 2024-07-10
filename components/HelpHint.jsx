import { View, Text } from "react-native";

export default function HelpHint(props) {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				height: 80,
				marginBottom: 5,
				marginTop: 5,
			}}
		>
			<Text
				style={{
					backgroundColor: "white",
					height: "100%",
					textAlignVertical: "center",
					textAlign: "center",
					width: "20%",
					borderRadius: 10,
					borderTopRightRadius: 5,
					borderBottomRightRadius: 5,
					padding: 10,
					marginRight: 0.5,
					fontFamily: "Handjet",
					fontSize: 30,
					color: "#41A8FC",
				}}
			>
				{props.index}
			</Text>
			<Text
				style={{
					backgroundColor: "white",
					height: "100%",
					textAlignVertical: "center",
					width: "80%",
					textAlign: "left",
					borderRadius: 10,
					borderTopLeftRadius: 5,
					borderBottomLeftRadius: 5,
					padding: 10,
					fontFamily: "Handjet",
					fontSize: 20,
				}}
			>
				{props.helpHint}
			</Text>
		</View>
	);
}
