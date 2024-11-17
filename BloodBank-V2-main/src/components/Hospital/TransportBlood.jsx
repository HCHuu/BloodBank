import { useSelector } from "react-redux";
import { useGetBloodTransportAccept } from "./useGetBloodTransportAccept";
import { Empty, Result, Spin } from "antd";
import TransportBloodItem from "./TransportBloodItem";

function TransportBlood() {
  const { userId } = useSelector((store) => store.user);
  const { BloodTransportAccept, isLoading, error } =
    useGetBloodTransportAccept(userId);

  if (isLoading)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Spin tip="Đang tải dữ liệu" size="large">
          <div></div>
        </Spin>
      </div>
    );

  if (error)
    return (
      <Result
        className="mt-8"
        status="error"
        title="Tải dữ liệu không thành công"
        subTitle="Xin vui lòng kiểm tra lại tình trạng Internet của bạn."
      ></Result>
    );

  if (BloodTransportAccept?.length === 0)
    return (
      <div className=" flex flex-col h-[60vh]  justify-center">
        <Empty description={"Không có dữ liệu"} />
      </div>
    );

  console.log(BloodTransportAccept);

  return (
    <div className="mt-12 flex flex-wrap gap-4">
      {BloodTransportAccept?.map((item, index) => {
        return <TransportBloodItem {...item} key={item.id} />;
      })}
    </div>
  );
}

export default TransportBlood;
