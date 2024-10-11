import { Button, Skeleton } from "antd";
import { useHospital } from "./useGetHospital";
import { useState } from "react";
import AvailableBloodModal from "./AvailableBloodModal";

function TransportBloodItem({
  hospitalId,
  bloodType,
  quantity,
  hospitalAccept,
}) {
  const [open, setOpen] = useState(false);
  const { hospital: hospitalData, isLoading } = useHospital(hospitalId);

  if (isLoading)
    return (
      <Skeleton
        className="rounded-lg p-8 shadow-xl max-w-md md:max-w-2xl px-2 lg:basis-[49%] md:basis-3/4 mb-6"
        active
      />
    );

  return (
    <>
      <div className="max-w-md md:max-w-2xl px-2 lg:basis-[49%] md:basis-3/4 relative">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
          <div className="flex items-center justify-center bg-transparent text-center p-5">
            <img
              className="w-32"
              width="50%"
              src={hospitalData?.avatar}
              alt="CTD"
            />
          </div>

          <div className="flex-1">
            <div className="p-4 md:p-5">
              <p className="font-bold text-xl md:text-lg text-left">
                Tên bệnh viện nhận: {hospitalData?.fullname}
              </p>
            </div>
            <div className="p-4 md:p-5 bg-gray-100 w-full ">
              <div className="sm:flex sm:justify-between sm:items-center">
                <div className="flex flex-col gap-1 ">
                  <div className=" text-left text-md text-gray-700">
                    <span className=" text-gray-900 f">Địa chỉ: </span>
                    {hospitalData?.address}
                  </div>
                  <div className="text-left text-md text-gray-700">
                    <span className="text-gray-900 f">Nhóm máu: </span>
                    {bloodType}
                  </div>
                  <div className=" text-left text-md text-gray-700 ">
                    <span className="text-gray-900 f">Số lượng: </span>
                    {quantity}
                  </div>
                </div>

                <Button onClick={() => setOpen(true)}>Chuyển máu</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <AvailableBloodModal
          hospitalId={hospitalId}
          requiredQuantity={quantity}
          hospitalAccept={hospitalAccept}
          bloodType={bloodType}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default TransportBloodItem;
