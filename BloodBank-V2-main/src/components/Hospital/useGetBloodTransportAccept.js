import { useQuery } from "@tanstack/react-query";
import { getBloodTransportAccept as getBloodTransportAcceptAPI } from "../../services/apiActivities";

export function useGetBloodTransportAccept(hospitalId) {
  const {
    data: BloodTransportAccept,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBloodTransportAcceptAPI(hospitalId),
    queryKey: [`BloodTransportAccept`],
  });

  return { BloodTransportAccept, isLoading, error };
}
