
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminTabs } from "@/components/admin/AdminTabs";

const Dashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminTabs />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
