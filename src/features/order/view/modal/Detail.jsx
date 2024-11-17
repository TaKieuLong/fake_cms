import LabelValue from "../../../../components/foundation/input/LabelValue";
import Format from "../../../../utils/format/Format.ts";
export default function Detail({ info }) {
  if (!info) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <div>
      <LabelValue label="SĐT khách hàng" value={info.user.phoneNumber} />
      <LabelValue label="Email khách hàng" value={info.user.email} />
      <LabelValue
        label="Giá"
        value={`${Format.vndPrice(info.price)}`}
        color="red"
      />
      <LabelValue
        label="Trạng thái"
        value={info.status === 0 ? "Chưa xác nhận" : "Đã xác nhận"}
        color="red"
      />
      <LabelValue label="Ngày check-in" value={info.checkInDate} />
      <LabelValue label="Ngày check-out" value={info.checkOutDate} />
      {info?.room?.length > 0 && (
        <LabelValue
          label="Tên phòng"
          value={info.room.map((r) => r.roomName).join(", ")}
        />
      )}

      {info.holidayPrice !== 0 && (
        <LabelValue
          label="Giá tăng ngày lễ"
          value={`${Format.vndPrice(info.holidayPrice)}`}
        />
      )}
      {info.checkInRushPrice !== 0 && (
        <LabelValue
          label="Phí đặt cận ngày"
          value={`${Format.vndPrice(info.checkInRushPrice)} `}
        />
      )}
      {info.soldOutPrice !== 0 && (
        <LabelValue
          label="Giá phòng giới hạn"
          value={`${Format.vndPrice(info.soldOutPrice)} `}
        />
      )}
      {info.discountPrice !== 0 && (
        <LabelValue
          label="Giảm giá"
          value={`${Format.vndPrice(info.discountPrice)} `}
        />
      )}
      <LabelValue
        label=" Tổng tiền"
        value={`${Format.vndPrice(info.totalPrice)}`}
      />
      <LabelValue
        label="Ngày tạo"
        value={Format.formatFullDateTime(info.createdAt)}
      />
      <LabelValue
        label="Ngày cập nhật"
        value={Format.formatFullDateTime(info.updatedAt)}
      />
    </div>
  );
}
