import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const hapticsImpactMedium = async () => {
  if (!process.env.CAPACITOR) return;
  await Haptics.impact({ style: ImpactStyle.Medium });
};

export const hapticsImpactLight = async () => {
  if (!process.env.CAPACITOR) return;
  await Haptics.impact({ style: ImpactStyle.Light });
};

export const hapticsVibrate = async () => {
  if (!process.env.CAPACITOR) return;
  await Haptics.vibrate();
};

export const hapticsSelectionStart = async () => {
  if (!process.env.CAPACITOR) return;
  await Haptics.selectionStart();
};

export const hapticsSelectionChanged = async () => {
  if (!process.env.CAPACITOR) return;
  await Haptics.selectionChanged();
};

export const hapticsSelectionEnd = async () => {
  if (!process.env.CAPACITOR) return;
  await Haptics.selectionEnd();
};
