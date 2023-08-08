import { StyleSheet, Text, View, Pressable, Image, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
export default function App() {
  const [fontsLoaded] = useFonts({
    "petit-cochon": require("../assets/fonts/Petit Cochon.ttf"),
    handjet: require("../assets/fonts/Handjet.ttf"),
  });

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

  useEffect(() => {
    function prepare() {
      SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

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

      <LinearGradient colors={["#00ADB5", "#222831"]} style={styles.background}>
        {/* Header  */}

        <View style={styles.headerholder}>
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
          <View style={styles.leaderBoardIcon}>
            <Image
              style={{ width: 50, height: 50, marginTop: 8 }}
              source={require("../assets/trophy.png")}
            />
          </View>
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
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/sounds/startSound.mp3")
                );

                await sound.playAsync();

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
                  fontFamily: "petit-cochon",
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
              const { sound } = await Audio.Sound.createAsync(
                require("../assets/sounds/startSound.mp3")
              );

              sound.playAsync();

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
              const { sound } = await Audio.Sound.createAsync(
                require("../assets/sounds/startSound.mp3")
              );

              sound.playAsync();
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
              source={require("../assets/sound.png")}
            />
          </Pressable>
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
              },
            ]}
          >
            <Image
              style={{ width: 30, height: 30, marginTop: 4 }}
              source={require("../assets/music.png")}
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
  pointHolder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  titleHolder: {
    marginTop: "28%",
    marginBottom: "18%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
