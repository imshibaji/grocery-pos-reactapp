import { useDispatch, useSelector } from "react-redux";
import { Settings, updateSettings } from "../reducers/settings";
import { RootState } from "../store";
import { useCallback, useEffect, useState } from "react";
import { SettingsService } from "../services/Settings";
import { debounce } from "lodash";

const defaultSettings = [
  {
    id: "aswq3sa",
    shopName: "Grocery Store",
    address: "Address",
    whatsapp: "+91 1234567890",
    gst: true,
    gstPercent: 0,
    delivery: 0,
    deliveryCharge: false,
    currency: "INR",
    currencySymbol: "₹",
    timezone: "Asia/Kolkata",
  }
];

export default function useSettings() {
  const settingsData = useSelector(
    (state: RootState) => state.settings as Settings
  );
  const dispatch = useDispatch();
  const tss = new SettingsService();
  const [load, setLoad] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    checkCollection();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    if (!load) {
      const data = await tss.find();
      if (data.length > 0) {
        dispatch(updateSettings(data[0]));
      } else {
        dispatch(updateSettings(defaultSettings[0]));
        await tss.create(defaultSettings[0]);
        setLoad(true);
      }
    }
  }

  const checkCollection = async () => {
    if (!create) {
      const res = await tss.collectionExists("settings");
      if (!res) {
        // console.log(res);
        await tss.init();
      }
      setCreate(true);
    }
  }

  const syncSettings = useCallback(
    debounce(async (settings: Settings) => {
      if (settings?.id) {
        await tss.update(settings.id, settings);
      }
    }, 500), // wait 500ms between requests
    [tss]
  );

  const settingsHandler = (data: Settings) => {
    dispatch(updateSettings(data));
    syncSettings(data);
  };
  return {
    settings: settingsData,
    setSettings: settingsHandler,
  };
}
