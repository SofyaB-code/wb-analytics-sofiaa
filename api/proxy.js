export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3NzkzMjEzLCJpZCI6IjAxOWE0MGUzLTBmYTMtN2IzMS1hZTNhLWNjN2E0ZDgxYjY0OSIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjo5MzQyLCJzaWQiOiI3NmVmYzQ2OS1hODE1LTQ0YTItYjMyMS03MzM3MjlmNjQ2MGUiLCJ0IjpmYWxzZSwidWlkIjoyMDE1NDYxOX0.1IGGokevrHIOOp4L1shiOxIKTCSkRInbsL6gNAqh-3X3vOjg_u14iEfxfK1xQLT5DQQlE0vJfkIpG39gI0u4Kw";
  const targetUrl = "https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod";

  const params = new URLSearchParams({
    dateFrom: "2025-10-01",
    dateTo: "2025-10-31",
    limit: "1000"
  });

  try {
    const response = await fetch(`${targetUrl}?${params.toString()}`, {
      headers: { Authorization: token }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при запросе к Wildberries", details: err.message });
  }
}
