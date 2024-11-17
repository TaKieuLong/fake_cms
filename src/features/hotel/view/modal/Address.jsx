import { Cascader, Input, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Address = ({ setDetailAddress, setProvince, initialValue }) => {
  const [options, setOptions] = useState([]);
  const [currentProvince, setCurrentProvince] = useState([]);
  const [currentDetailAddress, setCurrentDetailAddress] = useState("");

  const fetchProvinces = async () => {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/p/");
      const provinceData = response.data.map((province) => ({
        label: province.name,
        value: province.code,
        isLeaf: false,
      }));
      setOptions(provinceData);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchDistricts = async (selectedOption) => {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${selectedOption.value}?depth=2`
      );
      selectedOption.children = response.data.districts.map((district) => ({
        label: district.name,
        value: district.code,
        isLeaf: false,
      }));
      setOptions([...options]);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchWards = async (selectedOption) => {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${selectedOption.value}?depth=2`
      );
      selectedOption.children = response.data.wards.map((ward) => ({
        label: ward.name,
        value: ward.code,
        isLeaf: true,
      }));
      setOptions([...options]);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    if (selectedOptions.length === 1) {
      await fetchDistricts(targetOption);
    } else if (selectedOptions.length === 2) {
      await fetchWards(targetOption);
    }

    targetOption.loading = false;
    setOptions([...options]);
  };

  useEffect(() => {
    if (initialValue) {
      const [detail, ...provinceParts] = initialValue.split(", ");
      setCurrentDetailAddress(detail);
      setCurrentProvince(provinceParts.reverse());
      setDetailAddress(detail);
      setProvince(provinceParts.reverse().join(", "));
    } else {
      setCurrentDetailAddress("");
      setCurrentProvince([]);
    }
  }, [initialValue]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Cascader
        options={options}
        loadData={loadData}
        onChange={(value, selectedOptions) => {
          const selectedNames = selectedOptions?.map((option) => option.label);
          const provinceAddress = selectedNames?.reverse().join(", ");
          setCurrentProvince(value);
          setProvince(provinceAddress);
        }}
        placeholder="Chọn Tỉnh/Thành, Quận/Huyện, Phường/Xã"
        changeOnSelect
        value={currentProvince?.length > 0 ? currentProvince : undefined}
        style={{ width: "100%" }}
      />

      <Input
        placeholder="Nhập địa chỉ (số nhà, đường)"
        onChange={(e) => {
          setCurrentDetailAddress(e.target.value);
          setDetailAddress(e.target.value);
        }}
        value={!!currentDetailAddress ? currentDetailAddress : undefined}
        style={{ width: "100%" }}
      />
    </Space>
  );
};

export default Address;
