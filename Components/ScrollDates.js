import { Text, StyleSheet, View, Dimensions, FlatList } from "react-native";
import { getDates } from "../utils/GetDates.mjs";

export default function ScrollDates({ changeMonth }) {
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
        const index =
          data.nativeEvent.contentOffset.x / Dimensions.get("window").width;
        if (Number.isInteger(index)) {
          changeMonth(dates[index].month);
        }
      }}
      scrollEventThrottle={1}
      renderItem={({ item: { dates, month } }) => {
        return (
          <View style={styles.calendarContainer}>
            {dates.map((day, index) => {
              return (
                <Text key={index} style={styles.text}>
                  {day}
                </Text>
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
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    width: Dimensions.get("window").width / 7,
    textAlign: "center",
  },
});
