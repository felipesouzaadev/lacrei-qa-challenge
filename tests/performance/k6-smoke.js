import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const response = http.get(
    "https://api-staging.lacreisaude.com.br/v1/lacreisaude/professionals/",
    {
      headers: {
        Cookie: __ENV.LACREI_COOKIE,
        Accept: "application/json, text/plain, */*",
        Origin: "https://paciente-staging.lacreisaude.com.br",
        Referer: "https://paciente-staging.lacreisaude.com.br/",
      },
    }
  );

  console.log(
    `STATUS: ${response.status} | TEMPO: ${response.timings.duration} ms`
  );

  check(response, {
    "API respondeu 200": (r) => r.status === 200,
  });
}
