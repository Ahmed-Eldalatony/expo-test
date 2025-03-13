import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "expo-router";
import { OnboardingButton } from "../../components/OnboardingButton";

export default function OnboardingSlide() {
  const { t } = useTranslation();
  const router = useRouter();
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
      <SelectionPrompt />
      <OnboardingButton title={t("next")} onPress={() => router.push("/slide9")} />
    </View>
  );
}

export const SelectionPrompt = () => {
  const { t } = useTranslation();
  const [selectionType, setSelectionType] = useState<string | null>(null);
  const options = [
    { type: "quarter", label: t("byQuarter") },
    { type: "hizb", label: t("byHizb") },
    { type: "juz", label: t("byJuz") },
  ];

  const renderSelectComponent = useCallback(() => {
    switch (selectionType) {
      case "quarter":
        return (
          <CustomSelect
            label={t("selectQuarter")}
            options={Array.from({ length: 240 }, (_, i) => {
              const num = i + 1;
              return { value: num, label: formatArabic(num) };
            })}
            formatOption={formatArabic}
          />
        );
      case "hizb":
        return (
          <CustomSelect
            label={t("selectHizb")}
            options={Array.from({ length: 60 }, (_, i) => {
              const num = i + 1;
              return { value: num, label: formatHizbOption(num) };
            })}
            formatOption={formatHizbOption}
          />
        );
      case "juz":
        return (
          <CustomSelect
            label={t("selectJuz")}
            options={Array.from({ length: 30 }, (_, i) => {
              const num = i + 1;
              return { value: num, label: num === 1 ? t("juzOne") : `${toArabicNumerals(num)} ${t("juz")}` };
            })}
            formatOption={(num) => (num === 1 ? t("juzOne") : `${toArabicNumerals(num)} ${t("juz")}`)}
          />
        );
      default:
        return null;
    }
  }, [selectionType, t]);

  return (
    <View className="items-center">
      {!selectionType ? (
        <>
          <Text className="text-lg font-readexpro-semibold text-primary-900 mb-4">{t("chooseSelectionMethod")}:</Text>
          <View className="flex-row space-x-4">
            {options.map((o) => (
              <TouchableOpacity
                key={o.type}
                className="bg-primary-100 px-4 py-2 rounded-md"
                onPress={() => setSelectionType(o.type)}
              >
                <Text className="text-primary-800 font-readexpro-semibold">{o.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        renderSelectComponent()
      )}
    </View>
  );
};

// Helper to convert Western digits to Arabic numerals
const toArabicNumerals = (num: number): string => {
  return String(num).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
};

const formatArabic = (q: number): string => {
  const { t } = useTranslation();
  const juz = Math.floor(q / 8);
  const hizb = Math.floor((q % 8) / 4);
  const quarter = q % 4;
  return [
    juz && (juz === 1 ? t("juzOne") : `${toArabicNumerals(juz)} ${t("juz")}`),
    hizb && (hizb === 1 ? t("hizbOne") : `${toArabicNumerals(hizb)} ${t("hizb")}`),
    quarter && (quarter === 1 ? t("quarterOne") : `${toArabicNumerals(quarter)} ${t("quarter")}`),
  ]
    .filter(Boolean)
    .join(" و ");
};

const formatHizbOption = (h: number): string => {
  const { t } = useTranslation();
  const juz = Math.floor(h / 2);
  const remaining = h % 2;
  return [
    juz && (juz === 1 ? t("juzOne") : `${toArabicNumerals(juz)} ${t("juz")}`),
    remaining && (remaining === 1 ? t("hizbOne") : `${toArabicNumerals(remaining)} ${t("hizb")}`),
  ]
    .filter(Boolean)
    .join(" و ");
};

const CustomSelect = ({ label, options, formatOption }) => {
  const [selected, setSelected] = useState(1);

  return (
    <View className="items-center">
      <Text className="text-lg font-readexpro-semibold text-primary-900 mb-2">{label}</Text>
      <View className="border rounded-md border-primary-200">
        <select
          className="bg-transparent text-primary-800 font-amiri-bold text-xl"
          style={{ direction: "rtl" }}
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
        >
          {options.map((option) => (
            <option className="font-amiri-bold" key={option.value} value={option.value}>
              {typeof formatOption === 'function' ? formatOption(option.value) : option.label}
            </option>
          ))}
        </select>
      </View>
    </View>
  );
};


