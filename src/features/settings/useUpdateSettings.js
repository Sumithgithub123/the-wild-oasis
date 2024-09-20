import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isupdatesettings, mutate: updatesettings } = useMutation({
    mutationFn: ({ value, fieldtoupdate }) => updateSetting(value, fieldtoupdate),
    onSuccess: () => {
      toast.success("Settings Succesfully Edited.");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => {
      toast.error("Something wrong during editing!");
    },
  });

  return { isupdatesettings, updatesettings };
}
