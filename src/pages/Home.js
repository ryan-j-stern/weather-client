import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import io from "socket.io-client";

function Home() {
  const [dataArray, setDataArray] = useState([]);
  const serverUrl = process.env.SERVER_URL;

  useEffect(() => {
    const socket = io.connect(serverUrl);
    socket.on("timeline", data => {
      console.log(data);
      setDataArray(state => [data, ...state]);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1>Weather Request Timeline</h1>
      <List style={{ width: "80%" }}>
        {dataArray.map(item => {
          return (
            <div>
              <ListItem style={styles.card}>
                <Typography variant="h5">{item.user}</Typography>
                <div style={styles.message}>
                  <ListItemText>{item.weatherMsg}</ListItemText>
                </div>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );
}

const styles = {
  message: {
    justifyContent: "center",
    marginTop: "15px"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: "25px"
  }
};

export default Home;
