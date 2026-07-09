import UnitHeader from "@/components/UnitHeader";
import unitData from "@/data/unit1.json";

export default function Home() {
  return (
    <UnitHeader
      unitId={unitData.unitId}
      unitTitleEn={unitData.unitTitleEn}
      unitTitleHi={unitData.unitTitleHi}
      chapters={unitData.chapters}
    />
  );
}
