import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// ====================================================================
// SMOKE TEST (TESTE DE FUMAÇA) - BUGBANK
// Objetivo: Validar com carga mínima (1 usuário) se a aplicação está no ar
// e respondendo com estabilidade antes de executar testes mais pesados.
// ====================================================================

export const options = {
  vus: 1,             // 1 Usuário Virtual
  duration: '10s',    // Duração de 10 segundos

  thresholds: {
    // 95% das requisições devem responder em menos de 2 segundos (tolerância de rede/Netlify)
    http_req_duration: ['p(95)<2000'],
    // 100% das requisições devem ter sucesso (taxa de erro zero)
    http_req_failed: ['rate==0'],
  },
};

export default function () {
  // 1. Acessa a página inicial do BugBank
  const response = http.get('https://bugbank.netlify.app/');

  // 2. Validações da resposta
  check(response, {
    'Status code é 200 (Site no ar)': (r) => r.status === 200,
    'Página respondeu em tempo aceitável': (r) => r.timings.duration < 2000,
    'Conteúdo da página carregou corretamente': (r) => r.body.includes('BugBank') || r.body.includes('banco'),
  });

  // Pausa de 1 segundo entre requisições
  sleep(1);
}

// ====================================================================
// GERAÇÃO AUTOMÁTICA DE RELATÓRIO VISUAL EM HTML
// ====================================================================
export function handleSummary(data) {
  return {
    'k6/reports/smoke-test-relatorio.html': htmlReport(data),
  };
}
