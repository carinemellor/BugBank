import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// ====================================================================
// TESTE DE CARGA (LOAD TEST) - BUGBANK
// Objetivo: Avaliar o comportamento do sistema sob tráfego realista
// com subida e descida gradual de usuários virtuais (Ramp-up / Ramp-down).
// ====================================================================

export const options = {
  // Simulação de estágios de tráfego
  stages: [
    { duration: '10s', target: 5 },   // Sobe gradualmente para 5 usuários em 10s
    { duration: '20s', target: 20 },  // Mantém 20 usuários simultâneos por 20s
    { duration: '10s', target: 0 },   // Reduz gradualmente para 0 usuários
  ],

  // Critérios de Aceitação / SLAs de Qualidade
  thresholds: {
    // 95% das requisições devem responder em menos de 1.5s
    http_req_duration: ['p(95)<1500'],
    // Taxa de falhas deve ser inferior a 1%
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // 1. Requisição à página inicial
  const response = http.get('https://bugbank.netlify.app/');

  // 2. Validações da resposta
  check(response, {
    'Status code é 200 (Sucesso)': (r) => r.status === 200,
    'Tempo de resposta aceitável': (r) => r.timings.duration < 1500,
    'Página contém conteúdo do BugBank': (r) => r.body.includes('BugBank') || r.body.includes('banco'),
  });

  // Pausa de 1 segundo para simular o tempo de leitura do usuário
  sleep(1);
}

// ====================================================================
// GERAÇÃO AUTOMÁTICA DE RELATÓRIO VISUAL EM HTML
// ====================================================================
export function handleSummary(data) {
  return {
    'k6/reports/teste-carga-relatorio.html': htmlReport(data),
  };
}
