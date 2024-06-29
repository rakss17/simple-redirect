import "./App.css";
import { RouterProvider, createHashRouter, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

const router = createHashRouter([
  {
    path: "redirect/:name/:slug1/:slug2/:slug3/:slug4",
    element: <RedirectPage />,
  },
]);
type CircularProgressColor =
  | "success"
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "warning";

function App() {
  return <RouterProvider router={router} />;
}
function RedirectPage() {
  const forbid_web_links = true;
  // eslint-disable-next-line prefer-const
  let { name, slug1, slug2, slug3, slug4 } = useParams(); // URL Params
  if (name === "exp") {
    name = "exp://192.168.1.17:8081/--/";
  } else {
    name += "://";
  }

  const [color, setColor] = useState<CircularProgressColor>("inherit"); // Spinner color
  const [feedback, setFeedback] = useState(
    "Opening " + name + " on your mobile device "
  ); // Feedback to display to user
  const [error, setError] = useState(false);
  const [forbidden, setForbidden] = useState(false); // If link is forbidden (HTTP/HTTPS)
  const [checked, setChecked] = useState(false); // If linked has been checked already
  let url = "";
  if (name && slug1 && slug2 && slug3 && slug4) {
    url = name + slug1 + "/" + slug2 + "?slug3=" + slug3 + "&slug4=" + slug4; // URL to redirect to
  }
  function ManualButton() {
    if (error) {
      return (
        <Button
          onClick={() => {
            window.open(url, "_blank");
            console.log("uid and token", slug3, slug4);
          }}
          size="large"
          variant="contained"
        >
          Open Link
        </Button>
      );
    }
    return <view />;
  }
  useEffect(() => {
    if (
      (name === "http" ||
        name === "HTTP" ||
        name === "https" ||
        name === "HTTPS") &&
      forbid_web_links
    ) {
      setFeedback("Simple redirect is not allowed to redirect HTTP links");
      setColor("error");
      setForbidden(true);
    }
    if (!forbidden && checked) {
      setTimeout(() => {
        window.open(url, "_blank");
      }, 2000);
      setTimeout(() => {
        setColor("warning");
        setFeedback("Link redirection is taking longer than usual");
      }, 3000);
      setTimeout(() => {
        setColor("error");
        setFeedback(
          "Unable to open link automatically. Please open using the link below"
        );
        setError(true);
      }, 5000);
    }
    setChecked(true);
  }, [forbidden, name, url, checked, forbid_web_links]);
  return (
    <view>
      <CircularProgress size={error ? 128 : 0} color={color} />
      <view
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h5>{"URL Payload 1:" + slug1}</h5>
        <view style={{ padding: 16 }} />
        <h5>{"URL Payload 2:" + slug2}</h5>
      </view>
      <h5>{"URL Payload 3:" + slug3}</h5>
      <h5>{"URL Payload 4:" + slug4}</h5>
      <h2 style={{ color: "white", textAlign: "center" }}>{feedback}</h2>
      <ManualButton />
    </view>
  );
}

export default App;
