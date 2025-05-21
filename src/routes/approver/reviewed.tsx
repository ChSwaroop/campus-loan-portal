
import { createFileRoute } from '@tanstack/react-router';
import ReviewedApplications from '../../pages/approver/ReviewedApplications';

export const Route = createFileRoute('/approver/reviewed')({
  component: ReviewedApplications
})
