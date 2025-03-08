'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { getSneakers } from '@/lib/supabase';
import { Sneaker } from '@/lib/schema';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Define colors for charts
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
  '#82CA9D', '#FFC658', '#8DD1E1', '#A4DE6C', '#D0ED57'
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function loadSneakers() {
      if (user) {
        // Get all sneakers (not wishlist items)
        const data = await getSneakers(user.id, false);
        setSneakers(data as Sneaker[]);
      }
      setLoading(false);
    }

    loadSneakers();
  }, [user]);

  // Calculate collection statistics
  const totalSneakers = sneakers.length;
  const totalValue = sneakers.reduce((sum, sneaker) => sum + (sneaker.market_value || 0), 0);
  const averageValue = totalSneakers > 0 ? totalValue / totalSneakers : 0;
  
  // Find most valuable sneaker
  const mostValuableSneaker = sneakers.length > 0 
    ? sneakers.reduce((prev, current) => 
        (prev.market_value || 0) > (current.market_value || 0) ? prev : current
      ) 
    : null;

  // Calculate brand distribution
  const brandDistribution = sneakers.reduce((acc, sneaker) => {
    const brand = sneaker.brand;
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const brandChartData = Object.entries(brandDistribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Calculate size distribution
  const sizeDistribution = sneakers.reduce((acc, sneaker) => {
    const size = sneaker.size.toString();
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sizeChartData = Object.entries(sizeDistribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => parseFloat(a.name) - parseFloat(b.name));

  // Calculate condition distribution
  const conditionMap: Record<string, string> = {
    'new': 'New/Deadstock',
    'like_new': 'Like New',
    'good': 'Good',
    'fair': 'Fair',
    'poor': 'Poor'
  };

  const conditionDistribution = sneakers.reduce((acc, sneaker) => {
    const condition = conditionMap[sneaker.condition] || sneaker.condition;
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const conditionChartData = Object.entries(conditionDistribution)
    .map(([name, value]) => ({ name, value }));

  // Calculate value by brand
  const valueByBrand = sneakers.reduce((acc, sneaker) => {
    const brand = sneaker.brand;
    acc[brand] = (acc[brand] || 0) + (sneaker.market_value || 0);
    return acc;
  }, {} as Record<string, number>);

  const valueByBrandData = Object.entries(valueByBrand)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value);

  // Calculate purchase history by month
  const purchaseHistory = sneakers.reduce((acc, sneaker) => {
    if (sneaker.purchase_date) {
      const date = new Date(sneaker.purchase_date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      
      if (!acc[key]) {
        acc[key] = {
          month: key,
          count: 0,
          value: 0
        };
      }
      
      acc[key].count += 1;
      acc[key].value += sneaker.purchase_price || 0;
    }
    return acc;
  }, {} as Record<string, { month: string; count: number; value: number }>);

  const purchaseHistoryData = Object.values(purchaseHistory)
    .sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Collection Dashboard</h1>
        <p className="text-muted-foreground">Analytics and insights for your sneaker collection</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="sizes">Sizes</TabsTrigger>
          <TabsTrigger value="value">Value</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Sneakers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSneakers}</div>
                <p className="text-xs text-muted-foreground">items in your collection</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">estimated market value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${averageValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                <p className="text-xs text-muted-foreground">per sneaker</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Most Valuable</CardTitle>
              </CardHeader>
              <CardContent>
                {mostValuableSneaker ? (
                  <>
                    <div className="text-2xl font-bold">${(mostValuableSneaker.market_value || 0).toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground truncate">
                      {mostValuableSneaker.brand} {mostValuableSneaker.model} {mostValuableSneaker.name}
                    </p>
                  </>
                ) : (
                  <div className="text-muted-foreground">No data</div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle>Brands</CardTitle>
                <CardDescription>Distribution by brand</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={brandChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {brandChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} sneakers`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle>Condition</CardTitle>
                <CardDescription>Distribution by condition</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conditionChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {conditionChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} sneakers`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Sizes</CardTitle>
                <CardDescription>Distribution by size</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sizeChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} sneakers`, 'Count']} />
                    <Bar dataKey="value" fill="#8884d8">
                      {sizeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Distribution</CardTitle>
              <CardDescription>Number of sneakers by brand</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={brandChartData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 80,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => [`${value} sneakers`, 'Count']} />
                  <Bar dataKey="value" fill="#8884d8">
                    {brandChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Value by Brand</CardTitle>
              <CardDescription>Total value of sneakers by brand</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={valueByBrandData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 80,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => [`$${value}`, 'Value']} />
                  <Bar dataKey="value" fill="#82ca9d">
                    {valueByBrandData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sizes Tab */}
        <TabsContent value="sizes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Size Distribution</CardTitle>
              <CardDescription>Number of sneakers by size</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sizeChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} sneakers`, 'Count']} />
                  <Bar dataKey="value" fill="#8884d8">
                    {sizeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Value Tab */}
        <TabsContent value="value" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Value Distribution</CardTitle>
                <CardDescription>Sneakers by value range</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {sneakers.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: '$0-100', value: sneakers.filter(s => (s.market_value || 0) <= 100).length },
                          { name: '$101-200', value: sneakers.filter(s => (s.market_value || 0) > 100 && (s.market_value || 0) <= 200).length },
                          { name: '$201-500', value: sneakers.filter(s => (s.market_value || 0) > 200 && (s.market_value || 0) <= 500).length },
                          { name: '$501-1000', value: sneakers.filter(s => (s.market_value || 0) > 500 && (s.market_value || 0) <= 1000).length },
                          { name: '$1000+', value: sneakers.filter(s => (s.market_value || 0) > 1000).length },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1, 2, 3, 4].map((index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} sneakers`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 Most Valuable Sneakers</CardTitle>
                <CardDescription>Highest value items in your collection</CardDescription>
              </CardHeader>
              <CardContent>
                {sneakers.length > 0 ? (
                  <div className="space-y-4">
                    {sneakers
                      .sort((a, b) => (b.market_value || 0) - (a.market_value || 0))
                      .slice(0, 5)
                      .map((sneaker, index) => (
                        <div key={sneaker.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{sneaker.brand} {sneaker.model}</p>
                              <p className="text-sm text-muted-foreground">{sneaker.name}</p>
                            </div>
                          </div>
                          <div className="font-bold">${(sneaker.market_value || 0).toLocaleString()}</div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>Sneakers purchased by month</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {purchaseHistoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={purchaseHistoryData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" name="Number of Sneakers" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="value" name="Total Spent ($)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No purchase history data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 