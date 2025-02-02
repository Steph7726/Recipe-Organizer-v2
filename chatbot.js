async function askChatbot() {
  let input = document.getElementById("chat-input").value;
  let output = document.getElementById("chat-output");

  let response = await fetch(`https://api.openai.com/v1/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer sk-proj-f9ImsBNhg_sqgF7cZAn_Fyhq25yrzAqJTEgW_uNxep4VnsBk0Qjm-PYouRHGomJMhjJ6YRZn4aT3BlbkFJJaV0McvyTxhHNi9Z_N3KTZ4KedJXcuaUFiUSlTyOS9-9t_sh97iP7jBNI_REq9M5rCwKPJom8A`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Suggest a recipe using: ${input}`,
      max_tokens: 50,
    }),
  });

  let data = await response.json();
  output.innerHTML = data.choices[0].text;
}
