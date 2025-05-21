
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoanStore } from '@/store/loanStore';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Edit,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications, updateApplication } = useLoanStore();
  const { toast } = useToast();
  
  const application = applications.find(app => app.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    aadharNumber: '',
    panCard: '',
    cibilScore: 0
  });
  
  React.useEffect(() => {
    if (application) {
      setEditedData({
        studentName: application.studentName,
        fatherName: application.fatherName,
        motherName: application.motherName,
        dateOfBirth: application.dateOfBirth,
        aadharNumber: application.aadharNumber,
        panCard: application.panCard,
        cibilScore: application.cibilScore
      });
    }
  }, [application]);
  
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: name === 'cibilScore' ? Number(value) : value
    });
  };

  const handleSubmit = async () => {
    try {
      await updateApplication(id!, {
        ...editedData,
        status: 'pending', // Reset status to pending for re-review
        rejectionReason: undefined // Clear rejection reason
      });
      
      toast({
        title: "Application Updated",
        description: "Application has been updated and resubmitted for approval.",
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update application. Please try again.",
      });
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
        
        <div className="flex gap-2">
          {application.status === 'rejected' && !isEditing && (
            <Button 
              variant="outline"
              onClick={handleEditToggle}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit & Resubmit
            </Button>
          )}
          {isEditing && (
            <Button 
              onClick={handleSubmit}
            >
              <Save className="h-4 w-4 mr-2" />
              Save & Resubmit
            </Button>
          )}
          <Button 
            variant="outline"
            onClick={() => navigate('/counselor/applications')}
          >
            Back to Applications
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Personal details of the applicant</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid gap-y-4 gap-x-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input 
                      id="studentName" 
                      name="studentName" 
                      value={editedData.studentName} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input 
                      id="dateOfBirth" 
                      name="dateOfBirth" 
                      value={editedData.dateOfBirth} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input 
                      id="fatherName" 
                      name="fatherName" 
                      value={editedData.fatherName} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input 
                      id="motherName" 
                      name="motherName" 
                      value={editedData.motherName} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber">Aadhar Number</Label>
                    <Input 
                      id="aadharNumber" 
                      name="aadharNumber" 
                      value={editedData.aadharNumber} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panCard">PAN Card</Label>
                    <Input 
                      id="panCard" 
                      name="panCard" 
                      value={editedData.panCard} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cibilScore">CIBIL Score</Label>
                    <Input 
                      id="cibilScore" 
                      name="cibilScore" 
                      type="number" 
                      min="300" 
                      max="900" 
                      value={editedData.cibilScore} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
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
            )}
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
              {isEditing ? (
                <Input 
                  id="cibilScore" 
                  name="cibilScore" 
                  type="number" 
                  min="300" 
                  max="900" 
                  className="mt-1"
                  value={editedData.cibilScore} 
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-2xl font-bold mt-1">{application.cibilScore}</p>
              )}
              
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
                      style={{ marginLeft: `${((isEditing ? editedData.cibilScore : application.cibilScore) - 300) / 600 * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-muted-foreground text-sm ml-1">900</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {application.status === 'rejected' && application.rejectionReason && !isEditing && (
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
          <CardFooter className="bg-white rounded-b-lg border-t border-red-100">
            <div className="text-sm text-red-700">
              You can edit and resubmit this application for reconsideration.
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ApplicationDetail;
