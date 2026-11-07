import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// ====================================================================
// TESTE DE PICO (SPIKE TEST) - BUGBANK
// Objetivo: Avaliar o comportamento, estabilidade e capacidade de
// recuperação instantânea da aplicação quando submetida a uma explosão
// súbita e agressiva de tráfego (ex: 0 para 100 usuários em 5 segundos),
// simulando eventos como Black Friday, push notifications ou campanhas virais.
// ====================================================================

export const options = {
  // Configuração do pico súbito de acessos (Spike)
  stages: [
    { duration: '5s', target: 2 },   // 1. Linha de base estável (2 usuários)
    { duration: '3s', target: 12 },  // 2. DISPARO DE PICO SÚBITO (salto de 6x em 3s)
    { duration: '15s', target: 12 }, // 3. Sustentação sob pressão do pico repentino
    { duration: '3s', target: 2 },   // 4. Queda brusca imediata (avaliação de recuperação instantânea)
    { duration: '4s', target: 0 },   // 5. Encerramento gradual
  ],

  // Critérios de Aceitação / SLAs de Resiliência sob Pico
  thresholds: {
    // 95% das requisições devem se manter abaixo de 1.5s durante o pico
    http_req_duration: ['p(95)<1500'],
    // Taxa de falhas tolerada abaixo de 2% durante a absorção do impacto
    http_req_failed: ['rate<0.02'],
  },
};

export default function () {
  // 1. Requisição direta à página principal sob explosão de tráfego
  const response = http.get('https://bugbank.netlify.app/');

  // 2. Checagens de integridade da resposta com navegação segura
  check(response, {
    'Status code é 200 (Sucesso)': (r) => r.status === 200,
    'Tempo de resposta aceitável sob pico (<2.0s)': (r) => r.timings.duration < 2000,
    'Página íntegra com conteúdo do BugBank': (r) =>
      Boolean(r && r.body && (r.body.includes('BugBank') || r.body.includes('banco'))),
  });

  // Pausa de 1s para simular leitura do usuário e permitir reuso eficiente de conexões
  sleep(1);
}

// ====================================================================
// GERAÇÃO AUTOMÁTICA DE RELATÓRIO VISUAL EM HTML
// ====================================================================
export function handleSummary(data) {
  return {
    'k6/reports/spike-test-relatorio.html': htmlReport(data),
  };
}

