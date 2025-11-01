export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3NzkzNjQ5LCJpZCI6IjAxOWE0MGU5LWI1MTUtN2U3ZS04N2I0LTgwYjJkYmUxMmM3OSIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjozMiwic2lkIjoiNzZlZmM0NjktYTgxNS00NGEyLWIzMjEtNzMzNzI5ZjY0NjBlIiwidCI6ZmFsc2UsInVpZCI6MjAxNTQ2MTl9.jf5k8I6WYHsR86ZUh6WnBYe9447Gn0GFFt15gOej4Wv4Dq8je-9akpaLhWj_KGhpiSNiX38gvMm-_H9-N0WBtA";
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
