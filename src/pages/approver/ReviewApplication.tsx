
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoanStore, StudentData } from '@/store/loanStore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowLeft, CheckCircle, Clock, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ReviewApplication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { applications, approveApplication, rejectApplication, isLoading } = useLoanStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  
  const application = applications.find(app => app.id === id);
  
  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-16rem)]">
        <h2 className="text-2xl font-bold mb-2">Application Not Found</h2>
        <p className="text-muted-foreground mb-6">The application you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/approver')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  const handleApprove = async () => {
    try {
      await approveApplication(id!);
      toast({
        title: "Application Approved",
        description: "The loan application has been approved successfully."
      });
      setIsApproveDialogOpen(false);
      navigate('/approver');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve application",
        variant: "destructive"
      });
    }
  };
  
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await rejectApplication(id!, rejectionReason);
      toast({
        title: "Application Rejected",
        description: "The loan application has been rejected."
      });
      setIsRejectDialogOpen(false);
      navigate('/approver');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive"
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Calculate risk level based on CIBIL score
  const getRiskLevel = (cibilScore: number) => {
    if (cibilScore >= 750) {
      return { 
        level: "Low Risk", 
        color: "bg-green-100 text-green-800 border-green-200",
        description: "Excellent credit score, low risk of default." 
      };
    }
    if (cibilScore >= 650) {
      return { 
        level: "Medium Risk", 
        color: "bg-blue-100 text-blue-800 border-blue-200",
        description: "Good credit score, moderate risk of default." 
      };
    }
    if (cibilScore >= 550) {
      return { 
        level: "High Risk", 
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        description: "Fair credit score, higher risk of default." 
      };
    }
    return { 
      level: "Very High Risk", 
      color: "bg-red-100 text-red-800 border-red-200",
      description: "Poor credit score, very high risk of default." 
    };
  };
  
  const risk = getRiskLevel(application.cibilScore);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate('/approver')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Review Application</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Personal details of the applicant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-y-6 gap-x-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Student Name</h3>
                  <p className="font-semibold">{application.studentName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</h3>
                  <p className="font-semibold">{application.dateOfBirth}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Father's Name</h3>
                  <p className="font-semibold">{application.fatherName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Mother's Name</h3>
                  <p className="font-semibold">{application.motherName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Aadhar Number</h3>
                  <p className="font-semibold">{application.aadharNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">PAN Card</h3>
                  <p className="font-semibold">{application.panCard}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Credit Assessment</CardTitle>
              <CardDescription>Evaluation of credit worthiness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">CIBIL Score</h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{application.cibilScore}</span>
                    <Badge className={cn("ml-3", risk.color)}>{risk.level}</Badge>
                  </div>
                  <p className="text-sm mt-1">{risk.description}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-1">Credit Score Range</h4>
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
                  
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-1">Application Date</h4>
                    <p className="text-sm">{formatDate(application.createdAt)}</p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-1">Application Status</h4>
                    <div className="mt-1">
                      {application.status === 'pending' ? (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      ) : application.status === 'approved' ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Rejected
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "rounded-lg border p-4 mb-4",
                application.cibilScore >= 750 ? "bg-green-50 border-green-200" :
                application.cibilScore >= 650 ? "bg-blue-50 border-blue-200" :
                application.cibilScore >= 550 ? "bg-yellow-50 border-yellow-200" :
                "bg-red-50 border-red-200"
              )}>
                <div className="flex items-center mb-2">
                  <Info className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Recommendation</h3>
                </div>
                {application.cibilScore >= 750 ? (
                  <p className="text-sm">This application has a strong credit profile. Approval is recommended.</p>
                ) : application.cibilScore >= 650 ? (
                  <p className="text-sm">This application has a good credit profile. Approval with standard terms is suggested.</p>
                ) : application.cibilScore >= 550 ? (
                  <p className="text-sm">This application has moderate risk factors. Consider approval with additional conditions.</p>
                ) : (
                  <p className="text-sm">This application has significant risk factors. Careful review is recommended.</p>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">CIBIL Score Interpretation</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      300-550: Poor
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      550-650: Fair
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      650-750: Good
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      750-900: Excellent
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            
            {application.status === 'pending' && (
              <CardFooter className="flex-col space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => setIsApproveDialogOpen(true)}
                  disabled={isLoading}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Application
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setIsRejectDialogOpen(true)}
                  disabled={isLoading}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Application
                </Button>
              </CardFooter>
            )}
            
            {application.status === 'rejected' && application.rejectionReason && (
              <CardFooter className="flex-col space-y-2">
                <div className="w-full rounded-lg bg-red-50 border border-red-200 p-4">
                  <h3 className="font-medium text-sm flex items-center text-red-800">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Rejection Reason
                  </h3>
                  <p className="text-sm mt-1 text-red-700">{application.rejectionReason}</p>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
      
      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this loan application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-32"
            />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleReject}
              disabled={isLoading || !rejectionReason.trim()}
            >
              {isLoading ? "Rejecting..." : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this loan application?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <div className="mr-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Student: {application.studentName}</h4>
                <p className="text-sm text-muted-foreground">CIBIL Score: {application.cibilScore}</p>
              </div>
            </div>
            <Badge className={risk.color}>{risk.level}</Badge>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsApproveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleApprove}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Approving..." : "Confirm Approval"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewApplication;
