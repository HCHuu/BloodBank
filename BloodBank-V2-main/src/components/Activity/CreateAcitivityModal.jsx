import React from "react";
import { Modal, Form, DatePicker, InputNumber, TimePicker } from "antd";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useCreateActivity } from "./useCreateDonateActivity";

function CreateActivityModal({ open, onClose }) {
  const { userId } = useSelector((store) => store.user);
  const { createActivity, isPending } = useCreateActivity(onClose);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const startTime = format(values?.startTime?.$d, "HH:mm");
    const endTime = format(values?.endTime?.$d, "HH:mm");
    const combinedOperatingHour = `${startTime} - ${endTime}`;

    createActivity({
      ...values,
      dateActivity: format(values?.dateActivity?.$d, "yyyy-MM-dd'T'00:00:00"),
      operatingHour: combinedOperatingHour,
      hospitalId: userId,
    });

    form.resetFields();
  };

  return createPortal(
    <Modal
      maskClosable={!isPending}
      className="text-center"
      title="Thêm hoạt động hiến máu"
      cancelText="Huỷ"
      okText="Thêm"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
      }}
      open={open}
      confirmLoading={isPending}
      onCancel={onClose}
      modalRender={(dom) => (
        <Form
          layout="horizontal"
          form={form}
          name="basic"
          clearOnDestroy
          onFinish={(values) => handleSubmit(values)}
          wrapperCol={{ span: 19 }}
          labelCol={{ span: 7 }}
        >
          {dom}
        </Form>
      )}
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
          disabled={isPending}
          format={"DD/MM/YYYY"}
          className="w-full"
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
        <InputNumber
          disabled={isPending}
          min={1}
          max={1000}
          className="w-full"
        />
      </Form.Item>
    </Modal>,
    document.body
  );
}

export default CreateActivityModal;
