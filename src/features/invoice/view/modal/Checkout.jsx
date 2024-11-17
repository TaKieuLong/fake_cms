import { Form, Image, Select, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../global/context/AuthenticationContext";

const { Title } = Typography;

export default function Checkout({ info }) {
  const form = Form.useFormInstance();
  const { profile } = useAuth();
  const [paymentType, setPaymentType] = useState(0);

  useEffect(() => {
    form.setFieldsValue({
      paymentType: 0,
    });
  }, [info, form]);

  const paymentTypeOptions = [
    { label: "Tiền mặt", value: 0, key: 0 },
    { label: "Ck ngân hàng", value: 1, key: 1 },
    { label: "Mã Momo", value: 2, key: 2 },
  ];

  const bankShortName = profile?.banks?.[0]?.bankShortName || "";
  const accountNumber = profile?.banks?.[0]?.accountNumber || "";

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value);
  };

  return (
    <div>
      <Form.Item name="paymentType" label="Chuyển sang" labelCol={{ span: 8 }}>
        <Select
          style={{ width: "100%" }}
          options={paymentTypeOptions}
          onChange={handlePaymentTypeChange}
        />
      </Form.Item>

      {paymentType === 1 && (
        <div style={{ padding: 10 }}>
          <div style={{ fontWeight: 500 }}> Quét mã Qr</div>
          <div style={{ textAlign: "center" }}>
            <Image
              width={400}
              src={`https://img.vietqr.io/image/${bankShortName}-${accountNumber}-compact.jpg?addInfo=${info?.remainingAmount}`}
              alt="Admin Account Image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
