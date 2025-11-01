export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3Nzk1NTEzLCJpZCI6IjAxOWE0MTA2LTI2ZTUtNzExMC04YmQ2LTNmNzQ1OTg0ZDcwOCIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjo4MjQ0LCJzaWQiOiI3NmVmYzQ2OS1hODE1LTQ0YTItYjMyMS03MzM3MjlmNjQ2MGUiLCJ0IjpmYWxzZSwidWlkIjoyMDE1NDYxOX0.U33zwoONUb5eWKqDo38dV7yjRi7pDtAn2XSII7GNjMYtqNoF1aEaqsif0lfupiP9xI76Ns8KWbrC1zWJVXSx9A";

  // 🔥 Новый адрес API для отчётов
  const url = "https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod";

  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  const params = new URLSearchParams({
    dateFrom: weekAgo.toISOString().split("T")[0],
    dateTo: now.toISOString().split("T")[0],
    limit: "1000"
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      headers: { Authorization: token }
    });

    const data = await response.json();

    if (response.status === 404) {
      return res.status(404).json({
        error: "❌ Путь не найден. Проверь версию API или документацию WB.",
        link: "https://dev.wildberries.ru/openapi/api-information"
      });
    }

    if (response.status === 401) {
      return res.status(401).json({
        error: "🔒 Неверный токен или недостаточно прав",
        data
      });
    }

    return res.status(200).json({
      success: "✅ Данные получены успешно",
      count: Array.isArray(data) ? data.length : "Не массив",
      sample: Array.isArray(data) ? data.slice(0, 3) : data
    });
  } catch (err) {
    return res.status(500).json({
      error: "Ошибка при обращении к Wildberries API",
      details: err.message
    });
  }
}
