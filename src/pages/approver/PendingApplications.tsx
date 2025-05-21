
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoanStore } from '@/store/loanStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Clock } from 'lucide-react';

const PendingApplications: React.FC = () => {
  const { applications } = useLoanStore();
  const navigate = useNavigate();
  
  // Filter pending applications
  const pendingApplications = applications.filter(app => app.status === 'pending');
  
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
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate('/approver')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Pending Applications</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Applications Awaiting Review</CardTitle>
          <CardDescription>
            Review and make decisions on pending loan applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingApplications.length > 0 ? (
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
                {pendingApplications.map((app) => {
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
          ) : (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No pending applications</h3>
              <p className="text-muted-foreground mt-1">
                All applications have been reviewed.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/approver/reviewed')}
              >
                View Reviewed Applications
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingApplications;
