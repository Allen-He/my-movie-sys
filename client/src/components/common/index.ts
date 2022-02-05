export const TAG_COLORS = ['red', 'magenta', 'volcano', 'pink', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'gold', 'lime'];

export const getRandomColor = (): string => {
  return TAG_COLORS[getRandomNum(0, TAG_COLORS.length)]
}

function getRandomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export const parseFilenameByUrl = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1);
}
