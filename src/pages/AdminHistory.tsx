import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { picanhaHistory } from '@/data/mockData';

const AdminHistory: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Histórico de Preços</h1>
        <p className="text-muted-foreground mt-2">Acompanhe a evolução dos preços ao longo do tempo</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução do Preço - Picanha</CardTitle>
          <CardDescription>
            Histórico de preços dos últimos meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={picanhaHistory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-muted-foreground"
                />
                <YAxis 
                  className="text-muted-foreground"
                  tickFormatter={(value) => `R$ ${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Preço']}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Histórico */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento do Histórico</CardTitle>
          <CardDescription>
            Valores registrados por período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Data</th>
                  <th className="text-right py-2">Preço</th>
                  <th className="text-right py-2">Variação</th>
                </tr>
              </thead>
              <tbody>
                {picanhaHistory.map((entry, index) => {
                  const previousPrice = index > 0 ? picanhaHistory[index - 1].price : entry.price;
                  const variation = entry.price - previousPrice;
                  const variationPercent = previousPrice !== 0 ? ((variation / previousPrice) * 100) : 0;
                  
                  return (
                    <tr key={index} className="border-b">
                      <td className="py-3 font-medium">{entry.date}</td>
                      <td className="py-3 text-right font-semibold">R$ {entry.price}</td>
                      <td className="py-3 text-right">
                        {index > 0 && (
                          <span className={`${variation < 0 ? 'text-green-600' : variation > 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {variation < 0 ? '↓' : variation > 0 ? '↑' : '='} 
                            {Math.abs(variationPercent).toFixed(1)}%
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHistory;