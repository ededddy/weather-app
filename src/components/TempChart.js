import React, { useState, useEffect } from "react";
import {
  FlexibleWidthXYPlot,
  DiscreteColorLegend,
  LineMarkSeries,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  Hint,
} from "react-vis";

export default function TempChart(props) {
  const [hoverData, setHoverData] = useState(null);
  const { data } = props;
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let maxData = [],
      fin = [],
      theData = [],
      minData = [];
    data.forEach((elem) => {
      maxData.push({ x: elem.date, y: elem.maxTemp });
      theData.push({ x: elem.date, y: elem.theTemp });
      minData.push({ x: elem.date, y: elem.minTemp });
    });
    fin.push({ title: "Max Temperature", data: maxData, disabled: false });
    fin.push({ title: "Temperature", data: theData, disabled: false });
    fin.push({ title: "Min Temperature", data: minData, disabled: false });
    setSeries(fin);
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  const formatHover = (d) => {
    return { Time: d.x.toISOString().substr(11, 5), Temperature: `${d.y}°C` };
  };

  const clickHandler = (item, i) => {
    const series_clone = [...series];
    series_clone[i].disabled = !series_clone[i].disabled;
    setSeries(series_clone);
  };
  if (loading) {
    return <div className="mx-auto">Loading ... </div>;
  }

  return (
    <div className="mx-8 my-2 flex flex-row">
      <DiscreteColorLegend
        class="w-2/12"
        onItemClick={clickHandler}
        items={series}
      />
      <FlexibleWidthXYPlot
        class="w-10/12"
        xType="time"
        height={300}
        onMouseLeave={() => setHoverData()}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis
          title="Time"
          tickFormat={function tickFormat(d) {
            return d.toISOString().substr(11, 5);
          }}
        />
        <YAxis title="Temperature (°C)" />
        {series.map((item, index) => (
          <LineMarkSeries
            key={index}
            data={item.data}
            opacity={series[index].disabled ? 0.2 : 1}
            onValueMouseOver={(d) => setHoverData(formatHover(d))}
          />
        ))}
        {hoverData && <Hint value={hoverData} />}
      </FlexibleWidthXYPlot>
    </div>
  );
}
