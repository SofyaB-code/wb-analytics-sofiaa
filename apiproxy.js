export default async function handler(req, res) {
  // 🔑 Твой токен WB
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3Nzk1NTEzLCJpZCI6IjAxOWE0MTA2LTI2ZTUtNzExMC04YmQ2LTNmNzQ1OTg0ZDcwOCIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjo4MjQ0LCJzaWQiOiI3NmVmYzQ2OS1hODE1LTQ0YTItYjMyMS03MzM3MjlmNjQ2MGUiLCJ0IjpmYWxzZSwidWlkIjoyMDE1NDYxOX0.U33zwoONUb5eWKqDo38dV7yjRi7pDtAn2XSII7GNjMYtqNoF1aEaqsif0lfupiP9xI76Ns8KWbrC1zWJVXSx9A";

  // 🔗 Эндпоинт статистики продаж
  const targetUrl = "https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod";

  // 🗓 Задаём диапазон дат (последние 7 дней)
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  const params = new URLSearchParams({
    dateFrom: weekAgo.toISOString().split("T")[0],
    dateTo: now.toISOString().split("T")[0],
    limit: "1000"
  });

  try {
    const response = await fetch(`${targetUrl}?${params.toString()}`, {
      headers: { Authorization: token }
    });

    const data = await response.json();

    // Если вернулся не массив — значит ошибка от API
    if (!Array.isArray(data)) {
      return res.status(400).json({
        error: "⚠️ Ответ не массив. Что вернуло API:",
        data
      });
    }

    // Всё ок — возвращаем данные
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      error: "Ошибка при запросе к Wildberries",
      details: err.message
    });
  }
}
