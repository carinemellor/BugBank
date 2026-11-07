import http from 'k6/http';
import { check, sleep } from 'k6';

// ====================================================================
// SMOKE TEST (TESTE DE FUMAÇA) - BUGBANK
// Objetivo: Validar com carga mínima (1 usuário) se a aplicação está no ar
// e respondendo com rapidez antes de executar testes mais pesados.
// ====================================================================

export const options = {
  vus: 1,             // Apenas 1 Usuário Virtual
  duration: '10s',    // Duração de 10 segundos

  thresholds: {
    // 95% das requisições devem responder em menos de 800ms
    http_req_duration: ['p(95)<800'],
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
    'Tempo de resposta abaixo de 500ms': (r) => r.timings.duration < 500,
    'Conteúdo da página carregou corretamente': (r) => r.body.includes('BugBank') || r.body.includes('banco'),
  });

  // Pausa de 1 segundo entre as requisições
  sleep(1);
}
