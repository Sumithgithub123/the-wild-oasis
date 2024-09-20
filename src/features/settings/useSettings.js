import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading: isloadingsettings,
    data: settingsdata,
    error: settingserror,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { isloadingsettings, settingsdata, settingserror };
}
