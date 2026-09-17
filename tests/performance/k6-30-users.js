import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    carga_30_usuarios: {
      executor: "per-vu-iterations",
      vus: 30,
      iterations: 1,
      maxDuration: "30s",
    },
  },

  thresholds: {
    http_req_failed: ["rate==0"],
    http_req_duration: [
      "p(95)<500",
      "max<500",
    ],
  },
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

  check(response, {
    "API respondeu 200": (r) => r.status === 200,
    "resposta abaixo de 500 ms": (r) => r.timings.duration < 500,
  });
}
