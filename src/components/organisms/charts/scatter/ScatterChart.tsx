import {
    CartesianGrid,
    LabelList,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useDarkMode } from '../../../../providers/DarkModeProvider';
import { FetchedSkill } from '../../../../utils/types';
import CustomTooltip from '../../../atoms/charts/scatter/CustomTooltip';
import RenderDot from '../../../atoms/charts/scatter/Dot';
import { useI18n } from '../../../../providers/I18nProvider';

export type SkillzScatterChartProps = {
    data: FetchedSkill[];
    color: string;
    axisLabels: boolean;
};

type SkillzScatterChartData = {
    x: number;
    y: number;
    z: number;
    skills: string[];
};

const SkillzScatterChart = ({
    data,
    color,
    axisLabels,
}: SkillzScatterChartProps) => {
    const { t } = useI18n();
    const { darkMode } = useDarkMode();

    // Merge all skill of same graduation into one point
    const formattedData: SkillzScatterChartData[] = data.reduce(
        (out: SkillzScatterChartData[], arr) => {
            const exist = out.findIndex(
                (elem) =>
                    elem.x === arr.skillLevel && elem.y === arr.desireLevel
            );

            if (exist >= 0) {
                out[exist].z += 1;
                out[exist].skills.push(arr.name);
            } else {
                out.push({
                    x: arr.skillLevel,
                    y: arr.desireLevel,
                    z: 1,
                    skills: [arr.name],
                });
            }

            return out;
        },
        [] as SkillzScatterChartData[]
    );

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                width={400}
                height={400}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid strokeDasharray="4 4" stroke={'#666'} />
                <XAxis
                    type="number"
                    dataKey="x"
                    allowDataOverflow={true}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    domain={[0, 5]}
                    interval={0}
                    padding={{ right: 40 }}
                    {...(axisLabels && {
                        label: {
                            value: t('graph.scatter.level'),
                            angle: 0,
                            position: 'bottom',
                            style: { fill: darkMode ? 'white' : 'black' },
                        },
                    })}
                />
                <YAxis
                    type="number"
                    dataKey="y"
                    allowDataOverflow={true}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    domain={[0, 5]}
                    interval={0}
                    padding={{ top: 40 }}
                    {...(axisLabels && {
                        label: {
                            value: t('graph.scatter.desire'),
                            angle: -90,
                            position: 'left',
                            style: { fill: darkMode ? 'white' : 'black' },
                        },
                    })}
                />
                <Tooltip
                    cursor={{
                        strokeDasharray: '4 4',
                        stroke: color,
                        strokeWidth: 3,
                    }}
                    content={<CustomTooltip />}
                    contentStyle={{ color: color }}
                />
                <Scatter
                    data={formattedData}
                    fill={color}
                    shape={<RenderDot />}
                >
                    <LabelList dataKey="z" fill={'white'} fontSize={10} />
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default SkillzScatterChart;
