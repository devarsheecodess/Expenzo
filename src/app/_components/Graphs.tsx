import { LineGraph } from "./(Graphs)/LineGraph";
import { BarGraph } from "./(Graphs)/BarGraph";

export default function Graphs() {
  return (
    <div className="flex gap-5">
      <LineGraph />
      <BarGraph />
    </div>
  );
}
