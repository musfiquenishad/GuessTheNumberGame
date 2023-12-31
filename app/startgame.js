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
  Alert,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import { StatusBar } from "expo-status-bar";

export default function StartGame() {
  const [number, setNumber] = useState(null);
  const [randomNumber, setRandomNumber] = useState(0);

  const [hint, setHint] = useState(
    "I am thinking of a number between 1 to 10, Now guess the number. "
  );
  const [showSettings, setShowSettings] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("easy");
  const [items, setItems] = useState([
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ]);
  const [attempt, setAttempt] = useState(1);

  const [showHelpHint, setShowHelpHint] = useState(false);
  const [helpHint, setHelpHint] = useState("");

  const [showStartPlaying, setShowStartPlaying] = useState(false);

  const [levelCompleted, setLevelCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * (11 - 1) + 1));
    setShowStartPlaying(true);
  }, []);

  return (
    <LinearGradient colors={["#00ADB5", "#222831"]} style={styles.background}>
      <StatusBar translucent={true} backgroundColor="#00ADB5" />

      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        animationOutTiming={800}
        backdropTransitionOutTiming={900}
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
                fontFamily: "petit-cochon",
                fontSize: 30,
                color: "#039096",
              }}
            >
              Settings
            </Text>
            <Pressable
              onPress={async () => {
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/sounds/startSound.mp3")
                );

                sound.playAsync();
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
                marginRight: 15,
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
                  source={require("../assets/musicDark.png")}
                />
                <Text
                  style={{
                    fontFamily: "petit-cochon",
                    fontSize: 20,
                    marginLeft: 15,
                    color: "#039096",
                  }}
                >
                  Music
                </Text>
              </View>
              <View>
                <Switch
                  trackColor={{ false: "#767577", true: "#039096" }}
                  thumbColor={isEnabled ? "#00ADB5" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
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
                    fontFamily: "petit-cochon",
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
                  thumbColor={isEnabled ? "#00ADB5" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
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
                  source={require("../assets/mode.png")}
                />
                <Text
                  style={{
                    fontFamily: "petit-cochon",
                    fontSize: 20,
                    marginLeft: 15,
                    color: "#039096",
                  }}
                >
                  Mode
                </Text>
              </View>
              <View>
                <DropDownPicker
                  style={{
                    width: 90,
                    borderColor: "#EEEEEE",
                  }}
                  textStyle={{
                    color: "#039096",
                    fontFamily: "petit-cochon",
                    textAlign: "center",
                  }}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
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
                    fontFamily: "petit-cochon",
                    fontSize: 20,
                    marginLeft: 15,
                    color: "#039096",
                  }}
                >
                  Share
                </Text>
              </View>
              <View>
                <Pressable>
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
                    fontFamily: "petit-cochon",
                    fontSize: 20,
                    marginLeft: 15,
                    color: "#039096",
                  }}
                >
                  Rate Us
                </Text>
              </View>
              <View>
                <Pressable>
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
                  fontFamily: "petit-cochon",
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
                fontFamily: "handjet",
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
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/sounds/startSound.mp3")
                );

                await sound.playAsync();
                setShowStartPlaying(false);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#EEEEEE",
                  fontFamily: "petit-cochon",
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
            const { sound } = await Audio.Sound.createAsync(
              require("../assets/sounds/startSound.mp3")
            );

            await sound.playAsync();

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
        <View style={styles.pointHolder}>
          <Image
            style={{
              width: 50,
              height: 50,
              zIndex: 10,
              marginRight: -40,
              marginTop: 8,
            }}
            source={require("../assets/coin.png")}
          />

          <Text
            style={{
              marginTop: 10,
              color: "#EEEEEE",
              fontFamily: "petit-cochon",
              fontSize: 20,
              borderColor: "#f9b100",
              borderWidth: 3.5,
              borderRadius: 20,
              paddingTop: 11,
              paddingLeft: 45,
              paddingRight: 10,
              backgroundColor: "#fcce23",
              textShadowColor: "#bc6a11",
              textShadowOffset: {
                width: 1,
                height: 1,
              },
              textShadowRadius: 3,
            }}
          >
            999999
          </Text>
        </View>
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
              const { sound } = await Audio.Sound.createAsync(
                require("../assets/sounds/startSound.mp3")
              );

              sound.playAsync();
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
              const { sound } = await Audio.Sound.createAsync(
                require("../assets/sounds/startSound.mp3")
              );

              sound.playAsync();
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
                  fontFamily: "handjet",
                  color: "#EEEEEE",
                  fontSize: 25,
                  textAlign: "left",
                }}
              >
                {hint}
              </Text>
            </View>
          </View>
        </View>

        {/* help hint */}
        <Modal
          isVisible={showHelpHint}
          animationIn="zoomInDown"
          animationOut="slideOutUp"
          animationInTiming={100}
          animationOutTiming={800}
          backdropTransitionOutTiming={900}
          onBackButtonPress={() => {
            setShowHelpHint(false);
          }}
          onBackdropPress={() => {
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
                    fontFamily: "petit-cochon",
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
              <Text
                style={{
                  color: "gray",
                  textAlign: "center",
                  fontSize: 25,
                  fontFamily: "handjet",
                }}
              >
                {helpHint}
              </Text>

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
                  const { sound } = await Audio.Sound.createAsync(
                    require("../assets/sounds/startSound.mp3")
                  );

                  await sound.playAsync();
                  setShowHelpHint(false);
                  setHelpHint("");
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#EEEEEE",
                    fontFamily: "petit-cochon",
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: "#00ADB5",
              borderColor: "white",
              borderRadius: 15,
              borderWidth: 3,
              marginBottom: -59,
              marginRight: "-60%",
              zIndex: 100,
              flexDirection: "row",
            }}
          >
            <Pressable
              onPress={async () => {
                if (randomNumber % 2 == 0) {
                  setHelpHint(
                    "The number is an Even number. This means you can divide it by 2 without any leftovers."
                  );
                } else {
                  setHelpHint(
                    "The number is an odd number. This means if you you divide an odd number by 2, there will be a remainder."
                  );
                }
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/sounds/interface.mp3")
                );

                sound.playAsync();
                setShowHelpHint(true);
              }}
            >
              <Text
                style={{
                  color: "#EEEEEE",
                  fontFamily: "petit-cochon",
                  fontSize: 15,
                }}
              >
                Hint
              </Text>
            </Pressable>
          </View>
          <TextInput
            style={{
              backgroundColor: "#EEEEEE",
              width: 300,
              height: 300,
              textAlign: "center",
              fontFamily: "petit-cochon",
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
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/sounds/win.mp3")
                );

                sound.playAsync();

                setLevelCompleted(true);
              } else if (randomNumber < number) {
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/sounds/wrongAnswer.mp3")
                );

                sound.playAsync();
                setAttempt(attempt + 1);
                setNumber(null);
                setHint("The Number is Lower than you'r guess.");
              } else if (randomNumber > number) {
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/sounds/wrongAnswer.mp3")
                );

                setNumber(null);
                sound.playAsync();
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
      </KeyboardAvoidingView>

      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        animationOutTiming={800}
        backdropTransitionOutTiming={900}
        isVisible={levelCompleted}
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
                fontFamily: "petit-cochon",
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
              backgroundColor: "#fcce23",
              borderRadius: 50,
              borderColor: "#f9b100",
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
                fontFamily: "petit-cochon",
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
                marginRight: 10,
              }}
            >
              13131
            </Text>
          </View>

          <View style={{ margin: 20, marginBottom: 30 }}>
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
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/sounds/startSound.mp3")
                );

                await sound.playAsync();
                setNumber(null);
                setAttempt(1);
                setRandomNumber(Math.floor(Math.random() * (11 - 1) + 1));
                setHint(
                  "I'm thinking of a new number between 1 to 10. Now guess it again. "
                );
                setLevelCompleted(false);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#EEEEEE",
                  fontFamily: "petit-cochon",
                  fontSize: 20,
                }}
              >
                Play again
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        animationOutTiming={800}
        backdropTransitionOutTiming={900}
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
            borderRadius: 30,
          }}
        >
          <View style={{}}>
            <Image
              style={{ width: 300, height: 63 }}
              source={require("../assets/gameOver.png")}
            />
          </View>

          <View>
            <Text>Don't give up and try again. It will be better.</Text>
          </View>
          <View style={{ margin: 20, marginBottom: 30 }}>
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
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/sounds/startSound.mp3")
                );

                await sound.playAsync();
                setNumber(null);
                setRandomNumber(Math.floor(Math.random() * (11 - 1) + 1));
                setHint(
                  "I'm thinking of a new number between 1 to 10. Now guess it again. "
                );
                setLevelCompleted(false);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#EEEEEE",
                  fontFamily: "petit-cochon",
                  fontSize: 20,
                }}
              >
                Play again
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
    paddingHorizontal: 30,
    marginTop: 15,
  },
  pointHolder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
