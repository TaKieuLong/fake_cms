import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import useProfile from '../viewmodal/useProfile'

const VerifyEmailForm = (values) => {
  const{handleClickResend, isLoading} = useProfile()

  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (!canResend && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true); 
    }
  
    return () => clearInterval(timer);
  }, [canResend, countdown]);
  

  return (
    <>
      <Form.Item
        name="code"
        label="Hãy nhập mã xác thực"
        rules={[{ required: true, message: "Hãy nhập mã xác thực" }]}
      >
        <Row align="middle" style={{ display: "flex" }} gutter={[20, 20]}>
          <Col flex="auto">
            <Input placeholder="Nhập mã" id="code" />
          </Col>
          <Col>
            <Button
              loading={isLoading}
              type="link"
              onClick={async()=>{
                await handleClickResend(values.email)
                setCountdown(30)
                setCanResend(false)
              }}
              disabled={!canResend}
              style={{ padding: 0 }}
            >
              {canResend ? "Gửi lại mã" : `Gửi lại mã sau ${countdown}s`}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
        *Lưu ý: Nếu bạn không thấy email, hãy kiểm tra trong thư mục Hộp Thư
        Rác hoặc Spam.
      </p>
    </>
  );
};

export default VerifyEmailForm;
