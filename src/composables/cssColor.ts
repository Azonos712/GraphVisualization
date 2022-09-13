const colorGenerator = () => {
  const max = 330;
  const min = 0;
  const step = 30;
  const colors = [];
  for (let i = min; i <= max; i += step) colors.push("hsl(" + i + ",65%,70%)");
  //33 цвета
  const colors33 = [
    ...colors.sort(() => Math.random() - 0.5),
    ...colors.sort(() => Math.random() - 0.7),
    ...colors.sort(() => Math.random() - 0.3),
  ];
  return [...colors33, ...colors33, ...colors33];
};

const colorsList = colorGenerator();

export const cssColor = () => {
  return { "--random-color": colorsList.pop() };
};
