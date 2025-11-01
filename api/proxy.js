export default async function handler(req, res) {
  const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc3Nzk1NTEzLCJpZCI6IjAxOWE0MTA2LTI2ZTUtNzExMC04YmQ2LTNmNzQ1OTg0ZDcwOCIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjo4MjQ0LCJzaWQiOiI3NmVmYzQ2OS1hODE1LTQ0YTItYjMyMS03MzM3MjlmNjQ2MGUiLCJ0IjpmYWxzZSwidWlkIjoyMDE1NDYxOX0.U33zwoONUb5eWKqDo38dV7yjRi7pDtAn2XSII7GNjMYtqNoF1aEaqsif0lfupiP9xI76Ns8KWbrC1zWJVXSx9A";

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 7);

  const dateFrom = start.toISOString().split("T")[0];
  const dateTo = today.toISOString().split("T")[0];

  const url =   font-weight: bold;
      margin-top: 20px;
      color: #444;
    }
    .error {
      color: red;
    }
    .success {
   

  try {
    const response = await fetch(url, {
      headers: { Authorization: token },
    });

    const data = await response.json();

    if (!response.ok) {
