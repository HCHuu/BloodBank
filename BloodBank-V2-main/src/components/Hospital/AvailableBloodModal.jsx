import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Badge,
  Checkbox,
  Divider,
  Form,
  Modal,
  Result,
  Spin,
  Typography,
} from "antd";
import { format } from "date-fns";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getBloodsByBloodType } from "../../services/apiBloods";
import { sendBloodToHospital } from "../../services/apiHospital";

const { Title, Text } = Typography;

function AvailableBloodModal({
  open,
  onClose,
  hospitalId,
  bloodType,
  requiredQuantity,
}) {
  const { userId } = useSelector((store) => store.user);
  const [form] = Form.useForm();
  let {
    data: bloods,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bloods", bloodType],
    queryFn: () => getBloodsByBloodType({ hospitalId: userId, bloodType }),
  });
  console.log(bloods);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => sendBloodToHospital(data),
    onSuccess: () => {
      toast.success("Chuyển máu thành công");
      form.resetFields();
      onClose();
    },
    onError: (e) => {
      toast.error("Không thể thực hiện hành động này");
    },
  });

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const onFinish = (values) => {
    mutate({
      bloods: values?.selectedItems,
      hospitalId: hospitalId,
      bloodType: bloodType,
    });
  };

  const isExpiringSoon = (date) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const differenceInDays = Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return differenceInDays <= 7;
  };

  const validateTotalQuantity = (_, values) => {
    if (!values || values.length === 0) {
      return Promise.reject(new Error("Chọn các bịch máu"));
    }

    const totalQuantity = values.reduce((sum, id) => {
      const blood = bloods.find((b) => b.id === id);
      return sum + (blood ? blood.quantity : 0);
    }, 0);

    if (totalQuantity < requiredQuantity) {
      return Promise.reject(
        new Error(
          `Tổng số lượng máu đã chọn (${totalQuantity}) phải lớn hơn hoặc bằng số lượng yêu cầu (${requiredQuantity})`
        )
      );
    }

    return Promise.resolve();
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <Result
            status="error"
            title="Tải dữ liệu không thành công"
            subTitle="Xin vui lòng kiểm tra lại tình trạng Internet của bạn."
          ></Result>
        </div>
      );
    }

    return (
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="selectedItems"
          rules={[
            {
              validator: validateTotalQuantity,
            },
          ]}
        >
          <Checkbox.Group
            className="no-scrollbar w-full"
            style={{ maxHeight: "50vh", overflowY: "auto" }}
          >
            {bloods?.map((item) => (
              <div key={item.id} className="mb-4 last:mb-0">
                <Checkbox
                  value={item.id}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <Badge
                        status={item.quantity > 5 ? "success" : "warning"}
                        text={
                          <Text className="mr-4 mb-2 sm:mb-0">
                            Số lượng: <Text strong>{item.quantity}</Text>
                          </Text>
                        }
                      />
                      <Text>
                        Hết hạn vào:{" "}
                        <Text
                          strong
                          type={
                            isExpiringSoon(item.expiryDate)
                              ? "danger"
                              : undefined
                          }
                        >
                          {format(new Date(item.expiryDate), "dd/MM/yyyy")}
                        </Text>
                        {isExpiringSoon(item.expiryDate) && (
                          <WarningOutlined className="ml-1 text-warning" />
                        )}
                      </Text>
                    </div>
                  </div>
                </Checkbox>
              </div>
            ))}
          </Checkbox.Group>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={
        <Title level={4}>
          Chọn các bịch máu của nhóm máu {bloodType}, yêu cầu:{" "}
          {requiredQuantity} ml
        </Title>
      }
      open={open}
      onClose={onClose}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Hủy"
      confirmLoading={isLoading}
      width={600}
    >
      <Spin spinning={isLoading || isPending}>{renderContent()}</Spin>
      {!error && (
        <>
          <Divider />
          <div className="flex justify-between items-center">
            <Text type="secondary">
              <CheckCircleOutlined className="mr-1" />
              Có thể chọn nhiều bịch máu
            </Text>
            <Text type="secondary">Tổng số lượng: {bloods?.length}</Text>
          </div>
        </>
      )}
    </Modal>
  );
}

export default AvailableBloodModal;
