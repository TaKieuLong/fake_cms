import { useMemo, useState } from "react";
import { Row, Col, Image, Card } from "antd";
import LabelValue from "../../../../components/foundation/input/LabelValue";
import Format from "../../../../utils/format/Format.ts";

export default function Detail({ info }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Trống";
      case 1:
        return "Đã đặt";
      case 2:
        return "Checkin";
      case 3:
        return "Checkout";
      case 4:
        return "Bảo trì";
      default:
        return "Không xác định";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 0:
        return "Hotel";
      case 1:
        return "Homestay";
      case 2:
        return "Vila";
      case 3:
        return "Checkout";
      default:
        return "Không xác định";
    }
  };

  const fileList = useMemo(() => {
    const images = [];

    if (info?.img && info.img.length > 0) {
      info.img.forEach((imgUrl, index) => {
        images.push({
          uid: index.toString(),
          name: `image-${index + 1}.jpg`,
          status: "done",
          url: imgUrl,
        });
      });
    }

    return images;
  }, [info]);

  const handlePreview = (file) => {
    setPreviewImage(file.url || "");
    setPreviewOpen(true);
  };

  if (!info) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <div className="detail">
      <Card title={info.name} style={{ textAlign: "center", marginBottom: 10 }}>
        {info.avatar && (
          <img
            src={info.avatar}
            alt={info.roomName}
            style={{
              width: 400,
              height: 150,
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() =>
              handlePreview({
                uid: `${info.roomName}`,
                url: `${info.avatar}`,
                name: `${info.roomName}`,
                status: "done",
              })
            }
          />
        )}
      </Card>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Card
            title="Thông tin lưu trú"
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <LabelValue
              label="Loại"
              value={getTypeLabel(info.type)}
              color="red"
            />
            <LabelValue
              label="Số sao"
              value={info.num === 0 ? "Chưa có đánh giá" : `${info.num} sao`}
              color="#faad14"
            />
            <LabelValue
              label="Trạng thái"
              value={getStatusLabel(info.status)}
              color="red"
            />
            <LabelValue label="Số người" value={info.people} />
            <LabelValue
              label="Giá"
              value={`${Format.vndPrice(info.price)} VNĐ`}
            />
            <LabelValue label="Số giường" value={info.numBed} />
            <LabelValue label="Số toilet" value={info.numTolet} />
            <LabelValue label="Địa chỉ" value={info.address} />
            <LabelValue
              label="Mô tả ngắn"
              value={info.shortDescription || "Không có"}
            />

            <LabelValue
              label="Nội thất"
              value={
                info.furniture?.length > 0
                  ? info.furniture.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index < info.furniture.length - 1 && ", "}
                      </span>
                    ))
                  : "Không có nội thất"
              }
              color="blue"
            />
            <LabelValue
              label="Ngày tạo"
              value={Format.formatFullDateTime(info.createAt)}
            />
            <LabelValue
              label="Ngày cập nhật"
              value={Format.formatFullDateTime(info.updateAt)}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Thông tin Người tạo"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: 5,
            }}
          >
            <LabelValue label="Người tạo" value={info.user?.name} />
            <LabelValue label="Email người tạo" value={info.user?.email} />
            <LabelValue
              label="Số điện thoại người tạo"
              value={info.user?.phoneNumber}
            />
          </Card>

          <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <LabelValue label="Mô tả" value={info.description || "Không có"} />
          </Card>
        </Col>
      </Row>

      {fileList.length > 0 && (
        <div>
          <strong>Hình ảnh</strong>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {fileList.map((file) => (
              <div key={file.uid} style={{ margin: "5px" }}>
                <img
                  src={file.url}
                  alt={file.name}
                  style={{
                    width: 200,
                    height: 150,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePreview(file)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}
