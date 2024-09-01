import { useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import ScrollDates from "./ScrollDates";
import monthNumToStr from "../utils/monthNumToStr.mjs";

export default function DatesBar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [displayMonth, setDisplayMonth] = useState("");

  function changeMonth(month) {
    const strMonth = monthNumToStr[String(month)];
    setDisplayMonth(strMonth);
  }

  return (
    <>
      <Text style={styles.month}>{displayMonth}</Text>
      <View style={styles.calendarContainer}>
        {days.map((day, index) => (
          <Text key={index} style={styles.text}>
            {day}
          </Text>
        ))}
      </View>
      <ScrollDates changeMonth={changeMonth} />
    </>
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
  month: {
    paddingTop: 5,
  },
});
