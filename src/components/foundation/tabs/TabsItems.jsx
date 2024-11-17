import { Card, Col, Row, Spin, Button } from "antd";
import React from "react";
import { BiBath } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { RiFullscreenFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function TabsItems({ data, loading, type }) {
  const navigate = useNavigate();

  const handleCardClick = (roomId) => {
    navigate(`/find?roomId=${roomId}`);
  };

  const handleClick = (type) => {
    if (type !== -1) {
      navigate(`/find?type=${type}`);
    } else {
      navigate(`/find`);
    }
  };

  return (
    <div>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {data.slice(0, 12).map((item) => (
              <Col
                xs={12}
                sm={12}
                md={8}
                lg={6}
                key={item._id}
                className="tabs"
              >
                <Card
                  hoverable
                  style={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s ease",
                  }}
                  className="tabs_card"
                  cover={
                    <img
                      src={item.images}
                      alt={item.name}
                      className="tabs_img"
                    />
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0, 0, 0, 0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)")
                  }
                >
                  <Meta
                    title={item.name}
                    description={
                      <div className="tabs_font">
                        <IoBedOutline style={{ marginRight: 3 }} />{" "}
                        {item.numBed} - <BiBath style={{ marginRight: 3 }} />
                        {item.numTolet} -{" "}
                        <RiFullscreenFill style={{ marginRight: 3 }} />
                        {item.acreage}
                        <Button
                          type="primary"
                          className="tabs_btn"
                          onClick={() => handleCardClick(item._id)}
                        >
                          Xem Chi tiết
                        </Button>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <div className="content" style={{ marginTop: 20 }}>
            <Button
              type="primary"
              onClick={() => handleClick(type)}
              style={{ height: 40, width: 150 }}
            >
              Xem thêm
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
