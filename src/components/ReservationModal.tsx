import React, { FC } from "react";
import { DatePicker, Form, Input, Modal, ModalProps } from "antd";
import { useForm } from "antd/es/form/Form";
import locale from "antd/es/date-picker/locale/ru_RU";

interface IProps extends ModalProps {
  visible: boolean;
  onCancel: () => void;
  itemId: number | null;
  onSubmit: (itemId: number) => void;
}

export const ReservationModal: FC<IProps> = ({
  visible,
  onCancel,
  itemId,
  onSubmit,
  ...props
}) => {
  const [form] = useForm();
  const handleOk = () => {
    if (itemId !== null) {
      onSubmit(itemId);
    }
  };
  const resetHandler = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    // @ts-ignore
    <Modal
      title="Введите данные для брони"
      visible={visible}
      onOk={handleOk}
      okText="Забронировать"
      onCancel={handleCancel}
      cancelText="Отмена"
      okButtonProps={{
        form: "ReservationForm",
        htmlType: "submit",
      }}
      {...props}
      afterClose={resetHandler}
    >
      <Form layout="vertical" name="ReservationForm" form={form}>
        <Form.Item
          label="Фио"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Введите ФИО",
            },
          ]}
        >
          <Input placeholder="Введите ФИО" />
        </Form.Item>
        <Form.Item
          label="Номер телефона"
          name="number"
          rules={[
            {
              required: true,
              message: "Введите номер телефона",
            },
            {
              pattern: new RegExp(
                /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
              ),
              message: "Введите корректный номер телефона",
            },
          ]}
        >
          <Input placeholder="Введите номер телефона" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Введите Email",
            },
            {
              pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
              message: "Введите корректный email",
            },
          ]}
        >
          <Input placeholder="Введите Email" />
        </Form.Item>
        <Form.Item
          label="Срок бронирования"
          name="livingDate"
          rules={[
            {
              required: true,
              message: "Укажите срок бронирования",
            },
          ]}
        >
          <DatePicker.RangePicker locale={locale} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
