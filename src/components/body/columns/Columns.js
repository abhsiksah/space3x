import { Tag } from "antd";
import moment from "moment";

export const columns = [
  {
    title: "No:",
    dataIndex: "No",
    key: "key",
  },
  {
    title: "Launched (UTC)",
    dataIndex: "Launched",
    key: "key",
    render: (Launched) => {
      return <span>{moment(Launched).format("MMMM Do YYYY, h:mm:ss a")}</span>;
    },
  },
  {
    title: "Location",
    dataIndex: "Location",
    key: "key",
  },
  {
    title: "Mission",
    dataIndex: "Mission",
    key: "key",
  },
  {
    title: "Orbit",
    dataIndex: "Orbit",
    key: "key",
  },
  {
    title: "Launch_Status",
    dataIndex: "Launch_Status",
    key: "key",

    render: (Launch_Status) => {
      let color = "";
      if (Launch_Status === "UPCOMING") {
        color = "yellow";
      } else if (Launch_Status === "SUCCESS") {
        color = "green";
      } else {
        color = "red";
      }
      return (
        <Tag color={color} style={{ borderRadius: "10px" }}>
          {Launch_Status}
        </Tag>
      );
    },

    filters: [
      {
        text: "UPCOMING",
        value: "UPCOMING",
      },
      {
        text: "SUCCESS",
        value: "SUCCESS",
      },
      {
        text: "FAILED",
        value: "FAILED",
      },
    ],
    onFilter: (value, record) => record.Launch_Status.startsWith(value),
    filterSearch: true,
    width: "20%",
  },
  {
    title: "Rocket",
    dataIndex: "Rocket",
    key: "key",
  },
];
