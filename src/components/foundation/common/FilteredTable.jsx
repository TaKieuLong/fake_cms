import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  Table,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import InputText from "../input/DebouncedInput";
import { IoReload } from "react-icons/io5";

const FilteredTableV2 = ({
  tableProps,
  submitProps = {
    title: "Tra cứu",
  },
  containerStyle,
  filters = [],
  onFinish,
  onChange,
  addTitleButtonProps = [],
  customFilterButtons = undefined,
  expandable,
  initialValues,
  showText,
  text,
  selectedRows: externalSelectedRows,
  selectedRowKeys: externalSelectedRowKeys,
  onSelectedRowsChange,
}) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    externalSelectedRowKeys || []
  );
  const [selectedRows, setSelectedRows] = useState(externalSelectedRows || []);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelectedRowKeys(externalSelectedRowKeys || []);
    setSelectedRows(externalSelectedRows || []);
  }, [externalSelectedRowKeys, externalSelectedRows]);

  const onFinalFinish = () => {
    let values = form.getFieldsValue();
    onFinish?.(values);
  };

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
    onSelectedRowsChange?.(newSelectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 30,
  };

  const finalTableProps = useMemo(() => {
    let finalTableProps = { ...tableProps };
    let pageSize = (tableProps?.pagination || {}).pageSize || 10;
    let page = (tableProps?.pagination || {}).current || 0;

    finalTableProps.columns = [
      {
        title: "STT",
        key: "stt",
        width: 60,
        render: (text, object, index) => (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {(page - 1) * pageSize + index + 1}
          </div>
        ),
      },
      ...tableProps.columns,
    ];
    return finalTableProps;
  }, [tableProps]);

  const renderFilterComponent = (filter) => {
    const {
      type = "string",
      title,
      inputProps,
      selectProps,
      options,
      priceProps,
      RangePickerProps,
    } = filter;
    if (type === "string") {
      return (
        <InputText
          onChange={(value) => {
            if (inputProps && inputProps.name) {
              form.setFieldsValue({
                [inputProps.name]: value,
              });
            }
          }}
          style={{ height: 36 }}
          size="small"
          placeholder={title}
        />
      );
    } else if (type === "options") {
      return (
        <Select
          {...selectProps}
          style={{ height: 36 }}
          size="small"
          options={options}
        />
      );
    } else if (type === "price") {
      return (
        <InputNumber
          {...priceProps}
          style={{ height: 36, width: "100%", padding: 5 }}
          placeholder={title}
          controls={false}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          size="small"
        />
      );
    } else if (type === "rangedate") {
      return (
        <DatePicker.RangePicker
          {...RangePickerProps}
          defaultValue={[
            dayjs(`${RangePickerProps?.defaultStartDate}`, "DD/MM/YYYY"),
            dayjs(`${RangePickerProps?.currentDate}`, "DD/MM/YYYY"),
          ]}
          allowEmpty={[false, true]}
          format="DD/MM/YYYY"
          style={{ height: 36, width: "100%" }}
          size="small"
          placeholder={["Từ ngày", "Đến ngày"]}
          onChange={(dates) => {
            const selectedDates = dates
              ? [dates[0], dates[1] || null]
              : [null, null];
            form.setFieldsValue({ dateRange: selectedDates });
          }}
        />
      );
    } else if (type === "rangedatePast") {
      return (
        <DatePicker.RangePicker
          {...RangePickerProps}
          defaultValue={[
            dayjs(RangePickerProps?.defaultStartDate).subtract(30, "day"),
            dayjs(RangePickerProps?.defaultEndDate),
          ]}
          allowEmpty={[false, true]}
          format="DD/MM/YYYY"
          style={{ height: 36, width: "100%" }}
          size="small"
          onChange={(dates) => {
            const selectedDates = dates
              ? [dates[0], dates[1] || null]
              : [null, null];
            form.setFieldsValue({ dateRange: selectedDates });
          }}
        />
      );
    }
  };

  const handleRowClick = (record) => {
    if (record.id === selected) {
      setSelected(null);
    } else {
      setSelected(record.id);
    }
  };

  return (
    <div
      style={{
        padding: 5,
        marginTop: 5,
        ...containerStyle,
      }}
      className={"full"}
    >
      <Form
        onValuesChange={onChange}
        className={"full"}
        form={form}
        initialValues={initialValues}
      >
        <Row
          gutter={8}
          style={{
            background: "white",
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          {filters.map((filter) => {
            const { name, title, type } = filter;
            const colSpan = type === "rangedate" ? 5 : 3;
            const labelColSpan = 24;
            return (
              <Col
                key={name}
                xs={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
                xl={{ span: 3 }}
                xxl={{ span: colSpan }}
              >
                <Form.Item
                  label={title}
                  name={name}
                  labelCol={{ span: labelColSpan }}
                >
                  {renderFilterComponent(filter)}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <Row
          className={"center full"}
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Button className="btn_color" onClick={onFinalFinish}>
            {submitProps.title}
          </Button>
          <Button className="btn_color" onClick={onFinalFinish}>
            <IoReload />
          </Button>

          {addTitleButtonProps.map((buttonProps, index) => (
            <Button
              key={index}
              className={buttonProps.className || "btn_color"}
              style={{
                ...buttonProps.style,
              }}
              onClick={() => buttonProps.onClick(form.getFieldsValue())}
              loading={buttonProps.loading}
              disabled={buttonProps.loading}
            >
              {buttonProps.title}
            </Button>
          ))}
          {customFilterButtons}
        </Row>
      </Form>

      <div className={`custom-override`}>
        {tableProps?.dataSource?.length ? (
          <Table
            {...finalTableProps}
            key="loading-done"
            rowKey="id"
            rowSelection={rowSelection}
            dataSource={tableProps.dataSource}
            onRow={(record) => {
              return {
                onClick: () => handleRowClick(record),
              };
            }}
            expandable={{
              defaultExpandAllRows: true,
            }}
            rowClassName={(record) =>
              record.id === selected ? "selected-row" : ""
            }
            virtual
          />
        ) : (
          <Table key="loading-not-done" />
        )}
      </div>
    </div>
  );
};

export default FilteredTableV2;
