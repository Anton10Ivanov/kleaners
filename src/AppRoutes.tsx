import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface RouteItemProps {
  path: string;
  component: string;
  description?: string;
  children?: RouteItemProps[];
}

const RouteItem = ({ path, component, description, children }: RouteItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = children && children.length > 0;
  
  return (
    <div className="border-l-2 border-gray-200 pl-4 py-2">
      <div className="flex items-start">
        <div 
          className={`cursor-pointer flex items-center ${hasChildren ? 'text-primary font-medium' : ''}`}
          onClick={() => hasChildren && setIsOpen(!isOpen)}
        >
          {hasChildren && (
            <ChevronRight className={`h-4 w-4 mr-1 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          )}
          <span className="text-sm">{path}</span>
        </div>
        <span className="mx-2 text-sm text-muted-foreground">→</span>
        <span className="text-sm text-blue-600">{component}</span>
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground mt-1 mb-2">{description}</p>
      )}
      
      {hasChildren && isOpen && (
        <div className="mt-2 ml-2">
          {children.map((child, idx) => (
            <RouteItem key={idx} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};

const AppRoutes = () => {
  const routes: RouteItemProps[] = [
    {
      path: "/",
      component: "Index",
      description: "Home page with service overview",
      children: [
        { path: "/contact", component: "Contact", description: "Contact form and information" },
        { path: "/join-team", component: "JoinTeam", description: "Provider application page" },
        { path: "/auth/login", component: "Login", description: "User authentication" },
        { path: "/auth/signup", component: "Signup", description: "New user registration" },
        { path: "/auth/verify-provider", component: "VerifyProvider", description: "Provider verification" },
      ]
    },
    {
      path: "/about",
      component: "About section",
      children: [
        { path: "/about/values", component: "CompanyValues", description: "Company mission and values" },
        { path: "/about/faq", component: "FAQ", description: "Frequently asked questions" },
      ]
    },
    {
      path: "/services",
      component: "Services section",
      children: [
        { path: "/services/regular-cleaning", component: "RegularCleaning", description: "Regular home cleaning services" },
        { path: "/services/business-cleaning", component: "BusinessCleaning", description: "Commercial cleaning services" },
        { path: "/services/move-in-out", component: "MoveInOut", description: "Move-in/out cleaning services" },
        { path: "/services/post-construction-cleaning", component: "PostConstructionCleaning", description: "Construction cleanup services" },
      ]
    },
    {
      path: "/legal",
      component: "Legal section",
      children: [
        { path: "/legal/terms", component: "TermsOfService", description: "Terms and conditions" },
        { path: "/legal/privacy", component: "PrivacyPolicy", description: "Privacy policy information" },
      ]
    },
    {
      path: "/admin",
      component: "AdminLayout",
      description: "Admin panel wrapper",
      children: [
        { path: "/admin", component: "AdminPanel", description: "Admin dashboard" },
        { path: "/admin/analytics", component: "Dashboard", description: "Analytics overview" },
        { path: "/admin/bookings", component: "AdminBookings", description: "Booking management" },
        { path: "/admin/customers", component: "AdminCustomers", description: "Customer management" },
        { path: "/admin/providers", component: "AdminProviders", description: "Provider management" },
        { path: "/admin/settings", component: "AdminSettings", description: "Admin settings" },
      ]
    },
    {
      path: "/client",
      component: "ClientLayout",
      description: "Client portal wrapper",
      children: [
        { path: "/client/dashboard", component: "ClientDashboard", description: "Client dashboard" },
        { path: "/client/bookings", component: "ClientBookings", description: "Client bookings" },
        { path: "/client/messages", component: "ClientMessages", description: "Client messages" },
        { path: "/client/invoices", component: "ClientInvoices", description: "Client invoices" },
        { path: "/client/profile", component: "ClientProfile", description: "Client profile" },
        { path: "/client/settings", component: "ClientSettings", description: "Client settings" },
      ]
    },
    {
      path: "/provider",
      component: "ProviderLayout",
      description: "Provider portal wrapper",
      children: [
        { path: "/provider", component: "ProviderDashboard", description: "Provider dashboard (default)" },
        { path: "/provider/dashboard", component: "ProviderDashboard", description: "Provider dashboard" },
        { path: "/provider/profile", component: "ProviderProfile", description: "Provider profile" },
        { path: "/provider/bookings", component: "ProviderBookings", description: "Provider bookings" },
        { path: "/provider/messages", component: "ProviderMessages", description: "Provider messages" },
        { path: "/provider/settings", component: "ProviderSettings", description: "Provider settings" },
        { path: "/provider/availability", component: "ProviderAvailability", description: "Provider availability" },
      ]
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Application Routes Map</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Route Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route, idx) => (
              <RouteItem key={idx} {...route} />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Routes Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Public Routes</h3>
                <p className="text-sm text-muted-foreground">
                  Routes that don't require authentication, like home page and services information.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Protected Routes</h3>
                <p className="text-sm text-muted-foreground">
                  Routes that require authentication, like client dashboard, provider bookings, and admin panel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppRoutes;
