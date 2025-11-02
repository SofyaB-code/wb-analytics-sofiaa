export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3Nzk1NTEzLCJpZCI6IjAxOWE0MTA2LTI2ZTUtNzExMC04YmQ2LTNmNzQ1OTg0ZDcwOCIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjo4MjQ0LCJzaWQiOiI3NmVmYzQ2OS1hODE1LTQ0YTItYjMyMS03MzM3MjlmNjQ2MGUiLCJ0IjpmYWxzZSwidWlkIjoyMDE1NDYxOX0.U33zwoONUb5eWKqDo38dV7yjRi7pDtAn2XSII7GNjMYtqNoF1aEaqsif0lfupiP9xI76Ns8KWbrC1zWJVXSx9A";

  const url = "https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod";

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 7);

  const dateFrom = start.toISOString().split("T")[0];
  const dateTo = today.toISOString().split("T")[0];

  try {
    const response = await fetch(`${url}?dateFrom=${dateFrom}&dateTo=${dateTo}&limit=100`, {
      headers: { Authorization: token }
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Ошибка Wildberries API (${response.status}): ${text}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Ошибка при запросе:", err.message);
    res.status(500).json({
      error: "Ошибка при запросе к Wildberries API",
      details: err.message
    });
  }
}
