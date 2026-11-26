
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.post("/track", async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket.remoteAddress;

    const userAgent = req.headers["user-agent"];
    const page = req.body.page;

    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const location = await response.json();

    const visitor = {
      ip,
      city: location.city,
      region: location.region,
      country: location.country_name,
      isp: location.org,
      page,
      userAgent,
      time: new Date()
    };

    console.log("Visitor:", visitor);

    res.json({ success: true, visitor });
  } catch (error) {
    console.error("Tracking error:", error.message);
    res.status(500).json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("Tracker running on port 5000");
});
