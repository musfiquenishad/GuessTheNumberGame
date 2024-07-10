import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
	Switch,
	Alert,
	Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";

import { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Level from "../components/Level";
import TotalScore from "../components/TotalScore";
import * as Linking from "expo-linking";

export default function App() {
	const [showSettings, setShowSettings] = useState(false);
	const [playSound, setPlaySound] = useState(true);
	const [totalScore, setTotalScore] = useState(0);
	const [level, setLevel] = useState(1);
	const [matchPlayed, setMatchPlayed] = useState(0);

	const [sound, setSound] = useState();

	getTotalCoins = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("totalCoins");
			setTotalScore(jsonValue != null ? JSON.parse(jsonValue) : 0);
		} catch (e) {
			console.log("Error getting TotalScore: ", e);
		}
	};

	getLevelData = async () => {
		try {
			const levelJsonData = await AsyncStorage.getItem("level");
			if (levelJsonData != null) {
				setLevel(JSON.parse(levelJsonData).level);
				setMatchPlayed(JSON.parse(levelJsonData).matchPlayed);
			} else {
				const storeLevelData = JSON.stringify({ level: 1, matchPlayed: 0 });
				await AsyncStorage.setItem("level", storeLevelData);
			}
		} catch (e) {
			console.log("Error getting level: ", e);
		}
	};

	getSettings = async () => {
		try {
			const settingsJson = await AsyncStorage.getItem("settings");
			if (settingsJson != null) {
				setPlaySound(JSON.parse(settingsJson).playSoundEffect);
			} else {
				const settings = JSON.stringify({ playSoundEffect: true });
				await AsyncStorage.setItem("settings", settings);
			}
		} catch (e) {
			console.log("Error getting settings: ", e);
		}
	};

	useEffect(() => {
		getLevelData();
		getTotalCoins();
		getSettings();
	}, []);

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	return (
		<View style={styles.container}>
			<StatusBar translucent={true} backgroundColor="#00ADB5" />
			<Modal
				animationIn="slideInDown"
				animationOut="slideOutUp"
				animationOutTiming={800}
				isVisible={showSettings}
				onBackButtonPress={() => {
					setShowSettings(false);
				}}
				onBackdropPress={() => {
					setShowSettings(false);
				}}
			>
				<View
					style={{
						backgroundColor: "#EEEEEE",
						borderRadius: 10,
						padding: 20,
						margin: 25,
					}}
				>
					{/* Header */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "flex-start",
							marginBottom: 20,
							marginLeft: 10,
						}}
					>
						<Text
							style={{
								fontFamily: "Petit-Cochon",
								fontSize: 30,
								color: "#039096",
							}}
						>
							Settings
						</Text>
						<Pressable
							accessible={true}
							accessibilityLabel="Close Settings"
							accessibilityHint="Closes the settings"
							onPress={async () => {
								if (playSound) {
									const { sound } = await Audio.Sound.createAsync(
										require("../assets/sounds/startSound.mp3")
									);
									setSound(sound);
									await sound.playAsync();
								}

								setShowSettings(false);
							}}
						>
							<View>
								<Image
									style={{ width: 30, height: 30 }}
									source={require("../assets/close.png")}
								/>
							</View>
						</Pressable>
					</View>

					{/* body */}
					<View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginLeft: 15,
								marginRight: 10,
								marginBottom: 10,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-start",
								}}
							>
								<Image
									style={{ width: 20, height: 20 }}
									source={require("../assets/soundDark.png")}
								/>
								<Text
									style={{
										fontFamily: "Petit-Cochon",
										fontSize: 20,
										marginLeft: 15,
										color: "#039096",
									}}
								>
									Sound
								</Text>
							</View>
							<View>
								<Switch
									trackColor={{ false: "#767577", true: "#039096" }}
									thumbColor={playSound ? "#00ADB5" : "#f4f3f4"}
									ios_backgroundColor="#3e3e3e"
									onValueChange={async () => {
										setPlaySound((previousState) => !previousState);

										const settings = JSON.stringify({
											playSoundEffect: !playSound,
										});
										await AsyncStorage.setItem("settings", settings);
									}}
									value={playSound}
								/>
							</View>
						</View>

						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								marginBottom: 10,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-start",
								}}
							>
								<Image
									style={{ width: 20, height: 20 }}
									source={require("../assets/share.png")}
								/>
								<Text
									style={{
										fontFamily: "Petit-Cochon",
										fontSize: 20,
										marginLeft: 15,
										color: "#039096",
									}}
								>
									Share
								</Text>
							</View>
							<View>
								<Pressable
									onPress={async () => {
										if (playSound) {
											const { sound } = await Audio.Sound.createAsync(
												require("../assets/sounds/startSound.mp3")
											);
											setSound(sound);
											await sound.playAsync();
										}

										const shareThisGame =
											"https://play.google.com/store/apps/details?id=com.musfiquenishad.GuessTheNumber";
										Share.share({
											message:
												"Guess The Number: Download and play simple number guessing game." +
												"\n" +
												shareThisGame,
										});
									}}
								>
									<Image
										style={{ width: 20, height: 20 }}
										source={require("../assets/link.png")}
									/>
								</Pressable>
							</View>
						</View>

						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								marginBottom: 10,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-start",
								}}
							>
								<Image
									style={{ width: 20, height: 20 }}
									source={require("../assets/star.png")}
								/>
								<Text
									style={{
										fontFamily: "Petit-Cochon",
										fontSize: 20,
										marginLeft: 15,
										color: "#039096",
									}}
								>
									Rate Us
								</Text>
							</View>
							<View>
								<Pressable
									onPress={async () => {
										if (playSound) {
											const { sound } = await Audio.Sound.createAsync(
												require("../assets/sounds/startSound.mp3")
											);
											setSound(sound);
											await sound.playAsync();
										}

										Linking.openURL(
											"https://play.google.com/store/apps/details?id=com.musfiquenishad.GuessTheNumber"
										);
									}}
								>
									<Image
										style={{ width: 20, height: 20 }}
										source={require("../assets/link.png")}
									/>
								</Pressable>
							</View>
						</View>
					</View>
					{/* footer */}
				</View>
			</Modal>

			<LinearGradient colors={["#00ADB5", "#222831"]} style={styles.background}>
				{/* Header  */}

				<View style={styles.headerholder}>
					{/* Level component */}
					<Level level={level} progess={matchPlayed / 10} />

					{/* Totalscore Component */}
					<TotalScore totalScore={totalScore} />
				</View>
				<View style={styles.titleHolder}>
					<Image
						style={{ width: 300, height: 300 }}
						source={require("../assets/GuessTheNumber.png")}
					/>
				</View>

				<View>
					<View style={{ alignContent: "center", alignItems: "center" }}>
						<Pressable
							onPress={async () => {
								if (playSound) {
									const { sound } = await Audio.Sound.createAsync(
										require("../assets/sounds/startSound.mp3")
									);
									setSound(sound);
									await sound.playAsync();
								}

								router.replace("/startgame");
							}}
							style={({ pressed }) => [
								{
									backgroundColor: pressed ? "#039096" : "#00ADB5",
									borderRadius: 10,
									width: "auto",
									padding: 12,
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									paddingHorizontal: 70,
								},
							]}
						>
							<Text
								style={{
									color: "#EEEEEE",
									fontFamily: "Petit-Cochon",
									fontSize: 30,
									marginRight: 10,
									marginBottom: 4,
								}}
							>
								Play
							</Text>
							<Image
								style={{ width: 20, height: 20, marginTop: 4 }}
								source={require("../assets/play.png")}
							/>
						</Pressable>
					</View>
				</View>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 30,
					}}
				>
					<Pressable
						onPress={async () => {
							if (playSound) {
								const { sound } = await Audio.Sound.createAsync(
									require("../assets/sounds/startSound.mp3")
								);
								setSound(sound);
								await sound.playAsync();
							}

							setShowSettings(true);
						}}
						style={({ pressed }) => [
							{
								width: "auto",
								marginRight: 30,
							},
						]}
					>
						<Image
							style={{ width: 30, height: 30, marginTop: 4 }}
							source={require("../assets/setting.png")}
						/>
					</Pressable>
					<Pressable
						onPress={async () => {
							if (playSound) {
								const { sound } = await Audio.Sound.createAsync(
									require("../assets/sounds/startSound.mp3")
								);
								setSound(sound);
								await sound.playAsync();
							}

							Alert.alert(
								"Rate us on Playstore",
								"If you are enjoying this game then please rate us in Google Playstore.",
								[
									{
										text: "Rate us",
										onPress: () =>
											Linking.openURL(
												"https://play.google.com/store/apps/details?id=com.musfiquenishad.GuessTheNumber"
											),
									},
									{
										text: "Cancel",
										onPress: () => console.log("Cancel Pressed"),
										style: "cancel",
									},
								]
							);
						}}
						style={({ pressed }) => [
							{
								width: "auto",
								marginRight: 30,
							},
						]}
					>
						<Image
							style={{ width: 30, height: 30, marginTop: 4 }}
							source={require("../assets/reviewus.png")}
						/>
					</Pressable>
					<Pressable
						onPress={async () => {
							if (playSound) {
								const { sound } = await Audio.Sound.createAsync(
									require("../assets/sounds/startSound.mp3")
								);
								setSound(sound);
								await sound.playAsync();
							}
							const shareThisGame =
								"https://play.google.com/store/apps/details?id=com.musfiquenishad.GuessTheNumber";
							Share.share({
								message:
									"Guess The Number: Download and play simple number guessing game." +
									"\n" +
									shareThisGame,
							});
						}}
						style={({ pressed }) => [
							{
								width: "auto",
							},
						]}
					>
						<Image
							style={{ width: 30, height: 30, marginTop: 4 }}
							source={require("../assets/shareLight.png")}
						/>
					</Pressable>
				</View>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginTop: 0 },
	background: {
		width: "100%",
		height: "100%",
	},
	headerholder: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 30,
		marginTop: 15,
	},

	titleHolder: {
		marginTop: "28%",
		marginBottom: "18%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
});
