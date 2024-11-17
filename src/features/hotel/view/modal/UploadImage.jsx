import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Button, message } from "antd";
import api from "../../../../api";

const UploadImage = ({ setImageUrl, initialFileList = [] }) => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialFileList.length > 0) {
      const formattedFileList = initialFileList.map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: "done",
        url: url,
      }));
      setFileList(formattedFileList);
      setImageUrl(initialFileList);
    }
  }, [initialFileList, setImageUrl]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const urls = newFileList
      .filter((file) => file.status === "done" || file.url)
      .map((file) => file.url || file.preview);
    setImageUrl(urls);
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    const newFiles = fileList.filter((file) => !file.url);
    newFiles.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    setLoading(true);
    try {
      const response = await api.post("api/v1/img/multi-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response && Array.isArray(response.urls)) {
        const updatedFileList = [
          ...fileList.filter((file) => file.url),
          ...response.urls.map((url, index) => ({
            uid: `new-${index}`,
            name: `uploaded-image-${index}.jpg`,
            status: "done",
            url: url,
          })),
        ];
        setFileList(updatedFileList);
        setImageUrl(updatedFileList.map((file) => file.url));
        message.success("Upload ảnh thành công!");
      } else {
        message.error("Không tìm thấy URL ảnh trong phản hồi.");
      }
    } catch (error) {
      message.error("Upload ảnh thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        multiple
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        {fileList.length >= 15 ? null : uploadButton}
      </Upload>
      <Button
        type="primary"
        onClick={handleUploadImage}
        disabled={fileList.length < 8 || loading}
        loading={loading}
      >
        {loading ? "Đang tải..." : "Tải ảnh lên"}
      </Button>
      <Image
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(""),
        }}
        src={previewImage}
        style={{ display: "none" }}
      />
    </>
  );
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default UploadImage;
