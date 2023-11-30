export const taskReminder = (
  name: string | null,
  title: string | null,
  time: string | null,
  description: string | null
) => {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333;
    }

    p {
      color: #666;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #3498db;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Task Reminder: Complete Important Task</h1>
    <p>Hi ${name},</p>

    <p>This is a friendly reminder about an important task you scheduled on ProductivityHub. The details are as follows:</p>

    <p><strong>Task:</strong> ${title}</p>
    <p><strong>Due Date:</strong> ${time}</p>

    <p>Please ensure you allocate the necessary time to complete this task and mark it as done once finished.</p>

    <p><strong>Task Details:</strong></p>
    <p>${description}</p>

    <p>Thank you for using ProductivityHub to stay organized. If you have any questions or need assistance, feel free to reach out.</p>

    <p>Best Regards,<br>The ProductivityHub Team</p>
  </div>
</body>

</html>

  `;
};
