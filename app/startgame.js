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
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { router } from "expo-router";
import { useState } from "react";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";

export default function StartGame() {
  const [number, setNumber] = useState(null);
  const [hint, setHint] = useState(
    "I am thinking of a number between 1 to 10."
  );
  const [showSettings, setShowSettings] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("easy");
  const [items, setItems] = useState([
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ]);

  return (
    <LinearGradient colors={["#00ADB5", "#222831"]} style={styles.background}>
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
                  style={{ width: 90, borderColor: "#EEEEEE" }}
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

      {/* Hint Dialogue */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ margin: 20, marginTop: 60 }}>
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

            <View style={{ width: "75%", marginLeft: 5 }}>
              <Text
                style={{
                  fontFamily: "handjet",
                  color: "#EEEEEE",
                  fontSize: 20,
                  textAlign: "left",
                }}
              >
                I am thinking of a number between 1 to 10, Now Guess the number.
              </Text>
            </View>
          </View>
        </View>

        {/* input box */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
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
            onSubmitEditing={() => {
              setHint("The number is an even number between 1 to 10.");
            }}
            onChangeText={(num) => {
              setNumber(num);
              console.log(number);
            }}
            value={number}
            placeholder="?"
            placeholderTextColor="#00ADB5"
            inputMode="numeric"
            enterKeyHint="enter"
            maxLength={3}
            caretHidden={true}
            contextMenuHidden={true}
          />
        </View>
      </KeyboardAvoidingView>
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
