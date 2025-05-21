
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoanStore } from '@/store/loanStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { AlertTriangle, CheckCircle, Clock, FilePenLine, XCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { applications } = useLoanStore();
  const navigate = useNavigate();
  
  // Filter applications by status
  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');
  
  // Get recently pending applications (most recent 5)
  const recentPendingApplications = [...pendingApplications]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="status-badge status-pending">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="status-badge status-approved">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="status-badge status-rejected">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Calculate risk level based on CIBIL score
  const getRiskLevel = (cibilScore: number) => {
    if (cibilScore >= 750) return { level: "Low", color: "text-green-600" };
    if (cibilScore >= 650) return { level: "Medium", color: "text-blue-600" };
    if (cibilScore >= 550) return { level: "High", color: "text-yellow-600" };
    return { level: "Very High", color: "text-red-600" };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Approver Dashboard</h1>
        <Button onClick={() => navigate('/approver/pending')}>
          <FilePenLine className="mr-2 h-4 w-4" />
          Review Applications
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-yellow-500 mr-2" />
              <div className="text-2xl font-bold">{pendingApplications.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Applications awaiting decision
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{approvedApplications.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Applications approved
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
              <div className="text-2xl font-bold">{rejectedApplications.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Applications rejected
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        {pendingApplications.length > 0 ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Applications</CardTitle>
                  <CardDescription>
                    Applications awaiting your review
                  </CardDescription>
                </div>
                {pendingApplications.length > 0 && (
                  <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {pendingApplications.length} pending review
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead>CIBIL Score</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPendingApplications.map((app) => {
                    const risk = getRiskLevel(app.cibilScore);
                    return (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.studentName}</TableCell>
                        <TableCell>{formatDate(app.createdAt)}</TableCell>
                        <TableCell>{app.cibilScore}</TableCell>
                        <TableCell className={risk.color}>{risk.level}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/approver/review/${app.id}`)}
                          >
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {recentPendingApplications.length < pendingApplications.length && (
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" onClick={() => navigate('/approver/pending')}>
                    View All Pending ({pendingApplications.length})
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Applications Reviewed</CardTitle>
              <CardDescription>
                There are no pending applications waiting for your review
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
              <p className="text-muted-foreground">Great job! You're all caught up.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => navigate('/approver/reviewed')}
              >
                View Reviewed Applications
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
