
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesData } from "@/types";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface SalesChartProps {
  data: SalesData[];
  title: string;
  description?: string;
}

export function SalesChart({ data, title, description }: SalesChartProps) {
  const formattedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString('es-MX', { 
        day: '2-digit',
        month: 'short' 
      })
    }));
  }, [data]);

  return (
    <Card className="col-span-1 md:col-span-2 xl:col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00B1EA" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00B1EA" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFE600" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FFE600" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="formattedDate" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                domain={[0, 'auto']}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                domain={[0, 'auto']}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                name="Ventas" 
                yAxisId="left"
                stroke="#00B1EA" 
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name="Ingresos" 
                yAxisId="right"
                stroke="#FFE600" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#FFE600' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function SalesBarChart({ data, title, description }: SalesChartProps) {
  const formattedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString('es-MX', { 
        day: '2-digit',
        month: 'short' 
      })
    }));
  }, [data]);

  return (
    <Card className="col-span-1 md:col-span-1 xl:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="formattedDate" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
              />
              <Bar dataKey="sales" name="Ventas" fill="#00B1EA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
