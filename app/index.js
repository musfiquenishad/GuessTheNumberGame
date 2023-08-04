import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";

export default function App() {
  const [fontsLoaded] = useFonts({
    "petit-cochon": require("../assets/fonts/Petit Cochon.ttf"),
    handjet: require("../assets/fonts/Handjet.ttf"),
  });

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
      <StatusBar style="auto" />

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
