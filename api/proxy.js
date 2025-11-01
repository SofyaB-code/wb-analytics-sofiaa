export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3NzkzOTAxLCJpZCI6IjAxOWE0MGVkLThjMWItN2U1My05NjVmLTUyZDY1ZWE4YzZjYyIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjozMiwic2lkIjoiNzZlZmM0NjktYTgxNS00NGEyLWIzMjEtNzMzNzI5ZjY0NjBlIiwidCI6ZmFsc2UsInVpZCI6MjAxNTQ2MTl9.KCEYJM3A6EgYjXr-cI2NC7sw1nbwAPaELnpQqkaI0_QsCtCa77JsAG8xumn8jviXJe6MCAR7Wr-NgwXXeFlj3w";

  const targetUrl = "https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod";

  const params = new URLSearchParams({
    dateFrom: "2025-10-01",
    dateTo: "2025-10-31",
    limit: "1000"
  });

  try {
    const response = await fetch(`${targetUrl}?${params.toString()}`, {
      headers: {
        Authorization: token
      }
    });

    const data = await response.json();

    if (!Array.isArray(data)) {
      res.status(400).json({ error: "Ответ не массив", details: data });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при запросе к Wildberries", details: err.message });
  }
}
