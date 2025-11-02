export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3Nzk1NTEzLCJpZCI6IjAxOWE0MTA2LTI2ZTUtNzExMC04YmQ2LTNmNzQ1OTg0ZDcwOCIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjo4MjQ0LCJzaWQiOiI3NmVmYzQ2OS1hODE1LTQ0YTItYjMyMS03MzM3MjlmNjQ2MGUiLCJ0IjpmYWxzZSwidWlkIjoyMDE1NDYxOX0.U33zwoONUb5eWKqDo38dV7yjRi7pDtAn2XSII7GNjMYtqNoF1aEaqsif0lfupiP9xI76Ns8KWbrC1zWJVXSx9A";

  const apiUrl = "https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod";

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 7);

  const dateFrom = start.toISOString().split("T")[0];
  const dateTo = today.toISOString().split("T")[0];

  try {
    const fullUrl = ${apiUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}&limit=100;
    console.log("🔹 Запрос к WB:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      }
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("Ответ WB:", text);
      return res.status(response.status).json({
        error: Ошибка Wildberries API (${response.status}),
        message: text,
        debugUrl: fullUrl
      });
    }

    // Проверяем, JSON ли это
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Ответ не JSON: ${text.slice(0, 200)}`);
    }

    res.status(200).json(data);

  } catch (err) {
    console.error("Ошибка при запросе:", err);
    res.status(500).json({
      error: "Ошибка при выполнении запроса",
      details: err.message
    });
  }
}
