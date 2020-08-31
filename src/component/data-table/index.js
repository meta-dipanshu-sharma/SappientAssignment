import React from "react";
import { Card, Col, Row, Button } from "antd";
import "./style.scss";
import "antd/dist/antd.css";

const DataTable = (props) => {
  const handleYearFilter = (value) => {
    props.handleYearFilter(value);
  };

  const handleLandFilter = (value) => {
    props.handleLandFilter(value);
  };

  const handleLaunchFilter = (value) => {
    props.handleLaunchFilter(value);
  };

  const createFilters = () => {
    return (
      <Card>
        <p>Filters</p>
        <section>
          <p>Launch year</p>
          <Row>
            {props.launchYear.map((year, key) => {
              return (
                <Col className="filterYear" key={key}>
                  <Button
                    className={
                      props.selectedLaunchYear === year ? "selected" : ""
                    }
                    onClick={() => handleYearFilter(year)}
                  >
                    {year}
                  </Button>
                </Col>
              );
            })}
          </Row>
        </section>

        <section>
          <p>Successful Launch</p>
          <Row>
            <Col style={{ width: "29%" }}>
              <Button
                className={props.launchSuccess === "true" ? "selected" : ""}
                onClick={() => handleLaunchFilter("true")}
              >
                True
              </Button>
            </Col>
            <Col style={{ width: "29%" }}>
              <Button
                className={props.launchSuccess === "false" ? "selected" : ""}
                onClick={() => handleLaunchFilter("false")}
              >
                False
              </Button>
            </Col>
          </Row>
        </section>

        <section>
          <p>Successful Landing</p>
          <Row>
            <Col style={{ width: "29%" }}>
              <Button
                className={props.landSuccess === "true" ? "selected" : ""}
                onClick={() => handleLandFilter("true")}
              >
                True
              </Button>
            </Col>
            <Col style={{ width: "29%" }}>
              <Button
                className={props.landSuccess === "false" ? "selected" : ""}
                onClick={() => handleLandFilter("false")}
              >
                False
              </Button>
            </Col>
          </Row>
        </section>
      </Card>
    );
  };

  const createCard = (data) => {
    return (
      data &&
      data.map((item, key) => {
        let missionIds = item.mission_id.length
          ? item.mission_id.map((id) => id)
          : "-";

        let successLanding = item.rocket.first_stage.cores[0].land_success
          ? `${item.rocket.first_stage.cores[0].land_success}`
          : "false";

        return (
          <Col key={key} className="data">
            <Card
              hoverable
              cover={<img alt="example" src={item.links.mission_patch} />}
            >
              <div className="details">
                <p>
                  {item.mission_name || "-"} #{item.flight_number}
                </p>
                <p>
                  Mission ids: <span>{missionIds}</span>
                </p>
                <p>
                  Launch Year: <span>{item.launch_year}</span>
                </p>
                <p>
                  Successful Launch:<span> {item.launch_success}</span>
                </p>
                <p>
                  Successful Landing: <span>{successLanding}</span>
                </p>
              </div>
            </Card>
          </Col>
        );
      })
    );
  };

  return (
    <Row>
      <Col className="filters">{createFilters()}</Col>
      <Col className="datatable">
        <Row>{createCard(props.data)}</Row>
      </Col>
    </Row>
  );
};

export default DataTable;
