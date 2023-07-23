import "./App.css";
import { RouterProvider, createHashRouter, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

const router = createHashRouter([
  {
    path: "redirect/:name/:slug1/:slug2",
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
  const { name, slug1, slug2 } = useParams();
  const [color, setColor] = useState<CircularProgressColor>("inherit");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);
  const url = name + "://" + slug1 + "/" + slug2;
  function ManualButton() {
    if (error) {
      return (
        <Button
          onClick={() => window.open(url, "_blank")}
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
  }, []);
  return (
    <view>
      <CircularProgress size={128} color={color} />
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
      <h1 style={{ color: "white", textAlign: "center" }}>
        {"Opening " + name + " on your mobile device "}
      </h1>
      <h2>{feedback}</h2>
      <ManualButton />
    </view>
  );
}

export default App;
