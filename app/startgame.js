import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Switch,
	Share,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TotalScore from "../components/TotalScore";
import HintDialogue from "../components/HintDialogue";
import HelpHint from "../components/HelpHint";
import * as Linking from "expo-linking";

export default function StartGame() {
	const [number, setNumber] = useState(null);
	const [randomNumber, setRandomNumber] = useState(0);
	const [points, setPoints] = useState(0);
	const [totalScore, setTotalScore] = useState(0);
	const [sound, setSound] = useState();
	const [playSound, setPlaySound] = useState(true);
	const [showSettings, setShowSettings] = useState(false);

	const [attempt, setAttempt] = useState(1);
	const [showHint, setShowHint] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [showHelpHint, setShowHelpHint] = useState(false);
	const [helpHint, setHelpHint] = useState(null);
	const [helpHint2, setHelpHint2] = useState(null);
	const [helpHint3, setHelpHint3] = useState(null);
	const [hintLeft, setHintLeft] = useState(2);
	const [showStartPlaying, setShowStartPlaying] = useState(true);

	const [levelCompleted, setLevelCompleted] = useState(false);
	const [levelUp, setLevelUp] = useState(false);
	const [showLevelUp, setShowLevelUp] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [maxLimit, setMaxLimit] = useState(20);
	const [minLimit, setMinLimit] = useState(1);

	const [level, setLevel] = useState(1);
	const [matchPlayed, setMatchPlayed] = useState(0);

	const [hint, setHint] = useState("");

	if (matchPlayed == 10) {
		setLevel(level + 1);
		setMatchPlayed(0);
		setLevelUp(true);
	}
	getLevelData = async () => {
		try {
			const levelJsonData = await AsyncStorage.getItem("level");
			if (levelJsonData != null) {
				setLevel(JSON.parse(levelJsonData).level);
				setMatchPlayed(JSON.parse(levelJsonData).matchPlayed);
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

	getTotalCoins = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("totalCoins");
			setTotalScore(jsonValue != null ? JSON.parse(jsonValue) : 0);
		} catch (e) {
			console.log(e);
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
		<LinearGradient colors={["#00ADB5", "#222831"]} style={styles.background}>
			<StatusBar translucent={true} backgroundColor="#00ADB5" />
			{/* setting modal */}
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

			{/* start plying modal */}
			<Modal
				isVisible={showStartPlaying}
				animationIn="slideInDown"
				animationOut="slideOutUp"
				animationOutTiming={800}
				backdropTransitionOutTiming={900}
				onBackButtonPress={() => {
					router.replace("/");
				}}
			>
				<View
					style={{
						padding: 10,
						backgroundColor: "#EEEEEE",
						borderRadius: 40,
						borderColor: "#41A8FC",
						borderWidth: 4,
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							marginTop: -40,
						}}
					>
						<View
							style={{
								paddingLeft: 20,
								paddingRight: 20,
								margin: 10,
								backgroundColor: "#41A8FC",
								borderColor: "white",
								borderWidth: 3,
								borderRadius: 50,
							}}
						>
							<Text
								style={{
									color: "#EEEEEE",
									fontFamily: "Petit-Cochon",
									fontSize: 25,
								}}
							>
								Guess The Number
							</Text>
						</View>
						<View
							style={{
								backgroundColor: "#41A8FC",
								borderRadius: 30,
								padding: 10,
								borderColor: "white",
								borderWidth: 3,
								marginTop: 10,
							}}
						>
							<Image
								style={{ width: 100, height: 100 }}
								source={require("../assets/robotCharacter.png")}
							/>
						</View>
					</View>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							padding: 25,
							paddingTop: 10,
						}}
					>
						<Text
							style={{
								color: "gray",
								textAlign: "center",
								fontSize: 25,
								fontFamily: "Handjet",
							}}
						>
							Challenging you to find a number based on greater than or less
							than feedback.
						</Text>

						<Pressable
							style={({ pressed }) => [
								{
									padding: 10,
									borderRadius: 10,
									width: 200,
									marginTop: 20,
									backgroundColor: pressed ? "#068FFF" : "#41A8FC",
								},
							]}
							onPress={async () => {
								if (playSound) {
									const { sound } = await Audio.Sound.createAsync(
										require("../assets/sounds/startSound.mp3")
									);
									setSound(sound);
									await sound.playAsync();
								}

								setRandomNumber(
									Math.floor(Math.random() * (level * 10 - minLimit) + minLimit)
								);
								setHint(
									`I am thinking of a number between ${minLimit} to ${
										level * 10
									}, Now guess the number. `
								);
								setTimeout(() => {
									setShowHint(true);
								}, 600);
								setTimeout(() => {
									setShowInput(true);
								}, 2000);
								setShowStartPlaying(false);
							}}
						>
							<Text
								style={{
									textAlign: "center",
									color: "#EEEEEE",
									fontFamily: "Petit-Cochon",
									fontSize: 20,
								}}
							>
								Start Play
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			{/* headerholder */}
			<View style={styles.headerholder}>
				<Pressable
					onPress={async () => {
						if (playSound) {
							const { sound } = await Audio.Sound.createAsync(
								require("../assets/sounds/startSound.mp3")
							);
							setSound(sound);
							await sound.playAsync();
						}

						router.replace("/");
					}}
					style={({ pressed }) => [
						{
							width: "auto",
							backgroundColor: pressed ? "#039096" : "#00ADB5",
							padding: 10,
							borderRadius: 10,
							marginTop: 8,
						},
					]}
				>
					<Image
						style={{ width: 25, height: 25 }}
						source={require("../assets/home.png")}
					/>
				</Pressable>

				{/* TotalScore */}
				<TotalScore totalScore={totalScore} />

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 15,
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

							router.replace("/startgame");
						}}
						style={({ pressed }) => [
							{
								width: "auto",
								marginRight: 10,
								backgroundColor: pressed ? "#039096" : "#00ADB5",
								padding: 10,
								borderRadius: 10,
							},
						]}
					>
						<Image
							style={{ width: 25, height: 25 }}
							source={require("../assets/replay.png")}
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

							setShowSettings(true);
						}}
						style={({ pressed }) => [
							{
								width: "auto",
								marginLeft: 10,
								backgroundColor: pressed ? "#039096" : "#00ADB5",
								padding: 10,
								borderRadius: 10,
							},
						]}
					>
						<Image
							style={{ width: 25, height: 25 }}
							source={require("../assets/setting.png")}
						/>
					</Pressable>
				</View>
			</View>

			{/* Input box */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				{/* Hint Dialogue */}

				{showHint && <HintDialogue hint={hint} />}

				{/* help hint */}
				<Modal
					isVisible={showHelpHint}
					animationIn="wobble"
					animationOut="slideOutUp"
					animationInTiming={800}
					animationOutTiming={800}
					backdropTransitionOutTiming={900}
					onBackButtonPress={() => {
						if (hintLeft == 0) {
							setHintLeft(0);
						} else {
							setHintLeft(hintLeft - 1);
						}

						setShowHelpHint(false);
					}}
				>
					<View
						style={{
							padding: 10,
							backgroundColor: "#EEEEEE",
							borderRadius: 40,
							borderColor: "#41A8FC",
							borderWidth: 4,
							flexDirection: "column",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<View
							style={{
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								marginTop: -40,
							}}
						>
							<View
								style={{
									paddingLeft: 20,
									paddingRight: 20,
									margin: 10,
									backgroundColor: "#41A8FC",
									borderColor: "white",
									borderWidth: 3,
									borderRadius: 50,
								}}
							>
								<Text
									style={{
										color: "#EEEEEE",
										fontFamily: "Petit-Cochon",
										fontSize: 25,
									}}
								>
									Guess The Number
								</Text>
							</View>
							<View
								style={{
									backgroundColor: "#41A8FC",
									borderRadius: 30,
									padding: 10,
									borderColor: "white",
									borderWidth: 3,
									marginTop: 10,
								}}
							>
								<Image
									style={{ width: 80, height: 80 }}
									source={require("../assets/robotHintCharacter.png")}
								/>
							</View>
						</View>

						<View
							style={{
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								padding: 25,
								paddingTop: 10,
							}}
						>
							<View
								style={{
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{helpHint && <HelpHint helpHint={helpHint} index={1} />}

								{helpHint2 && <HelpHint helpHint={helpHint2} index={2} />}

								{helpHint3 && <HelpHint helpHint={helpHint3} index={3} />}
								{!hintLeft && (
									<View
										style={{
											backgroundColor: "white",
											width: "100%",
											marginBottom: 5,
											marginTop: 5,
											padding: 10,
											borderRadius: 10,
										}}
									>
										<Text
											style={{
												fontFamily: "Handjet",
												fontSize: 20,
												textAlign: "center",
											}}
										>
											You've seen all the hints. try to solve this using those
											hints.
										</Text>
									</View>
								)}
							</View>

							<Pressable
								style={({ pressed }) => [
									{
										padding: 10,
										borderRadius: 10,
										width: 150,
										marginTop: 20,
										backgroundColor: pressed ? "#068FFF" : "#41A8FC",
									},
								]}
								onPress={async () => {
									if (playSound) {
										const { sound } = await Audio.Sound.createAsync(
											require("../assets/sounds/startSound.mp3")
										);
										setSound(sound);
										await sound.playAsync();
									}
									setShowHelpHint(false);
									if (hintLeft == 0) {
										setHintLeft(0);
									} else {
										setHintLeft(hintLeft - 1);
									}
								}}
							>
								<Text
									style={{
										textAlign: "center",
										color: "#EEEEEE",
										fontFamily: "Petit-Cochon",
										fontSize: 20,
									}}
								>
									Ok Thanks
								</Text>
							</Pressable>
						</View>
					</View>
				</Modal>

				{/* input box */}

				{showInput && (
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							marginTop: 20,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "flex-start",
								marginBottom: -68,
								marginRight: -270,
								zIndex: 10,
							}}
						>
							<Pressable
								onPress={async () => {
									if (!helpHint) {
										if (randomNumber % 2 == 0) {
											setHelpHint("The number is an Even Number");
										} else {
											setHelpHint("The number is an Odd Number");
										}
									} else {
										if (randomNumber % 5 == 0) {
											setHelpHint2("The number is evenly divisable by 5");
										} else if (randomNumber % 4 == 0) {
											setHelpHint2("The number is evenly divisable by 4");
										} else if (randomNumber % 3 == 0) {
											setHelpHint2("The number is evenly divisable by 3");
										} else {
											setHelpHint2(
												"The number is not evenly divisable by 5,4,or 3"
											);
										}
									}

									if (playSound) {
										const { sound } = await Audio.Sound.createAsync(
											require("../assets/sounds/interface.mp3")
										);
										setSound(sound);
										await sound.playAsync();
									}

									if (hintLeft == 0) {
										setHintLeft(0);
									}
									setShowHelpHint(true);
								}}
								style={({ pressed }) => [
									{
										padding: 10,
										borderRadius: 10,
										backgroundColor: pressed ? "#039096" : "#00ADB5",
										borderColor: pressed ? "#F3F3F3" : "white",
										borderWidth: 3,
									},
								]}
							>
								<View>
									<Text
										style={{
											fontFamily: "Petit-Cochon",
											fontSize: 15,
											color: "#EEEEEE",
										}}
									>
										Hint
									</Text>
								</View>
							</Pressable>

							<View
								style={{
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: "#C70039",
									borderColor: "white",
									borderWidth: 2,
									borderRadius: 100,
									width: 20,
									height: 20,
									marginLeft: -18,
									marginTop: -5,
								}}
							>
								<Text
									style={{
										color: "#EEEEEE",
										fontFamily: "Handjet",
										textAlignVertical: "center",
										marginTop: -5,
									}}
								>
									{hintLeft}
								</Text>
							</View>
						</View>
						<TextInput
							style={{
								backgroundColor: "#EEEEEE",
								width: 350,
								height: 290,
								textAlign: "center",
								fontFamily: "Petit-Cochon",
								fontSize: 150,
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								borderColor: "#00ADB5",
								borderWidth: 3,
								borderRadius: 20,
								color: "#00ADB5",
							}}
							onSubmitEditing={async () => {
								if (randomNumber == number) {
									setMatchPlayed(matchPlayed + 1);

									if (attempt == 1) {
										setPoints(500);
										const jsonValue = await AsyncStorage.getItem("totalCoins");
										const totalCoins =
											jsonValue != null ? JSON.parse(jsonValue) : 0;

										const coins = JSON.stringify(totalCoins + 500);
										await AsyncStorage.setItem("totalCoins", coins);

										if (playSound) {
											const { sound } = await Audio.Sound.createAsync(
												require("../assets/sounds/win.mp3")
											);
											setSound(sound);
											await sound.playAsync();
										}

										setLevelCompleted(true);
									} else if (attempt == 2) {
										setPoints(250);
										const jsonValue = await AsyncStorage.getItem("totalCoins");
										const totalCoins =
											jsonValue != null ? JSON.parse(jsonValue) : 0;

										const coins = JSON.stringify(totalCoins + 250);
										await AsyncStorage.setItem("totalCoins", coins);

										if (playSound) {
											const { sound } = await Audio.Sound.createAsync(
												require("../assets/sounds/win.mp3")
											);
											setSound(sound);
											await sound.playAsync();
										}

										setLevelCompleted(true);
									} else if (attempt == 3) {
										setPoints(125);
										const jsonValue = await AsyncStorage.getItem("totalCoins");
										const totalCoins =
											jsonValue != null ? JSON.parse(jsonValue) : 0;

										const coins = JSON.stringify(totalCoins + 125);
										await AsyncStorage.setItem("totalCoins", coins);

										if (playSound) {
											const { sound } = await Audio.Sound.createAsync(
												require("../assets/sounds/win.mp3")
											);
											setSound(sound);
											await sound.playAsync();
										}

										setLevelCompleted(true);
									}
								} else if (attempt == 3) {
									if (playSound) {
										const { sound } = await Audio.Sound.createAsync(
											require("../assets/sounds/gameOver.mp3")
										);
										setSound(sound);
										await sound.playAsync();
									}
									setGameOver(true);
								} else if (randomNumber < number) {
									if (playSound) {
										const { sound } = await Audio.Sound.createAsync(
											require("../assets/sounds/wrongAnswer.mp3")
										);
										setSound(sound);
										await sound.playAsync();
									}

									setAttempt(attempt + 1);
									setNumber(null);
									setHint("The Number is Lower than you'r guess.");
								} else if (randomNumber > number) {
									if (playSound) {
										const { sound } = await Audio.Sound.createAsync(
											require("../assets/sounds/wrongAnswer.mp3")
										);
										setSound(sound);
										await sound.playAsync();
									}

									setNumber(null);
									setAttempt(attempt + 1);
									setHint("The Number is Higher than you'r guess.");
								}
							}}
							onChangeText={(num) => {
								setNumber(num);
							}}
							value={number}
							placeholder="?"
							placeholderTextColor="#00ADB5"
							keyboardType="number-pad"
							enterKeyHint="enter"
							maxLength={3}
							caretHidden={true}
							contextMenuHidden={true}
						/>
					</View>
				)}
			</KeyboardAvoidingView>

			{/* Level completed */}
			<Modal
				animationIn="slideInDown"
				animationOut="slideOutUp"
				animationOutTiming={800}
				backdropTransitionOutTiming={900}
				isVisible={levelCompleted}
				onBackButtonPress={async () => {
					if (playSound) {
						const { sound } = await Audio.Sound.createAsync(
							require("../assets/sounds/startSound.mp3")
						);
						setSound(sound);
						await sound.playAsync();
					}

					const levelJsonData = JSON.stringify({ level, matchPlayed });
					await AsyncStorage.setItem("level", levelJsonData);

					setNumber(null);
					setAttempt(1);
					setRandomNumber(
						Math.floor(Math.random() * (level * 10 - minLimit) + minLimit)
					);
					setHint(
						`I'm thinking of a new number between ${minLimit} to ${
							level * 10
						}. Now guess it again. `
					);
					setLevelCompleted(false);
					setHelpHint(null);
					setHelpHint2(null);
					setHelpHint3(null);
					setHintLeft(2);
					const jsonValue = await AsyncStorage.getItem("totalCoins");
					const totalCoins = jsonValue != null ? JSON.parse(jsonValue) : 0;

					setTotalScore(totalCoins);

					if (levelUp) {
						setTimeout(() => {
							setShowLevelUp(true);
						}, 100);
					}
				}}
			>
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#EEEEEE",
						width: "auto",
						margin: 20,
						borderRadius: 30,
					}}
				>
					<View style={{ marginTop: -100 }}>
						<Image
							style={{ width: 300, height: 151.2 }}
							source={require("../assets/completed.png")}
						/>
					</View>

					<View>
						<Text
							style={{
								color: "#8e0507",
								fontWeight: "bold",
								fontSize: 15,
								marginBottom: 5,
								marginTop: 10,
							}}
						>
							Attempt
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#e61c23",
							borderRadius: 50,
							borderColor: "#8e0507",
							borderWidth: 3,
							width: "auto",
							padding: 2,
						}}
					>
						<Image
							style={{ width: 30, height: 30, marginRight: 2.5 }}
							source={require("../assets/attempt.png")}
						/>
						<Text
							style={{
								color: "#EEEEEE",
								fontFamily: "Petit-Cochon",
								fontSize: 20,
								textAlign: "center",
								paddingBottom: 0,
								textShadowColor: "#bc6a11",
								textShadowOffset: {
									width: 1,
									height: 1,
								},
								textShadowRadius: 3,
								marginLeft: 2.5,
								marginRight: 15,
							}}
						>
							{attempt}
						</Text>
					</View>

					<Image
						style={{ width: 100, height: 40 }}
						source={require("../assets/line.png")}
					/>

					<View>
						<Text
							style={{
								color: "#f9b100",
								fontWeight: "bold",
								fontSize: 15,

								marginBottom: 5,
							}}
						>
							SCORE
						</Text>
					</View>
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
							{points}
						</Text>
					</View>

					<View
						style={{
							margin: 20,
							marginBottom: 30,
						}}
					>
						<Pressable
							style={({ pressed }) => [
								{
									padding: 10,
									borderRadius: 10,
									width: 200,
									marginTop: 20,
									backgroundColor: pressed ? "#379237" : "#54B435",
								},
							]}
							onPress={async () => {
								if (playSound) {
									const { sound } = await Audio.Sound.createAsync(
										require("../assets/sounds/startSound.mp3")
									);
									setSound(sound);
									await sound.playAsync();
								}

								const levelJsonData = JSON.stringify({ level, matchPlayed });
								await AsyncStorage.setItem("level", levelJsonData);

								setNumber(null);
								setAttempt(1);
								setRandomNumber(
									Math.floor(Math.random() * (level * 10 - minLimit) + minLimit)
								);
								setHint(
									`I'm thinking of a new number between ${minLimit} to ${
										level * 10
									}. Now guess it again. `
								);
								setLevelCompleted(false);
								setHelpHint(null);
								setHelpHint2(null);
								setHelpHint3(null);
								setHintLeft(2);
								const jsonValue = await AsyncStorage.getItem("totalCoins");
								const totalCoins =
									jsonValue != null ? JSON.parse(jsonValue) : 0;

								setTotalScore(totalCoins);

								if (levelUp) {
									setTimeout(() => {
										setShowLevelUp(true);
									}, 1000);
								}
							}}
						>
							<Text
								style={{
									textAlign: "center",
									color: "#EEEEEE",
									fontFamily: "Petit-Cochon",
									fontSize: 20,
								}}
							>
								Play again
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			{/* gameOver */}
			<Modal
				animationIn="shake"
				animationOut="slideOutUp"
				isVisible={gameOver}
				onBackButtonPress={() => {
					router.replace("/");
				}}
			>
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#EEEEEE",
						width: "auto",
						margin: 20,
						borderRadius: 20,
					}}
				>
					<View style={{ padding: 20, marginTop: 15 }}>
						<Image
							style={{ width: 250, height: 53 }}
							source={require("../assets/gameOver.png")}
						/>
					</View>

					<View style={{ padding: 40, paddingTop: 0, paddingBottom: 0 }}>
						<Text
							style={{
								fontFamily: "Handjet",
								fontSize: 20,
								textAlign: "center",
								color: "gray",
							}}
						>
							You need to find out the correct number in 3 attempt. Don't give
							up and try again.
						</Text>
					</View>
					<View
						style={{
							margin: 20,
							marginTop: 0,
							marginBottom: 30,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Pressable
							style={({ pressed }) => [
								{
									padding: 10,
									borderRadius: 10,
									marginTop: 20,
									marginRight: 5,
									width: 100,
									backgroundColor: pressed ? "#900C3F" : "#C70039",
								},
							]}
							onPress={async () => {
								if (playSound) {
									const { sound } = await Audio.Sound.createAsync(
										require("../assets/sounds/startSound.mp3")
									);
									setSound(sound);
									await sound.playAsync();
								}
								router.replace("/");
							}}
						>
							<Text
								style={{
									textAlign: "center",
									color: "#EEEEEE",
									fontFamily: "Petit-Cochon",
									fontSize: 20,
								}}
							>
								Home
							</Text>
						</Pressable>
						<Pressable
							style={({ pressed }) => [
								{
									padding: 10,
									borderRadius: 10,
									width: 100,
									marginTop: 20,
									marginLeft: 5,
									backgroundColor: pressed ? "#379237" : "#54B435",
								},
							]}
							onPress={async () => {
								if (playSound) {
									const { sound } = await Audio.Sound.createAsync(
										require("../assets/sounds/startSound.mp3")
									);
									setSound(sound);
									await sound.playAsync();
								}

								setNumber(null);
								setAttempt(1);
								setRandomNumber(
									Math.floor(Math.random() * (level * 10 - minLimit) + minLimit)
								);
								setHint(
									`I'm thinking of a new number between ${minLimit} to ${
										level * 10
									} Now guess it again. `
								);
								setGameOver(false);
								setHelpHint(null);
								setHelpHint2(null);
								setHelpHint3(null);
								setHintLeft(2);
							}}
						>
							<Text
								style={{
									textAlign: "center",
									color: "#EEEEEE",
									fontFamily: "Petit-Cochon",
									fontSize: 20,
								}}
							>
								Play again
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			{/* Level up */}
			<Modal
				animationIn="slideInDown"
				animationOut="slideOutUp"
				animationOutTiming={800}
				backdropTransitionOutTiming={900}
				onShow={async () => {
					if (playSound) {
						const { sound } = await Audio.Sound.createAsync(
							require("../assets/sounds/levelUp.mp3")
						);
						setSound(sound);
						await sound.playAsync();
					}
				}}
				isVisible={showLevelUp}
				onBackButtonPress={async () => {
					setLevelUp(false);
					setShowLevelUp(false);
				}}
			>
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#EEEEEE",
						width: "auto",
						margin: 15,
						borderRadius: 30,
					}}
				>
					<View style={{ marginTop: 15 }}>
						<Image
							style={{ width: 150, height: 150 }}
							source={require("../assets/levelup.png")}
						/>
					</View>

					<Text
						style={{
							fontFamily: "Handjet",
							fontSize: 40,
							color: "#b60720",
						}}
					>
						Level up to {level}
					</Text>

					<Text
						style={{
							fontFamily: "Handjet",
							fontSize: 20,
							color: "gray",
							textAlign: "center",
							width: "80%",
						}}
					>
						In this level you've to guess the number between {minLimit} to{" "}
						{level * 10}.
					</Text>

					<View
						style={{
							margin: 20,
							marginBottom: 30,
						}}
					>
						<Pressable
							style={({ pressed }) => [
								{
									padding: 10,
									borderRadius: 10,
									width: 200,
									marginTop: 20,
									backgroundColor: pressed ? "#379237" : "#54B435",
								},
							]}
							onPress={async () => {
								if (playSound) {
									const { sound } = await Audio.Sound.createAsync(
										require("../assets/sounds/startSound.mp3")
									);
									setSound(sound);
									await sound.playAsync();
								}

								setLevelUp(false);
								setShowLevelUp(false);
							}}
						>
							<Text
								style={{
									textAlign: "center",
									color: "#EEEEEE",
									fontFamily: "Petit-Cochon",
									fontSize: 20,
								}}
							>
								wohoo
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: "100%",
	},
	headerholder: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignContent: "center",
		paddingHorizontal: 30,
		marginTop: 15,
	},
});
