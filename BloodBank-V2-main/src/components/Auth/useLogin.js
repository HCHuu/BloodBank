import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "./userSlice";

export function useLogin() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (data) => loginAPI(data),

    onSuccess: (result, payload) => {
      queryClient.setQueryData(["user"], result?.data);

      setCookie("user", result?.data?.jwtToken, {
        maxAge: result?.data.expiresIn,
        path: "/",
      });

      dispatch(
        setInfo({ ...result.data, isAuthenticated: true, roleId: result.role })
      );
      console.log(result?.data.role);

      if (result?.data.role === "Donor") navigate("/user/home");
      if (result?.data.role === "Hospital") navigate("/hospital/home");
      if (result?.data.role === "Admin") navigate("/admin/home");
      toast.success(`Chào mừng ${result.data.fullName} `);
    },

    onError: () => {
      toast.error("Tài khoản hoặc mật khẩu không khớp");
    },
  });

  return { login, isPending };
}
