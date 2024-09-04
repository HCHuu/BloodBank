import {
  Button,
  DatePicker,
  Drawer,
  Form,
  InputNumber,
  TimePicker,
  Space,
} from "antd";

import React from "react";
import { useSelector } from "react-redux";
import { useUpdateDonateActivity } from "./useUpdateDonateAcitivity";
import { format } from "date-fns";

function UpdateDonateActivityDrawer({
  id,
  open,
  onClose,
  dateActivity,
  quantity,
  operatingHour,
}) {
  const [form] = Form.useForm();
  const { updateActivity, isPending } = useUpdateDonateActivity(onClose);
  const { userId } = useSelector((store) => store.user);

  const handleSubmit = (values) => {
    const startTime = format(values?.startTime?.$d, "HH:mm");
    const endTime = format(values?.endTime?.$d, "HH:mm");
    const combinedOperatingHour = `${startTime} - ${endTime}`;

    updateActivity({
      data: {
        ...values,
        dateActivity: format(values?.dateActivity?.$d, "yyyy-MM-dd'T'00:00:00"),
        operatingHour: combinedOperatingHour,
        hospitalId: userId,
      },
      id,
    });
  };

  const handeReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Drawer
        title="Cập nhật hoạt động hiến máu"
        width={540}
        onClose={onClose}
        open={open}
        form={form}
        loading={isPending}
        maskClosable={!isPending}
        className="[&_body]:pb-20"
        extra={
          <Space>
            <Button disabled={isPending} onClick={() => handeReset()}>
              Huỷ
            </Button>
            <Button
              disabled={isPending}
              type="primary"
              htmlType="submit"
              form="update-form"
            >
              Cập nhật
            </Button>
          </Space>
        }
      >
        <div className="flex  flex-col">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            name="update-form"
            clearOnDestroy
            initialValues={{ quantity: quantity }}
            onFinish={(values) => handleSubmit(values)}
          >
            <Form.Item
              className="mt-8"
              label="Ngày diễn ra"
              name="dateActivity"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày diễn ra!",
                },
              ]}
            >
              <DatePicker
                placeholder="Chọn ngày diễn ra"
                disabled={isPending}
                format={"DD/MM/YYYY"}
                className="w-full "
              />
            </Form.Item>

            <Form.Item
              name="startTime"
              label="Thời gian bắt đầu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian bắt đầu!",
                },
              ]}
            >
              <TimePicker
                placeholder="Chọn thời gian bắt đầu"
                disabled={isPending}
                format="HH:mm"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              name="endTime"
              label="Thời gian kết thúc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian kết thúc!",
                },
              ]}
            >
              <TimePicker
                placeholder="Chọn thời gian kết thúc"
                disabled={isPending}
                format="HH:mm"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              className="pb-4"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng!",
                },
              ]}
            >
              <InputNumber min={1} max={1000} className="w-full" />
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
}

export default UpdateDonateActivityDrawer;
