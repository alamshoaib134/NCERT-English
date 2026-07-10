import UnitHeader from "@/components/UnitHeader";
import unit1Data from "@/data/unit1.json";
import unit2Data from "@/data/unit2.json";
import unit3Data from "@/data/unit3.json";
import unit4Data from "@/data/unit4.json";
import unit5Data from "@/data/unit5.json";

const allUnits = [unit1Data, unit2Data, unit3Data, unit4Data, unit5Data];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900">
      {allUnits.map((unit) => (
        <UnitHeader
          key={unit.unitId}
          unitId={unit.unitId}
          unitTitleEn={unit.unitTitleEn}
          unitTitleHi={unit.unitTitleHi}
          chapters={unit.chapters}
          isFirstUnit={unit.unitId === 1}
        />
      ))}
    </div>
  );
}
