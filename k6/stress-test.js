import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// ====================================================================
// TESTE DE ESTRESSE (STRESS TEST) - BUGBANK
// Objetivo: Avaliar o comportamento do sistema sob carga extrema
// (além do tráfego normal), identificando o ponto de degradação,
// estabilidade sob pico de 80 VUs e a capacidade de recuperação (recovery).
// ====================================================================

export const options = {
  // Estágios de elevação progressiva de estresse
  stages: [
    { duration: '10s', target: 20 },  // 1. Aquecimento até carga operacional (20 VUs)
    { duration: '15s', target: 50 },  // 2. Estresse moderado além do esperado (50 VUs)
    { duration: '15s', target: 80 },  // 3. Pico de estresse extremo (80 VUs simultâneos)
    { duration: '10s', target: 0 },   // 4. Ramp-down / Avaliação de recuperação (0 VUs)
  ],

  // Critérios de Aceitação / Limiares de Estresse
  thresholds: {
    // Sob estresse extremo, 95% das requisições devem responder em menos de 2.5s
    http_req_duration: ['p(95)<2500'],
    // Tolera taxa de falhas inferior a 5% durante o estresse de pico
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  // 1. Requisição à página principal do BugBank
  const resHome = http.get('https://bugbank.netlify.app/');

  check(resHome, {
    'Home - Status code é 200 (OK)': (r) => r.status === 200,
    'Home - Tempo de resposta aceitável (<2500ms)': (r) => r.timings.duration < 2500,
    'Home - Conteúdo do BugBank carregado': (r) => r.body.includes('BugBank') || r.body.includes('banco'),
  });

  // 2. Pausa curta para simular ação do usuário sob alta concorrência
  sleep(0.5);

  // 3. Requisição concorrente à página de requisitos
  const resReqs = http.get('https://bugbank.netlify.app/requirements');

  check(resReqs, {
    'Requirements - Status code é 200 (OK)': (r) => r.status === 200,
    'Requirements - Tempo de resposta aceitável (<2500ms)': (r) => r.timings.duration < 2500,
  });

  // Pausa de 1 segundo antes da próxima iteração da VU
  sleep(1);
}

// ====================================================================
// GERAÇÃO AUTOMÁTICA DE RELATÓRIO VISUAL EM HTML
// ====================================================================
export function handleSummary(data) {
  return {
    'k6/reports/stress-test-relatorio.html': htmlReport(data),
  };
}

