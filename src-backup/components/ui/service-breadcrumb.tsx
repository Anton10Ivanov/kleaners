
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ServiceBreadcrumbProps {
  serviceName?: string;
}

const ServiceBreadcrumb = ({ serviceName }: ServiceBreadcrumbProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 section-spacing-xs border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathSegments.includes('services') && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {serviceName ? (
                    <BreadcrumbLink asChild>
                      <Link to="/services">Services</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>Services</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </>
            )}
            
            {serviceName && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{serviceName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default ServiceBreadcrumb;
