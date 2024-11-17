import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { useState, useEffect } from "react";
import api from "../../../../api";

function UploadAvatar({ setImageUrl, initialFile }) {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialFile) {
      setFileList([
        {
          uid: "-1",
          name: "avatar.jpg",
          status: "done",
          url: initialFile,
        },
      ]);
      setImageUrl(initialFile);
    }
  }, [initialFile, setImageUrl]);

  const handleUploadAvatar = async () => {
    if (fileList.length === 0 || !fileList[0].originFileObj) {
      message.error("Vui lòng chọn ảnh trước khi tải lên!");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);

    setLoading(true);

    try {
      const response = await api.post("api/v1/img/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response && response.url) {
        setImageUrl(response.url);
        message.success("Upload avatar thành công!");
      } else {
        message.error("Không tìm thấy URL ảnh trong phản hồi.");
      }
    } catch (error) {
      message.error("Upload ảnh thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  return (
    <>
      <Upload
        listType="picture"
        fileList={fileList}
        onChange={handleChange}
        showUploadList={{ showRemoveIcon: true }}
        maxCount={1}
        beforeUpload={() => false}
        disabled={loading}
      >
        <Button icon={<UploadOutlined />} disabled={loading}>
          Chọn ảnh
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUploadAvatar}
        loading={loading}
        disabled={fileList.length === 0}
      >
        {loading ? "Đang tải..." : "Tải ảnh lên"}
      </Button>
    </>
  );
}

export default UploadAvatar;
