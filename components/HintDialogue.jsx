import { View, Text, Image } from "react-native";

export default function HintDialogue(props) {
	return (
		<View style={{ margin: 20, marginTop: 40 }}>
			<View
				style={{
					backgroundColor: "#00ADB5",
					borderRadius: 10,
					padding: 10,
					paddingLeft: 5,
					flexDirection: "row",
					justifyContent: "flex-start",
				}}
			>
				<View style={{ marginTop: -30 }}>
					<Image
						style={{
							width: 80,
							height: 80,
						}}
						source={require("../assets/robotCharacter.png")}
					/>
				</View>

				<View style={{ width: "75%", marginLeft: 5, marginTop: -5 }}>
					<Text
						style={{
							fontFamily: "Handjet",
							color: "#EEEEEE",
							fontSize: 25,
							textAlign: "left",
						}}
					>
						{props.hint}
					</Text>
				</View>
			</View>
		</View>
	);
}
