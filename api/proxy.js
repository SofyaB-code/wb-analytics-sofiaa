export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3NzkzNDkxLCJpZCI6IjAxOWE0MGU3LTRhODYtN2FjZC1iYjZmLTM3YzA2YTJhOTk1MiIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjozNiwic2lkIjoiNzZlZmM0NjktYTgxNS00NGEyLWIzMjEtNzMzNzI5ZjY0NjBlIiwidCI6ZmFsc2UsInVpZCI6MjAxNTQ2MTl9.2eeMf19NeWvytRNjq127RuZOlDJI_NYWHu6nyT03k4gVoJCLRakVRcwIsA22NXAPEnXtnOu5u1sVV6Ws8Yc3ZA";
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
