/**
 * @description Formata uma data para o formato curto internacionalizado.
 *
 * @param {string|Date} date - A data a ser formatada. Pode ser uma string ou um objeto Date.
 * @returns {string} A data formatada no estilo curto ou "-" se a data for inválida.
 *
 * @example
 * smallFormatDateToIntl("2023-10-05"); // Retorna "05/10/2023"
 */
export const smallFormatDateToIntl = (date) => {
  if (!date || date === "") return "-";

  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
    new Date(date)
  );
};

/**
 * @description Formata uma data para o formato médio internacionalizado.
 *
 * @param {string|Date} date - A data a ser formatada. Pode ser uma string ou um objeto Date.
 * @returns {string} A data formatada no estilo médio ou "-" se a data for inválida.
 *
 * @example
 * mediumFormatDateToIntl("2023-10-05"); // Retorna "5 de out. de 2023"
 */
export const mediumFormatDateToIntl = (date) => {
  if (!date || date === "") return "-";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
  }).format(new Date(date));
}

/**
 * @description Formata uma data para o formato longo internacionalizado.
 *
 * @param {string|Date} date - A data a ser formatada. Pode ser uma string ou um objeto Date.
 * @returns {string} A data formatada no estilo longo ou "-" se a data for inválida.
 *
 * @example
 * longFormatDateToIntl("2023-10-05"); // Retorna "5 de outubro de 2023"
 */
export const longFormatDateToIntl = (date) => {
  if (!date || date === "") return "-";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(new Date(date));
}

/**
 * @description Manipula um token de autenticação, removendo o prefixo "Bearer ".
 *
 * @param {string} token - O token de autenticação.
 * @returns {string} O token sem o prefixo "Bearer " ou uma string vazia se o token for inválido.
 *
 * @example
 * handleToken("Bearer apo7gmNV"); // Retorna "apo7gmNV"
 */
export const handleToken = (token) => {
  if (!token || token === "") return "";
  return token.split(" ")[1];

}

/**
 * @description Formata um código de disciplina para o formato "XXX9999", onde "XXX" são os três primeiros caracteres do nome da disciplina em maiúsculo e "9999" é o código da disciplina.
 *
 * @param {Object} disciplina - O objeto da disciplina.
 * @returns {string} O código formatado da disciplina.
 *
 * @example
 * const disciplina = {
 *   nome: "Programação Web",
 *   codigo: "1234"
 * };
 * formatCodigo(disciplina); // Retorna "PRO1234"
 */
export const formatCodigo = (disciplina) => {
  return `${disciplina.nome.substring(0, 3).toUpperCase()}${disciplina.codigo}`;
};
