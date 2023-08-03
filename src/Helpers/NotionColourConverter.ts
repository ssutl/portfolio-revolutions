export type colorKeys =
  | "yellow"
  | "gray"
  | "brown"
  | "orange"
  | "red"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "default";

const colorConvert = (color: colorKeys) => {
  const colorMap: { [key in colorKeys]: string } = {
    yellow: "#DFAB01",
    gray: "#9B9A97",
    brown: "#64473A",
    orange: "#D9730D",
    red: "#E03E3E",
    green: "#0F7B6C",
    blue: "#0B6E99",
    purple: "#6940A5",
    pink: "#AD1A72",
    default: "#37352F",
  };

  return colorMap[color];
};

export default colorConvert;
