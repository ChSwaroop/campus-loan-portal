
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoanStore } from '@/store/loanStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, CheckCircle, XCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReviewedApplications: React.FC = () => {
  const { applications } = useLoanStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'approved' | 'rejected'>('all');
  
  // Filter reviewed applications
  const reviewedApplications = applications.filter(app => app.status !== 'pending');
  
  // Apply additional filtering based on user selection
  const filteredApplications = filter === 'all' 
    ? reviewedApplications
    : reviewedApplications.filter(app => app.status === filter);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
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
          onClick={() => navigate('/approver')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Reviewed Applications</h1>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Completed Reviews</CardTitle>
            <CardDescription>
              Applications that have been approved or rejected
            </CardDescription>
          </div>
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as 'all' | 'approved' | 'rejected')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviewed</SelectItem>
              <SelectItem value="approved">Approved Only</SelectItem>
              <SelectItem value="rejected">Rejected Only</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {filteredApplications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>CIBIL Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.studentName}</TableCell>
                    <TableCell>{formatDate(app.createdAt)}</TableCell>
                    <TableCell>{app.cibilScore}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/approver/review/${app.id}`)}
                      >
                        <FileText className="h-4 w-4 mr-1" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No reviewed applications found</h3>
              <p className="text-muted-foreground mt-1">
                No applications match the current filter criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/approver/pending')}
              >
                View Pending Applications
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewedApplications;
