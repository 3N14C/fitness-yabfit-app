export const useFormulaResult = ({
  u,
  b,
  j,
  ka,
  k,
  v,
  kb,
}: {
  u: number;
  b: number;
  j: number;
  ka: number;
  kb: number;
  k: number;
  v: number;
}) => {
  const resultU = v * ka;
  const resultB = v * kb;
  const resultJ = 1.4 * v;
  const resultK = u * 4 + b * 4 + j * 9;

  return { resultU, resultB, resultJ, resultK };
};
