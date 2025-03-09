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
import { CollectionHeatmap } from '@/components/sneakers/CollectionHeatmap';

// Define colors for charts
const COLORS = [
  'hsl(213, 94%, 48%)', // primary
  'hsl(24, 100%, 62%)',  // accent
  'hsl(142, 72%, 50%)',  // success
  'hsl(38, 92%, 50%)',   // warning
  'hsl(0, 84%, 60%)',    // destructive
  'hsl(220, 8%, 46%)',   // muted-foreground
  'hsl(213, 94%, 68%)',  // primary (dark)
  'hsl(24, 100%, 72%)',  // accent (lighter)
  'hsl(142, 72%, 60%)',  // success (lighter)
  'hsl(38, 92%, 60%)',   // warning (lighter)
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
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your sneaker collection and statistics.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="w-full h-32 animate-pulse bg-muted" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sneakers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalSneakers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Items in your collection
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${totalValue.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Market value of collection
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${averageValue.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Per sneaker
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Most Valuable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${mostValuableSneaker?.market_value?.toFixed(2) || '0.00'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mostValuableSneaker?.name || 'No sneakers'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="brands">Brands</TabsTrigger>
              <TabsTrigger value="sizes">Sizes</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
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

            {/* Heatmap Tab */}
            <TabsContent value="heatmap" className="space-y-4">
              <CollectionHeatmap sneakers={sneakers} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
} 