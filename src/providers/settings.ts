import { Settings } from "../reducers/settings";

export const SETTING_KEYS = "grocery_pos_lean_v1_settings";

export function getSettingsProvider() {
  const settings = localStorage.getItem(SETTING_KEYS);
  if (settings) {
    return JSON.parse(settings) as Settings;
  }
  return {
        shopName: "Grocery Store",
        address: "Address",
        whatsapp: "+91 1234567890",
        gst: true,
        gstPercent: 0,
        delivery: 0,
  } as Settings;
}

export function setSettingsProvider(settings: Settings) {
  localStorage.setItem(SETTING_KEYS, JSON.stringify(settings));
}

export function updateSettingsProvider(settings: Settings) {
  setSettingsProvider(settings);
}

export function removeSettingsProvider() {
  localStorage.removeItem(SETTING_KEYS);
}

export function clearSettingsProvider() {
  removeSettingsProvider();
}