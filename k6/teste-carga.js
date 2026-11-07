import http from 'k6/http';
import { check, sleep } from 'k6';

// ====================================================================
// CONFIGURAÇÃO DO TESTE DE PERFORMANCE (k6)
// ====================================================================
export const options = {
  // Simulação de ramp-up (subida gradual de carga)
  stages: [
    { duration: '10s', target: 5 },   // Sobe para 5 usuários em 10 segundos
    { duration: '20s', target: 20 },  // Mantém 20 usuários por 20 segundos
    { duration: '10s', target: 0 },   // Reduz gradualmente para 0 usuários
  ],

  // Critérios de Aceitação / SLAs de Performance (Thresholds)
  thresholds: {
    // 95% das requisições devem responder em menos de 800ms
    http_req_duration: ['p(95)<800'],
    // Taxa de falhas deve ser inferior a 1%
    http_req_failed: ['rate<0.01'],
  },
};

// ====================================================================
// FLUXO DE EXECUÇÃO DO USUÁRIO VIRTUAL (VU)
// ====================================================================
export default function () {
  // 1. Requisição GET na página inicial do BugBank
  const response = http.get('https://bugbank.netlify.app/');

  // 2. Validações de resposta (Checks)
  check(response, {
    'Status code é 200 (Sucesso)': (r) => r.status === 200,
    'Tempo de resposta < 500ms': (r) => r.timings.duration < 500,
    'Página contém o título BugBank': (r) => r.body.includes('BugBank') || r.body.includes('banco'),
  });

  // Pausa de 1 segundo para simular o comportamento humano
  sleep(1);
}
