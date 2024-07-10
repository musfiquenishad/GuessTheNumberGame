import * as Progress from "react-native-progress";
import { View, Text, Image } from "react-native";

export default function Level(props) {
	return (
		<View>
			<View
				style={{
					marginTop: 15,
					flexDirection: "row",
					alignItems: "flex-end",
				}}
			>
				<View
					style={{
						backgroundColor: "#F5BB0F",
						borderColor: "#E7B10A",
						borderWidth: 2,
						padding: 4,
						borderRadius: 8,
						marginRight: 8,
					}}
				>
					<Image
						style={{ width: 30, height: 30 }}
						source={require("../assets/mediumLevel.png")}
					/>
				</View>

				<View style={{ marginBottom: 3 }}>
					<View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
						<Text
							style={{
								color: "#EEEEEE",
								fontFamily: "Petit-Cochon",
								fontSize: 15,
								marginLeft: 4,
							}}
						>
							Level {props.level}
						</Text>
					</View>
					<View>
						<Progress.Bar
							progress={props.progess}
							width={80}
							height={10}
							borderRadius={4}
							color="#F5BB0F"
							unfilledColor="#222831"
							borderColor="#222831"
						/>
					</View>
				</View>
			</View>
		</View>
	);
}
