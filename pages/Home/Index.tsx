import React, { useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { styles } from "./styles";

import {
  allLetters as allLettersUtil,
  selectedLetters as selectedLettersUtil,
  shuffleArray,
} from "../../utils/array";
import letters from "../../utils/letters";
import Learning from "./Learning";
import Practice from "./Practice";
import WordBuilding from "./WordBuilding";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import cx from "../../utils/cx";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  enum Screen {
    Learning,
    Practice,
    WordBuilding
  }

  const [screen, setScreen] = useState(Screen.Learning);

  const screens = [
    { title: "Practice", val: Screen.Learning },
    { title: "Testing", val: Screen.Practice },
    { title: "Word game", val: Screen.WordBuilding },
  ];

  const insets = useSafeAreaInsets();

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <Text style={styles.title}>Learning</Text>
      <View style={styles.header}>
        {screens.map((item) => (
          <View key={item.val}>
            <Text
              onPress={() => setScreen(item.val)}
              style={
                item.val === screen
                  ? cx(styles.header_title, styles.header_title__active)
                  : styles.header_title
              }
            >
              {item.title}
            </Text>
            {item.val === screen && <View style={styles.header__line} />}
          </View>
        ))}
      </View>
      <View style={styles.content}>
        {screen === Screen.Learning && <Learning />}
        {screen === Screen.Practice && <Practice />}
        {screen === Screen.WordBuilding && <WordBuilding />}
      </View>
    </View>
  );
};

export default React.memo(HomeScreen);
