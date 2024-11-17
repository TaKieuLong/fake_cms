import LabelValue from "../../../../components/foundation/input/LabelValue";
import Format from "../../../../utils/format/Format.ts";

export default function Detail({ info }) {
  if (!info) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <div>
      <LabelValue label="Mã hóa đơn" value={info.invoiceCode} />
      <LabelValue
        label="Tổng đơn"
        value={`${Format.vndPrice(info.totalAmount)}`}
      />
      <LabelValue
        label="Đã thanh toán"
        value={`${Format.vndPrice(info.paidAmount)}`}
      />
      <LabelValue
        label="Còn lại"
        value={`${Format.vndPrice(info.remainingAmount)}`}
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
