import NiceModal, { antdModal, useModal } from "@ebay/nice-modal-react";
import { Button, Form, Modal } from "antd";
import { useCallback, useMemo } from "react";

export default NiceModal.create((props) => {
  const modal = useModal();
  const [form] = Form.useForm();

  const handleSubmit = useCallback(() => {
    form
      .validateFields()
      .then(() => {
        modal.resolve(form.getFieldsValue());
        modal.hide();
      })
      .catch((error) => {});
  }, [modal, form]);

  const handleCancel = useCallback(() => {
    modal.reject(new Error("USER_CANCEL"));
    modal.hide();
  }, [modal]);

  const generateFooter = useMemo(() => {
    let footer = [];
    if (props.footer) {
      props.footer.forEach((e) => {
        footer.push(
          <Button
            className="btn_color"
            key={e.title}
            type={e.type}
            htmlType={e.htmlType}
            onClick={() => {
              if (e.onClick) {
                e.onClick(form.getFieldsValue());
              } else if (e.htmlType === "submit") {
                handleSubmit();
              } else {
                handleCancel();
              }
            }}
          >
            {e.title}
          </Button>
        );
      });
    }

    return footer.length > 0 ? footer : undefined;
  }, [props, form, handleSubmit, handleCancel]);

  return (
    <Modal
      {...antdModal(modal)}
      title={props.title}
      okText={props.title}
      className={props.className}
      onOk={handleSubmit}
      onCancel={handleCancel}
      footer={generateFooter}
    >
      <Form form={form}>{props.children}</Form>
    </Modal>
  );
});
