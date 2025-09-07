import { createSlice } from "@reduxjs/toolkit";
import { getSettingsProvider, updateSettingsProvider } from "../providers/settings";

export interface Settings {
    id: string;
    shopName: string;
    address: string;
    whatsapp: string;
    gst: boolean;
    gstPercent: number;
    deliveryCharge: boolean;
    delivery: number;
    currency: string;
    currencySymbol: string;
    timezone: string;
}

export const settingSlice = createSlice({
    name: "settings",
    // initialState: getSettingsProvider() as Settings,
    initialState: {} as Settings,
    reducers: {
        updateSettings: (state, action) => {
            // updateSettingsProvider(action.payload);
            return action.payload;
        },
    },
});

export const { updateSettings } = settingSlice.actions;
export default settingSlice.reducer;