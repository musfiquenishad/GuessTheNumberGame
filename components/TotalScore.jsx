import { View, Text, Image } from "react-native";

export default function TotalScore(props) {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				marginTop: 15,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#F5BB0F",
					borderRadius: 50,
					borderColor: "#E7B10A",
					borderWidth: 3,
					width: "auto",
					padding: 2,
				}}
			>
				<Image
					style={{ width: 30, height: 30, marginRight: 2.5 }}
					source={require("../assets/coin2.png")}
				/>
				<Text
					style={{
						color: "#EEEEEE",
						fontFamily: "Petit-Cochon",
						fontSize: 20,
						textAlign: "center",
						paddingBottom: 0,
						textShadowColor: "#F5BB0F",
						textShadowOffset: {
							width: 1,
							height: 1,
						},
						textShadowRadius: 4,
						marginLeft: 2.5,
						marginRight: 10,
					}}
				>
					{props.totalScore}
				</Text>
			</View>
		</View>
	);
}
