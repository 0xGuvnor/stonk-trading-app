import axios from "axios";

const token = "cdc3qriad3i6ap45j9sgcdc3qriad3i6ap45j9t0";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: { token },
});
