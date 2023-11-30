export const onBoarding = (name: string) => {
  return `<!DOCTYPE html>
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
      <h1>Welcome to ProductivityHub!</h1>
      <h2>Hi ${name},</h2>
      <p>We're thrilled to have you join our community of individuals striving for peak productivity and efficient task management. Get ready to embark on a journey that will transform the way you navigate your day.</p>
  
      <p><strong>To get started:</strong></p>
      <ol>
        <li><strong>Explore Task Mastery:</strong> Dive into our intuitive task management feature. Create, prioritize, and organize tasks effortlessly.</li>
        <li><strong>Boost Focus with Technique Timers:</strong> Optimize your work sessions with our Technique Timers. Inspired by proven methods, they'll help you maintain focus and productivity throughout your day.</li>
        <li><strong>Capture Ideas in the Notes Oasis:</strong> Need a creative space? The Notes Oasis is your go-to for capturing thoughts, ideas, and important details on the fly.</li>
        <li><strong>Uncover Insights with the Dashboard:</strong> Gain valuable insights into your productivity habits. Explore the Insights Dashboard to track trends and make informed decisions for continuous improvement.</li>
        <li><strong>Set Reminders for Success:</strong> Never miss a beat! Set personalized reminders for tasks and deadlines, ensuring you stay on top of your commitments.</li>
      </ol>
  
      <p>Thank you for choosing ProductivityHub. We're here to support you on your journey to mastering time, tasks, and achieving your goals with purpose.</p>
  
      <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:adityakumarverified@gmail.com<">adityakumarverified@gmail.com</a>.</p>
  
      <p>Here's to a more organized, efficient, and purposeful you!</p>
  
      <p>Best Regards,<br>The ProductivityHub Team</p>
    </div>
  </body>
  
  </html>`;
};
