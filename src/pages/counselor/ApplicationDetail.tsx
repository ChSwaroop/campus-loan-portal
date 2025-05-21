
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoanStore } from '@/store/loanStore';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications } = useLoanStore();
  
  const application = applications.find(app => app.id === id);
  
  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-16rem)]">
        <h2 className="text-2xl font-bold mb-2">Application Not Found</h2>
        <p className="text-muted-foreground mb-6">The application you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/counselor/applications')}>
          Return to Applications
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate('/counselor/applications')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Application Details</h1>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getStatusBadge(application.status)}
          <span className="ml-2 text-sm text-muted-foreground">
            Applied on {formatDate(application.createdAt)}
          </span>
        </div>
        
        <Button 
          variant="outline"
          onClick={() => navigate('/counselor/applications')}
        >
          Back to Applications
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Personal details of the applicant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-y-4 gap-x-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Student Name</h3>
                <p className="font-semibold">{application.studentName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date of Birth</h3>
                <p className="font-semibold">{application.dateOfBirth}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Father's Name</h3>
                <p className="font-semibold">{application.fatherName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Mother's Name</h3>
                <p className="font-semibold">{application.motherName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Aadhar Number</h3>
                <p className="font-semibold">{application.aadharNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">PAN Card</h3>
                <p className="font-semibold">{application.panCard}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Credit Assessment</CardTitle>
            <CardDescription>Credit score and risk evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">CIBIL Score</h3>
              <p className="text-2xl font-bold mt-1">{application.cibilScore}</p>
              
              <Separator className="my-4" />
              
              <div className="rounded-lg border p-3">
                <h4 className="font-medium text-sm mb-2">Credit Score Range</h4>
                <div className="flex items-center">
                  <span className="text-muted-foreground text-sm mr-1">300</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                      style={{ width: '100%' }}
                    ></div>
                    <div 
                      className="h-3 w-3 bg-white border-2 border-primary rounded-full -mt-2.5"
                      style={{ marginLeft: `${((application.cibilScore - 300) / 600) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-muted-foreground text-sm ml-1">900</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {application.status === 'rejected' && application.rejectionReason && (
        <Card className={cn("border-red-200 bg-red-50")}>
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Application Rejected
            </CardTitle>
            <CardDescription className="text-red-700">
              This application has been rejected by the approver
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">Reason for Rejection:</h3>
              <p className="text-sm py-2 px-3 bg-white rounded border border-red-200">
                {application.rejectionReason}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationDetail;
