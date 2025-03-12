import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "expo-router";
import { OnboardingButton } from "../../components/OnboardingButton";

export default function OnboardingSlide() {
  const { t } = useTranslation();
  const router = useRouter();
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter - 1 > 0 ? counter - 1 : 0);
  };

  return (
    <View className="flex-1 bg-white px-4 gap-12 items-center justify-center">
      <Text className="text-3xl mb-4 font-readexpro-semibold text-primary-800 text-center">
        {t("slide3.title")}
      </Text>

      <View className="bg-gray-100/70 p-4 rounded-lg ">
        <Text className="text-lg text-center mb-2 font-readexpro-semibold text-primary-900">
          {t("slide3.hadeeth1")[0]}
        </Text>
        <View className="flex-row leading-relaxed rtl flex-end ml-auto">
          <Text className=" text-2xl leading-relaxed font-amiri-bold text-secondary-500">
            "{t("slide8.hadeeth1")[1]}"{" "}
          </Text>
        </View>
      </View>
      <Text className="text-xl  text-primary-900 font-readexpro-semibold">
        {t("slide8.description1")}
      </Text>
      <QuarterCounter />
      {/* <View className="flex-row items-center justify-center space-x-4"> */}
      {/*   <TouchableOpacity */}
      {/*     className="bg-primary-400 px-4 py-2 rounded-lg" */}
      {/*     onPress={decrementCounter} */}
      {/*   > */}
      {/*     <Text className="text-2xl font-bold">-</Text> */}
      {/*   </TouchableOpacity> */}
      {/*   <Text className="text-3xl text-primary-900 font-bold">{counter}</Text> */}
      {/*   <TouchableOpacity */}
      {/*     className="bg-secondary-400 px-4 py-2 rounded-lg" */}
      {/*     onPress={incrementCounter} */}
      {/*   > */}
      {/*     <Text className="text-2xl font-bold">+</Text> */}
      {/*   </TouchableOpacity> */}
      {/* </View> */}
      <OnboardingButton title={t("next")} onPress={() => router.push("/slide9")} />
    </View>
  );
}


 // Helper to convert Western digits to Arabic numerals
  const toArabicNumerals = (num) => {
    return String(num).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
  };


export const QuarterSelect  = () => {
  // State to store the selected quarter count (minimum is 1)
  const [selected, setSelected] = useState(1);

   // Format a given number of quarters into Arabic composite units.
  // Conversion: 4 quarters = 1 حزب, 8 quarters = 1 جزء.
  const formatArabic = (q) => {
    const juz = Math.floor(q / 8);
    const remainderAfterJuz = q % 8;
    const hizb = Math.floor(remainderAfterJuz / 4);
    const quarter = remainderAfterJuz % 4;
    let parts = [];
    if (juz > 0) {
      parts.push(juz === 1 ? "١ جزء" : `${toArabicNumerals(juz)} جزء`);
    }
    if (hizb > 0) {
      parts.push(hizb === 1 ? "١ حزب" : `${toArabicNumerals(hizb)} حزب`);
    }
    if (quarter > 0) {
      parts.push(quarter === 1 ? "١ ربع" : `${toArabicNumerals(quarter)} ربع`);
    }
    return parts.join(" و ");
  };

  // Create options for each quarter value from 1 (1 ربع) to 240 (30 جزء)
  const options = [];
  for (let q = 1; q <= 240; q++) {
    options.push(
      <option key={q} value={q}>
        {formatArabic(q)}
      </option>
    );
  }

  const handleChange = (e) => {
    setSelected(Number(e.target.value));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <select value={selected} onChange={handleChange}>
        {options}
      </select>
      <p>القيمة المحددة: {formatArabic(selected)}</p>
    </div>
  );
};

