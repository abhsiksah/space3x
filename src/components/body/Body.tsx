import React, { useEffect, useState } from "react";
import { Divider, Modal, Table, Tag } from "antd";
import { columns } from "./columns/Columns";
import "antd/dist/antd.css";
import "./style.css";
import moment from "moment";

interface BodyPropes {
  data: any[];
  loading: boolean;
}

enum Launch_Status_Enum {
  UPCOMING = "UPCOMING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

interface TableItems {
  key: string;
  No: number;
  Launched: string;
  Location: string;
  Mission: string;
  Orbit: string | null;
  Launch_Status: Launch_Status_Enum;
  Rocket: string;
}

const Body = ({ data, loading }: BodyPropes) => {
  const [loadingTable, setLoadingTable] = useState<boolean>(true);
  const [tableData, setTableData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<TableItems>();

  useEffect(() => {
    if (data.length === 0) {
      setLoadingTable(true);
    } else {
      setLoadingTable(false);

      let formattedData: any[] = [];

      data.forEach((item) => {
        formattedData.push({
          key: item.launch_date_utc,
          No: item.flight_number,
          Launched: item.launch_date_utc,
          Location: item.launch_site.site_name,
          Mission: item.mission_name,
          Orbit: item.rocket?.second_stage.payloads[0].orbit,
          Launch_Status: !item.upcoming
            ? item.launch_success
              ? Launch_Status_Enum.SUCCESS
              : Launch_Status_Enum.FAILED
            : Launch_Status_Enum.UPCOMING,
          Rocket: item.rocket.rocket_name,
        });
      });
      setTableData(formattedData);
    }
  }, [data]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalInnerBody = () => {
    let modalData = data.filter(
      (item) => modalContent?.No === item.flight_number
    );
    let modalObject = modalData[0];
    console.log(modalObject, "hey");
    let color = "";
    if (modalContent?.Launch_Status === "UPCOMING") {
      color = "yellow";
    } else if (modalContent?.Launch_Status === "SUCCESS") {
      color = "green";
    } else {
      color = "red";
    }

    let formattedData: any[] = [];
    data.forEach((item) => {
      formattedData.push({
        "Flight Number": item.flight_number,
        "Mission Name": item.mission_name,
        "Rocket Type": item.rocket.rocket_type,
        "Rocket Name": item.rocket.rocket_name,
        Manufacturer: item.rocket?.second_stage.payloads[0].manufacturer,
        Nationality: item.rocket?.second_stage.payloads[0].nationality,
        Orbit: item.rocket?.second_stage.payloads[0].orbit,
        "Payload type": item.rocket?.second_stage.payloads[0].payload_type,
        "Launch Date": moment(item.launch_date_utc).format(
          "MMMM Do YYYY, h:mm:ss a"
        ),
        "Launch Site": item.launch_site.site_name,
      });
    });

    let bottom_data_value = [];
    let bottom_data_object = formattedData[0];
    for (let i in bottom_data_object) {
      bottom_data_value.push({ [i]: bottom_data_object[i] });
    }

    return (
      <>
        <div className="modal_container">
          <div className="top">
            <div className="left-top">
              <img
                src={modalObject?.links?.mission_patch_small}
                alt="no-img"
              ></img>
            </div>
            <div className="middle-top">
              <span className="mission-name">{modalObject.mission_name}</span>
              <span className="rocket_name">
                {modalObject?.rocket.rocket_name}
              </span>
              <div className="icon-container">
                <a>scae3x</a>
                <a href={modalObject?.links.video_link} target="_blank">
                  youTube
                </a>
                <a href={modalObject?.links.wikipedia} target="_blank">
                  Wikipedia
                </a>
              </div>
            </div>
            <div className="right-top">
              <Tag color={color} style={{ borderRadius: "10px" }}>
                {modalContent?.Launch_Status}
              </Tag>
            </div>
          </div>
          <div className="middle">
            <span>
              {modalObject?.details}{" "}
              <a href={modalObject?.links.wikipedia} target="_blank">
                Wikipedia
              </a>
            </span>
          </div>
          <div className="bottom">
            {bottom_data_value.map((e) => {
              return (
                <>
                  <div className="bottom_elements_container">
                    <div className="bottom-elements1">
                      <div className="title-bottom-elem">{Object.keys(e)}</div>
                    </div>
                    <div className="bottom-elements2">
                      <div className="value-bottom-elem">
                        {Object.values(e)}
                      </div>
                    </div>
                  </div>

                  <Divider />
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          title={null}
        >
          {modalInnerBody()}
        </Modal>
      )}

      <div className="body_container">
        <div className="table_container">
          <Table
            onRow={(x) => {
              return {
                onClick: (event) => {
                  setModalContent(x);
                  setIsModalOpen(true);
                },
              };
            }}
            dataSource={tableData}
            columns={columns}
            loading={loadingTable}
          ></Table>
        </div>
      </div>
    </>
  );
};

export default Body;
