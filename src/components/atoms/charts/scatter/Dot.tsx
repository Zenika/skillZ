import { Dot } from "recharts";

const RenderDot = (value) => {
  return <Dot cx={value.cx} cy={value.cy} fill={value.fill} r={value.z * 6} />;
};

export default RenderDot;