const formatHizbOption = (hizbCount) => {
  const juz = Math.floor(hizbCount / 2);
  const remainingHizb = hizbCount % 2;
  let parts = [];
  if (juz > 0) {
    parts.push(juz === 1 ? "١ جزء" : `${toArabicNumerals(juz)} جزء`);
  }
  if (remainingHizb > 0) {
    parts.push(remainingHizb === 1 ? "١ حزب" : `${toArabicNumerals(remainingHizb)} حزب`);
  }
  return parts.join(" و ");
};

const HizbSelect = () => {
  // Maximum: 30 juz' = 60 حزب.
  const maxHizb = 60;
  const [selected, setSelected] = useState(1); // Default: 1 حزب.
  const options = [];
  for (let h = 1; h <= maxHizb; h++) {
    options.push(
      <option key={h} value={h}>
        {formatHizbOption(h)}
      </option>
    );
  }
  const handleChange = (e) => {
    setSelected(Number(e.target.value));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>اختيار حسب الحزب</h2>
      <select value={selected} onChange={handleChange}>
        {options}
      </select>
      <p>القيمة المحددة: {formatHizbOption(selected)}</p>
    </div>
  );
};

const JuzSelect = () => {
  // For juz' selection, the range is from 1 جزء to 30 جزء.
  const maxJuz = 30;
  const [selected, setSelected] = useState(1); // Default: 1 جزء.
  const options = [];
  for (let j = 1; j <= maxJuz; j++) {
    options.push(
      <option key={j} value={j}>
        {j === 1 ? "١ جزء" : `${toArabicNumerals(j)} جزء`}
      </option>
    );
  }
  const handleChange = (e) => {
    setSelected(Number(e.target.value));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>اختيار حسب الجزء</h2>
      <select value={selected} onChange={handleChange}>
        {options}
      </select>
      <p>القيمة المحددة: {selected === 1 ? "١ جزء" : `${toArabicNumerals(selected)} جزء`}</p>
    </div>
  );
};

const SelectionPrompt = () => {
  const [selectionType, setSelectionType] = useState(null);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {!selectionType && (
        <div>
          <p>اختر طريقة التحديد:</p>
          <button onClick={() => setSelectionType("hizb")} style={{ marginRight: '1rem' }}>
            حسب الحزب
          </button>
          <button onClick={() => setSelectionType("juz")}>
            حسب الجزء
          </button>
        </div>
      )}

      {selectionType === "quarter" && <QuarterSelect />}
      {selectionType === "hizb" && <HizbSelect />}
      {selectionType === "juz" && <JuzSelect />}
    </div>
  );
};

export default SelectionPrompt;

// export const QuarterCounter = () => {
//   // Start with 1 quarter as the minimum value
//   const [quarterCount, setQuarterCount] = useState(1);
//
//   // Increment by one quarter
//   const increment = () => {
//     setQuarterCount(prev => prev + 1);
//   };
//
//   // Reset counter to 1 quarter
//   const reset = () => {
//     setQuarterCount(1);
//   };
//
//   // Format the counter output using the conversion rules:
//   // 4 quarters = 1 hizb, 8 quarters = 1 juz'
//   const formatCounter = (q) => {
//     const juz = Math.floor(q / 8);
//     const remainderAfterJuz = q % 8;
//     const hizb = Math.floor(remainderAfterJuz / 4);
//     const quarter = remainderAfterJuz % 4;
//
//     let parts = [];
//     if (juz > 0) {
//       parts.push(juz === 1 ? "1 juz'" : `${juz} juz'`);
//     }
//     if (hizb > 0) {
//       parts.push(hizb === 1 ? "1 hizb" : `${hizb} hizb`);
//     }
//     if (quarter > 0) {
//       parts.push(quarter === 1 ? "1 quarter" : `${quarter} quarters`);
//     }
//
//     // If for some reason all parts are 0, return "0 quarter"
//     return parts.length > 0 ? parts.join(" and ") : "0 quarter";
//   };
//
//   return (
//     <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//       <h1>Counter: {formatCounter(quarterCount)}</h1>
//       <button onClick={increment} style={{ marginRight: '1rem' }}>Increment</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// };
//
// export default QuarterCounter;
