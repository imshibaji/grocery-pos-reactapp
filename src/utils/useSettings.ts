import { useDispatch, useSelector } from "react-redux";
import { Settings, updateSettings } from "../reducers/settings";
import { RootState } from "../store";




export default function useSettings() {
  const settingsData = useSelector((state: RootState) => state.settings as Settings);
  const dispatch = useDispatch();

  const settingsHandler = (data: Settings) => {
    dispatch(updateSettings(data));
  };
  return {
    settings: settingsData,
    setSettings: settingsHandler,
  };
}
