import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueOverView = () => {
  // Dummy data for charts
  const monthlyData = [
    { month: 'Jan', revenue: 12500, ticketsSold: 245, ticketsAdded: 300 },
    { month: 'Feb', revenue: 15200, ticketsSold: 298, ticketsAdded: 350 },
    { month: 'Mar', revenue: 18700, ticketsSold: 367, ticketsAdded: 400 },
    { month: 'Apr', revenue: 16300, ticketsSold: 320, ticketsAdded: 380 },
    { month: 'May', revenue: 21400, ticketsSold: 421, ticketsAdded: 450 },
    { month: 'Jun', revenue: 24800, ticketsSold: 487, ticketsAdded: 520 },
  ];

  const categoryData = [
    { name: 'VIP', value: 35 },
    { name: 'Regular', value: 45 },
    { name: 'Student', value: 20 },
  ];

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981'];

  // Calculate totals
  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const totalTicketsSold = monthlyData.reduce((sum, item) => sum + item.ticketsSold, 0);
  const totalTicketsAdded = monthlyData.reduce((sum, item) => sum + item.ticketsAdded, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Revenue Overview</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform">
            <h3 className="text-purple-100 text-sm font-medium mb-2">Total Revenue</h3>
            <p className="text-4xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
            <p className="text-purple-200 text-sm mt-2">+12.5% from last period</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform">
            <h3 className="text-blue-100 text-sm font-medium mb-2">Total Tickets Sold</h3>
            <p className="text-4xl font-bold text-white">{totalTicketsSold.toLocaleString()}</p>
            <p className="text-blue-200 text-sm mt-2">+8.3% from last period</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform">
            <h3 className="text-green-100 text-sm font-medium mb-2">Total Tickets Added</h3>
            <p className="text-4xl font-bold text-white">{totalTicketsAdded.toLocaleString()}</p>
            <p className="text-green-200 text-sm mt-2">+15.2% from last period</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Bar Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tickets Line Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Tickets Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="ticketsSold" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="ticketsAdded" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Ticket Category Pie Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Tickets by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Combined Comparison Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Performance Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="ticketsSold" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="ticketsAdded" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverView;
