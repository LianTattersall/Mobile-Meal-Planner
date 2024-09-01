import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { getDates } from "../utils/GetDates.mjs";
import { useContext } from "react";
import { SelectedDateContext } from "../Contexts/SelectedDateContext";

export default function ScrollDates({ changeMonth }) {
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

  const changeDateHandler = (index, date, month, year) => {
    setSelectedDate({ index, date, month, year });
    changeMonth(month);
  };
  console.log(selectedDate);

  const dates = getDates();
  return (
    <FlatList
      horizontal
      snapToInterval={Dimensions.get("window").width}
      snapToAlignment="center"
      decelerationRate={"fast"}
      showsHorizontalScrollIndicator={false}
      data={dates}
      contentOffset={{ x: Dimensions.get("window").width * 7 }}
      onScroll={(data) => {
        const weekIndex =
          data.nativeEvent.contentOffset.x / Dimensions.get("window").width;
        if (Number.isInteger(weekIndex)) {
          const dayIndex = dates[weekIndex][selectedDate.index];
          setSelectedDate({ index: selectedDate.index, ...dayIndex });
          changeMonth(selectedDate.month);
        }
      }}
      scrollEventThrottle={1}
      renderItem={({ item }) => {
        return (
          <View style={styles.calendarContainer}>
            {item.map(({ date, month, year }, i) => {
              const backgroundColor =
                i === selectedDate.index ? "#bcedcf" : "white";
              return (
                <Pressable
                  onPress={() => {
                    changeDateHandler(i, date, month, year);
                  }}
                  key={i}
                  style={[styles.textBox, { backgroundColor }]}
                >
                  <Text>{date}</Text>
                </Pressable>
              );
            })}
          </View>
        );
      }}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textBox: {
    width: (Dimensions.get("window").width / 7) * 0.8,
    height: (Dimensions.get("window").width / 7) * 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    overflow: "hidden",
  },
});
