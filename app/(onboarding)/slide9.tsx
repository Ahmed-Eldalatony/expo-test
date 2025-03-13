//
// import React, { useState, useRef, useEffect } from 'react';
// import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
//
//
//  const App = () => {
//   const [timePickerVisible, setTimePickerVisible] = useState(false);
//   const [time, setTime] = useState({ hour: 0, minute: 0 });
//
//   const handleTimeSelected = (hour, minute) => {
//     setTime({ hour, minute });
//   };
//
//   return (
//     <View style={appStyles.container}>
//       <TouchableOpacity onPress={() => setTimePickerVisible(true)} style={styles.button}>
//         <Text style={appStyles.buttonText}>Select Time</Text>
//       </TouchableOpacity>
//       <Text style={appStyles.timeText}>
//         Selected Time: {time.hour < 10 ? '0' + time.hour : time.hour}:
//         {time.minute < 10 ? '0' + time.minute : time.minute}
//       </Text>
//       <TimePicker
//         visible={timePickerVisible}
//         onClose={() => setTimePickerVisible(false)}
//         onTimeSelected={handleTimeSelected}
//         initialHours={time.hour}
//         initialMinutes={time.minute}
//       />
//     </View>
//   );
// };
//
// const appStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   timeText: {
//     fontSize: 18,
//     marginTop: 20,
//   },
// });
// export default App;
//
//
// const ITEM_HEIGHT = 40;
// // Number of rows visibly shown at once (we use 3 so the middle row is selected)
// const VISIBLE_ITEMS = 3;
//
// const highlightOffset = ((VISIBLE_ITEMS - 1) / 2) * ITEM_HEIGHT;
//
// // Arrays for 12‐hour format, minutes, and AM/PM
// const HOUR_ITEMS = Array.from({ length: 12 }, (_, i) => i + 1); // [1..12]
// const MINUTE_ITEMS = Array.from({ length: 60 }, (_, i) => i);   // [0..59]
// const AMPM_ITEMS = ['AM', 'PM'];
//
// export const TimePicker = ({
//   visible,
//   onClose,
//   onTimeSelected,
//   // initialHour: number from 1..12
//   // initialMinute: number from 0..59
//   // initialAmPm: 'AM' or 'PM'
//   initialHour = 12,
//   initialMinute = 0,
//   initialAmPm = 'AM',
// }) => {
//   const [selectedHour, setSelectedHour] = useState(initialHour);
//   const [selectedMinute, setSelectedMinute] = useState(initialMinute);
//   const [selectedAmPm, setSelectedAmPm] = useState(initialAmPm);
//
//   const hourScrollRef = useRef(null);
//   const minuteScrollRef = useRef(null);
//   const ampmScrollRef = useRef(null);
//
//   useEffect(() => {
//     if (visible) {
//       // Reset selected values when the modal opens
//       setSelectedHour(initialHour);
//       setSelectedMinute(initialMinute);
//       setSelectedAmPm(initialAmPm);
//
//       // Scroll each wheel to the correct initial position
//       setTimeout(() => {
//         scrollToValue(hourScrollRef, HOUR_ITEMS.indexOf(initialHour));
//         scrollToValue(minuteScrollRef, initialMinute);
//         scrollToValue(ampmScrollRef, AMPM_ITEMS.indexOf(initialAmPm));
//       }, 0);
//     }
//   }, [visible, initialHour, initialMinute, initialAmPm]);
//
//   // Helper to scroll a wheel to the correct row
//   const scrollToValue = (ref, index) => {
//     if (ref.current) {
//       ref.current.scrollTo({
//         y: index * ITEM_HEIGHT,
//         animated: false,
//       });
//     }
//   };
//
//   // This is called on BOTH momentum and end-drag, to handle iOS/Android snapping
//   // and a manual snap fallback on web.
//   const handleScrollEnd = (e, type) => {
//     // On web, `contentOffset` might be undefined, so we check `target.scrollTop`.
//     const offsetY =
//       e.nativeEvent?.contentOffset?.y ?? e.nativeEvent.target.scrollTop;
//     const index = Math.round(offsetY / ITEM_HEIGHT);
//
//     if (type === 'hour') {
//       setSelectedHour(HOUR_ITEMS[index]);
//       // Manually snap on web (and also ensure it’s aligned on native)
//       hourScrollRef.current?.scrollTo({
//         y: index * ITEM_HEIGHT,
//         animated: true,
//       });
//     } else if (type === 'minute') {
//       setSelectedMinute(MINUTE_ITEMS[index]);
//       minuteScrollRef.current?.scrollTo({
//         y: index * ITEM_HEIGHT,
//         animated: true,
//       });
//     } else if (type === 'ampm') {
//       setSelectedAmPm(AMPM_ITEMS[index]);
//       ampmScrollRef.current?.scrollTo({
//         y: index * ITEM_HEIGHT,
//         animated: true,
//       });
//     }
//   };
//
//   const onConfirm = () => {
//     // Pass the chosen hour/minute/AMPM back to the parent
//     onTimeSelected?.(selectedHour, selectedMinute, selectedAmPm);
//     onClose();
//   };
//
//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.modalOverlay}>
//         <View style={styles.pickerContainer}>
//           <Text style={styles.title}>Select Time</Text>
//
//           <View style={styles.wheelsRow}>
//             {/* Hour wheel */}
//             <View style={styles.wheelColumn}>
//               <ScrollView
//                 ref={hourScrollRef}
//                 style={styles.scrollView}
//                 showsVerticalScrollIndicator={false}
//                 snapToInterval={ITEM_HEIGHT}
//                 // decelerationRate="fast"
//
//  // horizontal={true}
//     decelerationRate={0.9}
//     snapToAlignment={"center"}
//     showsHorizontalScrollIndicator={false}
//     disableIntervalMomentum={true}
//  onMomentumScrollEnd={(e) => handleScrollEnd(e, 'hour')}
//   onScrollEndDrag={(e) => handleScrollEnd(e, 'hour')}
//               >
//                 {HOUR_ITEMS.map((hr) => (
//                   <View key={hr} style={styles.itemContainer}>
//                     <Text style={styles.itemText}>{hr}</Text>
//                   </View>
//                 ))}
//               </ScrollView>
//             </View>
//
//             <Text style={styles.separator}>:</Text>
//
//             {/* Minute wheel */}
//             <View style={styles.wheelColumn}>
//               <ScrollView
//                 ref={minuteScrollRef}
//                 style={styles.scrollView}
//                 showsVerticalScrollIndicator={false}
//                 snapToInterval={ITEM_HEIGHT}
//                 decelerationRate="fast"
//   contentContainerStyle={{ paddingVertical: highlightOffset }}
// onMomentumScrollEnd={(e) => handleScrollEnd(e, 'minute')}
//   onScrollEndDrag={(e) => handleScrollEnd(e, 'minute')}
//               >
//                 {MINUTE_ITEMS.map((min) => (
//                   <View key={min} style={styles.itemContainer}>
//                     <Text style={styles.itemText}>
//                       {min < 10 ? '0' + min : min}
//                     </Text>
//                   </View>
//                 ))}
//               </ScrollView>
//             </View>
//
//             {/* AM/PM wheel */}
//             <View style={styles.wheelColumn}>
//               <ScrollView
//                 ref={ampmScrollRef}
//                 style={styles.scrollView}
//   contentContainerStyle={{ paddingVertical: highlightOffset }}
//                 showsVerticalScrollIndicator={false}
//                 snapToInterval={ITEM_HEIGHT}
//                 decelerationRate="fast"
//   onMomentumScrollEnd={(e) => handleScrollEnd(e, 'ampm')}
//   onScrollEndDrag={(e) => handleScrollEnd(e, 'ampm')}
//               >
//                 {AMPM_ITEMS.map((ampm) => (
//                   <View key={ampm} style={styles.itemContainer}>
//                     <Text style={styles.itemText}>{ampm}</Text>
//                   </View>
//                 ))}
//               </ScrollView>
//             </View>
//
//             {/* Center highlight overlay (for the selected row) */}
//             <View
//               style={[
//                 styles.highlightOverlay,
//                 { top: ITEM_HEIGHT }, // middle of 3 visible items
//               ]}
//             />
//           </View>
//
//           {/* Buttons */}
//           <TouchableOpacity onPress={onConfirm} style={styles.button}>
//             <Text style={styles.buttonText}>Confirm</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={onClose}
//             style={[styles.button, { backgroundColor: '#ccc' }]}
//           >
//             <Text style={styles.buttonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };
//
//
// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pickerContainer: {
//     width: 300,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   wheelsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: ITEM_HEIGHT * VISIBLE_ITEMS,
//     overflow: 'hidden',
//     marginBottom: 20,
//     position: 'relative',
//   },
//   wheelColumn: {
//     flex: 1,
//   },
//   scrollView: {
//     height: ITEM_HEIGHT * VISIBLE_ITEMS,
//   },
//   itemContainer: {
//     height: ITEM_HEIGHT,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   itemText: {
//     fontSize: 20,
//   },
//   separator: {
//     fontSize: 24,
//     marginHorizontal: 5,
//   },
// highlightOverlay: {
//   position: 'absolute',
//   left: 0,
//   right: 0,
//   height: ITEM_HEIGHT,
//   borderTopWidth: 1,
//   borderBottomWidth: 1,
//   borderColor: '#007AFF',
//   top: highlightOffset, // << ADD THIS
//   zIndex: 999,
// },
//   button: {
//     backgroundColor: '#007AFF',
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginVertical: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });
//
//

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const ITEM_HEIGHT = 50;
const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

export default function VerticalCounter() {
  return (
    <View style={styles.container}>
      {/* Optional guide lines (for the "selected" row) */}
      <View style={[styles.line, { top: ITEM_HEIGHT }]} />
      <View style={[styles.line, { top: ITEM_HEIGHT * 2 }]} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="center"
        decelerationRate="fast"
        disableIntervalMomentum={true} // <-- Add this
        // pagingEnabled={true}       // <-- Try enabling this if needed
        contentContainerStyle={styles.scrollContent}
      >
        {numbers.map((num) => (
          <View key={num} style={styles.item}>
            <Text style={styles.itemText}>{num}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Height to show the middle item plus one above/below
    height: ITEM_HEIGHT * 3,
    width: 80,
    alignSelf: 'center',
    marginTop: 50,
    overflow: 'hidden',
  },
  scrollContent: {
    // Padding so first and last can also scroll to center
    paddingVertical: ITEM_HEIGHT,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'blue',
    zIndex: 1,
  },
});
