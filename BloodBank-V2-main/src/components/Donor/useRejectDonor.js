import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectDonor as rejectDonorAPI } from "../../services/apiSession";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useRejectDonor() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate: rejectDonor, isPending } = useMutation({
    mutationFn: (data) => rejectDonorAPI(data),

    onSuccess: (result, payload) => {
      toast.success(`Đã huỷ yêu cầu`);
      console.log(id);
      queryClient.invalidateQueries({
        queryKey: [`donors ${id}`],
      });
    },
    onError: (err) => {
      toast.error("Huỷ không thành công");
    },
  });
  return { rejectDonor, isPending };
}
