
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegionData } from "@/types";
import { Progress } from "@/components/ui/progress";

interface MapViewProps {
  data: RegionData[];
  title: string;
  description?: string;
}

export function MapView({ data, title, description }: MapViewProps) {
  return (
    <Card className="col-span-1 md:col-span-1 xl:col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-4">
          <img
            src="/lovable-uploads/e49acc87-cca4-41c3-aa46-bd659be7d380.png"
            alt="Map of Sales by Region"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="space-y-4">
          {data.map((region) => (
            <div key={region.region} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{region.region}</span>
                <span className="font-medium">{region.sales} ventas ({region.percentage}%)</span>
              </div>
              <Progress value={region.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
