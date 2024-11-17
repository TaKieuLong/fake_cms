import React from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const BoxImg = ({ src, alt, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/find?city=${alt}`);
  };

  return (
    <div
      style={{ position: "relative", marginBottom: 10, cursor: "pointer" }}
      onClick={handleClick}
      className="home_boximg"
    >
      <img
        alt={alt}
        src={src}
        style={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          borderRadius: "20px",
        }}
      />
      <Title
        level={4}
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          color: "white",
          backgroundColor: "rgb(0 0 0 / 34%)",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        {title}
      </Title>
    </div>
  );
};

export default BoxImg;
