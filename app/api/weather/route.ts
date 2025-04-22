export async function GET() {
  const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Nagoya&lang=ja`;

  const res = await fetch(url);
  const weather = await res.json();
  const conditionText: string = weather.current.condition.text;

  // 条件分岐で分類
  let simplifiedWeather = "晴れ";

  if (conditionText.includes("雪")) {
    simplifiedWeather = "雪";
  } else if (conditionText.includes("雨")) {
    simplifiedWeather = "雨";
  } else if (conditionText.includes("曇")) {
    simplifiedWeather = "曇り";
  }

  return Response.json({ weather: simplifiedWeather });
}