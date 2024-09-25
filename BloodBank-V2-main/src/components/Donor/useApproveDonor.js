import { useMutation } from "@tanstack/react-query";
import { approveDonor as approveDonorAPI } from "../../services/apiSession";
import { toast } from "react-hot-toast";

export function useApproveDonor(onClose) {
  const { mutate: approveDonor, isPending } = useMutation({
    mutationFn: (data) => approveDonorAPI(data),

    onError: (err) => {
      toast.error("Chấp nhận không thành công");
    },
  });
  return { approveDonor, isPending };
}
