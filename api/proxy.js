export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3Nzk1NTEzLCJpZCI6IjAxOWE0MTA2LTI2ZTUtNzExMC04YmQ2LTNmNzQ1OTg0ZDcwOCIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjo4MjQ0LCJzaWQiOiI3NmVmYzQ2OS1hODE1LTQ0YTItYjMyMS03MzM3MjlmNjQ2MGUiLCJ0IjpmYWxzZSwidWlkIjoyMDE1NDYxOX0.U33zwoONUb5eWKqDo38dV7yjRi7pDtAn2XSII7GNjMYtqNoF1aEaqsif0lfupiP9xI76Ns8KWbrC1zWJVXSx9A";

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
